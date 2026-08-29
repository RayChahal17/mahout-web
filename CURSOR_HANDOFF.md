# Mahout Website — Cursor Implementation Handoff

**Status:** Ready for implementation  
**Placeholders:** Images and videos will be provided later or added manually. Use placeholder components where assets are needed.

---

## 0. North Star (Success Definition)

### Primary Outcome
Convert visitors into high-intent waitlist signups (or early access downloads).

### Secondary Outcomes
- SEO growth
- Brand trust

### Core Conversion Actions (priority order)
1. **Join Waitlist** — primary
2. **Watch 20–40s product story** — secondary
3. **Read "How it works"** — secondary
4. **Read Privacy/Trust** — trust closer

### KPIs
| Metric | Target |
|--------|--------|
| Mobile Lighthouse Performance | ≥ 90 |
| Mobile Lighthouse SEO | ≥ 95 |
| Mobile Lighthouse Accessibility | ≥ 95 |
| Waitlist conversion (targeted traffic) | 5–12% |
| Time-to-first-action | < 8 seconds |
| Bounce rate (warm traffic) | < 45% |

---

## 1. Brand + Design System

### 1.1 Brand Promise (copy anchor)

> **Mahout is a personal operating system that turns your meaning, emotions, and time into calm next steps—guided by Future You.**

**Tone:** Calm luxury + decisive clarity. No hustle language. No cringe "motivation." No therapy claims.

### 1.2 Color Tokens (CSS variables — use everywhere)

```css
:root {
  /* Lavender (primary atmosphere) */
  --lavenderMist: #F7F6FB;      /* background wash */
  --lavenderSurface: #E9E6FF;   /* cards / surfaces */
  --lavenderPrimary: #7A5CFF;   /* primary CTA + key links */
  --lavenderDeep: #5636D3;      /* headlines + emphasis */

  /* Warm paper */
  --warmWhite: #FFFDFC;         /* main canvas */
  --warmCream: #FFF6E8;        /* soft gradient edge */

  /* Gold (expensive moments ONLY) */
  --northStarGold: #D8A85B;     /* hairline border / halo */
  --goldAccent: #FFB661;        /* rare: premium CTA shimmer, badges */
  --goldWash: #FFF4DC;          /* rare background glow */

  /* Ink */
  --ink: #2F3337;               /* primary text */
  --inkSoft: #505763;           /* secondary text */
  --border: #D7DDE5;
  --muted: #B0B5BC;
}
```

**Gold rule:** Gold only appears in: North Star hero, North Star page halo, micro halo around main hero CTA (once on load), rare icon strokes/dividers. Everything else = lavender + warm paper + charcoal.

### 1.3 Typography

- **Headline:** Display serif or high-end sans (editorial feel)
- **Body:** Clean sans, high x-height (mobile legibility)
- **Letter spacing:** Slightly tighter on big headings
- **Line height:** Generous for calm
- **Mobile rule:** Body text never below ~16px, ideally 17–18px
- **Whitespace is the luxury**

### 1.4 Visual Style

- **Phone frames:** Minimal, matte, soft shadow
- **Background:** Lavender mist gradient (very subtle)
- **Cards:** 16–24px radius, soft inner shadow, thin border
- **Icons:** Thin-line, slightly rounded corners

### 1.5 Motion Philosophy

Everything animates like breathing: fades + slight vertical drift. Parallax minimal and slow. No bounce, no elastic overshoot. North Star gets one premium glow moment.

---

## 2. Mobile-First Information Architecture

### 2.1 Sitemap

| Path | Purpose |
|------|---------|
| `/` | Home (full story + conversion) |
| `/north-star` | Deep page (differentiator) |
| `/how-it-works` | 5-element scrollytelling |
| `/privacy` | Privacy + memory control (trust) |
| `/pricing` | Optional / "Coming soon" |
| `/blog` | SEO engine |
| `/about` | Founder story + mission |
| `/waitlist` | Dedicated high-conversion signup |
| `/terms` | Legal |
| `/support` | Support |

### 2.2 Mobile Nav

