import { OnMessageCallback, connect } from 'mqtt'; // import connect from mqtt
import { config } from './config';

export function connectMqtt(topic: string, cb: OnMessageCallback) {
  const client = connect(config.mqttConnectionString); // create a client

  client.on('connect', () => {
    client.subscribe(topic);
  });

  client.on('disconnect', () => {
    console.log('disconnected');
  });

  client.on('message', cb);

  return client;
}
