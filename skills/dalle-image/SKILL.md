---
name: dalle-image
description: Generate images via DALL-E — quick standard, HD, or multiple variations
version: 1.0.0
kind: workflow
required_tools: [OI-dalle.generate_image, OI-dalle.create_variation]
trigger_phrases:
  - generate image
  - create image
  - draw a picture
  - make an image
  - dalle image
  - image of
stopping_points: required
actions: actions.json
imported_from: {source: catalog}
metadata:
  vodou:
    category: media
---
# dalle-image

Generate an image using DALL-E. The user's prompt is templated as `{{TOPIC}}`.

## Stopping Point 1 — Quality

1. **Quick** — DALL-E 3, standard quality (fast, cheap)
2. **HD** — DALL-E 3, hd quality (slower, finer details)
3. **Variations (4)** — DALL-E 2 with `n: 4` for a quick concept sweep

After generation, the response includes the saved file path. Show it to the user.
