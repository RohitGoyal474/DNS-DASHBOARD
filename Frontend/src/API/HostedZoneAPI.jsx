import axios from "axios";

export const HostedZoneAPI = axios.create({
  baseURL: "https://dns-dashboard.onrender.com/api/v1/HostedZone",
  withCredentials: true,
});

export const HostedZoneList = async () => {
  
  try {
    const { data } = await HostedZoneAPI.get("/HostedZoneList");

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const CreateHostedZone = async (input) => {

  try {
    console.log("input : ", input);
    const data = await HostedZoneAPI.post("/ceateHostedZone", input);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const DeleteHostedZOne=async(Id)=>{
  const input={
    Id:Id
  }
  try {
    const data = await HostedZoneAPI.post("/DeleteHostedZone", input);
    console.log(data);
  return data;
  } catch (error) {
    console.log(error);
  }
  
  
}