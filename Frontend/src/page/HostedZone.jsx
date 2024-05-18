import { useSelector } from "react-redux"
import { useHostedZoneList } from "../hooks/useHostedZoneList";
import HostedZoneTable from "../components/HostedZoneTable";
import CreateHostedZoneButton from "../components/createHostedZone";
import ChartApp from "../components/Charts";
import Alert from "../components/error";

 export const HostedZone = () => {
    useHostedZoneList();
    const HostedZoneList=useSelector((store)=>store?.HostedZone?.HostedZoneList)
     const data=HostedZoneList;
    if(!data){
        return <div>Loading...</div>}
    return (
      <div>
        {/* <ChartApp/> */}
       
        <CreateHostedZoneButton />
        <HostedZoneTable data={HostedZoneList} />
      </div>
    );
}