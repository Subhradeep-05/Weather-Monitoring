<div align="center">

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        ·  ·  ·  ·  ◌  ─────────────  ◌  ·  ·  ·  ·         ║
║     ·              ◌                  ◌              ·        ║
║   ·             ◌    ANCIENT  ROME      ◌             ·       ║
║  ·           ◌                             ◌           ·      ║
║  ·          ◌                               ◌          ·      ║
║  ·         ◌    ╔═══════════════════════╗    ◌         ·      ║
║  ·          ◌   ║  C · H · R · O · N   ║   ◌          ·      ║
║  ·           ◌  ║  · · O · S · · · ·   ║  ◌           ·      ║
║   ·             ╚═══════════════════════╝             ·       ║
║     ·              ◌    BELLE  ÉPOQUE  ◌              ·       ║
║        ·  ·  ·  ·  ◌  ─────────────  ◌  ·  ·  ·  ·         ║
║                                                               ║
║          L U X U R Y   T E M P O R A L   T R A V E L         ║
╚═══════════════════════════════════════════════════════════════╝
```

# ⟳ &nbsp; CHRONOS — Time Machine

> *"The present is merely a convention. We offer the entire continuum."*

&nbsp;

[![Made With Love](https://img.shields.io/badge/Made%20With-Love%20%26%20Vanilla%20JS-c9a84c?style=for-the-badge&labelColor=0a0806)](https://github.com)
[![HTML5](https://img.shields.io/badge/HTML5-Pure-E34F26?style=for-the-badge&logo=html5&logoColor=white&labelColor=0a0806)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white&labelColor=0a0806)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black&labelColor=0a0806)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

&nbsp;

[![Version](https://img.shields.io/badge/version-2.0.0-c9a84c?style=flat-square&labelColor=0a0806)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-c9a84c?style=flat-square&labelColor=0a0806)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square&labelColor=0a0806)](package.json)
[![Single File](https://img.shields.io/badge/build-single%20file-c9a84c?style=flat-square&labelColor=0a0806)](index.html)
[![Deploy Ready](https://img.shields.io/badge/deploy-ready-c9a84c?style=flat-square&labelColor=0a0806)](https://vercel.com)

&nbsp;

**A luxury temporal travel agency website — built with pure HTML, CSS & JavaScript.**
**No frameworks. No dependencies. No build steps. Just time.**

&nbsp;

[🚀 Live Demo](#-getting-started) &nbsp;·&nbsp; [🐛 Report Bug](../../issues) &nbsp;·&nbsp; [✨ Request Feature](../../issues)

</div>

---

<div align="center">

### ⟳ &nbsp; The clock is always running. &nbsp; ⟳

</div>

---

## 📋 &nbsp; Table of Contents

- [About The Project](#-about-the-project)
- [Feature Highlights](#-feature-highlights)
- [All Animations Documented](#-all-animations-documented)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Sections Overview](#-sections-overview)
- [Design System](#-design-system)
- [Customization Guide](#-customization-guide)
- [Browser Support](#-browser-support)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🕰️ &nbsp; About The Project

**CHRONOS** is a fully hand-crafted, single-file luxury landing page for a fictional temporal travel agency. It demonstrates everything possible with **zero dependencies** — no React, no Tailwind, no Vite, no bundler. One `.html` file. Open it. It works.

The design language draws from **Swiss haute horlogerie** — obsessive precision, gold-on-dark palette, mechanical motion, and the quiet confidence of a brand that has existed before you were born.

```
   Philosophy     →    Every animation has a reason
   Typography     →    Three fonts. Each with a role
   Color          →    Gold. Cream. Dark. Nothing else needs to exist
   Motion         →    15+ distinct animation systems running simultaneously
   Code           →    ~1,500 lines. One file. Zero build steps
