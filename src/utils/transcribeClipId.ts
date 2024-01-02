import { config } from '../modules/config';
import { addTranscript } from '../modules/db';
import { downloadClipFromFrigate, setSubLabel } from '../modules/frigate';
import { detectLanguage, transcribe } from '../modules/transcribe';
import { translateText } from '../modules/translate';
import { Transcript } from '../types/Transcript';
import { isDetectedLangTargetLang } from './isDetectedLangTargetLang';

export async function transcribeClipId(clipId: string) {
  const clip = await downloadClipFromFrigate(clipId);
  const lang = await detectLanguage(clip);
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

  return transcript;
}
