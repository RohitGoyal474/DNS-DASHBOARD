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
        // Handle error if necessary
        console.error("Error fetching hosted zone list:", error);
      }
    };

  useEffect(() => {
    

    getHostedZoneList();
  }, [dispatch]);

  // Return data if needed by the component
  // You can modify this to return any additional data or state needed by the component
  return null;
};
