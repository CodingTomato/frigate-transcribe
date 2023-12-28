import { translate } from '@vitalets/google-translate-api';

export async function translateText(str: string, from: string, to: string) {
  const { text } = await translate(str, {
    from,
    to,
  });

  return text;
}
