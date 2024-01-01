import { z } from 'zod';

export const DetectedLanguage = z.object({
  detected_language: z.string(),
  language_code: z.string(),
});
export type DetectedLanguage = z.infer<typeof DetectedLanguage>;

export const Transcript = z.object({
  clipId: z.string(),
  detectedLanguage: DetectedLanguage,
  transcript: z.string(),
  translated: z.string().optional(),
});
export type Transcript = z.infer<typeof Transcript>;
