import axios from "axios";

export const RecordAPI = axios.create({
  baseURL: "https://dns-dashboard.onrender.com/api/v1/users",
  withCredentials: true,
});

export const Register = async (input) => {
  console.log("input : ", input);
  const { data } = await RecordAPI.post("/Register", input);
  
  return data;
};
export const userLogin = async (input) => {

try {
   
   const { data } = await RecordAPI.post("/login", input);

   
   return data; 
} catch (error) {
    throw new Error(error.response.data.message);
}
  
};
