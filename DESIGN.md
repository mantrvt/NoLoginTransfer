# Design System Inspired by Poolsuite

## 1. Visual Theme & Atmosphere

Poolsuite embodies the spirit of infinite summer leisure through a playful retro-digital aesthetic that evokes the charm of 1990s web design and vector art. The design system celebrates warm, sun-kissed colors paired with crisp geometric shapes and pixel-perfect typography, creating an atmosphere of carefree escapism. The palette blends pastels with bold accents, while the layout maintains a nostalgic computer interface feel that's simultaneously whimsical and grounded. Every element feels intentionally "low-fi yet high-concept," prioritizing personality and warmth over minimalism, making users feel like they're accessing an exclusive leisure platform frozen in a perfect summer moment.

**Key Characteristics**
- Retro-digital aesthetic with 90s web design references
- Warm, sun-drenched color palette with pastels and bold accents
- Pixel-perfect typography with vintage typeface choices
- Playful, approachable tone that balances nostalgia with modernity
- Geometric, intentional spacing that feels deliberate and considered
- High contrast for readability with subtle shadows for depth
- Vector-inspired iconography and simple geometric forms

## 2. Color Palette & Roles

### Primary
- **Cream**: (`#FAF4C6`): Primary background and soft surface fills; warm, inviting foundation for content areas
- **Deep Black**: (`#000000`): Primary text, dark backgrounds, and strong contrast elements; most frequently used color for structure

### Accent Colors
- **Sky Blue**: (`#0988F0`): Energetic accent for interactive states, highlights, and focal points; conveys digital vitality
- **Warm Beige**: (`#F9F0E9`): Secondary background and softer surface alternative; pairs well with cream for layered layouts
- **Blush Pink**: (`#F6D5D5`): Subtle accent and alternative surface treatment; adds warmth without aggression
- **Seafoam Mint**: (`#AFE2E5`): Tertiary accent for progress indicators, positive states, and supporting UI elements

### Interactive
- **Taupe**: (`#C7B994`): Muted interactive state and hover variations; maintains warmth while reducing contrast
- **Medium Gray**: (`#374151`): Secondary text and disabled states; provides semantic distinction from primary black

### Neutral Scale
- **Off-White**: (`#FFFFFF`): Pure backgrounds and inverse text; maximum contrast option
- **Light Gray**: (`#E5E7EB`): Borders, dividers, and subtle backgrounds; most common neutral secondary element
- **Lighter Gray**: (`#D1D5DB`): Tertiary borders and subtle separators
- **Medium Gray**: (`#9B9B9B`): Disabled text and secondary metadata
- **Dark Gray**: (`#202020`): Deep neutral for alternative text emphasis

### Surface & Borders
- **Border Gray**: (`#D9D9D9`): Input field borders and container outlines
- **Cream Surface**: (`#FAF4C6`): Primary card and container fills

### Semantic / Status
- **Warning**: (`#FFB800`): Warning indicators and cautionary states; warm, attention-drawing orange
- **Error**: (`#DF4A34`): Error states, destructive actions, and alert indicators; warm red-orange for consistency
- **Caution**: (`#F3A13F`): Secondary warning treatment; softer orange for less critical warnings

## 3. Typography Rules

### Font Family
- **Primary Display**: Ishmeria (serif), fallback stack: `Georgia, serif`
- **Secondary Heading**: ChiKareGo2 (decorative), fallback stack: `Courier New, monospace`
- **Tertiary Heading**: Pixolde (display), fallback stack: `Arial, sans-serif`
- **Body & UI**: Everyday (serif) for body, ui-sans-serif for controls
- **Fallback Stack for Body**: `Everyday, 'Courier New', monospace, system-ui, sans-serif`

### Hierarchy
| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Large | Ishmeria | 24px | 400 | 28px | 0px | Primary hero and major section titles |
| Display Medium | Ishmeria | 16px | 400 | 14px | 0px | Secondary headings and card titles |
| Heading Large | ChiKareGo2 | 18px | 400 | 18px | 0px | Navigation and feature headers |
| Heading Medium | ChiKareGo2 | 16px | 400 | 16px | 0px | Subheadings and section markers |
| Heading Small | Pixolde | 16px | 400 | 15px | 0px | Card subtitles and labels |
| Body Text | Everyday | 10px | 400 | 15px | 0px | Primary body copy and descriptions |
| Button Text | ui-sans-serif | 16px | 400 | 24px | 0px | All button content |
| Link Text | ChiKareGo2 | 16px | 400 | 16px | 0px | Navigation links and inline links |
| Caption | Everyday | 10px | 400 | 10px | 0px | Metadata, timestamps, fine print |

