---
name: Organic Play
colors:
  surface: '#fff8f6'
  surface-dim: '#e5d7d3'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ec'
  surface-container: '#f9ebe7'
  surface-container-high: '#f3e5e1'
  surface-container-highest: '#ede0db'
  on-surface: '#211a18'
  on-surface-variant: '#53433e'
  inverse-surface: '#362f2c'
  inverse-on-surface: '#fceee9'
  outline: '#86736d'
  outline-variant: '#d8c2ba'
  surface-tint: '#8d4d33'
  primary: '#461602'
  on-primary: '#ffffff'
  primary-container: '#622b14'
  on-primary-container: '#e19273'
  inverse-primary: '#ffb59a'
  secondary: '#885122'
  on-secondary: '#ffffff'
  secondary-container: '#fdb47c'
  on-secondary-container: '#784416'
  tertiary: '#655f3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#b5ac81'
  on-tertiary-container: '#46401e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb59a'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#71361e'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb780'
  on-secondary-fixed: '#2f1400'
  on-secondary-fixed-variant: '#6c3a0c'
  tertiary-fixed: '#ede3b4'
  tertiary-fixed-dim: '#d0c79a'
  on-tertiary-fixed: '#201c01'
  on-tertiary-fixed-variant: '#4d4725'
  background: '#fff8f6'
  on-background: '#211a18'
  surface-variant: '#ede0db'
typography:
  display-lg:
    fontFamily: Rubik
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Rubik
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
  headline-md:
    fontFamily: Rubik
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Rubik
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Rubik
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Rubik
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 16px
  card-gap: 24px
---

## Brand & Style
The design system is built to transform the often-tedious process of memorization into an engaging, tactile experience. The brand personality is "The Encouraging Tutor"—warm, slightly whimsical, and deeply approachable. It rejects corporate stiffness in favor of a soft, illustrated aesthetic that feels more like a physical toy or a well-loved notebook than a digital interface.

The visual style is a blend of **Tactile Softness** and **Modern Playfulness**. It utilizes ultra-rounded geometries, organic color palettes, and subtle depth to create an environment where users feel safe to fail and motivated to repeat. Every interaction should feel "squishy" and responsive, emphasizing a low-stress learning journey.

## Colors
The palette is rooted in earth tones, providing a grounded, organic feel that contrasts with the typical "neon-tech" look of AI tools. 

- **Primary Background**: The light cream (#E4D6A9) serves as the canvas, reducing eye strain during long study sessions.
- **Accents**: Dark Brown (#622B14) is used for high-contrast elements like primary text and heavy action buttons. Muted Olive (#978F66) provides a subtle secondary layer for decorative elements or deactivated states.
- **Semantic Feedback**: The status colors are saturated yet soft. They are used to indicate mastery levels: Strong (Green), Medium (Orange), and Weak (Red). These should always be paired with white or very dark brown text to maintain accessibility.

## Typography
The typography strategy prioritizes friendliness and legibility. 

**Rubik** is chosen for headings and labels due to its distinctive rounded corners, which harmonize with the UI's physical shapes. It should be used in heavier weights (600+) for a "chunky," authoritative but kind look.

**Plus Jakarta Sans** is used for body text. Its clean, geometric, yet soft letterforms ensure that flashcard content remains easy to read at various sizes while maintaining the system's modern-friendly spirit.

All headings should use slightly tighter letter-spacing to enhance the "cartoonish" density, while body text retains standard spacing for maximum readability during study.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous safe areas. The "Organic Play" feel is achieved through breathing room; elements are never cramped. 

- **Mobile**: A single-column layout with 20px side margins. Flashcards should occupy the full width of the container minus margins.
- **Desktop**: A 12-column grid with a maximum content width of 1200px. Flashcards are typically centered or arranged in a 3-column masonry grid for library views.
- **Spacing Rhythm**: All margins and paddings should be multiples of 8px. Use larger gaps (24px or 32px) between unrelated sections to emphasize the "blocky" nature of the design.

## Elevation & Depth
This design system avoids harsh, realistic shadows. Instead, it uses **Playful Ambient Shadows** and **Tonal Offsets**.

- **Shadows**: Use a "drop shadow" that is shifted primarily on the Y-axis (e.g., 0px 8px 0px) with a very low blur radius to mimic a "sticker" or "3D block" effect. Shadow colors should be a darkened version of the background or the element's own color, rather than pure black.
- **Depth**: Active states (like a button being pressed) should physically move "down" on the Y-axis and lose their shadow, simulating a mechanical press.
- **Layers**: Use a maximum of three depth layers:
  1. The Base (Cream Background)
  2. The Content Card (White or Light Tonal surface with shadow)
  3. The Interactive Overlay (Modals or Tooltips with heavier shadows)

## Shapes
The shape language is defined by **Pill-shaped (Level 3)** roundedness. Almost no corners in the UI should be sharp.

- **Standard Elements**: Buttons and Input fields use the full pill shape (rounded-full).
- **Cards & Containers**: Flashcards and large containers use `rounded-3xl` (approx 32px-48px) to maintain a soft, friendly silhouette even at large scales.
- **Interactive States**: Focus indicators should follow the same curvature as the element they surround, typically with a 4px offset to create a "halo" effect.

## Components
### Buttons
Buttons are large and chunky. The Primary button uses the Dark Brown (#622B14) background with White text. It features a bottom-heavy shadow (4px) that disappears when the button is "active" (pressed), creating a tactile clicking sensation.

### Flashcards
The centerpiece of the UI. Cards must have a `rounded-3xl` corner radius. They use a white background with a 2px solid border in Brown (#995F2F) or a soft, thick shadow. The transition between "front" and "back" should be a 3D flip animation to reinforce the physical metaphor.

### Progress Indicators
Avoid thin, clinical progress bars. Instead, use "Bubble Bars"—thick, pill-shaped tracks with a brightly colored (Strong Green) inner fill that has rounded ends. Add a subtle shine or "bubble" highlight to the fill for a toy-like finish.

### Input Fields
Inputs are pill-shaped with a thick 2px border in Muted Olive beige. When focused, the border changes to Brown and the entire field gains a soft glow in the primary accent color.

### Chips/Tags
Used for categories or difficulty. These are small pill-shaped elements with a light tint of the category color and a darker version for the text. They should have a slight "bounce" hover effect.