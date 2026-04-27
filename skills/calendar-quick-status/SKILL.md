---
name: calendar-quick-status
description: Show what's on the user's Google Calendar — today, this week, next meeting, or search by keyword
version: 1.0.0
kind: workflow
required_tools: [google-calendar.list-events, google-calendar.get-current-time, google-calendar.search-events]
trigger_phrases:
  - what's on my calendar
  - calendar today
  - today's events
  - upcoming events
  - my schedule today
  - next meeting
  - calendar quick
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: productivity
    requires_auth: google-calendar
---
# calendar-quick-status

Quick read on the user's Google Calendar. Always uses the `primary` calendar unless the user names another.

## Stopping Point 1 — What do you want to see?

1. **Today** — `get-current-time` then `list-events` from now, capped at the rest of today
2. **This week** — `list-events` for the next ~7 days
3. **Next meeting only** — `list-events` with `maxResults: 1` from now
4. **Search by keyword** — `search-events` with the keyword pulled from the user's question (`{{TOPIC}}`)

## Output formatting

Format every option's response as a tight bullet list:

- `• <start time> — <event title> (<duration> or "all day")`
- Use the user's timezone from the `get-current-time` response
- Group by day if the window spans multiple days
- If the result is empty: "Nothing scheduled in <window>."

## Edge cases

- **Auth missing / 401:** Tell the user to connect Google Calendar at http://localhost:8765/#/apps and stop.
- **All-day events:** Show as "all day" instead of a time range.
- **Recurring events:** `singleEvents: true` already expands them — format normally.