- **Hamburger:** How it works, North Star, Privacy, Blog
- **Sticky bottom CTA:** "Join Waitlist" pill

### 2.3 Home Page Section Order (scroll story)

1. Hero (promise + CTA)
2. The 5-element story (micro)
3. Path → Elephant → Mahout → Aim
4. North Star (largest section)
5. Trust + privacy (memory control)
6. Social proof placeholders (coming soon)
7. Final CTA (quiet, confident)

---

## 3. Page-by-Page Content Plan

### 3.1 Hero (above the fold)

**Goal:** In 5 seconds user understands: what it is + why it's different.

**H1 (choose one and lock):**
- "A personal operating system—guided by Future You."
- "Turn your days into direction."
- "Meaning. Time. Emotion. One calm system."

**Subhead (must mention the loop):**  
"Mahout connects your Aim, your Path, your Elephant, and your Journal into guidance that actually fits your real life."

**Primary CTA:** "Join the waitlist"  
**Secondary CTA:** "See how it works"

**Hero visual:** Single phone mock on lavender background. Optional 8–12s loop video switching tabs. Gold halo around North Star or CTA only (once on load).

**Micro trust line:**  
"No accounts required. Local-first. Memory is yours to control."

---

### 3.2 The 5-Element Story (scrollytelling)

Each chapter: title, promise, 2–4 bullets, phone screenshot placeholder, thread line to next.

| Chapter | Title | Promise | Thread line |
|---------|-------|---------|-------------|
| **1. Elephant** | "Where are you right now?" | Your state isn't noise. It's the starting point. | When Elephant speaks, North Star listens. |
| **2. North Star** | "Future You opens the door." | Not a chatbot—an inner guide with receipts. | North Star turns feeling into a next step. |
| **3. Mahout (Journal)** | "Give the day words." | Reflection becomes clarity, not rumination. | When you name it, you can move with it. |
| **4. Path** | "Move one brick." | Progress becomes real because it leaves receipts. | Your time becomes visible. |
| **5. Aim** | "That brick belonged to something." | Effort connects back to meaning. | Meaning turns effort into direction. |

**Chapter bullets (implement in StoryScroll):**
- Elephant: 2-second mood check-in, optional intensity/note, starts guidance loop instantly
- North Star: Responds in right tone, offers one doorway (comfort/reflection/brick), suggests only what fits
- Mahout: Free journaling + prompts, 3-line templates for hard moments, optional voice journaling
- Path: Timer → session receipts, day map shows real life, manual log when needed
- Aim: Chief Aim anchors everything, goals show proof-based progress, no fake percentages

---

### 3.3 North Star Page (`/north-star`)

**Positioning (first paragraph):**  
North Star is your Future Self—built as a system. It reads your real receipts, chooses the right approach, speaks with calm clarity, turns chaos into one next step.

**"North Star isn't a chatbot" section — 3 layers:**
1. **Receipts (facts):** time logged, mood trends, journal cadence, goals
2. **Rules (deterministic):** calm-first vs act-first, tiny step vs normal step
3. **Language (AI):** the words, the warmth, the voice — AI writes, doesn't invent reality

**Modes (premium segmented control):**
- AUTO — Mahout chooses the right tone
- Work Focus — decisive, short, action-first
- Reflective — calm, meaning-first
- Motivator — identity + principles
- Problem Solving — blocker diagnosis
- Creative — vision + ideas

**Flows:** Morning letter, Night letter, Mood-trigger, User chat

**Conversation Ramp:** Connect → Clarify → Focus → Commit → Act → Reflect

**Brain section (trust-first):** Two-layer (user editable vs learned), candidate vs confirmed, deletion semantics.

**Privacy + safety:** local-first, no forced accounts, memory view+delete, crisis boundary.

---

### 3.4 Privacy Page (`/privacy`)

- Local-first stance
- Memory controls
- Delete semantics
- Data usage: what's stored, optional, never claimed
- Safety boundaries

---

### 3.5 Waitlist Page (`/waitlist`)