```

This project is a reference for:
- 🎨 Advanced CSS animation techniques (keyframes, custom properties, transforms)
- 🖱️ Vanilla JS interaction patterns (cursor, observer, drag, parallax)
- 🏗️ Luxury web design layout systems
- ⚡ Single-file deployable architecture

---

## ✨ &nbsp; Feature Highlights

<table>
<tr>
<td width="50%">

### 🎬 Animations
- Page loader with spinning rings
- Smooth sweeping clock hands (50ms)
- 110-particle twinkling star field
- 60-mark tick ring rotation
- Floating era orbit labels
- Scroll progress bar
- Ring parallax on scroll
- Mouse-tracking bento glow
- Count-up statistics
- Staggered scroll reveals
- Loader bar sweep
- Hero glow pulse
- Scroll-drop line indicator
- Marquee tape scroll
- News ticker feed

</td>
<td width="50%">

### 🖱️ Interactions
- Custom gold cursor dot
- Lagging cursor ring
- Cursor expands on hover
- Nav blur on scroll
- Draggable horizontal timeline
- Link underline slide
- Card arrow reveal
- Destination card hover lift
- Timeline dot fill on hover
- Bento card bg shift
- Stat cell bottom border
- Form input border glow
- Button wipe-fill animation
- Testimonial card deepen
- Footer link color shift

</td>
</tr>
</table>

---

## 🎞️ &nbsp; All Animations Documented

> Every animation in the project — what it does, how it works, and the code behind it.

---

### 1. &nbsp; Page Loader

Three concentric rings spin in alternating directions while a gold sweep bar indicates loading progress. Fades out after `2600ms`.

```
  ◌ ────── rotating rings ────── ◌
        ●  loader dot center
  ════════ sweep bar ════════════
  Calibrating Temporal Coordinates…
```

```css
/* Ring spin keyframe — all three reuse this */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Each ring at different speed + direction */
.loader-ring:nth-child(1) { animation-duration: 3s; }
.loader-ring:nth-child(2) { animation-duration: 2s; animation-direction: reverse; }
.loader-ring:nth-child(3) { animation-duration: 1.5s; }

/* Sweep bar — CSS-only shimmer */
@keyframes barSweep {
  from { left: -100%; }
  to   { left:  100%; }
}
```

```javascript
// Hides after fonts + DOM are ready
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 2600);
});
```

---

### 2. &nbsp; Real-Time Clock Hands (Smooth Sweep)

Unlike a standard 1-second tick, this clock updates every **50ms** using `Date.getMilliseconds()` to interpolate between seconds — producing a perfectly smooth, continuous sweep.

```
  Standard tick:   ──┐  ──┐  ──┐  (steps)
  CHRONOS sweep:   ─────────────  (fluid)
```

```javascript
function updateClocks() {
  const now = new Date();
  const h  = now.getHours() % 12;
  const m  = now.getMinutes();
  const s  = now.getSeconds();
  const ms = now.getMilliseconds();

  // KEY: add the fractional millisecond to each unit
  const sSmooth = s  + ms / 1000;     // e.g. 34.726 seconds
  const mSmooth = m  + sSmooth / 60;  // e.g. 22.579 minutes
  const hSmooth = h  + mSmooth / 60;  // e.g.  7.376 hours

  const hDeg = hSmooth / 12 * 360;   // 0–360
  const mDeg = mSmooth / 60 * 360;
  const sDeg = sSmooth / 60 * 360;

  document.getElementById('hourHand').style.transform   = `rotate(${hDeg}deg)`;
  document.getElementById('minuteHand').style.transform = `rotate(${mDeg}deg)`;
  document.getElementById('secondHand').style.transform = `rotate(${sDeg}deg)`;
}

setInterval(updateClocks, 50); // 50ms = imperceptibly smooth
```

---

### 3. &nbsp; Star Field (110 Particles)

Each star is an absolutely positioned `<div>` injected by JavaScript with randomised size, position, animation duration, and delay. The `twinkle` keyframe scales and fades each star independently.

```css
@keyframes twinkle {
  0%,  100% { opacity: 0.06; transform: scale(1);   }
  50%       { opacity: 0.5;  transform: scale(1.6); }
}
```

```javascript
for (let i = 0; i < 110; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2 + 0.4;
  star.style.cssText = `
    width:             ${size}px;
    height:            ${size}px;
    left:              ${Math.random() * 100}%;
    top:               ${Math.random() * 100}%;
    animation-duration:${Math.random() * 4 + 2}s;
    animation-delay:   ${Math.random() * 6}s;
    opacity:           ${Math.random() * 0.3 + 0.06};
  `;
  container.appendChild(star);
}
```

---

### 4. &nbsp; Rotating Rings with Tick Marks

Five concentric `<div>` rings rotate at different speeds and directions using the same `spin` keyframe. Sixty tick marks are injected into the outermost ring via JS — alternating major (5-minute) and minor (1-minute) marks.

```
  Ring 1: 130s  clockwise        ←  outermost, slowest
  Ring 2:  95s  counter-clockwise
  Ring 3:  65s  clockwise
  Ring 4:  40s  counter-clockwise
  Ring 5:  25s  clockwise        ←  innermost, fastest
