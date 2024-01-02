import { addTranscript } from '../modules/db';
import { setSubLabel } from '../modules/frigate';
import { Transcript } from '../types/Transcript';

export async function persistTranscript(transcript: Transcript) {
  await setSubLabel(
    transcript.clipId,
    transcript.detectedLanguage.detected_language,
  );
  await addTranscript(transcript);
}
