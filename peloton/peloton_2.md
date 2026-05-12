# peloton_2

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
  "titulo": " ",
  "dorsal1": " ",
  "nombre1": " ",
  "dato1": " ",
  "dorsal2": " ",
  "nombre2": " ",
  "dato2": " ",
  "dorsal3": " ",
  "nombre3": " ",
  "dato3": " ",
  "dorsal4": " ",
  "nombre4": " ",
  "dato4": " ",
  "dorsal5": " ",
  "nombre5": " ",
  "dato5": " ",
  "dorsal6": " ",
  "nombre6": " ",
  "dato6": " ",
  "logo": "<https://... or relative/path/from/web-root>"
}
```

## Animation

| Property | Value |
|----------|-------|
| Size | 1920 × 1080 px |
| Frame rate | 29.9700012207031 fps |
| Frames | 0 – 374.000015233332 |
| Duration | 12.48 s |

## Text layers

| Class | nm | Default text |
|-------|----|-------------|
| `titulo` | `.titulo` |   |
| `dorsal1` | `.dorsal1` |   |
| `nombre1` | `.nombre1` |   |
| `dato1` | `.dato1` |   |
| `dorsal2` | `.dorsal2` |   |
| `nombre2` | `.nombre2` |   |
| `dato2` | `.dato2` |   |
| `dorsal3` | `.dorsal3` |   |
| `nombre3` | `.nombre3` |   |
| `dato3` | `.dato3` |   |
| `dorsal4` | `.dorsal4` |   |
| `nombre4` | `.nombre4` |   |
| `dato4` | `.dato4` |   |
| `dorsal5` | `.dorsal5` |   |
| `nombre5` | `.nombre5` |   |
| `dato5` | `.dato5` |   |
| `dorsal6` | `.dorsal6` |   |
| `nombre6` | `.nombre6` |   |
| `dato6` | `.dato6` |   |

## Image layers

| Class | nm | Ref ID |
|-------|----|--------|
| `logo` | `.logo` | `image_0` |

## Markers

| Name | Start (tm) | Duration (dr) | Comment |
|------|-----------|--------------|---------|
| `play` | 0 | 80 | play |
| `stop` | 324.000015233332 | 50 | stop |
