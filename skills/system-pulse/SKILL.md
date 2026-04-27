---
name: system-pulse
description: Quick system diagnostics — CPU, memory, disk, network, top processes via mcp-monitor
version: 1.0.0
kind: workflow
required_tools: [mcp-monitor.get_cpu_info, mcp-monitor.get_memory_info, mcp-monitor.get_disk_info, mcp-monitor.get_network_info, mcp-monitor.get_process_info]
trigger_phrases:
  - system pulse
  - system status
  - how is my system
  - cpu and memory
  - quick system check
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: devops
---
# system-pulse

Live system diagnostics — CPU / memory / disk / network / top processes.

## Stopping Point 1 — Choose Scope

1. **Full** — CPU, memory, disk, network, top 10 processes by CPU
2. **Performance** — CPU + memory only
3. **Storage** — disk only

After picking, the engine runs the matching `mcp-monitor` calls and returns the raw output. Format the response as a tight summary: highest pressure resource first, then the rest.

## Notes

- All calls are local and fast (<200ms each).
- Process list sorted by CPU; pass `sort_by: "memory"` if you want a memory-focused view (modify args at call time, not in this skill).