```

```javascript
// Build 60 tick marks
for (let i = 0; i < 60; i++) {
  const tick = document.createElement('div');
  tick.className = 'tick ' + (i % 5 === 0 ? 'major' : 'minor');
  tick.style.transform = `rotate(${i * 6}deg)`; // 360 / 60 = 6deg per mark
  ringEl.appendChild(tick);
}
```

```css
.tick.major { width: 2px; height: 14px; opacity: 0.5; }
.tick.minor { width: 1px; height: 7px;  opacity: 0.2; }
```

---

### 5. &nbsp; Scroll-Driven Ring Parallax

On every `scroll` event, each ring receives an additional `rotate()` transform proportional to `window.scrollY`. Each ring uses a different speed multiplier — creating a depth illusion as you scroll.

```javascript
window.addEventListener('scroll', () => {
  document.querySelectorAll('.ring').forEach((ring, index) => {
    const speed = (index + 1) * 0.04; // 0.04, 0.08, 0.12, 0.16, 0.20
    ring.style.transform = `rotate(${window.scrollY * speed}deg)`;
  });
}, { passive: true }); // passive: true = no scroll jank
```

```
  scroll 100px →  ring 1 rotates   4deg
                  ring 2 rotates   8deg
                  ring 3 rotates  12deg
                  ring 4 rotates  16deg
                  ring 5 rotates  20deg
```

---

### 6. &nbsp; Custom Cursor with Lagging Ring

The cursor is split into two elements: a small dot that follows the mouse exactly, and a larger ring that follows with inertia — creating a smooth lag effect using linear interpolation (`lerp`).

```javascript
let mx=0, my=0, rx=0, ry=0;

// Dot: instant
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

// Ring: lerp toward dot position each frame
(function animateRing() {
  rx += (mx - rx) * 0.11; // 0.11 = lerp factor (lower = more lag)
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// Expand on interactive elements
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expand'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});
```

---

### 7. &nbsp; Scroll Progress Bar

A `1px` fixed bar at the very top of the viewport. Its width is a percentage of how far the user has scrolled through the total document height.

```javascript
window.addEventListener('scroll', () => {
  const scrolled    = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const pct         = (scrolled / totalHeight) * 100;

  document.getElementById('scroll-prog').style.width = pct + '%';
}, { passive: true });
```

```css
#scroll-prog {
  position: fixed; top: 0; left: 0;
  height: 1px; width: 0%;
  background: linear-gradient(to right, var(--copper), var(--gold), var(--gold-light));
  box-shadow: 0 0 6px rgba(201,168,76,0.5);
  transition: width 0.1s linear;
  z-index: 999;
}
```

---

### 8. &nbsp; Mouse-Tracking Bento Glow

Each feature card tracks mouse position as CSS custom properties (`--mx`, `--my`). These drive a `radial-gradient` that follows the cursor, creating a torch-light effect.

```javascript
card.addEventListener('mousemove', e => {
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
  const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
  card.style.setProperty('--mx', x + '%');
  card.style.setProperty('--my', y + '%');
});
```

```css
.bento-card::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    rgba(201,168,76, 0.06),
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.4s;
}
.bento-card:hover::before { opacity: 1; }
```

---

### 9. &nbsp; Count-Up Statistics

Numbers count from `0` to their target when they enter the viewport. Uses `IntersectionObserver` (fires once) + `setInterval` for the animation loop. Large numbers get smart formatting.

```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target); // e.g. 4700000000
    let current  = 0;
    const step   = target / (1800 / 16); // finish in ~1800ms at 60fps

    const format = n => {
      if (target >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B+';
      if (target >= 1_000)         return Math.floor(n).toLocaleString();
      return Math.floor(n).toString();
    };

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = format(current);
      if (current >= target) clearInterval(timer);
    }, 16);

    observer.unobserve(el); // fire once only
  });
}, { threshold: 0.5 });
```

---

### 10. &nbsp; Staggered Scroll Reveal (3 Directions)

Three reveal classes animate in from different directions. Each uses a single `IntersectionObserver`. Transition delays on siblings create a stagger cascade.

```css
/* Base state — hidden */
.reveal   { opacity: 0; transform: translateY(32px); }
.reveal-l { opacity: 0; transform: translateX(-32px); }
.reveal-r { opacity: 0; transform: translateX(32px);  }

