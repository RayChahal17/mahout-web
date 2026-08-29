# Mahout Website Asset Slots — Transparent Elements

Assets live in `web/public/images/elements/`. Source files were copied from the repo root with clean filenames.

## In use

| File | Section(s) | Source |
|------|------------|--------|
| `mountain.png` | Core story, Element deep dive (Mountain) | `mountain_actual_transparent_clean.png` |
| `elephant.png` | Core story, Element deep dive (Elephant) | `elephant_transparent_v2_clean.png` |
| `brain.png` | North Star Brain premium | `brain_actual_transparent_verified.png` |
| `system-loop.png` | Connected system loop | `astral_alignment_true_transparent.png` |
| `modes-orbit.png` | Conversation modes | `ChatGPT Image May 31, 2026, 10_26_01 AM.png` |
| `north-star-origin.png` | North Star origin, Element deep dive (North Star), Core story (North Star) | `ChatGPT Image May 31, 2026, 01_37_08 PM.png` |

## Still placeholder

| Slot | Suggested path |
|------|----------------|
| Path element | `path.png` |
| Mahout reflection | `mahout-reflection.png` |
| App screenshots | `web/public/images/screenshots/*` |
| Letter phone crops | See `mahout-asset-slots-rituals-modes-notifications.md` |

## Component helper

`web/src/components/PremiumTransparentImage.tsx` — soft glow, drop shadow, responsive sizing.

Path map: `web/src/lib/mahoutAssets.ts`.
