
import { useHostedZoneList } from './hooks/useHostedZoneList'
import { HostedZone } from './page/HostedZone'
import { Provider } from 'react-redux';
import appStore from './ReduxStore/appStore';
import { Record } from './page/DNSRecord';
import CreateHostedZone from './components/createHostedZone';
import CreateRecord from './components/createRecordButton';
import { Body } from './page/Body';

function App() {
  
  return (
    <Provider store={appStore}>
     

    <Body/>


    </Provider>
  )
}

export default App
