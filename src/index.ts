import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { connectMqtt } from './modules/mqtt';
import { config } from './modules/config';
import { api } from './modules/api';
import { frontend } from './modules/frontend';
import { FrigateEvent } from './types/FrigateEvent';
import { q } from './modules/queue';

connectMqtt('frigate/events', async (_topic, message) => {
  const event = JSON.parse(message.toLocaleString()) as FrigateEvent;

  if (event.type !== 'end') return;
  if (event.after.label !== 'speech') return;
  if (!event.after.has_clip) return;

  console.log('New speech event detected...', event.before.id);

  console.log(`🚂 [MQTT]: Adding ${event.before.id} to queue`);
  q.push({ clipId: event.before.id });
});

const app = new Hono();

app.use('/api/*', cors());

app.route('/', frontend);
app.route('/api', api);

console.log(`Server is running on port ${config.serverPort}`);

serve({
  fetch: app.fetch,
  port: config.serverPort,
});
