---
name: brainstorm
description: Brainstorm ideas on a topic via OI-LLM-router — brief, standard, or wild
version: 1.0.0
kind: workflow
required_tools: [OI-LLM-router.chat]
trigger_phrases:
  - brainstorm
  - give me ideas
  - ideate
  - think of ideas
  - help me come up with
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: reasoning
---
# brainstorm

Ideation helper. The user's topic is templated as `{{TOPIC}}`.

## Stopping Point 1 — Mode

1. **Brief (3 ideas)** — concise, conventional, ready-to-use
2. **Standard (5 ideas)** — mix of safe + slightly unusual
3. **Wild (10 ideas)** — push hard for unconventional, surprising, or contrarian angles

After the response comes back, return it as a numbered list. Don't add commentary unless the user asks for a follow-up.
