# frigate-transcribe

This tool aims to offer a nice UI to easily transcribe "speech" (or any other type of event) events from [Frigate](https://frigate.video/) with [OpenAI Whisper](https://openai.com/research/whisper). This is developed on bases of the Frigate 13.0 Beta, but should as of now work with 12.x aswell.

## Prerequisits

- Running instance of Whisper [(Guide)](https://ahmetoner.com/whisper-asr-webservice/)
- Frigate connected to a MQTT Broker

## Config

To change any configs you currently have to edit the `indext.ts` in the config directory. (`src/config`)

## Running dev environment

```
npm install
npm run dev
```

```
open http://localhost:3000
```

## Troubleshooting

**MQTT Connection**: Use an environment variable to turn on debugging for MQTT module (e.g.: `$env:DEBUG='mqttjs*'` for Powershell)
