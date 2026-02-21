# Athenix Technologies — Website Spec

## Brand
- **Company:** Athenix Technologies
- **Tagline:** "We Build Software That Transforms Businesses"
- **Domain:** athenixtech.com (local prototype for now)
- **Name origin:** Athena (wisdom/strategy) + Phoenix (transformation/rebirth)

## Logo Concept
- Geometric "A" mark with subtle wing/flame elements
- Minimal, tech-forward, works at small sizes
- SVG format, inline in site

## Color Palette
- **Background (dark):** #0a0a1a (deep navy/black)
- **Accent (gold):** #d4a853 (phoenix fire/warmth)
- **Secondary (blue):** #4a9eff (tech/wisdom)
- **Text:** #ffffff (primary), #94a3b8 (secondary/muted)
- **Surface:** #111827 (cards/panels)

## Typography
- Headlines: Inter or similar clean sans-serif, bold, large
- Body: Same family, regular weight

## Tech Stack (Prototype)
- Vanilla HTML/CSS/JS
- GSAP + ScrollTrigger (CDN) for scroll animations
- No frameworks — keep it simple for prototype

## Sections

### 1. Hero
- Full viewport height
- Animated logo mark (SVG, subtle glow/draw animation)
- "Athenix Technologies" wordmark
- Tagline: "We Build Software That Transforms Businesses"
- Subtitle: "Custom software solutions for SMEs across Southeast Asia"
- Subtle scroll indicator at bottom

### 2. What We Do (Services)
- Three service pillars, scroll-triggered fade-up:
  1. **Custom Software Development** — Tailored solutions built for your specific business needs
  2. **Web & Mobile Applications** — Modern, responsive apps that work everywhere
  3. **Technology Strategy** — Smart tech planning to future-proof your business
- Each has an icon (SVG), title, and 2-line description
- Cards or clean horizontal layout

### 3. How We Work (Process)
- Apple-style sticky scroll section
- Left side: sticky "Our Process" heading
- Right side: 5 phases scroll through:
  1. **Discovery** — We learn your business, challenges, and goals
  2. **Design** — Wireframes, prototypes, user flows
  3. **Build** — Agile development with regular check-ins
  4. **Launch** — Deployment, testing, go-live support
  5. **Support** — Ongoing maintenance and iteration
- Each phase highlights as you scroll past it

### 4. FieldPro Showcase (Case Study)
- "See It In Action" heading
- Device mockup (laptop/phone frame)
- Scroll triggers different "screens" inside the mockup:
  - Dashboard overview
  - Job management
  - Inventory tracking
  - Real-time field updates
- Brief description beside each screen
- "Built for a field service company in Malaysia" context line
- Link/CTA: "Want something like this?"

### 5. Why Athenix
- Stats with counter animation on scroll:
  - "99.9% Uptime"
  - "Built in Weeks, Not Months"
  - "Southeast Asia Focus"
- Value props:
  - "We speak your language" (literal + figurative — SEA market)
  - "Small enough to care, skilled enough to deliver"
  - "From idea to production — one team, no handoffs"

### 6. Contact Form
- "Tell Us What You Need" heading
- Fields:
  - Name
  - Email
  - Company
  - Industry (dropdown: Field Service, Construction, F&B, Retail, Other)
  - What do you need? (textarea)
  - Budget range (dropdown: <$5K, $5-15K, $15-50K, $50K+)
  - Timeline (dropdown: ASAP, 1-3 months, 3-6 months, Just exploring)
- Submit button with gold accent
- For prototype: form just logs to console / shows success message

### 7. Footer
- Athenix Technologies logo (small)
- "Based in Southeast Asia. Building for the world."
- Email: hello@athenixtech.com
- Social links (placeholder)
- © 2026 Athenix Technologies

## Interactive Elements
- GSAP ScrollTrigger for all section reveals
- Fade-up + slide animations on scroll
- Sticky "How We Work" section
- Device mockup screen transitions (scroll-driven)
- Counter animations for stats
- Smooth scroll navigation
- Subtle parallax on hero background
- Logo SVG draw animation on load

## Responsive
- Mobile-first
- Hero collapses gracefully
- Services stack vertically on mobile
- Process section becomes vertical timeline on mobile
- Device mockup scales down

## Performance
- No heavy frameworks
- GSAP from CDN (lightweight)
- SVG graphics (no raster images in prototype)
- Lazy animations (only trigger on viewport entry)
