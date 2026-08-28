---
name: Emerald Aether
colors:
  surface: '#001711'
  surface-dim: '#001711'
  surface-bright: '#194035'
  surface-container-lowest: '#00110c'
  surface-container-low: '#002018'
  surface-container: '#00251c'
  surface-container-high: '#073026'
  surface-container-highest: '#143b30'
  on-surface: '#c2ebdc'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#c2ebdc'
  inverse-on-surface: '#0f372c'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#45dfa4'
  on-secondary: '#003825'
  secondary-container: '#00bd85'
  on-secondary-container: '#00452e'
  tertiary: '#f9bd22'
  on-tertiary: '#402d00'
  tertiary-container: '#ce9a00'
  on-tertiary-container: '#4a3500'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#68fcbf'
  secondary-fixed-dim: '#45dfa4'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#001711'
  on-background: '#c2ebdc'
  surface-variant: '#143b30'
  deep-forest: '#064e3b'
  ink-void: '#022c22'
  seafoam-bright: '#a7f3d0'
  gold-leaf: '#d97706'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter-desktop: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The design system evolves into an organic-digital hybrid, merging high-end technical precision with fluid, atmospheric textures. The brand personality is "Elemental Premium"—sophisticated, mysterious, and deeply immersive. 

The visual style is a sophisticated blend of **Glassmorphism** and **Minimalism**, heavily influenced by the "alcohol ink" aesthetic. It moves away from rigid geometric gradients towards organic, translucent flows. The interface should feel like light passing through emerald-tinted water or deep forest canopies. Backgrounds are not just flat voids but involve layered, blurry ink textures that provide a sense of movement and natural complexity behind clean, high-contrast functional elements.

## Colors

The palette shifts from digital violets to deep, botanical teals and vibrant emeralds.

- **Primary & Secondary:** Emerald Green (#10B981) and Seafoam (#34d399) drive the interactive logic. These are used for primary actions and to define the "flow" of the ink textures.
- **Neutral:** The foundation is built on "Ink Void" (#022c22), a deep, dark green-black that acts as the canvas. Surface tiers are derived from "Deep Forest" (#064e3b) to maintain a chromatic depth that avoids neutral grays.
- **Accents:** A "Gold Leaf" (#d97706) accent is used sparingly to mimic the metallic flecks found in premium alcohol ink art, reserved for high-level highlights or exclusive CTAs.

## Typography

The typographic strategy remains high-contrast and razor-sharp to balance the fluid, organic background textures.

- **Sora** is used for display and headings. Its geometric nature provides a necessary structural anchor against the "ink" visual style.
- **Hanken Grotesk** handles the body copy, providing a clean, humanist feel that ensures readability against dark, textured backgrounds.
- **JetBrains Mono** is utilized for metadata and technical labels, reinforcing the sense of precision and "agency" craft.

Headlines should utilize tight tracking and "Ink Void" shadows when appearing over vibrant textures to ensure maximum legibility.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with an emphasis on "Negative Space as Flow." 

- **Grid Architecture:** A 12-column system for desktop and 4-column for mobile.
- **Spatial Rhythm:** Based on an 8px unit. Components use tight internal padding (16px–24px) but are placed within expansive sections (80px+ vertical padding) to simulate elements floating in a fluid medium.
- **Adaptation:** On mobile, margins reduce to 20px, and large display type scales down aggressively to maintain the premium, "un-crowded" feel.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Organic Layering** rather than standard shadows.

- **Layer 0 (Canvas):** Ink Void (#022c22) with a background image of blurred emerald ink flows.
- **Layer 1 (Surfaces):** Deep Forest (#064e3b) at 40-60% opacity with a `backdrop-filter: blur(20px)`. This creates the "glass" effect where the background ink is still visible but diffused.
- **Borders:** Surfaces use a 0.5px "Light Leak" border—a top-left gradient border transitioning from Emerald to transparent—to simulate the edge of a glass pane catching light.
- **Luminosity:** High-priority elements use a soft, localized emerald glow (`box-shadow: 0 0 30px rgba(16, 185, 129, 0.2)`).

## Shapes

The shape language reflects "Controlled Fluidity." We move away from strict circles to "Rounded" geometries that feel more natural.

- **Base Radius:** 0.5rem (8px) for inputs and smaller components.
- **Container Radius:** 1rem (16px) for cards and modals.
- **Organic Elements:** Background decorative elements should use irregular, "blob" CSS shapes or SVG masks to mimic the expansion of alcohol ink on paper.

## Components

- **Primary Buttons:** Solid Emerald (#10B981) background with a 1px Seafoam inner stroke. Text is Ink Void for maximum contrast. On hover, the button should "bloom"—a subtle increase in size (1.03x) and a dramatic increase in the emerald outer glow.
- **Cards:** Glassmorphic surfaces using Deep Forest at 40% opacity. Borders are 0.5px Seafoam at 20% opacity. 
- **Input Fields:** Semi-transparent Ink Void backgrounds with a bottom-only border in Emerald. On focus, the bottom border glows and a faint Seafoam tint fills the container.
- **Chips & Tags:** Use JetBrains Mono in all-caps. Backgrounds are low-opacity Emerald (10%) with a solid Emerald left-hand accent bar (2px width).
- **Ink Texture Overlays:** A global component that applies a subtle, animated "smoke" or "ink" SVG turbulence filter to decorative containers to provide the organic feel requested.
- **Checkboxes/Radios:** When active, these should display a "liquid fill" animation where the color expands from the center like a drop of ink hitting water.