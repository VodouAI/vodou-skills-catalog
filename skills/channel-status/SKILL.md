---
name: channel-status
description: Check the status of OI's connected messaging channels — all, messaging only, or voice only
version: 1.0.0
kind: workflow
required_tools: [OI-channels.channel_status]
trigger_phrases:
  - channel status
  - check channels
  - channels online
  - messaging status
  - voice status
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: ops
---
# channel-status

Check which OI messaging/voice channels are connected and ready.

## Stopping Point 1 — Scope

1. **All channels** — single status call returning every channel's state
2. **Messaging only** — Telegram, Slack, Discord, WhatsApp, iMessage, Teams, Google Chat, Signal
3. **Voice only** — voice channel status

For granularity, format the response as a one-line-per-channel summary: `<icon> <channel> — connected | disconnected | error`. Highlight any failures at the top.
