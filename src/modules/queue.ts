import * as fastq from 'fastq';
import type { queueAsPromised } from 'fastq';
import { transcribeClipId } from '../utils/transcribeClipId';
import { persistTranscript } from '../utils/persistTranscript';

type Task = {
  clipId: string;
};

export const q: queueAsPromised<Task> = fastq.promise(asyncWorker, 1);

async function asyncWorker({ clipId }: Task) {
  console.log(`🚂 Start working on ${clipId}`);
  const transcript = await transcribeClipId(clipId);
  await persistTranscript(transcript);
  console.log(`🚂 Finished working on ${clipId}`);
}

// export function pushClipId(clipId: string): void {
//   console.log(`🚂 Adding ${clipId} to queue`);
//   q.push({ clipId }).catch((err) => console.error(err));
// }