/* Revealed state */
.reveal.visible,
.reveal-l.visible,
.reveal-r.visible {
  opacity: 1;
  transform: none;
  transition: opacity 0.85s ease, transform 0.85s ease;
}
```

```html
<!-- Stagger siblings with transition-delay -->
<h2 class="reveal"                          >Title</h2>
<p  class="reveal" style="transition-delay:.15s">Body</p>
<div class="reveal" style="transition-delay:.3s">Card</div>
```

---

### 11. &nbsp; Draggable Horizontal Timeline

The milestone timeline is a horizontally scrollable track. A mousedown listener captures the start position; mousemove calculates the delta and applies it to `scrollLeft`; mouseup releases.

```javascript
const track = document.getElementById('htlTrack');
let isDragging  = false;
let startX      = 0;
let scrollStart = 0;

track.addEventListener('mousedown', e => {
  isDragging  = true;
  startX      = e.pageX - track.offsetLeft;
  scrollStart = track.scrollLeft;
  track.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const delta = e.pageX - track.offsetLeft - startX;
  track.scrollLeft = scrollStart - delta;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  track.style.cursor = 'grab';
});
```

```css
.htl-track {
  cursor: grab;
  overflow-x: auto;
  scroll-snap-type: x mandatory; /* snap to each card */
  scrollbar-width: none;         /* hide scrollbar */
}
.htl-item { scroll-snap-align: start; }
```

---

### 12. &nbsp; Button Wipe-Fill Animation

Buttons use a `::before` pseudo-element that scales from `scaleX(0)` to `scaleX(1)` on hover — creating a left-to-right fill wipe. The label text sits above it on `z-index: 1`.

```css
.btn-primary {
  position: relative;
  overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--cream);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  z-index: 0;
}
.btn-primary:hover::before { transform: scaleX(1); }
.btn-primary span           { position: relative; z-index: 1; }
```

---

### 13. &nbsp; Marquee Tape

The gold marquee band contains a `<div>` with `width: max-content` that animates from `translateX(0)` to `translateX(-50%)`. Content is duplicated (×4) so it loops seamlessly.

```css
.marquee-track {
  display: flex;
  width: max-content;
  animation: marq 28s linear infinite;
}

@keyframes marq {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); } /* -50% because content is 2× duplicated */
}
```

```javascript
// Duplicate content 4× for seamless loop
for (let repeat = 0; repeat < 4; repeat++) {
  items.forEach(text => {
    const span = document.createElement('span');
    span.innerHTML = text + ' <span>✦</span> ';
    track.appendChild(span);
  });
}
```

---

### 14. &nbsp; Floating Era Labels

Six `<span>` elements positioned absolutely at clock-face compass points. Each fades in with a staggered `animation-delay` after the hero loads.

```css
.era-label:nth-child(1) { top: 8%;   left: 50%; transform: translateX(-50%); animation-delay: 2.0s; }
.era-label:nth-child(2) { right: 6%; top: 32%;                                animation-delay: 2.2s; }
.era-label:nth-child(3) { right: 6%; bottom: 32%;                             animation-delay: 2.4s; }
.era-label:nth-child(4) { bottom: 8%; left: 50%; transform: translateX(-50%); animation-delay: 2.6s; }
.era-label:nth-child(5) { left: 6%;  bottom: 32%;                             animation-delay: 2.8s; }
.era-label:nth-child(6) { left: 6%;  top: 32%;                                animation-delay: 3.0s; }

@keyframes fadeIn { to { opacity: 1; } }
```

---

### 15. &nbsp; Scroll-Drop Line Indicator

The hero's scroll cue uses a `scaleY` animation with changing `transform-origin` to create a line that grows downward, then shrinks away from the bottom — simulating a falling droplet.

```css
@keyframes scrollDrop {
  0%  { opacity: 0; transform: scaleY(0); transform-origin: top;    }
  40% { opacity: 1; transform: scaleY(1);                           }
  80% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
  100%{ opacity: 0;                                                  }
}

