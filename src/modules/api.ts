import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { config } from '../config';
import { isDetectedLangTargetLang } from '../utils/isDetectedLangTargetLang';
import { getAllTranscripts, addTranscript } from './db';
import { downloadClipFromFrigate, setSubLabel } from './frigate';
import { detectLanguage, transcribe } from './transcribe';
import { translateText } from './translate';
import { Transcript } from '../types/Transcript';

export const api = new Hono();

api.get('/transcribe/:clipId', async (c) => {
  try {
    const { clipId } = c.req.param();
    const clip = await downloadClipFromFrigate(clipId);
    const lang = await detectLanguage(clip);
    await setSubLabel(clipId, lang.detected_language);
    const transcription = await transcribe(clip, lang.language_code);

    const transcript: Transcript = {
      clipId,
      detectedLanguage: lang,
      transcript: transcription,
    };

    if (isDetectedLangTargetLang(lang)) {
      const translated = await translateText(
        transcription,
        lang.detected_language,
        config.targetLanguage,
      );

      transcript.translated = translated;
    }

    await addTranscript(transcript);
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
