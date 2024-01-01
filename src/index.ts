import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { connectMqtt } from './modules/mqtt';
import { config } from './config';
import { api } from './modules/api';
import { frontend } from './modules/frontend';

const mqttClient = connectMqtt('frigate/events', (topic, message) => {
  console.log(topic, message);
});

const app = new Hono();

app.route('/', frontend);
app.route('/api', api);

console.log(`Server is running on port ${config.serverPort}`);

serve({
  fetch: app.fetch,
  port: config.serverPort,
});
