---
name: voice-say
description: Speak text out loud — quick say, list voices, or stop current playback
version: 1.0.0
kind: workflow
required_tools: [OI-channels.voice_speak, OI-channels.voice_list_voices, OI-channels.voice_stop]
trigger_phrases:
  - say out loud
  - speak this
  - voice say
  - read aloud
  - tts this
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: media
---
# voice-say

Use the OI voice channel to speak the user's text. The text to speak is templated as `{{TOPIC}}`.

## Stopping Point 1 — What to do?

1. **Speak it** — `voice_speak` with the user's text
2. **List voices** — show available voices, then ask which to use next time
3. **Stop talking** — `voice_stop` cancels current playback

After speaking, return a short confirmation. If the channel isn't connected, point the user to `channel-status`.
