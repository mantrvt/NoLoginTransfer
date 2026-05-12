# Design System Inspired by Kracked Devs

## 1. Visual Theme & Atmosphere

Kracked Devs embodies a **cyberpunk hacker aesthetic** merged with energetic community vibrancy. The design system features neon-bright accent colors piercing through a deep, dark interface, creating maximum contrast and visual intensity. This tech-forward personality is reinforced through geometric patterns, sharp edges, and a monospace typography foundation that echoes retro computing and modern developer culture. The overall mood is bold, rebellious, and forward-thinking—perfect for aspiring developers building the future.

**Key Characteristics**

- **Neon Luminosity**: Bright electric greens (`#22C55E`, `#00FF5E`) against near-black backgrounds
- **Sharp Geometry**: Zero border radius, flat surfaces, no rounded softness
- **Monospace Foundation**: Pixel-perfect, code-like typography for authenticity
- **High Contrast**: Extreme dark/light separation for accessibility and visual punch
- **Minimal Elevation**: Flat design with subtle glows instead of shadows
- **Grid Overlay**: Visible geometric grid backgrounds reinforce tech aesthetic
- **Layered Transparency**: Semi-transparent card surfaces create depth without depth shadows

## 2. Color Palette & Roles

### Primary
- **Neon Green Primary** (`#22C55E`): Core brand accent, CTAs, success states, primary interactive elements
- **Electric Green Highlight** (`#00FF5E`): Ultra-bright accent for emphasis, glows, hero text
- **Forest Green Base** (`#06923E`): Secondary brand color, muted accents, borders

### Accent Colors
- **Muted Sage** (`#6F8477`): Tertiary accent, secondary UI elements, reduced-emphasis areas
- **Soft Mint** (`#A3FFC6`): Light accent for subtle highlights, disabled states
- **Deep Forest** (`#0F3A20`): Dark accent tone, overlay text, contrast layer
- **Medium Sage** (`#8FB89E`): Mid-tone accent for hover states, secondary borders

### Interactive
- **Success Green** (`#22C55E`): Default interactive state, link hover, button focus
- **Bright Success** (`#00FF5E`): Active/pressed state, glowing emphasis
- **Darker Success** (`#0DA344`): Disabled interactive state
- **Warning Gold** (`#FFD700`): Alert and warning messaging

### Neutral Scale
- **White** (`#FFFFFF`): Primary text, backgrounds, maximum contrast
- **Off-White** (`#E2E8F0`): Light borders, subtle dividers
- **Dark Gray** (`#737373`): Secondary text, muted content
- **Medium Gray** (`#404040`): Tertiary text, helper text
- **Charcoal** (`#131413`): Dark UI surfaces, alternative backgrounds

### Surface & Borders
- **Deep Black** (`#000000`): Page background, maximum contrast surfaces
- **Near-Black Card** (`#1B221B`): Semi-transparent card backgrounds
- **Very Dark** (`#171917`): Border color, subtle separators
- **Darkest** (`#1A1C1A`): Shadow overlay, highest contrast text container

## 3. Typography Rules

### Font Family
**Primary Display**: GeistPixelSquare, fallback to ui-monospace, monospace
**Semantic/Headings**: GeistPixelSquare
**Body & UI**: GeistMono, monospace
**Code/Links**: monospace, ui-monospace

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / Hero | GeistPixelSquare | 40.5px | 400 | 45px | Normal | Large hero text, page title emphasis |
| Heading 2 | GeistPixelSquare | 40.5px | 400 | 45px | Normal | Section headings, major content divisions |
| Heading 3 | GeistPixelSquare | 24px | 400 | 24px | Normal | Card titles, subsection heads |
| Body / Paragraph | GeistMono | 14px | 400 | 19.25px | Normal | Primary content, body text |
| Link / Navigation | monospace | 14.625px | 400 | 21.9375px | Normal | Navigation links, inline links |
| Button / CTA | monospace | 13.5px | 900 | 18px | Normal | Call-to-action text, button labels |
| Caption / Label | ui-monospace | 13px | 700 | 19.5px | Normal | Form labels, helper text, badges |
| Code / Metadata | monospace | 14px | 400 | 21px | Normal | Inline code, timestamps, metadata |

### Principles
- **Monospace Dominance**: All text uses monospace variants to reinforce developer/hacker aesthetic
- **Weight Contrast**: Heavy weights (`700`, `900`) reserved for CTAs and emphasis; body stays at `400`
- **Pixel Perfectionism**: All sizes are precise px values—no rems or relative units
- **Line Height Generosity**: Extra line height in monospace fonts ensures readability despite technical appearance
- **No Italics**: Strict upright presentation maintains geometric consistency

## 4. Component Stylings

### Buttons

