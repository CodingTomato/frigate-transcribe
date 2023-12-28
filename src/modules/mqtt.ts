import { OnMessageCallback, connect } from 'mqtt'; // import connect from mqtt
const mqttUser = 'frigate';
const mqttPass = '';
const mqttCon = `mqtt://${mqttUser}:${mqttPass}@192.168.178.34:1883`;

export function connectMqtt(topic: string, cb: OnMessageCallback) {
  const client = connect(mqttCon); // create a client

  client.on('connect', () => {
    client.subscribe(topic);
  });

  client.on('disconnect', () => {
    console.log('disconnected');
  });

  client.on('message', cb);

  return client;
}
