import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RecordList } from "../API/RecordAPI";
import { setRecordList } from "../ReduxStore/slices/RecordRecourceSlice";

export const useRecordList = (Id) => {
  const dispatch = useDispatch();
    console.log("Id", Id);
  const getRecordList = async () => {
    try {
      const data = await RecordList(Id);
      console.log("data", data);
      dispatch(setRecordList(data));
    } catch (error) {
      console.log("Error fetching record list:", error);
    }
  };
  useEffect(() => {
    getRecordList();
  }, []);
};
