# full_dato

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
  "titulo": "TOUR OF THE ALPS",
  "date": "23.04.2026",
  "stage": "ARco > Trento (Stage 4)",
  "distancia": "167,8 km",
  "texto": "Lance Armstrong es una figura icónica del deporte mundial, conocido por su historia de supervivencia y por uno de los escándalos de dopaje. A día de hoy, Armstrong se mantiene activo en los medios digitales.",
  "sponsor": "<https://... or relative/path/from/web-root>",
  "logo": "<https://... or relative/path/from/web-root>"
}
```

## Animation

| Property | Value |
|----------|-------|
| Size | 1920 × 1080 px |
| Frame rate | 29.9700012207031 fps |
| Frames | 0 – 393.000016007218 |
| Duration | 13.11 s |

## Text layers

| Class | nm | Default text |
|-------|----|-------------|
| `titulo` | `.titulo` | TOUR OF THE ALPS |
| `date` | `.date` | 23.04.2026 |
| `stage` | `.stage` | ARco > Trento (Stage 4) |
| `distancia` | `.distancia` | 167,8 km |
| `texto` | `.texto` | Lance Armstrong es una figura icónica del deporte mundial, conocido por su historia de supervivencia y por uno de los escándalos de dopaje. A día de hoy, Armstrong se mantiene activo en los medios digitales. |

## Image layers

| Class | nm | Ref ID |
|-------|----|--------|
| `sponsor` | `.sponsor` | `image_0` |
| `logo` | `.logo` | `image_1` |

## Markers

| Name | Start (tm) | Duration (dr) | Comment |
|------|-----------|--------------|---------|
| `play` | 0 | 250 | play |
| `stop` | 343.000016007218 | 50 | stop |
| `update` | 250 | 30 | update |
