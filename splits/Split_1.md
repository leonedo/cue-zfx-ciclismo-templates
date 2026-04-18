# Split_1

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
  "titulo": " ",
  "logo": "<https://... or relative/path/from/web-root>",
  "sponsors": "<https://... or relative/path/from/web-root>"
}
```

## Animation

| Property | Value |
|----------|-------|
| Size | 1920 × 1080 px |
| Frame rate | 29.9700012207031 fps |
| Frames | -10 – 452.000018410337 |
| Duration | 15.42 s |

## Text layers

| Class | nm | Default text |
|-------|----|-------------|
| `caja1` | `.caja1` |   |
| `caja2` | `.caja2` |   |
| `titulo` | `.titulo` |   |

## Image layers

| Class | nm | Ref ID |
|-------|----|--------|
| `logo` | `.logo` | `image_0` |
| `logo` | `.logo` | `image_1` |
| `sponsors` | `.sponsors` | `image_2` |

## Markers

| Name | Start (tm) | Duration (dr) | Comment |
|------|-----------|--------------|---------|
| `play` | -10 | 150 | play |
| `stop` | 402.000018410337 | 50 | stop |