.scroll-line {
  width: 1px; height: 55px;
  background: linear-gradient(to bottom, var(--gold), transparent);
  animation: scrollDrop 2.5s ease-in-out infinite;
}
```

---

## 🛠️ &nbsp; Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | `HTML5` | Semantic elements throughout |
| Styling | `CSS3` | Custom properties, Grid, Flexbox, `@keyframes` |
| Scripting | `Vanilla JS` | ES6+, no transpilation needed |
| Fonts | `Google Fonts` | Cormorant Garamond, Bebas Neue, DM Mono |
| Icons | `Unicode` | No icon library — `⟳ ◈ ⧖ ✦ ⬡` etc. |
| Images | `None` | All visuals are pure CSS |
| Build | `None` | Zero build step — open and run |
| Dependencies | `0` | Literally zero |

---

## 📁 &nbsp; Project Structure

```
chronos-time-machine/
│
├── index.html          ← Entire site (markup + styles + scripts)
├── README.md           ← This file
└── LICENSE             ← MIT License
```

> **Why one file?** Intentional. Zero build complexity, trivial deployment, and a demonstration that great things don't require scaffolding.

---

## 🚀 &nbsp; Getting Started

### Prerequisites

```
A web browser.
That's it.
```

### Run Locally

```bash
# 1. Clone
git clone https://github.com/your-username/chronos-time-machine.git
cd chronos-time-machine

# 2a. Just open it
open index.html

# 2b. Or serve (for font loading from Google Fonts)
npx serve .
# → http://localhost:3000

# 2c. Python alternative
python -m http.server 8000
# → http://localhost:8000
```

> **Note:** Google Fonts requires a server context to load (CORS). For purely offline use, download the fonts and update the `@import` URL.

---

## ☁️ &nbsp; Deployment

Zero configuration on all platforms:

```bash
# ── Vercel ──────────────────────────────────────
vercel --prod

# ── Netlify ─────────────────────────────────────
# Drag & drop index.html at: netlify.com/drop

# ── GitHub Pages ────────────────────────────────
# Repo → Settings → Pages → Deploy from: main /root

# ── Cloudflare Pages ────────────────────────────
# Connect repo → Framework: None → Build command: (empty)

# ── Surge.sh ────────────────────────────────────
npx surge . your-subdomain.surge.sh
```

---

## 🗺️ &nbsp; Sections Overview

| # | Section | Layout | Key Feature |
|---|---------|--------|-------------|
| 1 | **Hero** | Full viewport | 5 rotating rings + real-time clock + star field |
| 2 | **Marquee Band** | Full-width strip | Gold scrolling tape |
| 3 | **Stats Row** | 4-column grid | Count-up animation on scroll |
| 4 | **About** | 50/50 split | Decorative clock rings + spec list |
| 5 | **Features** | Bento grid | Mouse-tracking radial glow per card |
| 6 | **Horiz. Timeline** | Drag-scroll | Draggable horizontal milestone track |
| 7 | **Vert. Timeline** | Left-border | Dot fills on hover, staggered reveal |
| 8 | **Quote** | Centered | Oversized decorative quote mark |
| 9 | **Destinations** | `2fr 1fr 1fr` | Asymmetric grid, arrow reveals |
| 10 | **Testimonials** | 2×2 grid | Star ratings, avatar initials |
| 11 | **Booking** | 50/50 split | 6-field form + guarantee badges |
| 12 | **Footer** | 4-column | Social links + legal |
| — | **Ticker** | Fixed bottom | Live news feed |
| — | **Live Clock** | Fixed corner | Real-time date + time |
| — | **Scroll Bar** | Fixed top | Gold progress indicator |

---

## 🎨 &nbsp; Design System

### Color Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--gold` | `#c9a84c` | Primary accent — all highlights, borders, hands |
| `--gold-light` | `#e8d08a` | Hover states, hand tip gradients |
| `--copper` | `#8b4a1c` | Timeline years, gradient terminus |
| `--cream` | `#f5f0e8` | Primary text, headings |
| `--dark` | `#0a0806` | Base background |
| `--dark2` | `#100d08` | Cards, secondary sections |
| `--dark3` | `#1a150e` | Hover card states |
| `--dark4` | `#221a10` | Deepest layer |
| `--text-dim` | `#7a6a52` | Body text, descriptions |
| `--text-mid` | `#a08860` | Mid-level text |
| `--red` | `#c0392b` | Second hand accent |

### Typography

```
┌─────────────────────────────────────────────────────┐
│  Bebas Neue          — DISPLAY HEADINGS · NUMBERS   │
│  Cormorant Garamond  — Body text, italic prose      │
│  DM Mono             — Labels, tags, UI chrome      │
└─────────────────────────────────────────────────────┘
```

