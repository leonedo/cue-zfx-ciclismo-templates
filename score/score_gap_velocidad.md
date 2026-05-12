# score_gap_velocidad

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
  "titulo": "Trenzo > Bozen / Bolzano (Stage 5)",
  "label_tiempo_de_carrera": "TIEMPO  DE CARRERA",
  "tiempo": "4:25:21",
  "label_gap": "GAP",
  "gap": "+0:09",
  "label_velocidad": "VELOCIDAD PROMEDIO",
  "velocidad": "38.9 km/h"
}
```

## Animation

| Property | Value |
|----------|-------|
| Size | 1920 × 1080 px |
| Frame rate | 29.9700012207031 fps |
| Frames | 0 – 687.000027982084 |
| Duration | 22.92 s |

## Text layers

| Class | nm | Default text |
|-------|----|-------------|
| `titulo` | `.titulo` | Trenzo > Bozen / Bolzano (Stage 5) |
| `label_tiempo_de_carrera` | `.label_tiempo_de_carrera` | TIEMPO  DE CARRERA |
| `tiempo` | `.tiempo` | 4:25:21 |
| `label_gap` | `.label_gap` | GAP |
| `gap` | `.gap` | +0:09 |
| `label_velocidad` | `.label_velocidad` | VELOCIDAD PROMEDIO |
| `velocidad` | `.velocidad` | 38.9 km/h |

## Markers

| Name | Start (tm) | Duration (dr) | Comment |
|------|-----------|--------------|---------|
| `play` | 0 | 100 | play |
| `stop` | 650 | 50 | stop |
| `update1` | 140 | 10 | update1 |
| `stage1` | 160 | 100 | stage1 |
| `update2` | 200 | 30 | update2 |
| `stop2` | 400 | 300 | stop2 |
| `stage2` | 400 | 100 | stage2 |
