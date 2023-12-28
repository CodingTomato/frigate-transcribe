import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { connectMqtt } from './modules/mqtt';
import { downloadClipFromFrigate, setSubLabel } from './modules/frigate';
import { detectLanguage, transcribe } from './modules/transcribe';
import { translateText } from './modules/translate';

const mqttClient = connectMqtt('frigate/events', (topic, message) => {
  console.log(topic, message);
});

const app = new Hono();
app.get('/', (c) => c.text(`Hello Hono! ${mqttClient.connected}`));

app.get('/transcribe/:clipId', async (c) => {
  const { clipId } = c.req.param();
  const clip = await downloadClipFromFrigate(clipId);
  console.log('Clip downloaded');
  const lang = await detectLanguage(clip);
  console.log('Language detected');
  await setSubLabel(clipId, lang.detected_language);
  console.log('Sublabel set');
  const transcript = await transcribe(clip, lang.language_code);
  console.log('Transcription done');

  if (lang.language_code !== 'de' && lang.detected_language !== 'nn') {
    const translated = await translateText(
      transcript,
      lang.detected_language,
      'de',
    );
    return c.json({ clipId, detectedLanguage: lang, transcript, translated });
  }

  return c.json({
    clipId,
    detectedLanguage: lang,
    transcript,
  });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
