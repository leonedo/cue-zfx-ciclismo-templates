# Split_2
**For AI control agents** — This file describes the controllable interface of a Lottie animation
prepared for CasparCG. Use it to understand **what data to send** from a control client.
Do not use this file to modify the animation itself.
**Text layers** — send the target text string using the layer\'s CSS class name.
**Color fill layers** — send a hex color string (e.g. `#FF0000`) to change the fill color.
**Opacity layers** — send a number from `0` (transparent) to `1` (fully opaque).
**Image layers** — send a URL or asset reference to swap the displayed image.
**Markers** — `play` and `stop` control playback; any other marker name can be triggered
via `invoke` to drive timeline-based animations (e.g. animate-in, animate-out, transitions).
The path for the animation is the same as for this file with the same name. both JSON and the html that you need to call from the control

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
| `pos1` | `.pos1` | 1 |
| `nombre1` | `.nombre1` |   |
| `dato1` | `.dato1` |   |
| `pos2` | `.pos2` | 2 |
| `nombre2` | `.nombre2` |   |
| `dato2` | `.dato2` |   |
| `pos3` | `.pos3` | 3 |
| `nombre3` | `.nombre3` |   |
| `dato3` | `.dato3` |   |
| `pos4` | `.pos4` | 4 |
| `nombre4` | `.nombre4` |   |
| `dato4` | `.dato4` |   |
| `pos5` | `.pos5` | 5 |
| `nombre5` | `.nombre5` |   |
| `dato5` | `.dato5` |   |
| `pos6` | `.pos6` | 6 |
| `nombre6` | `.nombre6` |   |
| `dato6` | `.dato6` |   |
| `pos7` | `.pos7` | 7 |
| `nombre7` | `.nombre7` |   |
| `dato7` | `.dato7` |   |

## Markers

| Name | Start (tm) | Duration (dr) | Comment |
|------|-----------|--------------|---------|
| `play` | -2 | 50 | play |
| `stop` | 500 | 50 | stop |
| `update` | 100 | 30 | update |