- Email field (required)
- Optional: "What do you want help with?" dropdown
- Optional: "iOS / Android" selector
- Success: "You're in. Want early access when it drops?"

---

## 4. SEO + Marketing Engine

### 4.1 Pillar Pages

- "Personal operating system app"
- "Future self app / future self journaling"
- "AI habit tracker with receipts"
- "Mood + productivity system"

### 4.2 Cluster Articles (blog)

- How to build consistency without motivation
- Why your habit tracker fails when your emotions spike
- The "one brick" method: tiny steps that compound
- Time-blocking without a calendar: day map method
- Future self coaching: how to make guidance actionable
- Local-first privacy in self-improvement apps
- How to recover after missing 3 days (re-entry plan)

### 4.3 On-Page SEO Checklist (every page)

- 1 H1 only, keyword-aware
- Clear H2 hierarchy
- Internal links: Home → How it works → North Star → Privacy
- Image alt text (UI + purpose)
- FAQ section with schema where applicable
- Fast load: optimize media, MP4/WebM loops

### 4.4 Schema.org

- Organization
- WebSite + SearchAction
- SoftwareApplication
- FAQPage
- Article (blog)
- BreadcrumbList

### 4.5 OG Image System

- Lavender background
- Gold halo for North Star pages only
- Strong headline + short subhead
- Minimal phone silhouette

### 4.6 Analytics (privacy-aware)

- CTA clicks
- Video play
- Scroll depth (25/50/75)
- Waitlist submit + completion
- Top exit section

---

## 5. MERN Technical Blueprint

### 5.1 Stack Recommendation

| Layer | Tech | Rationale |
|-------|------|-----------|
| Frontend | **Next.js** (React) | SSR/SSG for SEO; replace current Vite SPA |
| Backend | Node + Express (or Next API routes) | Waitlist, events |
| DB | MongoDB (Atlas) | Waitlist, feedback, events |
| Email | Postmark/Resend | Double opt-in for waitlist |
| Hosting | Vercel (frontend) + Render/Fly.io (API) | |

**Migration note:** Current `client/` is Vite + React Router. Spec requires Next.js for SEO. Options: (a) migrate to Next.js monorepo, (b) keep Vite but add prerender/SSR; recommended: migrate to Next.js.

### 5.2 MongoDB Data Models

```javascript
// WaitlistSignup
{
  email: String,        // unique
  createdAt: Date,
  source: String,       // utm_source
  campaign: String,
  refCode: String,
  platformPreference: String,  // android|ios|both
  primaryGoal: String,  // focus, anxiety, consistency, etc.
  status: String,      // pending, confirmed
  consent: Boolean     // true
}

// EventLog (optional)
{
  type: String,   // CTA_CLICK, VIDEO_PLAY, WAITLIST_SUBMIT
  page: String,
  ts: Date,
  sessionId: String,
  utm_source: String,
  utm_campaign: String
}
```

### 5.3 API Endpoints

- `POST /api/waitlist` — create signup
- `POST /api/waitlist/confirm` — double opt-in confirmation
- `POST /api/events` — analytics event capture
- `POST /api/contact` — optional

### 5.4 Performance Rules

- Static generate most pages
- `next/image` + modern formats
- Small MP4/WebM loops, lazy loaded
- Minimal JS hydration on landing
- Defer animation libs until after first interaction

---

## 6. Animation + Interaction Spec

### 6.1 Global Layout

- One-column mobile layout
- Sticky bottom CTA pill: "Join waitlist"
- Scroll progress: tiny lavender line (no percent)
- Section dividers: hairline borders; gold only in North Star

### 6.2 Hero Animation

- Lavender gradient shifts slowly (12–18s)
- Phone mock floats slightly (2–4px) on long loop
- CTA: gold shimmer on first load only (1 time)

### 6.3 Scrollytelling (5-element)

- Phone screenshot changes per chapter
- Chapter title fades in
- Thread line animates to next chapter

### 6.4 North Star Halo Moment

- Gold halo behind "North Star" header
- Fades as user scrolls past

