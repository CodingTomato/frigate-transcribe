import { Database } from 'sqlite3';
import { Transcript } from '../types/Transcript';
import { resolve } from 'path';

const db = new Database(resolve(__dirname, '../config/frigate-transcribe.db'));

function createTranscriptsTableIfnotExists() {
  db.run(
    'CREATE TABLE IF NOT EXISTS transcripts (clipId TEXT, detectedLanguage TEXT, transcript TEXT, translated TEXT, updated_at TIMESTAMP)',
  );
}

export function getAllTranscripts() {
  return new Promise<Transcript[]>((resolve, reject) => {
    db.serialize(() => {
      createTranscriptsTableIfnotExists();

      db.all(
        'SELECT * FROM transcripts ORDER BY updated_at DESC',
        (err, rows) => {
          if (err) reject(err);
          resolve(rows as Transcript[]);
        },
      );
    });
  });
}

export function addTranscript(transcript: Transcript) {
  return new Promise((resolve, reject) => {
    if (!Transcript.safeParse(transcript).success) {
      console.warn('Invalid transcript');
      reject('Invalid transcript');
    }

    db.serialize(() => {
      createTranscriptsTableIfnotExists();

      db.run(
        'INSERT INTO transcripts (clipId, detectedLanguage, transcript, translated, updated_at) VALUES(?, ?, ?, ?, ?)',
        [
          transcript.clipId,
          JSON.stringify(transcript.detectedLanguage),
          transcript.transcript,
          transcript.translated ?? '',
          Date.now(),
        ],
        (err: any, row: any) => {
          if (err) reject(err);
        },
      );

      db.get(
        'SELECT * FROM transcripts WHERE clipId = ?',
        [transcript.clipId],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        },
      );
    });
  });
}
