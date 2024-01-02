import 'dotenv/config';

export const config = {
  frigateUrl: process.env.FRIGATE_URL ?? 'http://localhost:5000',
  whisperUrl: process.env.WHISPER_URL ?? 'http://localhost:9000',
  mqttConnectionString: process.env.MQTT_CONNECTION ?? 'mqtt://localhost:1883',
  targetLanguage: process.env.TARGET_LANGUAGE ?? 'de', // Target language code which the project will use to translate to
  serverPort: Number(process.env.SERVER_PORT ?? 3000),
};
