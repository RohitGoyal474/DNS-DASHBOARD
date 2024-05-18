import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RecordList } from "../API/RecordAPI";
import { setRecordList } from "../ReduxStore/slices/RecordRecourceSlice";

export const useRecordList = (Id) => {
  const dispatch = useDispatch();
    console.log("Id", Id);
  const getRecordList = async () => {
    const data = await RecordList(Id);
    console.log("data", data);
    dispatch(setRecordList(data));
  };
  useEffect(() => {
    getRecordList();
  }, []);
};
