---
type: project
created: 2026-05-24
updated: 2026-05-24
---

# Wave Transitions & Color Blending Conventions

> Guidelines for organic wave transitions and pixel-perfect color blending between page modules.

## The Problem (Glitch & Inversion Sandwich)
Historically, SVGs with absolute height and curves would invert color flows:
- The SVG container background was set to the *bottom* section color (`toColor`).
- The path fill was set to the *top* section color (`fromColor`).
- Because paths closed at the bottom (`L1440,80 L0,80 Z`), the bottom of the divider got filled with the top color, and the top of the divider got filled with the bottom color.
- This created a **4-color sandwich** (Top Color → Bottom Color → Top Color → Bottom Color) and nasty rendering glitches where browsers ignored transparent overlays, turning them pitch black.

## The Rule (Seamless Double-Layer Wave)
To prevent glitches and create extremely premium, organic transitions:

1. **Seamless Background Matching:**
   - **Container Background** (`style.backgroundColor`) MUST ALWAYS match the **TOP section color** (`fromColor`). This ensures a seamless entry of the divider block.
   - **Main Path Fill** (`path.fill`) MUST ALWAYS match the **BOTTOM section color** (`toColor`). Since the path closes at the bottom, it perfectly and seamlessly exits into the bottom section.

2. **The "Sobretom" (Undertone / Shadow overlay):**
   - We use a **second, offset wave path** (`dShadow`) in the background.
   - The shadow path uses a **100% solid, custom transitional color** (`shadowColor`) to avoid browser opacity rendering glitches.
   - The `shadowColor` acts as a solid intermediary shadow or glow that crosses between the top and bottom colors, providing organic depth without 4-color overlapping.

## Color Mapping Reference
Use the following exact solid transitional hex codes when blending modules in `landing.tsx`:

| Transition | Top Color (`fromColor`) | Bottom Color (`toColor`) | Sobretom (`shadowColor`) | Tone Style |
|---|---|---|---|---|
| **Hero → Problem** | Royal Blue `#4c8ade` | White `#ffffff` | Medium Blue `#3b7bc7` | Dark transition band |
| **Problem → CeoVideo** | White `#ffffff` | Navy `#0b1f44` | Soft Grey `#e2e8f0` | Light transition band |
| **CeoVideo → Authority** | Navy `#0b1f44` | Dark `#021014` | Dark Navy `#061530` | Dark transition band |
| **Authority → Services** | Dark `#021014` | Royal Blue `#4c8ade` | Deep Navy `#0c264e` | Dark transition band |
| **Services → Curriculum** | Royal Blue `#4c8ade` | White `#f8fafc` | Medium Blue `#3b7bc7` | Dark transition band |
| **Curriculum → PresenceMap**| White `#f8fafc` | White `#ffffff` | Ultra-soft Grey `#f1f5f9` | Light transition band |
| **PresenceMap → FreeMaterial**| White `#ffffff` | Mint `#ecfdf8` | Ultra-soft Grey `#f1f5f9` | Light transition band |
| **FreeMaterial → VipGroup** | Mint `#ecfdf8` | Navy `#0b1f44` | Soft Mint `#ccfbf1` | Light transition band |
| **VipGroup → Consultor** | Navy `#0b1f44` | Deep Royal `#2a69ba` | Dark Navy `#061530` | Dark transition band |
| **Consultor → Footer** | Deep Royal `#2a69ba` | Navy `#0b1f44` | Deep Blue `#1b539c` | Dark transition band |
