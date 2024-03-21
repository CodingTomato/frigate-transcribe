import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { getAllTranscripts } from './db';
import { transcribeClipId } from '../utils/transcribeClipId';
import { persistTranscript } from '../utils/persistTranscript';
import { q } from './queue';

export const api = new Hono();

api.get('/transcribe/:clipId', async (c) => {
  try {
    const { clipId } = c.req.param();

    const transcript = await transcribeClipId(clipId);
    await persistTranscript(transcript);

    return c.json(transcript);
  } catch (error) {
    console.log(error);
    throw new HTTPException(500, { message: error as string });
  }
});

api.get('/queue/status', async (c) => {
  return c.json({
    idle: q.idle(),
    running: q.running(),
    queue: q.getQueue(),
  });
});

api.get('/queue/:clipId', async (c) => {
  const { clipId } = c.req.param();
  console.log(`🚂 [API]: Adding ${clipId} to queue`);
  q.push({ clipId });
  return c.json({ message: 'Added to queue' });
});

api.get('/transcriptions', async (c) => {
  const data = await getAllTranscripts();
  return c.json(data);
});
