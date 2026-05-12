# tabla_pos_2

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
  "titulo_tabla": " ",
  "pos1": "1",
  "pais1": " ",
  "nombre1": "Sean QUINN",
  "team1": " ",
  "puntos1": "10 pts.",
  "pos2": "2",
  "pais2": " ",
  "nombre2": " ",
  "team2": " ",
  "puntos2": "8 pts.",
  "pos3": "3",
  "pais3": " ",
  "nombre3": " ",
  "team3": " ",
  "puntos3": "6 pts.",
  "pos4": "4",
  "pais4": " ",
  "nombre4": " ",
  "team4": " ",
  "puntos4": "4 pts.",
  "pos5": "5",
  "pais5": " ",
  "nombre5": " ",
  "team5": " ",
  "puntos5": "2 pts.",
  "logo": "<https://... or relative/path/from/web-root>"
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
| `titulo_tabla` | `.titulo_tabla` |   |
| `pos1` | `.pos1` | 1 |
| `pais1` | `.pais1` |   |
| `nombre1` | `.nombre1` | Sean QUINN |
| `team1` | `.team1` |   |
| `puntos1` | `.puntos1` | 10 pts. |
| `pos2` | `.pos2` | 2 |
| `pais2` | `.pais2` |   |
| `nombre2` | `.nombre2` |   |
| `team2` | `.team2` |   |
| `puntos2` | `.puntos2` | 8 pts. |
| `pos3` | `.pos3` | 3 |
| `pais3` | `.pais3` |   |
| `nombre3` | `.nombre3` |   |
| `team3` | `.team3` |   |
| `puntos3` | `.puntos3` | 6 pts. |
| `pos4` | `.pos4` | 4 |
| `pais4` | `.pais4` |   |
| `nombre4` | `.nombre4` |   |
| `team4` | `.team4` |   |
| `puntos4` | `.puntos4` | 4 pts. |
| `pos5` | `.pos5` | 5 |
| `pais5` | `.pais5` |   |
| `nombre5` | `.nombre5` |   |
| `team5` | `.team5` |   |
| `puntos5` | `.puntos5` | 2 pts. |

## Image layers

| Class | nm | Ref ID |
|-------|----|--------|
| `logo` | `.logo` | `image_0` |

## Markers

| Name | Start (tm) | Duration (dr) | Comment |
|------|-----------|--------------|---------|
| `play` | 0 | 150 | play |
| `stop` | 402.000018410337 | 50 | stop |
| `update` | 150 | 30 | update |
