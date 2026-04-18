# split_sponsor

> **For AI control agents** — This file describes the controllable interface of a Lottie animation
> prepared for CasparCG. Use it to understand **what data to send** from a control client.
> Do not use this file to modify the animation itself.
>
> **Text layers** — send the target text string using the layer's CSS class name.
> **Color fill layers** — send a hex color string (e.g. `#FF0000`) to change the fill color.
> **Opacity layers** — send a number from `0` (transparent) to `1` (fully opaque).
> **Image layers** — send a web-accessible path to swap the displayed image. Accepted formats:
> a full URL (`https://...`) or a relative path from the template's web root (`images/logo.png`).
> Local filesystem paths (e.g. `C:/...`) will not work — the path must be resolvable by the browser rendering the template.
> **Markers** — `play` and `stop` control playback; any other marker name can be triggered
> via `invoke` to drive timeline-based animations (e.g. animate-in, animate-out, transitions).

## Example payload

A control client sends a flat JSON object. Any subset of these keys is valid — omit what you don't need to change.

```json
{
  "caja1": " ",
  "caja2": " ",
  "titulo": "",
  "LOGOGP": "<https://... or relative/path/from/web-root>",
  "png": "<https://... or relative/path/from/web-root>",
  "Logo induveca 4": "<https://... or relative/path/from/web-root>",
  "MTI cargo express 4": "<https://... or relative/path/from/web-root>",
  "unimag 4": "<https://... or relative/path/from/web-root>",
  "jpg": "<https://... or relative/path/from/web-root>",
  "Bicired 4": "<https://... or relative/path/from/web-root>",
  "Punta cana GP 4": "<https://... or relative/path/from/web-root>",
  "LOGOZFX": "<https://... or relative/path/from/web-root>",
  "SPONSORS": "<https://... or relative/path/from/web-root>"
}
```

## Animation

| Property | Value |
|----------|-------|
| Size | 1920 × 1080 px |
| Frame rate | 29.9700012207031 fps |
| Frames | 0 – 452.000018410337 |
| Duration | 15.08 s |

## Text layers

| Class | nm | Default text |
|-------|----|-------------|
| `caja1` | `.caja1` |   |
| `caja2` | `.caja2` |   |
| `titulo` | `.titulo` |  |

## Image layers

| Class | nm | Ref ID |
|-------|----|--------|
| `LOGOGP` | `.LOGOGP` | `image_0` |
| `png` | `cibao-logo-blanco.png` | `image_1` |
| `Logo induveca 4` | `Logo induveca 4` | `image_2` |
| `MTI cargo express 4` | `MTI cargo express 4` | `image_3` |
| `unimag 4` | `unimag 4` | `image_4` |
| `jpg` | `logo-fedoci_550x206_494x185.jpg` | `image_5` |
| `Bicired 4` | `Bicired 4` | `image_6` |
| `Punta cana GP 4` | `Punta cana GP 4` | `image_7` |
| `LOGOZFX` | `.LOGOZFX` | `image_8` |
| `SPONSORS` | `.SPONSORS` | `image_9` |

## Markers

| Name | Start (tm) | Duration (dr) | Comment |
|------|-----------|--------------|---------|
| `play` | 0 | 150 | play |
| `stop` | 402.000018410337 | 50 | stop |
| `update` | 100 | 30 | name:update |
