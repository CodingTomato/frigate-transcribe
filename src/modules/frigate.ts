import { config } from '../config';

export async function downloadClipFromFrigate(clipId: string) {
  const clipRaw = await fetch(
    `${config.frigateUrl}/api/events/${clipId}/clip.mp4`,
  );
  const clip = await clipRaw.blob();
  return clip;
}

export async function setSubLabel(clipId: string, subLabel: string) {
  await fetch(`${config.frigateUrl}/api/events/${clipId}/sub_label`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ subLabel }),
  });
}
