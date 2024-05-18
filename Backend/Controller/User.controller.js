import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { User } from "../Models/User.Model.js";
import { ApiResponse } from "../Utils/apiResponse.js";

const accessAndRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    if (!user) {
      throw new ApiError(
        405,
        "access and refresh token could not genrate,user not found"
      );
    }
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(405, "access and refresh yoken could not genrate");
  }
};

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
            throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const { refreshToken, accessToken } = await accessAndRefreshToken(user._id);
    
     const createdUser = await User.findById(user._id).select(
       "-password -refreshToken"
     );

     if (!createdUser) {
       throw new ApiError(
         500,
         "Something went wrong while registering the user"
       );
     }
     const options = {};
     return res
       .status(201)
       .cookie("accessToken", accessToken, options)
       .cookie("refreshToken", refreshToken, options)
       .json(new ApiResponse(200, createdUser, "User registered Successfully"));
     
    
})

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  

  if (!email) {
    throw new ApiError(400, "username and email both are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username: email }, { email }],
  });
  if (!existedUser) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const { refreshToken, accessToken } = await accessAndRefreshToken(
    existedUser._id
  );

  
  
  // where existedUser dont have refresh token and also contain password;
  const logedUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );
  if (!logedUser) {
    throw new ApiError(400, "something went wrong during loged user");
  }
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logedUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  window.localStorage.setItem("accessToken", token);
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  r;
  const newRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (!newRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  const decoded = Jwt.verify(newRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    throw new ApiError(401, "Invalid refresh token");
  }
  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }
  const { refreshToken, accessToken } = await accessAndRefreshToken(user._id);
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed successfully"
      )
    );
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, password, confPassword } = req.body;
  if (!password || !oldPassword || !confPassword) {
    throw new ApiError(400, "Invalid input while changing password");
  }
  if (password !== confPassword) {
    throw new ApiError(400, "Password and confirm password does not match");
  }

  const user = User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = password;
  await user.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
export {registerUser, userLogin, userLogout, refreshAccessToken, updateUserPassword}