### Principles
- Typography emphasizes personality over neutrality; each font choice contributes to the retro-summer aesthetic
- Maintain high contrast between text and backgrounds to ensure readability across all color combinations
- Use weight sparingly; the system relies on font selection and size variation rather than aggressive weight changes
- Line heights are generous relative to font size, promoting breathing room and leisurely reading experience
- Letter spacing remains minimal to preserve the vintage typography feel while maintaining clarity
- Display fonts (Ishmeria, ChiKareGo2, Pixolde) are reserved for headers and UI labels; body remains simple and accessible

## 4. Component Stylings

### Buttons

**Primary Button (Large)**
- Background: `#F9F0E9`
- Color: `#000000`
- Font: Pixolde, 16px, weight 400, line-height 13.92px
- Padding: `9px 10px 8px 10px`
- Border Radius: `0px 0px 4px 0px`
- Border: `0px solid #000000`
- Height: `32px`
- Width: Auto (minimum 185px)
- Box Shadow: None
- Hover State: Background `#F6D5D5`, same text color

**Icon Button (Square)**
- Background: `#000000`
- Color: `#000000`
- Font: ui-sans-serif, 16px, weight 400
- Padding: `0px`
- Border Radius: `2px`
- Border: `0px solid #E5E7EB`
- Height: `18px`
- Width: `18px`
- Box Shadow: `rgba(0, 0, 0, 0.2) 0px 1px 0px 0px inset`
- Hover State: Opacity 0.8

**Ghost Button (Small Icon)**
- Background: Transparent
- Color: `#000000`
- Font: ui-sans-serif, 16px, weight 400
- Padding: `0px`
- Border Radius: `2px`
- Border: `0px solid #E5E7EB`
- Height: `18px`
- Width: `18px`
- Box Shadow: None
- Hover State: Background `#E5E7EB`

### Cards & Containers

**Primary Card**
- Background: `#FAF4C6`
- Border: `1px solid #000000`
- Border Radius: `4px`
- Padding: `20px`
- Box Shadow: `rgba(0, 0, 0, 0.3) 0px 50px 80px -50px`
- Hover State: Shadow increases to `rgba(0, 0, 0, 0.4) 0px 60px 100px -50px`

**Secondary Card**
- Background: `#FFFFFF`
- Border: `1px solid #E5E7EB`
- Border Radius: `4px`
- Padding: `16px`
- Box Shadow: None
- Hover State: Border color `#D1D5DB`

**Overlay Container**
- Background: `#F9F0E9`
- Border: `2px solid #000000`
- Border Radius: `8px`
- Padding: `24px`
- Box Shadow: `rgba(0, 0, 0, 0.2) 0px 1px 0px 0px inset`

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Color: `#000000`
- Font: Pixolde, 16px, weight 400, line-height 24px
- Padding: `0px 6px`
- Border Radius: `2px`
- Border: `1px solid #000000`
- Height: `28px`
- Box Shadow: `rgba(0, 0, 0, 0.2) 0px 1px 0px 0px inset`
- Focus State: Border color `#0988F0`, box shadow adds blue tint
- Placeholder Color: `#9B9B9B`

**Text Input (Alternate)**
- Background: `#FFFFFF`
- Color: `#000000`
- Font: Pixolde, 16px, weight 400
- Padding: `0px 6px`
- Border Radius: `2px`
- Border: `1px solid #000000`
- Height: `28px`
- Box Shadow: `rgba(0, 0, 0, 0.2) 0px 1px 0px 0px inset`
- Disabled State: Background `#E5E7EB`, border `#D1D5DB`, color `#9B9B9B`

### Navigation

**Navigation Link (Header)**
- Background: Transparent
- Color: `#000000`
- Font: ChiKareGo2, 16px, weight 400, line-height 16px
- Padding: `0px`
- Border Radius: `0px`
- Border: None
- Hover State: Underline `2px solid #000000`
- Active State: Color `#0988F0`, underline `2px solid #0988F0`

**Navigation Link (Inset/Badge Style)**
- Background: `#D9D9D9`
- Color: `#000000`
- Font: ChiKareGo2, 16px, weight 400, line-height 16px
- Padding: `5px 10px`
- Border Radius: `2px`
- Border: `1px solid #000000`
- Box Shadow: `rgb(155, 155, 155) -1px -1px 0px 0px inset, rgb(255, 255, 255) 1px 1px 0px 0px inset, rgb(0, 0, 0) 0px 0px 0px 1px`
- Hover State: Background `#E5E7EB`

