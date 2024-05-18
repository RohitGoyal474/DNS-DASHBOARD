import { ApiError } from "../Utils/apiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import Jwt from "jsonwebtoken";
import { User } from "../Models/User.Model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    console.log("req : ", req.cookies);
    const token = req.cookies?.accessToken;
   
    console.log("token  :  ",token);
   
 
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});