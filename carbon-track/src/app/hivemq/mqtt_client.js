'use client';
import { useEffect } from 'react';
import mqtt from 'mqtt';
const MqttSubscriber = () => {
  useEffect(() => {
    const broker = 'wss://57652ef3c2f34337b4fe5619db6f16b9.s1.eu.hivemq.cloud:8884/mqtt';
    const options = {
      username: 'CarbonTrack',
      password: '@Carbontrack2025',
      clientId: 'carbontrack-' + Math.random().toString(16).substr(2, 8),
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    };
    // Connect to HiveMQ broker over secure WebSocket
    const client = mqtt.connect(broker, options);
    client.on('connect', () => {
      console.log('Connected to HiveMQ over WebSocket');
      client.subscribe('esp32/hello', (err) => {
        if (err) {
          console.error('Subscription error:', err);
        } else {
          console.log('Subscribed to topic esp32/hello');
        }
      });
    });
    client.on('message', (topic, message) => {
      try {
        const mqttData = JSON.parse(message.toString());
        // Map MQTT data to backend expected fields
        const postData = {
          device_id: mqttData.device_id,
          emission_rate: mqttData.co2_emission_kgs, // this must match your backend field names
        };
        // Post to backend API
        fetch('https://carbon-track-680e7cff8d27.herokuapp.com/api/emissions/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
          .then(res => res.json())
          .then(response => {
            console.log('Backend API response:', response);
          })
          .catch(error => {
            console.error('Error posting to backend:', error);
          });
      } catch (err) {
        console.error('Failed to parse MQTT message JSON', err);
      }
    });
    client.on('error', (err) => {
      console.error('MQTT Client Error:', err);
      client.end();
    });
    client.on('reconnect', () => {
      console.log('MQTT reconnecting...');
    });
    // Cleanup on unmount
    return () => {
      client.end();
    };
  }, []);
  return null; // No UI needed, but you can add status display here if desired
};
export default MqttSubscriber;