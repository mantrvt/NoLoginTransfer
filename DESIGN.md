# Design System Inspired by Vacation®

## 1. Visual Theme & Atmosphere

Vacation® embodies a sun-soaked leisure aesthetic that celebrates carefree tropical moments and nostalgic retro luxury. The design system radiates warmth, optimism, and timeless elegance through a carefully balanced palette of golden accents, rich earth tones, and crisp neutrals. Every visual element communicates relaxation, protection, and indulgence—merging the practical (SPF confidence) with the pleasurable (premium scent experience). The typography embraces both refined serif traditions and modern sans-serif clarity, creating a sophisticated yet approachable brand voice that feels both established and contemporary.

**Key Characteristics**
- Warm, sun-inspired color story anchored in gold and amber tones
- Luxurious serif typography paired with clean geometric sans-serif for balance
- High contrast between dark neutrals and bright accent colors for visual hierarchy
- Retro-modern aesthetic combining 80s-inspired vibrancy with contemporary minimalism
- Generous whitespace and breathing room that emphasizes leisure and ease
- Elevation and shadows that add tactile, dimensional depth to interactive elements

## 2. Color Palette & Roles

### Primary
- **Gold Accent** (`#F1D27A`): Call-to-action buttons, promotional highlights, and primary interactive states; warm, inviting, leisure-focused
- **Deep Gold** (`#967C29`): Secondary gold tone for depth and luxury anchoring; used in decorative elements and background accents
- **Warm Amber** (`#E48A00`): Accent highlight for emphasis and seasonal warmth; vibrant but sophisticated

### Accent Colors
- **Bright Yellow** (`#FFDD70`): Alert highlights and celebratory callouts; energetic and eye-catching
- **Warm Cream** (`#F1D27A`): Premium yellow-gold for UI components and backgrounds; soft luxury aesthetic

### Interactive
- **Primary Dark** (`#333333`): Default text, primary interactive states, and dominant UI elements; most frequently used (611 times)
- **Black** (`#000000`): High-contrast text, borders, and critical interactive elements
- **Dark Charcoal** (`#1F1F1F`): Subtle text and secondary interactive states; softer than pure black
- **Blue Focus Ring** (`#0038FF`): Focus state and accessibility indicator for form inputs and buttons

### Neutral Scale
- **Light Gray** (`#E5E7EB`): Dividers, subtle backgrounds, and secondary surfaces (193 uses)
- **Warm Tan** (`#CDC9C1`): Tertiary neutral for warm backgrounds and soft borders
- **Off-White** (`#FFFFFF`): Pure white for card surfaces and high-contrast text backgrounds
- **Cream Beige** (`#FDFBF4`): Warm off-white for subtle backgrounds and paper-like surfaces
- **Pale Taupe** (`#E1DDD3`): Gentle background tint; warmth between white and tan

### Surface & Borders
- **Dark Brown** (`#2F1C16`): Rich surface accent and background layer; earthy, grounded
- **Dark Warm Brown** (`#362822`): Secondary brown for depth and visual layering
- **Deeper Brown** (`#3A2B26`): Tertiary brown for shadow and depth effects

### Semantic / Status
- **Error Red** (`#D13D1B`): Error states, warnings, and negative actions; high-urgency alert
- **Alert Orange** (`#E04403`): Secondary error state and cautionary messaging; less severe than red

## 3. Typography Rules

### Font Family
**Primary Serif:** EB Garamond, Cormorant Garamond, serif (elegant headlines and premium copy)

**Secondary Sans-Serif:** Nunito Sans, Poppins, Helvetica Neue, Arial, sans-serif (body text, UI labels, and accessible reading)

**Tertiary Ornamental:** OptimaLTP, ITCGaramondStd-LtCond (decorative headers, luxury branding moments)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display | EB Garamond | 48px | 300 | 41px | 0px | Hero headline; elegant, spacious feel |
| H1 | Helvetica Neue LT Std | 16px | 400 | 24px | 0px | Page title; clean and minimal |
| H2 | ITCGaramondStd-LtCond | 22px | 400 | 22px | 0px | Section heading; serif elegance |
| H3 | ITCGaramondStd-LtCond | 48px | 300 | 41px | 0px | Large subheading; refined lightness |
| H4 | OptimaLTP | 18px | 400 | 24px | 0px | Tertiary heading; ornamental balance |
| Body | ITCGaramondStd-LtCond | 16px | 400 | 24px | 0px | Standard paragraph text; readable rhythm |
| Button | OptimaLTP | 18px | 500 | 18px | 0px | Interactive labels; confident emphasis |
| Input Label | ITCGaramondStd-LtCond | 32px | 300 | 32px | 0px | Form field placeholder; spacious input area |
| Form Input | OptimaLTP | 23px | 400 | 24px | 0px | Form field text; accessible size |
| List Item | ITCGaramondStd-LtCond | 18px | 400 | 24px | 0px | List hierarchy; clear readability |
| Caption | OptimaLTP | 13px | 400 | 16px | 0px | Small text, disclaimers, fine print |
| Link | ITCGaramondStd-LtCond | 16px | 400 | 24px | 0px | Hypertext; serif refinement |

