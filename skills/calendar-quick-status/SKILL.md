---
name: calendar-quick-status
description: Show what's on the user's Google Calendar — next events, today, or by keyword
version: 1.0.0
kind: subagent
required_tools: [google-calendar.list-events, google-calendar.get-current-time, google-calendar.search-events]
trigger_phrases:
  - what's on my calendar
  - calendar today
  - today's events
  - upcoming events
  - my schedule today
  - next meeting
imported_from: {source: catalog}
metadata:
  vodou:
    category: productivity
    requires_auth: google-calendar
---
# calendar-quick-status

Quickly answer "what's on my calendar?" and similar questions using the user's connected Google Calendar.

## Core flow

1. **Determine the time window from the user's question.**
   - "today", "today's events" → use `get-current-time` to anchor, then list events for the rest of today
   - "this week", "next 7 days" → list events from now through 7 days
   - "next meeting", "what's next" → list events from now, `maxResults: 1`
   - keyword query (e.g. "find dentist appointment") → use `search-events` with `q: <keyword>`
   - default if ambiguous → list next 10 events from now

2. **Call the appropriate tool.**
   ```
   brain-trust4 call google-calendar list-events '{"calendarId":"primary","timeMin":"<ISO>","maxResults":10,"singleEvents":true,"orderBy":"startTime"}'
   ```
   Always pass `calendarId: "primary"` unless the user names a specific calendar.

3. **Format the response as a tight bullet list:**
   - `• <start time> — <event title> (<duration> or "all day")`
   - Use the user's timezone (from `get-current-time` response)
   - Group by day if the window spans multiple days
   - If empty: "Nothing scheduled in <window>."

## Edge cases

- **Auth missing / 401:** Tell the user to connect Google Calendar at http://localhost:8765/#/apps and stop.
- **Multiple accounts:** If `manage-accounts` shows >1 connected, list events from all by omitting `account`. Mention which account each event is from in the formatted output.
- **All-day events:** Show as "all day" instead of a time range.
- **Recurring events:** `singleEvents: true` already expands them — just format normally.

## Out of scope

- Creating, updating, or deleting events — point the user to a separate skill.
- Free/busy queries across multiple participants — use `get-freebusy` directly via OI.

## Example

User: "what's on my calendar today?"

Steps the agent runs:
1. `get-current-time` → captures today's date + timezone
2. `list-events` with `timeMin: <today_start>`, `maxResults: 20`, `calendarId: "primary"`
3. Format bullets, omit anything past midnight tonight.
