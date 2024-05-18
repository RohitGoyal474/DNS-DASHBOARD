import axios from "axios";

export const RecordAPI = axios.create({
  baseURL: "https://dns-dashboard.onrender.com/api/v1/ResourceRecords",
  withCredentials: true,
});

export const RecordList = async (Id) => {
  try {
    const { data } = await RecordAPI.get(`/RecourceRecordsList?Id=${Id}`, {
      withCredentials: true,
    });
    console.log("record : ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const CreateRecord = async (input) => {
  try {
    const { data } = await RecordAPI.post("/CreateRecourceRecords", input);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
  
};
export const UpdateRecord = async (input) => {
 try {
    const { data } = await RecordAPI.post("/UpdateRecourceRecords", input);
    console.log(data);
    return data;
 } catch (error) {
  console.log(error);
 }
  
};

export const DeleteRecord = async (input) => {
  try {
    console.log("input : ", input);
    const { data } = await RecordAPI.post("/DeleteRecourceRecords", input);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};