### Principles
- **Serif for Luxury:** EB Garamond and ITCGaramondStd-LtCond convey premium, timeless elegance in headlines and key messaging
- **Sans-Serif for Clarity:** Helvetica Neue and OptimaLTP ensure accessible, modern body copy and UI labels
- **Weight Variation:** Light (300) for airy elegance; Regular (400) for body hierarchy; Medium-Bold (500+) for interactive emphasis
- **Line Height Breathing:** Minimum 1.5× font size (24px minimum for body) ensures leisurely readability
- **Contrast Hierarchy:** Heading weight and size shifts create visual rhythm without relying solely on color
- **Geometric Precision:** All heading sizes align to 8px grid for layout harmony

## 4. Component Stylings

### Buttons

#### Primary Button (Dark)
- **Background:** `#333333`
- **Text Color:** `#FFFFFF`
- **Font:** OptimaLTP, 18px, weight 500
- **Padding:** `13px 25px 10px 25px`
- **Border Radius:** `9999px` (fully rounded pill)
- **Border:** `0px solid #1F1F1F`
- **Box Shadow:** `rgba(0, 0, 0, 0.75) 0px 1.5px 1.5px 0px`
- **Height:** `41px`
- **Line Height:** `18px`
- **Hover State:** Darken background to `#1F1F1F`; increase shadow to `rgba(0, 0, 0, 0.85) 0px 2px 2px 0px`
- **Active State:** Background `#1F1F1F`; shadow `rgba(0, 0, 0, 0.75) 0px 1px 1px inset`
- **Focus State:** Add outline `2px solid #0038FF` with `4px` offset

#### Primary Button (Gold)
- **Background:** `#F1D27A`
- **Text Color:** `#333333`
- **Font:** OptimaLTP, 18px, weight 500
- **Padding:** `13px 25px 10px 25px`
- **Border Radius:** `9999px`
- **Border:** `0px solid #1F1F1F`
- **Box Shadow:** `rgba(0, 0, 0, 0.75) 0px 1.5px 1.5px 0px`
- **Height:** `41px`
- **Line Height:** `18px`
- **Hover State:** Darken background to `#E48A00`; increase shadow to `rgba(0, 0, 0, 0.85) 0px 2px 2px 0px`
- **Active State:** Background `#D97C00`; shadow inset `rgba(0, 0, 0, 0.75) 0px 1px 1px inset`
- **Focus State:** Add outline `2px solid #0038FF` with `4px` offset

#### Secondary Button (Outline)
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Font:** Arial, 13px, weight 400
- **Padding:** `0px 15px 0px 0px`
- **Border Radius:** `8px`
- **Border:** `2px solid #0038FF`
- **Box Shadow:** `rgba(0, 56, 255, 0.22) 0px 0px 0px 4px`
- **Height:** `63px`
- **Width:** `315px`
- **Line Height:** normal
- **Hover State:** Background `#E5E7EB`; border `2px solid #003FFF`
- **Active State:** Background `#D1D5DB`; shadow inset `rgba(0, 0, 0, 0.1) 0px 2px 4px inset`

#### Ghost Button (Text-only)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#333333`
- **Font:** Helvetica Neue LT Std or ITCGaramondStd-LtCond, 16px, weight 400
- **Padding:** `0px 0px 0px 0px`
- **Border Radius:** `0px` or `2px`
- **Border:** `0px none`
- **Box Shadow:** none
- **Height:** `41px`
- **Hover State:** Text color `#000000`; add bottom border `1px solid #333333`
- **Active State:** Text color `#1F1F1F`

### Cards & Containers