#### Primary CTA Button
- **Background**: `rgba(0, 0, 0, 0)` (transparent)
- **Text Color**: `#FFFFFF`
- **Font**: monospace, `13.5px`, weight `900`
- **Padding**: `0px 13.5px` (vertical `0px` for inline feel)
- **Height**: `36px`
- **Border**: `0px solid #22C55E`
- **Border Radius**: `0px`
- **Box Shadow**: `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px`
- **Hover State**: Background becomes `rgba(34, 197, 94, 0.1)`, text `#00FF5E`
- **Active State**: Background `rgba(34, 197, 94, 0.2)`, text `#00FF5E`, shadow `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px`
- **Disabled State**: Text `#6F8477`, opacity `0.5`

#### Secondary Ghost Button
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#FFFFFF`
- **Font**: monospace, `14.625px`, weight `400`
- **Padding**: `0px 13.5px`
- **Height**: `36px`
- **Border**: `1px solid #22C55E`
- **Border Radius**: `0px`
- **Box Shadow**: none
- **Hover State**: Background `rgba(34, 197, 94, 0.05)`, border `#00FF5E`
- **Active State**: Background `rgba(34, 197, 94, 0.15)`, border `#00FF5E`

#### Compact Icon Button
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#E2E8F0`
- **Font**: ui-monospace, `13px`, weight `700`
- **Padding**: `0px`
- **Width**: `36px`
- **Height**: `36px`
- **Border**: `0px`
- **Border Radius**: `0px`
- **Display**: Flex, center-aligned
- **Hover State**: Color `#22C55E`, background `rgba(34, 197, 94, 0.1)`

### Cards & Containers

#### Primary Card
- **Background**: `color(srgb 0.109804 0.129412 0.109804 / 0.7)` (semi-transparent dark)
- **Text Color**: `#FFFFFF`
- **Font**: GeistMono, `18px`, weight `400`
- **Padding**: `22.5px`
- **Border**: `1px solid #22C55E`
- **Border Radius**: `0px`
- **Box Shadow**: `rgba(34, 197, 94, 0.05) 0px 0px 15px 0px`
- **Line Height**: `27px`
- **Min Height**: `257px`
- **Hover State**: Box shadow intensifies to `rgba(34, 197, 94, 0.1) 0px 0px 25px 0px`, border glows `#00FF5E`

#### Dark Panel
- **Background**: `#131413`
- **Text Color**: `#FFFFFF`
- **Border**: `1px solid #171917`
- **Padding**: `24px`
- **Border Radius**: `0px`
- **Box Shadow**: none

#### Translucent Overlay
- **Background**: `rgba(0, 0, 0, 0.7)`
- **Backdrop Filter**: `blur(4px)`
- **Border**: `1px solid rgba(34, 197, 94, 0.3)`

### Inputs & Forms

#### Text Input
- **Background**: `rgba(0, 0, 0, 0)`
- **Text Color**: `#A3FFC6`
- **Placeholder Color**: `rgba(163, 255, 198, 0.5)`
- **Font**: GeistMono, `14px`, weight `400`
- **Padding**: `0px 18px`
- **Height**: `40px`
- **Border**: `1px solid rgba(34, 197, 94, 0.5)`
- **Border Radius**: `0px`
- **Focus State**: Border color `#22C55E`, box shadow `rgba(34, 197, 94, 0.2) 0px 0px 8px 0px`
- **Error State**: Border `1px solid #FFD700`

#### Form Label
- **Font**: ui-monospace, `13px`, weight `700`
- **Color**: `#E2E8F0`
- **Margin Bottom**: `8px`
- **Text Transform**: None (preserve case)

### Navigation

#### Header Navigation
- **Background**: `rgba(0, 0, 0, 0)`
- **Height**: `56px`
- **Display**: Flex, center vertically
- **Padding**: `0px 24px`
- **Border Bottom**: `1px solid rgba(34, 197, 94, 0.1)`

#### Navigation Link
- **Color**: `#FFFFFF`
- **Font**: monospace, `14.625px`, weight `400`
- **Padding**: `9px 13.5px`
- **Height**: `37.5px`
- **Background**: `rgba(0, 0, 0, 0)`
- **Hover State**: Background `oklab(0.722741 -0.165537 0.0972287 / 0.05)`, color `#22C55E`
- **Active State**: Color `#00FF5E`, background `rgba(34, 197, 94, 0.1)`, border bottom `2px solid #00FF5E`

#### Dropdown Menu
- **Background**: `#1B221B`
- **Border**: `1px solid #22C55E`
- **Box Shadow**: `rgba(0, 0, 0, 0.3) 0px 10px 25px 0px`
- **Min Width**: `200px`

### Badges & Tags

#### Success Badge
- **Background**: `rgba(34, 197, 94, 0.1)`
- **Text Color**: `#22C55E`
- **Border**: `1px solid #22C55E`
- **Padding**: `4px 12px`
- **Border Radius**: `0px`
- **Font**: ui-monospace, `12px`, weight `700`

