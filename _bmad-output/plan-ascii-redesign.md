---
title: 'ASCII/terminal redesign of the portfolio page with ascii.rest pieces'
type: 'feature'
ticket: ''
created: '2026-10-12'
status: 'built'
baseline_revision: '6583ed056e0430b135850c2b21588c8f1ae026b5'
route: 'full'
route_source: 'auto'
review: 'quick'
review_source: 'pinned'
lenses_ran: ['quick']
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The portfolio at `index.html` uses a generic dark "gradient + glow + rounded card" look. Ilia wants it redesigned in an ASCII/terminal style built with elements from https://ascii.rest/.

**Approach:** Restyle the single page as a terminal: monospace type, box-drawing frames, prompt-style headings, no gradients, glow or rounded corners. Add a small number of animated ascii.rest pieces as decoration next to the existing content.

## Boundaries & Constraints

**Always:**
- Every existing piece of content stays as real HTML text and working links: hero headline, "Open for Work" badge, CV download, LinkedIn, three about cards, all tech stack tags with their links, four highlights, AI focus, contact email and LinkedIn, footer.
- The site stays plain static HTML/CSS/JS with no build step, served by GitHub Pages as-is.
- ASCII pieces are decoration: each has a `label`, and the page reads correctly and completely when a piece fails to load or JavaScript is off.
- Usable from 360px wide upward with no horizontal page scroll.
- Motion respects `prefers-reduced-motion`.

**Never:**
- No framework, bundler, npm dependency or new page.
- No rewriting of the copy, and no changes to `assets/about_me.md`, `README.md` or the CV file.
- No ASCII art that replaces text a visitor or scraper needs to read.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Normal load | Desktop browser, JS on | Terminal-styled page; pieces animate | No error expected |
| Piece unavailable | An ascii.rest module fails to load | The piece's slot shows its static fallback or collapses; all content still visible | Loader's `console.warn` only |
| No JavaScript | JS disabled | All sections visible (nothing stuck at `opacity: 0`), static fallbacks shown | None |
| Narrow screen | 360px viewport | Single column, wide pieces hidden or scaled, no horizontal scroll | None |
| Reduced motion | `prefers-reduced-motion: reduce` | Pieces hold a still frame; CSS transitions off | None |

## Decisions

- **Loading:** vendor the ascii.rest loader and the used pieces into `assets/ascii/` with the MIT notice; no runtime request to ascii.rest.
- **Palette:** amber on black.
- **Hero visual:** keep the photo, squared, in an ASCII frame, and add an animated `terminal` piece beside it.
- **Plan size:** kept above the 1,600-token guideline by choice.

</frozen-after-approval>

## Code Map

- `index.html` -- 236 lines, one page. Sections: `.navbar`, `.hero` (text + `.hero-visual` holding `assets/IMG_9956.jpeg` and `.glow-circle`), `#about` (3 `.about-card`), `#stack` (5 `.stack-category` with `.tag` links), `#experience` (`.timeline`, 4 items), `#ai-focus` (`.focus-card`), `#contact` (`.contact-box`), `footer`. Head loads Google Fonts (Inter, Outfit) and Font Awesome 6.4 from CDNs; both go.
- `style.css` -- 584 lines, tokens in `:root` (lines 2-13). To be rewritten around a monospace stack and a small terminal palette. Drop `.gradient-text`, `.glow-circle`, `.mouse`, `border-radius`, `backdrop-filter`. Keep the breakpoint at 768px.
- `script.js` -- 21 lines. IntersectionObserver adds `.visible` to `.fade-in-on-scroll`; keep the mechanism, but hidden-by-default must apply only when JS has run (add a `js` class on `<html>`).
- ascii.rest (MIT, github.com/bas3line/ascii) -- `ascii.js` (fetch from `https://ascii.rest/`, vendor to `assets/ascii/`) defines `<ascii-art piece= options= fps= label= mono>` and `<ascii-banner text= font= color=>`. Loader imports `banner.js`, `library.js`, `mount.js` and `pieces/<name>.js` lazily; the pieces inspected have no imports of their own. Text pieces render in a `<pre>` sized by `font-size`; coloured pieces render on a `<canvas>` sized by `width` (never set height). Colours must be six-digit hex. The loader keeps the element's existing children until the piece is ready, so children are the fallback. `mount.js` already handles reduced motion and pauses off-screen.
- Vendoring: copy `ascii.js`, `banner.js`, `library.js`, `mount.js`, every module they import, the font `fonts/ascii-rest-mono.woff2`, and `pieces/<name>.js` for the used pieces only. `ascii.js` hardcodes the font URL on ascii.rest and `library.js` maps all 217 names: point the font at the local copy and trim the map to the vendored pieces. The `terminal` piece's session is a hardcoded `SESSION` array (`ls`, `cat todo.txt`): rewrite it in the vendored copy with commands about Ilia (`whoami`, stack, uptime).
- Pieces confirmed to exist: `kotlin`, `java`, `typewriter` (options `prefix`, `phrases`), `scramble` (`phrases`), `uptime-bar` (`services`, 64x15), `boot-log` (64x16), `terminal` (`prompt`, `title`), `gauge`, `sparkline`, `dividers`, `box-frames`, `big-text`.

## Tasks & Acceptance