#### Default Card
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#333333`
- **Font:** Helvetica Neue LT Std, 18px, weight 400
- **Padding:** `0px 0px 0px 0px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** none
- **Height:** Auto or `285px`
- **Line Height:** `24px`

#### Elevated Card
- **Background:** `#778899` (slate blue-gray)
- **Text Color:** `#333333`
- **Font:** Helvetica Neue LT Std, 18px, weight 400
- **Padding:** `0px 0px 0px 0px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `rgba(0, 0, 0, 0.5) -2px -2px 0px 0px inset` (inset top-left shadow for depth)
- **Height:** `285px`
- **Line Height:** `24px`
- **Hover State:** Increase inset shadow to `rgba(0, 0, 0, 0.6) -2px -2px 1px -1px inset`

#### Modal Card
- **Background:** `#FFFFFF`
- **Text Color:** `#333333`
- **Padding:** `52px 72px`
- **Border Radius:** `3px 3px 0px 0px` (top-rounded only)
- **Border:** `1px solid #E5E7EB`
- **Box Shadow:** `rgba(0, 0, 0, 0.25) 2px -5px 5px 0px`
- **Max Width:** `546px`

### Inputs & Forms

#### Text Input (Default)
- **Background:** `#FFFFFF`
- **Text Color:** `#333333`
- **Font:** OptimaLTP, 23px, weight 400
- **Padding:** `6px 16px 0px 16px`
- **Border Radius:** `2px`
- **Border:** `1px solid #333333`
- **Box Shadow:** none
- **Height:** `40px`
- **Line Height:** `16px`
- **Placeholder Color:** `#CDC9C1`
- **Focus State:** Border `2px solid #0038FF`; box-shadow `rgba(0, 56, 255, 0.22) 0px 0px 0px 4px`
- **Error State:** Border `2px solid #D13D1B`; box-shadow `rgba(209, 61, 27, 0.15) 0px 0px 0px 4px`

#### Large Input (Display)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#EBEDE4`
- **Font:** ITCGaramondStd-LtCond, 32px, weight 300
- **Padding:** `4px 20px 0px 20px`
- **Border Radius:** `0px`
- **Border:** `0px solid #E5E7EB`
- **Box Shadow:** none
- **Height:** `42px`
- **Line Height:** `32px`
- **Placeholder Color:** `#E5E7EB`
- **Focus State:** Border-bottom `2px solid #333333`

#### Email Input (Newsletter Signup)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#333333`
- **Font:** ITCGaramondStd-LtCond, 32px, weight 300
- **Padding:** `4px 20px 0px 20px`
- **Border Radius:** `0px`
- **Border:** `0px solid #E5E7EB`
- **Box Shadow:** none
- **Height:** `42px`
- **Line Height:** `32px`
- **Placeholder Color:** `#EBEDE4`
- **Focus State:** Border-bottom `1px solid #333333`

### Navigation
- **Background:** `#FFFFFF` or semi-transparent overlay
- **Text Color:** `#333333`
- **Font:** Helvetica Neue LT Std or OptimaLTP, 16px, weight 400
- **Padding:** `20px 16px`
- **Border:** `0px none`
- **Box Shadow:** none
- **Link Hover State:** Text color `#0038FF`; background `rgba(0, 56, 255, 0.08)`
- **Active Link:** Text color `#333333`; bottom border `2px solid #F1D27A`

### Links

#### Standard Link
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#1F1F1F`
- **Font:** ITCGaramondStd-LtCond, 16px, weight 400
- **Padding:** `0px`
- **Border:** `0px none`
- **Box Shadow:** none
- **Line Height:** `24px`
- **Text Decoration:** underline (optional on hover)
- **Hover State:** Color `#333333`; add underline `1px solid #333333`

#### Accent Link
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#F1D27A` or `#E48A00`
- **Font:** Helvetica Neue LT Std, 16px, weight 400
- **Hover State:** Color `#967C29`; text-shadow `0px 0px 8px rgba(241, 210, 122, 0.5)`

### Badges & Labels
- **Background:** `#F1D27A` (default) or `#E5E7EB` (neutral)
- **Text Color:** `#333333`
- **Font:** OptimaLTP, 13px, weight 400
- **Padding:** `6px 12px`
- **Border Radius:** `2px`
- **Border:** `0px none`
- **Line Height:** `16px`
- **Error Badge Background:** `#D13D1B`
- **Error Badge Color:** `#FFFFFF`

## 5. Layout Principles

### Spacing System
**Base Unit:** `8px`