#### Warning Badge
- **Background**: `rgba(255, 215, 0, 0.1)`
- **Text Color**: `#FFD700`
- **Border**: `1px solid #FFD700`
- **Padding**: `4px 12px`
- **Border Radius**: `0px`

## 5. Layout Principles

### Spacing System

**Base Unit**: `4px`

**Spacing Scale**:
- `4px`: Micro gaps, icon spacing
- `8px`: Tight component spacing, small margins
- `12px`: Component internal gaps
- `16px`: Default padding, standard spacing
- `20px`: Card padding, moderate spacing
- `24px`: Section padding, major spacing
- `28px`: Generous padding for emphasis
- `36px`: Large section gaps
- `44px`: Major margin between sections
- `56px`: Significant spacing for visual separation
- `60px`: Hero section margins
- `72px`: Page section separation

**Usage Context**:
- Button padding: `0px 13.5px` (horizontal)
- Card padding: `22.5px` (all sides, or `24px` for larger cards)
- Section padding: `56px` - `72px`
- Component gap: `12px` - `16px`
- Text margin bottom: `8px` - `16px`

### Grid & Container

**Max Width**: `1200px` (content container)
**Column Strategy**: 12-column grid with `16px` gutter
**Container Padding**: `24px` sides on mobile, `36px` on tablet, `56px` on desktop
**Section Pattern**: Full-width dark background with centered content container

**Grid Usage**:
- Hero sections: Full width, centered text, max `900px` width
- Card grids: Responsive columns (1 mobile, 2 tablet, 3+ desktop)
- Navigation: Horizontal flex layout with `24px` spacing between items

### Whitespace Philosophy

Generous negative space emphasizes the neon accent colors and prevents visual fatigue from the dark background. Whitespace creates breathing room around high-contrast elements. Section dividers use `60px`-`72px` vertical spacing. Cards and containers maintain `24px` internal padding minimum. Text content never touches container edges—always `16px`-`24px` buffer.

### Border Radius Scale

- **Sharp Corners**: `0px` (all components, buttons, cards, inputs—strict geometric aesthetic)
- **No Rounding**: Maintains pixel-perfect, code-like appearance
- **Glow Effects**: Substitute rounded shadows with rectangular `box-shadow` for accent

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | `box-shadow: none` | Default UI, buttons, inputs |
| Subtle | `rgba(34, 197, 94, 0.05) 0px 0px 15px 0px` | Cards, containers (neon glow) |
| Raised | `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px` | Button focus, subtle lift |
| Elevated | `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px` | Modals, dropdowns, active cards |
| Modal | `rgba(0, 0, 0, 0.3) 0px 10px 25px 0px` | Floating panels, overlay menus |

**Shadow Philosophy**: This system replaces traditional soft shadows with a neon-inspired glow approach. Primary elevations use green-tinted shadows (`rgba(34, 197, 94, 0.05)`) to reinforce brand identity. Dark shadows are minimal—only used for modal overlays and extreme elevation changes. All shadows are rectangular (no blur-heavy softness) to maintain the geometric, tech aesthetic. Glowing green neon effects intensify on interaction.

## 7. Do's and Don'ts

### Do
- **Use monospace fonts** for all UI text—GeistMono, GeistPixelSquare, and fallback monospace stacks
- **Maintain `0px` border radius** across all components for geometric consistency
- **Apply neon green accents** (`#22C55E`, `#00FF5E`) to interactive and highlight states
- **Layer transparency** in card backgrounds to create depth without shadows
- **Maximize contrast** between text and background—always white on black or neon on dark
- **Use grid overlays** as background pattern to reinforce the tech aesthetic
- **Implement rectangular shadows** with green tinting for neon glow effects
- **Keep padding generous** in cards and containers (`20px`-`24px`) for breathing room
- **Reserve weight `900`** for CTAs and navigation active states only
- **Test for accessibility**: ensure all contrast ratios meet WCAG AA standards (minimum 4.5:1)

### Don't
- **Avoid rounded corners** or soft border-radius—this breaks the sharp aesthetic
- **Don't use soft, blurred shadows**—keep shadows rectangular and purposeful
- **Avoid serif fonts** or script typefaces—maintain monospace exclusivity
- **Don't introduce new colors** outside the defined palette—only use extracted hex values
- **Avoid semi-transparent black overlays** over neon text—it reduces contrast fatigue
- **Don't use animated motion** excessively—keep transitions swift and subtle (< 200ms)
- **Avoid centering body text** on desktop—left-align for scannability
- **Don't embed images** without neon green borders or glow effects to maintain aesthetic
- **Avoid light backgrounds**—all surfaces should be near-black (`#000000`, `#131413`, `#1B221B`)
- **Don't mix font families**—stick to monospace variants exclusively
- **Avoid button padding exceeding `36px` height**—maintain compact, code-like proportions

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–480px | Single column, full-width cards, `16px` padding, large touch targets (`44px` min) |
| Tablet | 481px–768px | 2-column grid, `24px` padding, navigation collapses to hamburger |
| Desktop | 769px–1200px | 3-column grid, full navigation bar, `36px`–`56px` padding |
| Large Desktop | 1201px+ | Max `1200px` container width, centered content, `56px` padding |

