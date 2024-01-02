import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { getAllTranscripts, addTranscript } from './db';
import { setSubLabel } from './frigate';
import { transcribeClipId } from '../utils/transcribeClipId';
import { persistTranscript } from '../utils/persistTranscript';

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

api.get('/transcriptions', async (c) => {
  const data = await getAllTranscripts();
  return c.json(data);
});
