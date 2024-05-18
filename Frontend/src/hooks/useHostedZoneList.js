import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HostedZoneList } from "../API/HostedZoneAPI";
import { setHostedZoneList } from "../ReduxStore/slices/HostedZoneSlice";

export const useHostedZoneList = () => {
  const dispatch = useDispatch();

    const getHostedZoneList = async () => {
      try {
        const data = await HostedZoneList();
        dispatch(setHostedZoneList(data));
      } catch (error) {
        
        console.error("Error fetching hosted zone list:", error);
      }
    };

  useEffect(() => {
    

    getHostedZoneList();
  }, [dispatch]);

  
  return null;
};