### Touch Targets

- **Minimum Touch Size**: `44px × 44px` for buttons and interactive elements on mobile
- **Desktop Pointer Target**: `36px × 36px` minimum
- **Spacing Between Targets**: `12px` minimum gap on mobile, `16px` on desktop
- **Link Hit Area**: Extend padding to ensure `44px` height on mobile (`12px` vertical, `18px` horizontal)

### Collapsing Strategy

**Mobile (320px–480px)**:
- Navigation: Hamburger menu (3-line icon), opens fullscreen overlay
- Cards: Stack single column, `100%` width minus `16px` padding
- Hero text: Font size reduces to `28px` (headings), `12px` (body)
- Spacing: Reduce margins to `8px`–`16px`, padding to `16px`

**Tablet (481px–768px)**:
- Navigation: Horizontal menu bar reduced to essential items, dropdown menus
- Grid: 2-column card layout, maintain `16px` gutter
- Padding: Increase to `24px`
- Font sizes: Headings `32px`, body `13px`

**Desktop (769px+)**:
- Navigation: Full horizontal menu with all items visible
- Grid: 3-column card layout, `24px` gutter
- Padding: `36px`–`56px` section padding
- Font sizes: Headings `40.5px`, body `14px`

**Specific Adaptations**:
- Form inputs: Full width on mobile (`width: 100%`), fixed width on desktop (`width: 250px`)
- Modals: Full viewport minus `16px` on mobile, fixed width (`max-width: 600px`) on desktop
- Hero sections: Reduce image glow effects and geometric overlays on mobile for performance

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA**: Neon Green Primary (`#22C55E`)
- **Accent Emphasis**: Electric Green Highlight (`#00FF5E`)
- **Secondary Accent**: Forest Green Base (`#06923E`)
- **Background**: Deep Black (`#000000`)
- **Card Surface**: Near-Black Card (`#1B221B`)
- **Text Primary**: White (`#FFFFFF`)
- **Text Secondary**: Charcoal (`#131413`)
- **Success State**: Neon Green Primary (`#22C55E`)
- **Warning State**: Warning Gold (`#FFD700`)
- **Border**: Forest Green Base (`#06923E`) or `rgba(34, 197, 94, 0.5)`
- **Glow/Shadow**: Green tinted `rgba(34, 197, 94, 0.05)`–`0.15`

### Iteration Guide

1. **Use monospace fonts exclusively**—GeistMono for body, GeistPixelSquare for display, monospace fallback. No exceptions.
2. **All border radius must be `0px`**—enforce sharp, geometric corners on every component.
3. **Apply neon green (`#22C55E` or `#00FF5E`) to all interactive elements**—buttons, links, hover states, focus states.
4. **Maintain high contrast**: white text on black backgrounds (minimum 4.5:1 WCAG AA). Test every color combination.
5. **Use rectangular shadows with green tinting** for elevation—`rgba(34, 197, 94, 0.05) 0px 0px 15px 0px` for cards, never soft blurred shadows.
6. **Spacing follows the `4px` base unit scale**—all margins and padding are multiples of `4px` or exact values from the scale (`8px`, `16px`, `24px`, etc).
7. **Button padding is always horizontal only**—`0px 13.5px` (height `36px`), no vertical padding to maintain compact proportions.
8. **Card padding is always `22.5px` or `24px`** per side, never less than `20px`.
9. **Font weights: `400` for body/links, `700` for labels/captions, `900` for CTAs/buttons only**—no other weights.
10. **Implement hover/active states with background color changes and border/text color shifts to neon green/bright green**, never opacity-only changes.
11. **Every component has explicit CSS**: background, text color, font, padding, height, width, border, radius, shadow. No ambiguity.
12. **Dark backgrounds only**: all surfaces are `#000000`, `#131413`, `#1B221B`, `#171917`, or transparent `rgba(0,0,0,0)`. Never light.
13. **Responsive breakpoints**: mobile `320px–480px`, tablet `481px–768px`, desktop `769px+`. Apply specific spacing, font, and layout changes at each.
14. **Touch targets minimum `44px × 44px`** on mobile, `36px × 36px` on desktop.
15. **Grid overlay**: Use subtle green grid background (`url(...)` or `linear-gradient`) at `rgba(34, 197, 94, 0.03)` opacity to reinforce tech aesthetic without overwhelming content.