### Spacing Scale

```css
/* Sections */    padding: 8rem 5rem;
/* Cards */       padding: 3.5rem;
/* Grid gaps */   gap: 1px;                /* border-as-gap pattern */
/* Nav */         padding: 1.8rem 5rem;
```

### Border Color System

```css
/* The further from primary, the more transparent */
rgba(201,168,76, 0.08)  /* subtle dividers */
rgba(201,168,76, 0.15)  /* card borders */
rgba(201,168,76, 0.25)  /* form inputs */
rgba(201,168,76, 0.45)  /* hover states */
rgba(201,168,76, 1.00)  /* active / focused */
```

---

## 🔧 &nbsp; Customization Guide

### Change Brand Name
Search and replace `CHRONOS` throughout `index.html`.

### Change Accent Color

```css
/* In :root — one change updates everything */
:root {
  --gold: #c9a84c; /* ← your new accent color */
}
```

### Add a Destination Card

```html
<div class="dest-card" data-year="YOUR_YEAR">
  <div class="dest-era">Era · Year</div>
  <div class="dest-name">Place<br>Name</div>
  <p class="dest-desc">Description of the expedition.</p>
  <div class="dest-tags">
    <span class="dest-tag">Tag 1</span>
    <span class="dest-tag">Tag 2</span>
  </div>
  <div class="dest-arrow">→</div>
</div>
```

### Add a Timeline Entry

```html
<div class="timeline-item">
  <div class="timeline-dot"></div>
  <div class="tl-year">YEAR</div>
  <div class="tl-title">Event Title</div>
  <p class="tl-desc">What happened here.</p>
</div>
```

### Adjust Animation Speeds

```css
/* Rings */
.ring:nth-child(1) { animation-duration: 130s; } /* slower = more elegant */

/* Marquee */
.marquee-track { animation: marq 28s linear infinite; } /* higher = slower */

/* Cursor lag — in JS */
rx += (mx - rx) * 0.11; /* lower = more lag (0.05 is very dreamy) */
```

---

## 🌐 &nbsp; Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| Opera | 76+ | ✅ Full support |
| IE | Any | ❌ Not supported |

**Required browser features:**

```
CSS Custom Properties      →  color theming
CSS Grid & Flexbox         →  all layouts
CSS Animations & Keyframes →  all motion
IntersectionObserver API   →  scroll reveals, count-up
requestAnimationFrame      →  cursor lag
backdrop-filter            →  nav blur (graceful degradation)
```

---

## ⚡ &nbsp; Performance

| Metric | Value | Notes |
|--------|-------|-------|
| HTTP requests | **1** | Single HTML file |
| External JS | **0** | Zero JS dependencies |
| Images | **0** | All visuals are CSS |
| Font requests | **1** | All 3 fonts in one Google Fonts call |
| Total lines | **~1,500** | HTML + CSS + JS |
| Time to interactive | **< 1s** | On fast connection |
| Build step | **None** | Open and run |

---

## 🤝 &nbsp; Contributing

Contributions, issues and feature requests are welcome.

```bash
# Fork → Clone → Branch → Change → PR

git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
# → Open a Pull Request
```

**Ideas welcome:**
- New destination cards
- Additional animation systems
- Mobile responsiveness improvements
- Dark/light mode toggle
- CSS-only version (no JS)

---

## 📜 &nbsp; License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 🙏 &nbsp; Acknowledgements

- Aesthetic inspired by Swiss **haute horlogerie** — Patek Philippe, Vacheron Constantin, A. Lange & Söhne
- Typography via [Google Fonts](https://fonts.google.com) — Cormorant Garamond, Bebas Neue, DM Mono
- Concept drawn from H.G. Wells' *The Time Machine* (1895)
- Grain texture via inline SVG `feTurbulence` filter

---

<div align="center">

```
  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
              ⟳   Every second is a destination.   ⟳
  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
```

**CHRONOS** &nbsp;·&nbsp; Est. MMXXVI &nbsp;·&nbsp; Temporal Navigation Co.

*Made with obsessive attention to detail and zero dependencies.*

&nbsp;

[![Back to Top](https://img.shields.io/badge/↑-Back%20to%20Top-c9a84c?style=flat-square&labelColor=0a0806)](#-chronos--time-machine)

</div>