**Scale:**
- `8px` — Micro spacing, icon gaps, tight component padding
- `12px` — Small gap between related UI elements
- `16px` — Standard padding for inputs, button padding, card insets
- `20px` — Comfortable padding for navigation and sections
- `28px` — Medium gap between component groups
- `32px` — Margin between major sections
- `40px` — Large margin for visual separation
- `52px` — Modal padding vertical
- `72px` — Modal padding horizontal, premium content padding
- `80px` — Hero section top/bottom margin
- `84px` — Premium section padding
- `96px` — Large section margin, page container breathing room
- `100px` — Hero padding, maximum visual separation

**Context:** Form fields use `16px` internal padding; hero sections use `80px–100px` margins; cards use `52px–72px` padding; section gaps use `40px–96px` depending on visual hierarchy.

### Grid & Container
- **Max Width:** `1440px` for full-bleed containers
- **Content Width:** `1200px` recommended for centered layouts
- **Column Strategy:** 12-column grid system at desktop; 6-column at tablet; 2-column at mobile
- **Section Pattern:** Hero (full bleed), Content Section (centered with `40px–80px` margins), CTA Section (accent background with `52px–72px` padding)

### Whitespace Philosophy
Vacation® prioritizes generous whitespace to evoke leisure and mental clarity. Empty space is a luxury, not a constraint. Minimum margin between major sections is `80px`; minimum padding inside cards is `20px`. Navigation and header areas breathe with `20px–32px` padding. Forms and inputs are wrapped in spacious containers with `40px–72px` outer margin. Hero sections and hero imagery occupy full height with breathing room, emphasizing relaxation over crowding.

### Border Radius Scale
- `0px` — Sharp edges for premium serif typography, modal edges, minimal aesthetic
- `2px` — Subtle rounding for form inputs, badges, secondary buttons
- `8px` — Moderate rounding for UI components, cards with soft modern feel
- `9999px` — Fully rounded pill buttons; primary interactive CTAs

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, transparent background | Text links, ghost buttons, default card backgrounds |
| Subtle (1) | `rgba(0, 0, 0, 0.5) -2px -2px 0px 0px inset` | Inset depth; card elevation; tactile press effect |
| Standard (2) | `rgba(0, 0, 0, 0.25) 2px -5px 5px 0px` | Modal overlays, floating cards, dropdown menus |
| Prominent (3) | `rgba(0, 0, 0, 0.75) 0px 1.5px 1.5px 0px` | Primary buttons, call-to-action elements, hero CTAs |
| Focus (4) | `rgba(0, 56, 255, 0.22) 0px 0px 0px 4px` | Focus rings, accessibility indicators, input focus states |

**Shadow Philosophy:** Vacation® uses restrained, refined shadows that suggest depth without heaviness. Inset shadows (top-left directionality) add tactile, engraved quality to premium components. Outset shadows are soft and subtle, suggesting gentle floating rather than dramatic depth. Focus rings use color-based glow (blue halo) for accessible, modern indication without harsh outlines.

## 7. Do's and Don'ts

### Do
- **Use serif fonts (EB Garamond, ITCGaramondStd-LtCond) for headings** to communicate luxury and timelessness
- **Pair serif headings with sans-serif body text** (OptimaLTP, Helvetica Neue, Nunito Sans) for clarity and modern balance
- **Employ generous whitespace** — minimum `80px` margins between sections; minimum `20px` padding inside components
- **Use the gold palette (`#F1D27A`, `#967C29`, `#E48A00`)** for primary CTAs, accents, and celebratory messaging
- **Default to `#333333` for text** — most frequently used, warm-neutral, approachable
- **Apply inset shadows** to elevated cards and premium components for tactile, grounded depth
- **Use `9999px` border-radius for primary buttons** to reinforce pill-shaped, leisurely aesthetic
- **Ensure focus rings are always visible** with `#0038FF` glow + `4px` offset for accessibility
- **Stack typography sizes by 8px increments** where possible to maintain grid harmony
- **Use color for semantic meaning:** gold for positive/CTA, red for error, blue for focus/interactive

