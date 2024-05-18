import axios from "axios";

export const RecordAPI = axios.create({
  baseURL: "https://dns-dashboard.onrender.com/api/v1/users",
  withCredentials: true,
});

export const Register = async (input) => {
  console.log("input : ", input);
  const { data } = await RecordAPI.post("/Register", input);
  console.log(data);
  return data;
};
export const userLogin = async (input) => {
  console.log("input : ", input);
  const { data } = await RecordAPI.post("/login", input);
  console.log(data);
  return data;
};
