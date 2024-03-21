import Database from 'better-sqlite3';
import { Transcript } from '../types/Transcript';

const db = new Database('config/frigate-transcribe.db', {});
db.pragma('journal_mode = WAL');

function syncDb() {
  db.prepare(
    'CREATE TABLE IF NOT EXISTS transcripts (clipId TEXT, detectedLanguage TEXT, transcript TEXT, translated TEXT, updatedAt TIMESTAMP)',
  ).run();
}

export function getAllTranscripts() {
  syncDb();
  const data = db.prepare('SELECT * FROM transcripts').all();
  // console.log(data);
  return data as Transcript[];
}

export function addTranscript(transcript: Transcript) {
  syncDb();
  const data = db
    .prepare(
      'INSERT INTO transcripts (clipId, detectedLanguage, transcript, translated, updatedAt) VALUES(?, ?, ?, ?, ?)',
    )
    .run(
      transcript.clipId,
      JSON.stringify(transcript.detectedLanguage),
      transcript.transcript,
      transcript.translated,
      Date.now(),
    );
  // console.log(data);

  return data;
}
