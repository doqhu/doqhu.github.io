# Vendored ascii.rest files

Source: https://ascii.rest/ (repository: https://github.com/bas3line/ascii), by @bas3line, MIT licensed. See `LICENSE`.
Fetched from https://ascii.rest/ on 2026-10-12. The page loads everything from this folder; nothing is requested from ascii.rest at runtime.

## Files

- `ascii.js` -- the loader; defines `<ascii-art>` and `<ascii-banner>`.
- `banner.js`, `library.js`, `mount.js` -- the loader's imports.
- `pieces/` -- only the pieces the page uses: `java`, `kotlin`, `terminal`, `typewriter`, `uptime-bar`.
- `fonts/ascii-rest-mono.woff2` -- a 3 KB cut of JetBrains Mono holding the box-drawing and block glyphs. JetBrains Mono is under the SIL Open Font License 1.1, not MIT: its licence and copyright notice are in `fonts/OFL.txt`.

## Changes from upstream

- `ascii.js`: the `@font-face` URL points at `./fonts/ascii-rest-mono.woff2` (resolved against the module) instead of `https://ascii.rest/fonts/...`.
- `library.js`: the piece map and the `canvas` set are trimmed from all 217 pieces to the five in `pieces/`.
- `pieces/terminal.js`: the hardcoded `SESSION` and the default `prompt` and `title` are rewritten with commands about Ilia.
- `pieces/uptime-bar.js`: the degraded and outage `RATES` are zeroed, so every simulated day is operational.

All other files are unmodified copies. To add a piece, copy `https://ascii.rest/pieces/<name>.js` into `pieces/` and add it to `library.js`.
