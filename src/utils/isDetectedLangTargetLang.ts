import { config } from '../config';
import { DetectedLanguage } from '../types/Transcript';

export function isDetectedLangTargetLang(lang: DetectedLanguage) {
  return lang.language_code !== config.targetLanguage;
}
