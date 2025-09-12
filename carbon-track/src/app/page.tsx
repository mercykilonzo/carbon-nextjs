
import MqttSubscriber from './hivemq/mqtt_client'
export default function Home() {
  return (
    <div>
      <h1>HiveMQ MQTT Data Subscriber</h1>
      <MqttSubscriber />
    </div>
  );
}