### Progress Indicators

**Progress Bar**
- Background: `#E5E7EB`
- Fill Color: `#AFE2E5`
- Height: `8px`
- Border Radius: `2px`
- Border: `1px solid #000000`

## 5. Layout Principles

### Spacing System
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px
- **Padding Context**: 
  - Compact UI (buttons, inputs): 4px–8px
  - Standard components (cards, sections): 16px–24px
  - Large containers (full sections): 32px–40px
  - Breathing room (major sections): 48px–64px
- **Gap Context**: 
  - Component spacing: 8px–16px
  - Section spacing: 24px–32px
  - Page-level spacing: 40px–64px

### Grid & Container
- **Max Width**: 1200px for primary content
- **Column Strategy**: 12-column grid system with 16px gutter
- **Section Patterns**: 
  - Full-width background sections with centered content at max-width
  - Two-column layouts for feature comparisons at 48px gap
  - Three-column layouts for collections at 24px gap
  - Mobile: Single column with full width at 16px padding

### Whitespace Philosophy
Whitespace is treated as an active design element. The system embraces generous margins around content, creating visual breathing room that supports the leisurely, unhurried aesthetic. Section breaks are emphasized through vertical spacing rather than visual dividers, and white space around interactive elements provides clear affordance and reduces cognitive load. The design avoids visual clutter by allowing content to breathe.

### Border Radius Scale
- **Sharp**: `0px` — Used for typography, strict geometric elements
- **Subtle**: `2px` — Used for small interactive elements (buttons, inputs, small components)
- **Moderate**: `4px` — Used for cards, containers, medium components
- **Rounded**: `8px` — Used for large overlays, modals, feature containers
- **Compound**: `0px 0px 4px 0px` (bottom-right) — Used for angled button treatments
- **Compound**: `4px 0px 0px 4px` (top-left and bottom-left) — Used for grouped button sets

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Base (L0) | No shadow, solid background | Neutral surfaces, primary backgrounds, base containers |
| Subtle (L1) | `rgba(0, 0, 0, 0.2) 0px 1px 0px 0px inset` | Form inputs, inset controls, secondary surfaces |
| Small (L2) | `rgb(0, 0, 0) 0px 1px 0px 0px, rgb(255, 255, 255) 0px 1px 0px 0px inset` | Button edges, subtle lift, 3D beveled effects |
| Medium (L3) | `rgba(0, 0, 0, 0.3) 0px 50px 80px -50px` | Card shadows, hover states, floating elements |
| Large (L4) | `rgba(0, 0, 0, 0.4) 0px 60px 100px -50px` | Modals, overlays, elevated panels on interaction |

The shadow philosophy prioritizes subtle, directional lighting that suggests a light source from above. Shadows are diffuse and soft, avoiding harsh contrast while maintaining visual hierarchy. Primary shadows use large blur radii with negative spread to create ambient occlusion effects. Inset shadows provide tactile, beveled appearances for interactive elements, referencing skeuomorphic interface design that grounds the retro aesthetic. Shadows increase on hover/active states to provide interactive feedback without changing the element's visual weight dramatically.

## 7. Do's and Don'ts

### Do
- Use the cream (`#FAF4C6`) background as your primary surface; it creates the warm, summery foundation
- Pair deep black text with light backgrounds for maximum readability and retro-print aesthetic
- Apply generous padding (16px–24px) within cards and containers to support the spacious, leisurely feel
- Use border radius sparingly and consistently; 2px for small UI, 4px for medium components
- Leverage the seafoam mint (`#AFE2E5`) for positive states, progress, and affirmative actions
- Employ the Pixolde font for button labels and interactive elements; it reinforces the playful, digital character
- Create visual hierarchy through font family selection first, then size and weight
- Use the sky blue (`#0988F0`) as a strategic accent for primary CTAs and interactive highlights
- Maintain 1:1 pixel density in illustrations and icons to preserve the retro-digital feel
- Include inset shadows on form inputs to suggest depth and interaction affordance

