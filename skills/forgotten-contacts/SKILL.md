---
name: forgotten-contacts
description: Surface iMessage contacts you've gone quiet on — last 90 days, last year, or only previously-engaged
version: 1.0.0
kind: workflow
required_tools: [io.github.anipotts/imessage-mcp.forgotten_contacts]
trigger_phrases:
  - forgotten contacts
  - who haven't I messaged
  - lost contacts
  - relationship debt
  - reconnect with
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: relationships
    requires_local: imessage
---
# forgotten-contacts

Pull from iMessage history to find contacts you've gone quiet on. Useful for relationship maintenance.

## Stopping Point 1 — Lookback window

1. **Last 90 days quiet (top 20)** — `inactive_days: 90`, `limit: 20`
2. **Past year quiet (top 30)** — `inactive_days: 365`, `limit: 30`
3. **Quick wins (engaged before, gone quiet)** — `inactive_days: 90`, `limit: 10`, `min_messages: 25` (high-engagement contacts only)

Format the response as a short list — name + last contact date. Suggest reconnect ideas only if the user asks.
