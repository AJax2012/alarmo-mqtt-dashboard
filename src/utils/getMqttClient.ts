import mqtt, { MqttClient } from 'mqtt';

export const getMqttClient = (): MqttClient =>
  mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
    username: import.meta.env.VITE_MQTT_USERNAME,
    password: import.meta.env.VITE_MQTT_PASSWORD,
    resubscribe: true,
    clean: true,
  });
