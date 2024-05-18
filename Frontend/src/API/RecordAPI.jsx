import axios from "axios";

export const RecordAPI = axios.create({
  baseURL: "http://localhost:8000/api/v1/ResourceRecords",
  withCredentials: true,
});

export const RecordList = async (Id) => {
  const { data } = await RecordAPI.get(`/RecourceRecordsList?Id=${Id}`, {
    withCredentials: true,
  });
  console.log("record : ",data);
  return data;
};

export const CreateRecord = async (input) => {
  
  const { data } = await RecordAPI.post("/CreateRecourceRecords", input);
  console.log(data);
  return data;
};
export const UpdateRecord = async (input) => {
 
  const { data } = await RecordAPI.post("/UpdateRecourceRecords", input);
  console.log(data);
  return data;
};

export const DeleteRecord = async (input) => {
  console.log("input : ", input);
  const { data } = await RecordAPI.post("/DeleteRecourceRecords", input);
  console.log(data);
  return data;
};