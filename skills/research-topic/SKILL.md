---
name: research-topic
description: Look up library docs via context7 — quick lookup, full docs, or code examples
version: 1.0.0
kind: workflow
required_tools: [OI-context7.resolve-library-id, OI-context7.query-docs]
trigger_phrases:
  - research library
  - look up docs
  - find documentation
  - context7 docs
  - api docs for
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: reference
---
# research-topic

Resolve a library/framework name to its canonical id, then pull docs at the requested depth. The user's library/topic is templated as `{{TOPIC}}`.

## Stopping Point 1 — Depth

1. **Quick lookup** — just resolve the library id (good for "is X documented?")
2. **Full docs** — resolve + general docs query
3. **Code examples** — resolve + targeted examples query
4. **API reference** — resolve + complete API surface query

The first step in 2/3/4 captures `LIBRARY_ID` from `resolve-library-id` and feeds it into `query-docs`.