### Don't
- **Don't mix serif fonts in body copy** — stick to one serif family for consistency; reserve EB Garamond for display only
- **Don't use heavy shadows (over `rgba(0, 0, 0, 0.8)`)** — Vacation® is refined leisure, not drama
- **Don't shrink text below 16px** for body copy — legibility is luxury; small text (13px) is reserved for captions and disclaimers only
- **Don't apply shadow to text elements** — text should be crisp and direct, never floating
- **Don't overuse the gold palette** — reserve it for CTAs, accents, and seasonal highlights; it loses impact if overused
- **Don't set margin or padding below 8px increments** — breaks grid rhythm and appears fragmented
- **Don't use pure black (`#000000`)** for large backgrounds — use `#1F1F1F` or `#2F1C16` for warmth
- **Don't forget focus states** — every interactive element must have a visible focus ring for keyboard navigation
- **Don't use standard blue (`#0000FF`)** — always use Vacation® blue (`#0038FF`) for consistency
- **Don't truncate text without context** — use full-width forms and readable line lengths (50–60 characters for body)

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | 320px–767px | Single column; full-width inputs; `16px` margin; `2px` border-radius; 18px heading; hidden navigation toggles to hamburger menu |
| Tablet | 768px–1199px | 2–6 column grid; `32px` margin; modal width `90vw` max; font sizes reduced 1–2px; button padding `12px 20px` |
| Desktop | 1200px–1439px | Full 12-column grid; `80px` margin/padding; modal width `546px` fixed; full typography scale; side-by-side layouts |
| Large Desktop | 1440px+ | Max-width container `1440px` centered; extended spacing `96px–100px`; full-scale hero sections |

### Touch Targets
- **Minimum Interactive Height:** `44px` (buttons, links, form inputs)
- **Minimum Interactive Width:** `44px` (icon buttons, checkboxes)
- **Comfortable Spacing:** `16px` minimum between touch targets for finger interaction
- **Form Inputs on Mobile:** Full-width with `40px` minimum height; font size `16px+` to avoid iOS zoom
- **Navigation Links:** `20px` vertical padding on mobile; `16px` on desktop

### Collapsing Strategy
- **Hero Section:** Full viewport height on desktop; `200px` minimum on mobile; image scales down; text size reduces to 24px heading
- **Multi-Column Layouts:** Stack vertically on mobile (1 column); expand to 2 columns at tablet; 3+ columns at desktop
- **Modal Dialogs:** `90vw` max-width on mobile with `16px` margin; `546px` fixed width on tablet/desktop
- **Navigation:** Horizontal menu on desktop; hamburger toggle on mobile; sidebar or drawer menu at tablet
- **Grid Gutters:** `16px` on mobile; `20px` on tablet; `32px` on desktop
- **Form Inputs:** Full-width on mobile; `50%` width (side-by-side) on tablet; grid alignment on desktop

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Gold (`#F1D27A`) or Dark (`#333333`)
- **Secondary CTA:** Outline Blue (`#0038FF` border)
- **Background (Default):** Off-White (`#FFFFFF`) or Warm Cream (`#FDFBF4`)
- **Heading Text:** Dark (`#333333` or `#1F1F1F`)
- **Body Text:** Dark Neutral (`#333333`)
- **Accent Highlights:** Gold (`#F1D27A`), Amber (`#E48A00`)
- **Focus/Interactive:** Blue (`#0038FF`)
- **Error State:** Red (`#D13D1B`)
- **Borders:** Dark Neutral (`#333333`) or Light Gray (`#E5E7EB`)

### Iteration Guide

1. **Always use serif fonts for headings** — EB Garamond or ITCGaramondStd-LtCond; sans-serif for body. Pair weight 300–400 for elegance, weight 500+ for emphasis.

2. **Default text color is `#333333`** unless specified as heading (`#1F1F1F`) or body (`#333333` or `#FFFFFF` on dark backgrounds).

3. **Primary button is gold (`#F1D27A`) with dark text (`#333333`)** or dark (`#333333`) with white text; always use `9999px` border-radius and shadow `rgba(0, 0, 0, 0.75) 0px 1.5px 1.5px 0px`.

4. **All form inputs have `2px` border-radius and `16px` padding**; focus state is `#0038FF` border with `4px` glow shadow.

5. **Modal cards use `3px 3px 0px 0px` border-radius** (top-rounded), `52px 72px` padding, and shadow `rgba(0, 0, 0, 0.25) 2px -5px 5px 0px`.

6. **Spacing follows 8px grid:** `16px` standard, `32px` section margin, `40px` large gap, `80px–100px` hero sections.

7. **Focus rings on all interactive elements:** `2px solid #0038FF` with `4px` offset; never remove focus states.

8. **Error states use `#D13D1B`** with white or dark text (max contrast); warning uses `#E04403`.

9. **Card shadows are inset (`-2px -2px`) for subtle depth**; button shadows are outset `(0px 1.5px)` for lift.

10. **Typography sizes are locked:** Headings 48px (H3) / 22px (H2) / 18px (H4); body 16px; input labels 32px; buttons 18px. No exceptions; use weight and color for hierarchy variation instead.