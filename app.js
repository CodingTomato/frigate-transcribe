import { translate } from '@vitalets/google-translate-api';

// Setup
const frigateUrl = 'http://192.168.178.140:5000';
const whisperUrl = 'http://127.0.0.1:9000';
const transcribeIdx = 37;
const targetLanguage = 'de';

// Get speech events
const rawEvents = await fetch(
  `${frigateUrl}/api/events?labels=speech&has_clip=1&limit=1000`,
);
const events = await rawEvents.json();
console.log('Got all speech events', events.length);

// Download first clip
if (transcribeIdx > events.length - 1)
  throw Error('No speech events with provided index');

const eventId = events[transcribeIdx].id;
const clipRaw = await fetch(`${frigateUrl}/api/events/${eventId}/clip.mp4`);
const clip = await clipRaw.blob();
console.log('Downloaded clip', eventId);

// Detect language
const formData = new FormData();
formData.append('audio_file', clip);

const responseRaw = await fetch(`${whisperUrl}/detect-language`, {
  method: 'POST',
  body: formData,
});

const { language_code } = await responseRaw.json();
console.log('Detected language:', language_code);

// Transcribe speech
const formData2 = new FormData();
formData2.append('audio_file', clip);
formData2.append('language', language_code);

const responseRaw2 = await fetch(`${whisperUrl}/asr`, {
  method: 'POST',
  body: formData2,
});

const response = await responseRaw2.text();
console.log('Transcribed speech:', response);

// Translate if language is not german

if (language_code !== targetLanguage && language_code !== 'nn') {
  const { text } = await translate(response, {
    from: language_code,
    to: targetLanguage,
  });
  console.log('translated:', text);
}
