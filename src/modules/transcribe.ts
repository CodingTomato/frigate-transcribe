const whisperUrl = 'http://192.168.178.34:9000';

export async function detectLanguage(clip: Blob) {
  const formData = new FormData();
  formData.append('audio_file', clip);

  const responseRaw = await fetch(`${whisperUrl}/detect-language`, {
    method: 'POST',
    body: formData,
  });

  return (await responseRaw.json()) as {
    detected_language: string;
    language_code: string;
  };
}

export async function transcribe(clip: Blob, languageCode: string) {
  const formData = new FormData();
  formData.append('audio_file', clip);
  formData.append('language', languageCode);

  const responseRaw2 = await fetch(`${whisperUrl}/asr`, {
    method: 'POST',
    body: formData,
  });

  return await responseRaw2.text();
}