**Execution:**
- [x] `assets/ascii/` -- vendor the loader, its imports, the font and the used pieces; add `LICENSE` (MIT, bas3line) and a short `README.md` naming the source and what was changed; trim `library.js`, localise the font URL, rewrite the `terminal` session -- no third-party runtime dependency.
- [x] `index.html` -- remove Google Fonts and Font Awesome links; replace icons with text glyphs; add `<script type="module" src="assets/ascii/ascii.js">`; restructure sections as terminal panels with prompt-style headings (`$ cat about.txt`); place pieces: `typewriter` under the hero headline, framed photo plus the `terminal` piece in the hero visual, `kotlin` and `java` logos beside the stack, `uptime-bar` beside the highlights; give each piece a `label` and static fallback children -- structure and content of the redesign.
- [x] `style.css` -- rewrite: monospace font stack, terminal palette tokens, box-drawing borders via CSS (`border` + corner glyphs or `::before` titles), square corners, underline/invert hover states, focus-visible outlines, responsive rules at 768px and 420px, `prefers-reduced-motion` block, `.js`-scoped scroll reveal -- the look.
- [x] `script.js` -- set the `js` class on `<html>`, keep the observer, update the console greeting colour -- no-JS safety.
- [x] `index.html`, `style.css` -- verify the I/O matrix rows in a browser at 1280px and 360px, with a piece file blocked, and with JS off -- edge cases.

**Acceptance Criteria:**
- Given the page is open on desktop, when it finishes loading, then no gradient, glow, rounded corner or proportional font remains, at least four ascii.rest pieces animate, and the network log shows no request to any host other than the page's own.
- Given the old and new `index.html`, when their visible text and `href`s are compared, then every link and every sentence of the old page is present in the new one.
- Given a keyboard user, when they tab through the page, then every link shows a visible focus state.

## Implementation Notes

- Vendored pieces: `typewriter`, `terminal`, `kotlin`, `java`, `uptime-bar` (five; `banner.js` is kept unmodified because `ascii.js` imports it).
- `script.js` is loaded in `<head>` without `defer` so the `js` class is set before first paint.
- Old headings stay as real `<h2>` text; the `$ cat about.txt` lines are `aria-hidden` decoration above them.
- The navbar is sticky on desktop and static (wrapping, links kept visible) at 768px and below.
- At 420px and below the `terminal` and `uptime-bar` pieces are hidden; above that they scale with container query units.
- The photo is drawn greyscale multiplied onto amber; hover shows the original.
- Font Awesome icons became text glyphs, so the footer reads "Built with </> & <3".

## Plan Change Log

## Review Triage Log

### Pass 1 (quick lens) — high 0, medium 1, low 4, false 0, maybe-false 0; 1 low rejected

| # | Finding | Verdict | Route | Evidence |
|---|---------|---------|-------|----------|
| 1 | `uptime-bar` piece shows simulated outages and sub-99.9% figures beside the "99.9% availability" claim | medium | patch | Confirmed: upstream `RATES` in `assets/ascii/pieces/uptime-bar.js` generate degraded and down days; the 1280px screenshot shows "99.82% uptime". Fix: zero the outage rates in the vendored copy and note it in the README. |
| 2 | OFL licence for the JetBrains Mono subset font is not shipped | low | patch | Confirmed: `assets/ascii/` holds only the MIT `LICENSE`; README names the font as OFL. Fix: add the OFL text with the JetBrains Mono copyright notice. |
| 3 | `@font-face` for "ascii.rest mono" declared in both `style.css` and the loader | low | rejected | Confirmed but with no user-visible effect: same-origin, cached, 3 KB. Removing either copy breaks the no-JS fallback or widens the divergence from upstream. |
| 4 | Empty grid row and 40px gap under the highlights at 420px and below | low | patch | Confirmed: `.piece-uptime` is hidden but its wrapper `.uptime-slot` remains a grid item. Fix: hide the wrapper. |
| 5 | Photo frame caption "350x350" and `width`/`height` attributes do not match the image | low | patch | Confirmed: the JPEG is 1261x1681. Fix: use the real dimensions. |
| 6 | Timeline tick sits about 3px left of the rule | low | patch | Confirmed: `::before` uses `left: -3ch` at 1.05rem while the padding is `3ch` at the body size. Fix: same font size for both. |

Patches 1, 2, 4, 5 and 6 were applied by the implementer and re-verified: Node simulation of the uptime piece over 600s shows only "100.00% uptime" and no degraded frame; in Chrome at 1280px all five pieces mount, the tick offset equals the timeline padding (27.0px), the photo renders 208x208 with the caption "1261x1681", and every request stays on the page's own host.

## Design Notes

Real text is the content; a piece only ever sits beside it. Example of the fallback pattern:

```html
<ascii-art piece="uptime-bar" options='{"services":["api","reports","records"]}'
           label="Animated uptime bars">
  <pre>api      ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 99.9%</pre>
</ascii-art>
```

Coloured logos (`kotlin`, `java`) draw on a canvas: size them with CSS `width` only.

## Verification

**Commands:**
- `python3 -m http.server 8000` -- expected: page serves at http://localhost:8000 with no 404 in the network log except deliberately blocked requests.

**Manual checks (if no CLI):**
- Browser at 1280px and 360px: layout, no horizontal scroll, pieces animate, console has no errors.
- JS disabled: all sections visible.
- Text and link comparison against `git show main:index.html`.
