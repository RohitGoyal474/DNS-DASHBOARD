import {useSelector} from "react-redux"
import { useParams } from "react-router-dom";
import { useRecordList } from "../hooks/useRecordList";
import DnsRecordTable from "../components/DnsRecordTable";
import CreateRecordButton from "../components/createRecordButton";
import HostedZoneHeader from "../components/topBar";

export const Record=()=>{
    const { Id,name } = useParams();
    console.log(Id,name);
    if (!Id) {
        return <div>Loading...</div>;
    }
    
    
   
    useRecordList(Id);
    const RecordList = useSelector(
      (store) => store?.Record?.RecordList
    );
    console.log("record : ",RecordList)
    return (
        <div>
            <HostedZoneHeader id={Id} name={name}/>
           <CreateRecordButton Id={Id} name={name}/>
            <DnsRecordTable data={RecordList} />
        </div>
    )
}

