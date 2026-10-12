/*
 * Part of ascii.rest by @bas3line (https://github.com/bas3line), MIT licensed.
 * Vendored copy, trimmed: the upstream file maps all 217 pieces; this one maps only the pieces copied into ./pieces.
 */
/** Every piece by file name, each loaded only when asked for. */
export const load = {
    "java": () => import("./pieces/java.js"),
    "kotlin": () => import("./pieces/kotlin.js"),
    "terminal": () => import("./pieces/terminal.js"),
    "typewriter": () => import("./pieces/typewriter.js"),
    "uptime-bar": () => import("./pieces/uptime-bar.js"),
};
/** Every piece's file name. */
export const names = Object.keys(load);
/** The coloured pieces, which draw on a <canvas> rather than a <pre>. */
export const canvas = new Set(["java", "kotlin"]);
/** Whether a name is a piece in the library. */
export const isPiece = (name) => Object.hasOwn(load, name);
