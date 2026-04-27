---
name: sessions-overview
description: List active OI MCP sessions — all servers or filtered by name
version: 1.0.0
kind: workflow
required_tools: [OI-session-manager.list_sessions, OI-session-manager.session_status]
trigger_phrases:
  - list sessions
  - active sessions
  - sessions overview
  - mcp sessions
  - what sessions are open
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: ops
---
# sessions-overview

Show what MCP sessions are currently active. Useful for debugging routing issues or seeing which servers have warm connections.

## Stopping Point 1 — Scope

1. **All sessions** — list every active session
2. **Filter by server** — pull `{{TOPIC}}` from the user's question and filter

After listing, group by server. If anything looks stuck (long idle), highlight it at the top.
