
import MqttSubscriber from './hivemq/mqtt_client'
import Sidebar from './sharedComponents/SideBar';
export default function Home() {
  return (
    <div>
      <h1>HiveMQ MQTT Data Subscriber</h1>
      <Sidebar/>
      <MqttSubscriber />
    </div>
  );
}