### Don't
- Avoid overusing accent colors; let cream and black anchor the design
- Don't use font weights beyond 400; rely on typeface selection for visual distinction
- Avoid small type sizes below 10px for body content; readability is paramount
- Don't apply rounded corners excessively; the design embraces some sharp angles
- Avoid stacking shadows; use only one shadow layer per element
- Don't use drop shadows on text; maintain contrast through color and size
- Avoid gradients and complex color blending; this system thrives on solid, discrete colors
- Don't apply letter spacing to display fonts; preserve their designed spacing
- Avoid dark gray text on dark backgrounds or light text on light backgrounds; maintain high contrast
- Don't over-animate; transition speeds should be subtle (150ms–300ms) to maintain the leisurely pace

## 8. Responsive Behavior

### Breakpoints
| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | 320px–599px | Single column, full-width padding 16px, font sizes reduced by 1–2px, button heights 40px, collapsed navigation |
| Tablet | 600px–999px | Two-column grid, padding 24px, standard typography sizing, button heights 36px, sidebar navigation collapsible |
| Desktop | 1000px–1439px | Three-column capability, max-width 1000px, padding 32px, full typography scale, button heights 32px, sticky header |
| Large Desktop | 1440px+ | Max-width 1200px, three-column preferred, padding 40px, full spacing scale, extended layouts |

### Touch Targets
- **Minimum Touch Size**: 44px × 44px for all interactive elements on mobile (buttons, links, form inputs)
- **Desktop Pointer Targets**: 32px × 32px minimum for buttons; 28px height for inputs
- **Spacing Between Targets**: 8px minimum gap to prevent accidental activation
- **Icon Button**: 18px × 18px on desktop, 32px × 32px on mobile
- **Form Input Height**: 28px on desktop, 40px on mobile

### Collapsing Strategy
- **Typography**: Reduce Display headings by 2–4px on mobile; maintain body at 10px minimum
- **Spacing**: Reduce section gaps from 32px–40px to 24px on tablet; 16px on mobile
- **Containers**: Shift from two-column to single column at 600px; maintain 16px gap
- **Navigation**: Convert horizontal navigation to hamburger menu at 768px breakpoint; use full-screen modal on mobile
- **Cards**: Stack horizontally at desktop (3 columns), 2 columns at tablet, 1 column at mobile
- **Padding**: 40px desktop → 32px tablet → 16px mobile for section-level padding

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA**: Warm Beige (`#F9F0E9`)
- **Background (Primary)**: Cream (`#FAF4C6`)
- **Text/Heading**: Deep Black (`#000000`)
- **Secondary Text**: Medium Gray (`#374151`)
- **Accent (Interactive)**: Sky Blue (`#0988F0`)
- **Accent (Positive/Progress)**: Seafoam Mint (`#AFE2E5`)
- **Surface (Secondary)**: Off-White (`#FFFFFF`)
- **Border**: Light Gray (`#E5E7EB`) or Deep Black (`#000000`)
- **Error/Warning**: Error (`#DF4A34`), Warning (`#FFB800`)
- **Disabled**: Medium Gray (`#9B9B9B`) text on Light Gray (`#E5E7EB`) background

### Iteration Guide
1. **Start with Cream and Black**: Use `#FAF4C6` as primary background and `#000000` as primary text; this establishes the retro-summer foundation immediately.
2. **Apply Border Radius Consistently**: Use `2px` for small inputs/buttons, `4px` for cards/containers, `8px` only for large modals; sharp angles are acceptable for typography.
3. **Respect Font Families**: Ishmeria for display/headings, Pixolde for button labels, ChiKareGo2 for navigation, Everyday for body; do not substitute without preserving visual hierarchy.
4. **Use Inset Shadows on Inputs**: Always apply `rgba(0, 0, 0, 0.2) 0px 1px 0px 0px inset` to form inputs to suggest interaction affordance.
5. **Maintain High Contrast**: Never place text below 7:1 WCAG contrast ratio; default to `#000000` text on light backgrounds.
6. **Space Components Generously**: Use 16px–24px padding in cards, 32px–40px section margins; avoid cramped layouts.
7. **Reserve Sky Blue for Interactive States**: Use `#0988F0` sparingly for active links, focus states, and primary CTAs only.
8. **Implement Touch Targets**: Ensure minimum 44px × 44px for mobile, 32px × 32px for desktop interactive elements.
9. **Preserve Retro Aesthetics**: Avoid gradients, avoid thin strokes, avoid anti-aliasing compromises; prioritize solid colors and pixel-perfect geometry.
10. **Test at All Breakpoints**: Verify typography readability, touch target sizing, and spacing collapse at 320px, 600px, 1000px, and 1440px viewports.