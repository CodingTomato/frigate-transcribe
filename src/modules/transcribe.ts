import { config } from './config';
import { DetectedLanguage } from '../types/Transcript';

export async function detectLanguage(clip: Blob) {
  const formData = new FormData();
  formData.append('audio_file', clip);

  const responseRaw = await fetch(`${config.whisperUrl}/detect-language`, {
    method: 'POST',
    body: formData,
  });

  return (await responseRaw.json()) as DetectedLanguage;
}

export async function transcribe(clip: Blob, languageCode: string) {
  const formData = new FormData();
  formData.append('audio_file', clip);
  formData.append('language', languageCode);

  const responseRaw2 = await fetch(`${config.whisperUrl}/asr`, {
    method: 'POST',
    body: formData,
  });

  return await responseRaw2.text();
}
