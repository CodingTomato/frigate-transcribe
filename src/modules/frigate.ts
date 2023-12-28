const frigateUrl = 'http://192.168.178.140:5000';

export async function downloadClipFromFrigate(clipId: string) {
  const clipRaw = await fetch(`${frigateUrl}/api/events/${clipId}/clip.mp4`);
  const clip = await clipRaw.blob();
  return clip;
}

export async function setSubLabel(clipId: string, subLabel: string) {
  const res = await fetch(`${frigateUrl}/api/events/${clipId}/sub_label`, {
    method: 'POST',
    body: JSON.stringify({ subLabel }),
  });

  console.log(res);
}