### 6.5 Micro-Interactions

- Chips: inward shadow + lavender tint on press
- Cards: slight lift on touch
- FAQ expand: smooth height, no bounce

---

## 7. Launch + Iteration Plan

### Phase 1 (Week 1)

- [ ] Home + Waitlist + Privacy + North Star
- [ ] OG images + schema markup
- [ ] Analytics events

### Phase 2 (Week 2)

- [ ] How-it-works scrollytelling
- [ ] Blog foundation + 3 pillar posts

### Phase 3 (Week 3+)

- [ ] 2 posts/week
- [ ] A/B test hero headline + CTA label
- [ ] Improve conversion from scroll drop-off

---

## 8. Content Inventory (Placeholders)

**Required (user will add later):**

- 10–18 high-res app screenshots (phone-framed)
- 3 short screen recordings → WebM/MP4:
  - Path timer → session on day map
  - Elephant mood log → North Star response
  - North Star letter → action chip → Path timer
- App icon + wordmark
- 3 brand illustrations: Elephant, North Star, Brick

**Optional:** Founder portrait, testimonials (3 from friends/testers)

---

## 9. Suggested Repo Structure

```
apps/
  web/                          # Next.js app
    app/
      layout.tsx
      page.tsx                   # Home
      north-star/page.tsx
      how-it-works/page.tsx
      privacy/page.tsx
      waitlist/page.tsx
      blog/[slug]/page.tsx
      terms/page.tsx
      support/page.tsx
    components/
      Section.tsx
      PhoneFrame.tsx
      StoryScroll.tsx            # 5-chapter scrollytelling
      NorthStarModes.tsx
      WaitlistForm.tsx
      StickyCta.tsx
    lib/
      seo.ts
      schema.ts
      analytics.ts
    styles/
      tokens.css                  # Design tokens
    content/
      blog/*.mdx
api/                             # Or use Next.js API routes
  server/
    src/
      routes/waitlist.ts
      routes/events.ts
      db/mongo.ts
```

---

## 10. Implementation Checklist (Cursor)

Use this as the implementation order.

### 10.1 Foundation

- [ ] Create Next.js app (or migrate from Vite)
- [ ] Implement design tokens in `tokens.css`
- [ ] Set up typography (headline + body fonts)
- [ ] Build layout primitives: Container, Section, Card, Chip, PhoneFrame

### 10.2 Core Pages

- [ ] Home: Hero section
- [ ] Home: 5-element story (StoryScroll component)
- [ ] Home: North Star section
- [ ] Home: Trust + Privacy
- [ ] Home: Final CTA
- [ ] North Star page (full content)
- [ ] How it works page
- [ ] Privacy page
- [ ] Waitlist page + form

### 10.3 Conversion + Backend

- [ ] Waitlist form → MongoDB
- [ ] POST /api/waitlist
- [ ] POST /api/waitlist/confirm (double opt-in)
- [ ] POST /api/events
- [ ] Sticky bottom CTA
- [ ] Analytics events (CTA, video, scroll, waitlist)

### 10.4 SEO

- [ ] Metadata per page
- [ ] Sitemap
- [ ] robots.txt
- [ ] JSON-LD schema (Organization, WebSite, SoftwareApplication, FAQ)

### 10.5 Assets + Polish

- [ ] OG image generator (per page)
- [ ] Placeholder slots for images/videos
- [ ] Animation: hero gradient, phone float, CTA shimmer
- [ ] North Star halo moment
- [ ] Lighthouse pass (Performance ≥90, SEO ≥95, A11y ≥95)

---

## 11. Copy Reference (Quick Copy-Paste)

### Hero H1
"A personal operating system—guided by Future You."

### Hero Subhead
"Mahout connects your Aim, your Path, your Elephant, and your Journal into guidance that actually fits your real life."

### Trust Line
"No accounts required. Local-first. Memory is yours to control."

### CTA Primary
"Join the waitlist"

### CTA Secondary
"See how it works"

---

*End of handoff document. Implement in order; placeholders for images/videos throughout. User will supply assets later.*
