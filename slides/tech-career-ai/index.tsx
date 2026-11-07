import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  Step,
  Steps,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import winlabBuilding from './assets/winlab-building.jpg';
import winlabLogo from './assets/winlab-logo.jpg';

/* ───────────────────────── design ───────────────────────── */

export const design: DesignSystem = {
  palette: { bg: '#03050C', text: '#F3F6FC', accent: '#FF8A4C' },
  fonts: {
    display: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    body: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 136, body: 36 },
  radius: 16,
};

const C = {
  muted: '#A9B7D9',
  dim: '#6E7BA0',
  gold: '#FFC56B',
  teal: '#4FD1C5',
  red: '#FF5D6C',
  amber: '#FFB547',
  green: '#5BE49B',
  panel: 'rgba(255, 255, 255, 0.045)',
  line: 'rgba(169, 183, 217, 0.22)',
};
const mono = '"Departure Mono", ui-monospace, "SF Mono", Menlo, monospace';
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

/* ───────────────────────── transitions ───────────────────────── */

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const settle: SlideTransition = {
  duration: 280,
  exit: { duration: 280, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 280,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

/* ───────────────────────── shared styles ───────────────────────── */

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.01em',
};

const CSS = `
@keyframes tc-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
@keyframes tc-pop { from { opacity: 0; transform: translateX(-90px) scale(0.9); } to { opacity: 1; transform: none; } }
@keyframes tc-badge { from { opacity: 0; transform: scale(0) rotate(-120deg); } to { opacity: 1; transform: none; } }
@keyframes tc-glow { 0%, 100% { box-shadow: 0 0 0 0 var(--g0); } 50% { box-shadow: 0 0 48px 6px var(--g1); } }
@keyframes tc-line { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes tc-travel { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: calc(100% - 20px); opacity: 0; } }
@keyframes tc-shimmer { 0%, 60% { transform: translateX(-160%) skewX(-18deg); } 100% { transform: translateX(520%) skewX(-18deg); } }
@keyframes tc-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
@keyframes tc-wave { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-12px); } }
@keyframes tc-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-26px) rotate(4deg); } }
@keyframes tc-drift { from { background-position: 0 0; } to { background-position: 80px 80px; } }
@keyframes tc-up { from { opacity: 0; transform: translateY(46px) scale(0.94); } to { opacity: 1; transform: none; } }
@keyframes tc-chip { from { opacity: 0; transform: scale(0) rotate(-24deg); } to { opacity: 1; transform: none; } }
.tc-active [data-osd-step="revealed"] .tc-r-card { animation: tc-up 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both, tc-glow 3s ease-in-out 900ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-r-sub { animation: tc-up 600ms cubic-bezier(0, 0, 0.2, 1) 120ms both; }
.tc-active [data-osd-step="revealed"] .tc-dot { animation: tc-wave 1.2s ease-in-out var(--d) infinite; }
.tc-active [data-osd-step="revealed"] .tc-chip { animation: tc-chip 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) both; }
.tc-dot { display: inline-block; width: 18px; height: 18px; border-radius: 50%; background: #FF8A4C; }
@keyframes tc-tilt { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(14deg) translateY(-8px); } }
@keyframes tc-hue { to { background-position: 300% 0; } }
@keyframes tc-beat { 0%, 56%, 100% { transform: scale(1); } 10% { transform: scale(1.2); } 22% { transform: scale(1.02); } 34% { transform: scale(1.14); } }
@keyframes tc-draw { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
@keyframes tc-twinkle { 0%, 100% { transform: scale(0.6) rotate(0deg); opacity: 0.4; } 50% { transform: scale(1.1) rotate(45deg); opacity: 1; } }
.tc-active [data-osd-step="revealed"] .tc-row { animation: tc-up 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.tc-active [data-osd-step="revealed"] .tc-why { animation: tc-chip 650ms cubic-bezier(0.34, 1.56, 0.64, 1) 150ms both, tc-tilt 2.2s ease-in-out 900ms infinite; }
.tc-passion { background-image: linear-gradient(90deg, #FF8A4C, #FFC56B, #FF5D6C, #FF8A4C); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; }
.tc-active [data-osd-step="revealed"] .tc-passion { animation: tc-hue 3s linear infinite; }
.tc-active [data-osd-step="revealed"] .tc-heart { animation: tc-chip 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both, tc-beat 1.6s ease-in-out 1000ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-heart-line { animation: tc-draw 1100ms cubic-bezier(0, 0, 0.2, 1) 300ms both; }
.tc-active [data-osd-step="revealed"] .tc-spark { animation: tc-twinkle 1.8s ease-in-out var(--d) infinite; }
@keyframes tc-walk { 0% { offset-distance: 0%; opacity: 0; } 3% { opacity: 1; } 80% { offset-distance: 100%; opacity: 1; } 94% { offset-distance: 100%; opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
@keyframes tc-bob { from { transform: translateY(0) rotate(-3deg); } to { transform: translateY(-7px) rotate(3deg); } }
@keyframes tc-swing { from { transform: rotate(-32deg); } to { transform: rotate(32deg); } }
@keyframes tc-flow { to { stroke-dashoffset: -48; } }
@keyframes tc-ring { from { transform: scale(0.6); opacity: 0.9; } to { transform: scale(2.8); opacity: 0; } }
@keyframes tc-say1 { 0%, 12% { opacity: 0; transform: scale(0.6); } 15%, 30% { opacity: 1; transform: none; } 33%, 100% { opacity: 0; } }
@keyframes tc-say2 { 0%, 38% { opacity: 0; transform: scale(0.6); } 41%, 57% { opacity: 1; transform: none; } 60%, 100% { opacity: 0; } }
@keyframes tc-say3 { 0%, 76% { opacity: 0; transform: scale(0.6); } 79%, 93% { opacity: 1; transform: none; } 96%, 100% { opacity: 0; } }
@keyframes tc-confetti { 0%, 79% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); } 86% { opacity: 1; transform: translate(var(--x), var(--y)) scale(1) rotate(var(--r)); } 94% { opacity: 1; transform: translate(var(--x), calc(var(--y) + 26px)) scale(1) rotate(var(--r)); } 100% { opacity: 0; transform: translate(var(--x), calc(var(--y) + 26px)) scale(1) rotate(var(--r)); } }
@keyframes tc-grow { from { opacity: 0; transform: scaleY(0) translateY(60px); } to { opacity: 1; transform: none; } }
@keyframes tc-neon { 0%, 100% { color: #FFC56B; text-shadow: 0 0 36px rgba(255,197,107,0.55); } 33% { color: #FF8A4C; text-shadow: 0 0 36px rgba(255,138,76,0.55); } 66% { color: #FF5D6C; text-shadow: 0 0 36px rgba(255,93,108,0.55); } }
@keyframes tc-barin { from { transform: scaleX(0); } to { transform: none; } }
@keyframes tc-checker { to { background-position: 56px 0; } }
.tc-nyc-g { display: inline-block; transform-origin: 50% 100%; }
.tc-nyc-w { display: inline-block; color: #FFC56B; }
.tc-active [data-osd-step="revealed"] .tc-nyc-g { animation: tc-grow 800ms cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 70ms) both; }
.tc-active [data-osd-step="revealed"] .tc-nyc-w { animation: tc-wave 1.6s ease-in-out calc(1000ms + var(--i) * 80ms) infinite, tc-neon 3s linear calc(var(--i) * -230ms) infinite; }
.tc-bar { height: 14px; margin-top: 10px; border-radius: 4px; transform-origin: left; background: repeating-conic-gradient(#FFC56B 0 25%, #03050C 0 50%) 0 0 / 28px 28px; }
.tc-active [data-osd-step="revealed"] .tc-bar { animation: tc-barin 900ms cubic-bezier(0, 0, 0.2, 1) 700ms both, tc-checker 1.2s linear infinite; }
@keyframes tc-btring { from { transform: scale(1); opacity: 0.8; } to { transform: scale(1.9); opacity: 0; } }
@keyframes tc-btpulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,130,252,0)); } 50% { transform: scale(1.08); filter: drop-shadow(0 0 18px rgba(0,130,252,0.9)); } }
@keyframes tc-bars { 0%, 100% { transform: scaleY(0.25); } 50% { transform: scaleY(1); } }
.tc-bt-ring { position: absolute; inset: 0; border-radius: 50%; border: 3px solid #0082FC; opacity: 0; }
.tc-sbar { width: 12px; border-radius: 4px; background: #4FD1C5; transform-origin: bottom; }
.tc-active [data-osd-step="revealed"] .tc-bt-ring { animation: tc-btring 2s ease-out var(--d) infinite; }
.tc-active [data-osd-step="revealed"] .tc-bt-logo { animation: tc-chip 650ms cubic-bezier(0.34, 1.56, 0.64, 1) 300ms both, tc-btpulse 2.4s ease-in-out 1100ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-sbar { animation: tc-bars 1.2s ease-in-out var(--d) infinite; }
@keyframes tc-drop { from { opacity: 0; transform: translateY(-130px) rotate(-14deg) scale(1.3); } to { opacity: 1; transform: none; } }
@keyframes tc-scan { 0%, 100% { transform: translate(0, 0) rotate(-8deg); } 25% { transform: translate(-30px, 12px) rotate(-24deg); } 50% { transform: translate(12px, -16px) rotate(8deg); } 75% { transform: translate(34px, 10px) rotate(16deg); } }
@keyframes tc-hl { from { transform: scaleX(0); } to { transform: none; } }
@keyframes tc-look { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-6deg); } }
@keyframes tc-pupil { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(3px, -4px); } }
@keyframes tc-ooh { 0% { opacity: 0; transform: translateY(20px) scale(0.6); } 12%, 68% { opacity: 1; transform: none; } 84%, 100% { opacity: 0; transform: translateY(-22px); } }
@keyframes tc-wordin { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
.tc-int-g, .tc-int-w { display: inline-block; }
.tc-int-w { color: #FFC56B; }
.tc-active [data-osd-step="revealed"] .tc-int-g { animation: tc-drop 750ms cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 60ms) both; }
.tc-active [data-osd-step="revealed"] .tc-int-w { animation: tc-wave 1.8s ease-in-out calc(1100ms + var(--i) * 90ms) infinite, tc-neon 3s linear calc(var(--i) * -230ms) infinite; }
.tc-active [data-osd-step="revealed"] .tc-mag { animation: tc-chip 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 900ms both, tc-scan 3.2s ease-in-out 1700ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-hl { animation: tc-hl 800ms cubic-bezier(0, 0, 0.2, 1) 1000ms both; }
.tc-active [data-osd-step="revealed"] .tc-head { animation: tc-look 3.4s ease-in-out infinite; transform-origin: 112px 160px; transform-box: view-box; }
.tc-active [data-osd-step="revealed"] .tc-pupil { animation: tc-pupil 1.7s ease-in-out infinite; }
.tc-active [data-osd-step="revealed"] .tc-ooh { animation: tc-ooh 5s ease-in-out 1200ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-wd { animation: tc-wordin 500ms cubic-bezier(0, 0, 0.2, 1) calc(500ms + var(--i) * 70ms) both; }
@media (prefers-reduced-motion: reduce) { .tc-a { animation: none !important; } }
`;

const rise = (active: boolean, delay = 0): CSSProperties =>
  active ? { animation: `tc-rise 700ms ${EASE_OUT} ${delay}ms both` } : {};

/* ───────────────────────── ported from index.html: WebGL glow + ASCII ───────────────────────── */

const VERT = `#version 300 es
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}
`;

// Pass 1: Mandelbrot set -> glow texture.
const FRAG_GLOW = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uDarkBackground;
out vec4 fragColor;

// ── palette (OKLCH), same parameters as the glow variants ──
const float HUE = 0.045;
const float HUE_SPREAD = 0.2;
const float CHROMA = 0.165;
const float LIGHTNESS = 0.6;
const float LIGHT_SWING = 0.208;
const float BAND_FREQ = 0.33;      // colour bands per iteration
const float BAND_DRIFT = 0.55;    // colour flow speed (rad/s)
const float GLOW_RATE = 0.075;            // brightness ramp vs. iteration count
const float VIGNETTE = 0.0558240488;
const float TAU = 6.28318530718;

// OKLCH -> linear RGB
vec3 oklchToLinear(float L, float C, float h) {
  float a = C * cos(h), b = C * sin(h);
  float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  float s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  vec3 lms = vec3(l_, m_, s_);
  lms = lms * lms * lms;
  return mat3(4.0767416621, -1.2684380046, -0.0041960863,
              -3.3077115913, 2.6097574011, -0.7034186147,
              0.2309699292, -0.3413193965, 1.7076147010) * lms;
}

float blueNoise(vec2 p, float frame) {
  p += 5.588238 * mod(frame, 64.0);
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

// Smooth (continuous) escape count; negative => never escaped (inside the set).
float mandel(vec2 c) {
  // skip the main cardioid and period-2 bulb: they never escape
  float q = (c.x - 0.25) * (c.x - 0.25) + c.y * c.y;
  if (q * (q + (c.x - 0.25)) < 0.25 * c.y * c.y) return -1.0;
  if ((c.x + 1.0) * (c.x + 1.0) + c.y * c.y < 0.0625) return -1.0;
  vec2 z = vec2(0.0);
  for (int i = 0; i < 520; i++) {
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    float m = dot(z, z);
    if (m > 1.0e4) return float(i) + 1.0 - log2(0.5 * log(m));
  }
  return -1.0;
}

// Escape count -> linear colour "ink" (added over the dark background later).
vec3 shade(float mu, float t) {
  if (mu < 0.0) return vec3(0.0);
  float glow = 1.0 - exp(-max(mu, 0.0) * GLOW_RATE);
  float k = 0.5 + 0.5 * sin(mu * BAND_FREQ - t * BAND_DRIFT);
  float hue0 = HUE * TAU, hue1 = hue0 + HUE_SPREAD * TAU;
  vec3 tint = clamp(oklchToLinear(LIGHTNESS + LIGHT_SWING * k, CHROMA * (0.75 + 0.35 * k), mix(hue0, hue1, k)), 0.0, 1.0);
  return tint * glow * (0.55 + 0.75 * k);
}

vec3 finish(vec3 color, vec2 pos) {
  // filmic tone-map (ACES approximation), per-channel gamma, vignette, background lift, dither
  vec3 x = max(color, 0.0);
  color = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  color = pow(clamp(color, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  color *= 1.0 - smoothstep(0.5, 1.6, length(pos)) * VIGNETTE;
  color = uDarkBackground + color * (1.0 - uDarkBackground);
  color += (blueNoise(gl_FragCoord.xy, floor(iTime * 24.0)) - 0.5) / 255.0;
  return clamp(color, 0.0, 1.0);
}

const vec2 TARGET = vec2(-0.7436447, 0.1318252);   // Seahorse Valley
const float ZOOM_NEAR = 0.045;                     // view height (c-plane units) at the closest point
const float ZOOM_FAR = 0.60;                       // ... and the widest
const float BREATH_RATE = 0.075;                   // rad/s of the zoom oscillation

void main() {
  vec2 R = iResolution.xy;
  vec2 pos = (gl_FragCoord.xy - vec2(0.64, 0.5) * R) / R.y;   // fractal focus sits right of centre, behind the scrim
  float breath = 0.5 + 0.5 * sin(iTime * BREATH_RATE - 1.2);
  float h = exp(mix(log(ZOOM_FAR), log(ZOOM_NEAR), breath));
  float a = 0.35 * sin(iTime * 0.045) + 0.5;                  // gentle sway + fixed tilt
  float ca = cos(a), sa = sin(a);
  vec2 c = TARGET + mat2(ca, sa, -sa, ca) * pos * h;
  fragColor = vec4(finish(shade(mandel(c), iTime), pos), 1.0);
}
`;

// Pass 2: sample the glow in small cells, pick a glyph by brightness, keep 45% of the image underneath.
// (uAscii is the only addition vs. the deck: it lets this demo toggle the layer.)
const FRAG_ASCII = `#version 300 es
precision highp float;

uniform sampler2D tScene;
uniform sampler2D tGlyphs;
uniform vec2 iResolution;
uniform vec3 uDarkBackground;
uniform float uAscii;
out vec4 fragColor;

const float uStrength = 1.29589593;
const float uScale = 1.04066491;
const float uGlyphCount = 10.0;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

vec3 sceneInk(vec2 uv) { return texture(tScene, clamp(uv, 0.0, 1.0)).rgb - uDarkBackground; }

void main() {
  vec2 frag = gl_FragCoord.xy;
  if (uAscii < 0.5) { fragColor = vec4(uDarkBackground + sceneInk(frag / iResolution), 1.0); return; }

  vec2 cellPx = vec2(0.62, 1.0) * floor(uScale * 9.0 + 0.5);   // ~5 x 9 px character cell
  vec2 cell = floor(frag / cellPx);
  vec2 centre = (cell + 0.5) * cellPx;
  vec3 ink = vec3(0.0);
  ink += sceneInk(centre / iResolution) * 2.0;                  // centre sample counts double
  ink += sceneInk((centre + cellPx * vec2(0.3, 0.3)) / iResolution);
  ink += sceneInk((centre + cellPx * vec2(-0.3, 0.3)) / iResolution);
  ink += sceneInk((centre + cellPx * vec2(0.3, -0.3)) / iResolution);
  ink += sceneInk((centre + cellPx * vec2(-0.3, -0.3)) / iResolution);
  ink /= 6.0;
  float level = pow(clamp(dot(ink, LUMA) * (0.9 + 0.3 * uStrength), 0.0, 1.0), 0.9);
  float glyph = floor(level * (uGlyphCount - 1.0) + 0.5);       // 0..9 -> index into the ramp
  vec2 local = (frag - cell * cellPx) / cellPx;
  float mask = texture(tGlyphs, vec2((glyph + local.x) / uGlyphCount, local.y)).r;
  vec3 under = sceneInk(frag / iResolution) * 0.45;
  vec3 color = uDarkBackground + clamp(under + ink * mask, 0.0, 1.0);
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

const GLYPH_RAMP = ' .:;+*oO8@';
const DARK_BG = [3 / 255, 5 / 255, 12 / 255];

function startGL(host: HTMLElement, reduced: boolean): () => void {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  canvas.style.cssText =
    'width:100%;height:100%;display:block;opacity:0;transition:opacity 350ms cubic-bezier(0,0,0.2,1)';
  host.appendChild(canvas);
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl) {
    canvas.remove();
    return () => {};
  }

  const compile = (frag: string): WebGLProgram => {
    const prog = gl.createProgram() as WebGLProgram;
    for (const [type, src] of [
      [gl.VERTEX_SHADER, VERT],
      [gl.FRAGMENT_SHADER, frag],
    ] as const) {
      const sh = gl.createShader(type) as WebGLShader;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
      gl.attachShader(prog, sh);
      gl.deleteShader(sh);
    }
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
    return prog;
  };
  const clampEdge = () => {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };

  let glow: WebGLProgram;
  let ascii: WebGLProgram;
  try {
    glow = compile(FRAG_GLOW);
    ascii = compile(FRAG_ASCII);
  } catch {
    canvas.remove();
    return () => {};
  }
  const W = canvas.width;
  const H = canvas.height;

  const sceneTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, sceneTex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, W, H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  clampEdge();
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, sceneTex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  const atlas = document.createElement('canvas');
  atlas.width = 480;
  atlas.height = 80;
  const ctx = atlas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, atlas.width, atlas.height);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '500 62px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  for (let i = 0; i < 10; i++) ctx.fillText(GLYPH_RAMP[i], i * 48 + 24, 43.2);
  const glyphTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, glyphTex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  clampEdge();

  const u1 = {
    res: gl.getUniformLocation(glow, 'iResolution'),
    time: gl.getUniformLocation(glow, 'iTime'),
    dark: gl.getUniformLocation(glow, 'uDarkBackground'),
  };
  const u2 = {
    res: gl.getUniformLocation(ascii, 'iResolution'),
    dark: gl.getUniformLocation(ascii, 'uDarkBackground'),
    scene: gl.getUniformLocation(ascii, 'tScene'),
    glyphs: gl.getUniformLocation(ascii, 'tGlyphs'),
    on: gl.getUniformLocation(ascii, 'uAscii'),
  };

  const draw = (time: number) => {
    gl.viewport(0, 0, W, H);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.useProgram(glow);
    gl.uniform2f(u1.res, W, H);
    gl.uniform1f(u1.time, time);
    gl.uniform3fv(u1.dark, DARK_BG);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.useProgram(ascii);
    gl.uniform2f(u2.res, W, H);
    gl.uniform3fv(u2.dark, DARK_BG);
    gl.uniform1f(u2.on, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTex);
    gl.uniform1i(u2.scene, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glyphTex);
    gl.uniform1i(u2.glyphs, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let raf = 0;
  let stopped = false;
  if (reduced) {
    draw(2);
  } else {
    let last = 0;
    let t = 0;
    const loop = (now: number) => {
      if (stopped) return;
      t += last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }
  canvas.style.opacity = '1';

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    canvas.remove();
  };
}

/** Live Mandelbrot glow + ASCII layer. Only the page the audience is watching mounts WebGL. */
const GlowCanvas = () => {
  const active = useIsActivePage();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return startGL(ref.current, reduced);
  }, [active]);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 60% 70% at 72% 50%, rgba(255,138,76,0.28), rgba(255,138,76,0) 70%), #03050C',
      }}
    />
  );
};

/* ───────────────────────── ported from index.html: decode text ───────────────────────── */

const WIDTH_CLASSES = ['ijl', 'frt', 'mw', 'abcdeghknopqsuvxyz', 'IJ1', '023456789', 'MW', 'BEFKLPRSTXYZ', 'ACDGHNOQUV'];
const widthClass = (ch: string) => WIDTH_CLASSES.find((c) => c.includes(ch)) ?? '';
const ROW_STAGGER = 130;
const LEAD_IN = 170;
const ROW_SPREAD = 430;
const JITTER = 55;
const SCRAMBLE_STEP = 42;

const seeded = (seed: number) => () => {
  const s = (seed + 1831565813) | 0;
  seed = s;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type DecodeChar = { ch: string; at: number };

/** Per-character scramble, then lock — the cover's "decode" effect. Newlines start a new row. */
const DecodeText = ({ text, delay = 200 }: { text: string; delay?: number }) => {
  const active = useIsActivePage();
  const [now, setNow] = useState<number>(active ? 0 : Number.POSITIVE_INFINITY);

  const { rows, end, hash } = useMemo(() => {
    let h = 0;
    for (const c of text) h = (Math.imul(h, 31) + c.charCodeAt(0)) | 0;
    const rand = seeded(h);
    let maxAt = 0;
    const built: DecodeChar[][] = text.split('\n').map((line, ri) => {
      const len = line.length;
      return Array.from(line).map((ch, ci) => {
        const at =
          delay + ri * ROW_STAGGER + LEAD_IN + (ci / Math.max(1, len - 1)) * ROW_SPREAD + (rand() - 0.5) * 2 * JITTER;
        maxAt = Math.max(maxAt, at);
        return { ch, at };
      });
    });
    return { rows: built, end: maxAt + 80, hash: h };
  }, [text, delay]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!active || reduced) {
      setNow(Number.POSITIVE_INFINITY);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (n: number) => {
      const t = n - t0;
      if (t > end) {
        setNow(Number.POSITIVE_INFINITY);
        return;
      }
      setNow(t);
      raf = requestAnimationFrame(tick);
    };
    setNow(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);

  let idx = 0;
  return (
    <>
      {rows.map((row) => (
        <span key={row.map((c) => c.ch).join('')} style={{ display: 'block', whiteSpace: 'nowrap' }}>
          {row.map((c) => {
            const i = idx++;
            if (c.ch === ' ') return ' ';
            if (now >= c.at) return c.ch;
            const cls = widthClass(c.ch);
            const glyph =
              cls && now >= c.at - LEAD_IN
                ? cls[Math.floor(seeded(hash + i * 7919 + Math.floor(now / SCRAMBLE_STEP) * 104729)() * cls.length)]
                : '';
            return (
              <span key={`${i}-${c.ch}`} style={{ position: 'relative' }}>
                <span style={{ visibility: 'hidden' }}>{c.ch}</span>
                <span style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)' }}>{glyph}</span>
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
};

/* ───────────────────────── 01 title ───────────────────────── */

const Cover: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={fill}>
      <style>{CSS}</style>
      <GlowCanvas />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(3,5,12,0.88) 0%, rgba(3,5,12,0.8) 40%, rgba(3,5,12,0.35) 64%, rgba(3,5,12,0) 82%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '96px 120px 62px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            fontFamily: mono,
            fontSize: 26,
            letterSpacing: '0.05em',
            textShadow: '0 0 12px #03050C, 0 0 4px #03050C',
          }}
        >
          <span>
            <b>DANEYAND &quot;DJ&quot; SINGLEY</b>
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, textShadow: '0 0 40px #03050C' }}>
          <h1
            style={{
              margin: 0,
              maxWidth: 1400,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 112,
              fontWeight: 800,
              lineHeight: '120px',
              letterSpacing: '-0.04em',
            }}
          >
            <DecodeText text={'What a career in\ntechnology looks like\n& how AI changes\neverything'} delay={200} />
          </h1>
          <div style={{ height: 4, width: 160, background: 'var(--osd-accent)', ...rise(active, 900) }} />
        </div>
        <div style={{ fontFamily: mono, fontSize: 22, color: 'rgba(169,183,217,0.75)' }}>press → to begin</div>
      </div>
    </div>
  );
};
Cover.transition = settle;

/* ───────────────────────── shared page chrome ───────────────────────── */

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 36,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: mono,
        fontSize: 22,
        letterSpacing: '0.05em',
        color: C.dim,
      }}
    >
      <span>Daneyand &quot;DJ&quot; Singley</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Frame = ({ eyebrow, title, children }: { eyebrow: string; title?: ReactNode; children: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <div style={fill}>
      <style>{CSS}</style>
      <div
        aria-hidden="true"
        className="tc-a"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(169,183,217,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(169,183,217,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          animation: active ? 'tc-drift 12s linear infinite' : undefined,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 60% at 100% 0%, rgba(255,138,76,0.16), rgba(255,138,76,0) 70%)',
        }}
      />
      {children}
      <div style={{ position: 'absolute', top: 80, left: 120, right: 120 }}>
        <div
          className="tc-a"
          style={{ fontFamily: mono, fontSize: 24, letterSpacing: '0.14em', color: 'var(--osd-accent)', ...rise(active) }}
        >
          {eyebrow}
        </div>
        {title ? (
        <h2
          style={{
            margin: '14px 0 0',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
          }}
        >
          {title}
        </h2>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

/* ───────────────────────── 02 agenda ───────────────────────── */

/** Letters bounce in a rolling wave. */
const Wave = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const active = useIsActivePage();
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static text, positions never reorder
          key={i}
          className="tc-a"
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            animation: active ? `tc-wave 2.2s ease-in-out ${delay + i * 70}ms infinite` : undefined,
          }}
        >
          {ch}
        </span>
      ))}
    </>
  );
};

/** Drifting code-ish glyph in the background. */
const Glyph = ({ x, y, size, delay, children }: { x: number; y: number; size: number; delay: number; children: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <span
      aria-hidden="true"
      className="tc-a"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontFamily: mono,
        fontSize: size,
        fontWeight: 700,
        color: 'var(--osd-accent)',
        opacity: 0.16,
        animation: active ? `tc-float ${6 + (delay % 3)}s ease-in-out ${delay}s infinite` : undefined,
      }}
    >
      {children}
    </span>
  );
};

const Badge = ({ n, color, glow, delay }: { n: string; color: string; glow: string; delay: number }) => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={
        {
          flex: 'none',
          width: 128,
          height: 128,
          boxSizing: 'border-box',
          borderRadius: '50%',
          border: `3px solid ${color}`,
          background: `${glow}0.14)`,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          '--g0': `${glow}0)`,
          '--g1': `${glow}0.4)`,
          animation: active
            ? `tc-badge 800ms ${SPRING} ${delay}ms both, tc-glow 3s ease-in-out ${delay + 900}ms infinite`
            : undefined,
        } as CSSProperties
      }
    >
      {n}
    </div>
  );
};

const AgendaCard = ({ delay, accent, children }: { delay: number; accent: string; children: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={{
        position: 'relative',
        flex: 1,
        boxSizing: 'border-box',
        padding: '40px 48px',
        borderRadius: 'var(--osd-radius)',
        border: `1px solid ${C.line}`,
        borderLeft: `6px solid ${accent}`,
        background: C.panel,
        overflow: 'hidden',
        animation: active ? `tc-pop 850ms ${SPRING} ${delay}ms both` : undefined,
      }}
    >
      <div
        aria-hidden="true"
        className="tc-a"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '12%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.07), rgba(255,255,255,0))',
          animation: active ? `tc-shimmer 6s ease-in-out ${delay + 1500}ms infinite` : undefined,
        }}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
};

const SubItem = ({ delay, children }: { delay: number; children: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        alignSelf: 'flex-start',
        padding: '14px 32px',
        borderRadius: 'var(--osd-radius)',
        border: `1px solid ${C.line}`,
        background: 'rgba(79,209,197,0.07)',
        fontSize: 36,
        lineHeight: 1.3,
        fontWeight: 600,
        animation: active ? `tc-pop 700ms ${SPRING} ${delay}ms both` : undefined,
      }}
    >
      <span
        className="tc-a"
        style={{
          fontFamily: mono,
          color: C.teal,
          animation: active ? `tc-nudge 1.4s ease-in-out ${delay}ms infinite` : undefined,
        }}
      >
        →
      </span>
      {children}
    </div>
  );
};

const ROW_GAP = 48;

const Agenda: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame eyebrow="02 · AGENDA" title={<DecodeText text={'Today’s agenda'} delay={100} />}>
      <Glyph x={1500} y={300} size={120} delay={0}>
        {'{ }'}
      </Glyph>
      <Glyph x={1240} y={640} size={88} delay={1}>
        {'</>'}
      </Glyph>
      <Glyph x={1560} y={760} size={110} delay={2}>
        AI
      </Glyph>
      <Glyph x={1100} y={250} size={72} delay={3}>
        01
      </Glyph>
      <Glyph x={1700} y={520} size={72} delay={4}>
        &gt;_
      </Glyph>
      <div style={{ position: 'absolute', top: 250, left: 120, right: 120, display: 'flex', flexDirection: 'column', gap: ROW_GAP }}>
        {/* 01 */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 48 }}>
          <div
            aria-hidden="true"
            className="tc-a"
            style={{
              position: 'absolute',
              left: 62,
              top: 128,
              width: 4,
              height: `calc(100% - 128px + ${ROW_GAP}px)`,
              background: 'linear-gradient(180deg, #FF8A4C, #4FD1C5)',
              transformOrigin: 'top',
              animation: active ? `tc-line 900ms ${EASE_OUT} 900ms both` : undefined,
            }}
          />
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: 54, top: 128, width: 20, height: `calc(100% - 128px + ${ROW_GAP}px)` }}
          >
            <div
              className="tc-a"
              style={{
                position: 'absolute',
                left: 0,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#FFC56B',
                boxShadow: '0 0 20px 6px rgba(255,197,107,0.6)',
                opacity: 0,
                animation: active ? 'tc-travel 2.4s ease-in-out 2000ms infinite' : undefined,
              }}
            />
          </div>
          <Badge n="01" color="#FF8A4C" glow="rgba(255,138,76," delay={300} />
          <AgendaCard delay={500} accent="#FF8A4C">
            <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em' }}>
              Career ruminations from a technologist
            </div>
            <div style={{ marginTop: 12, fontSize: 40, fontWeight: 700, lineHeight: 1.3, color: 'var(--osd-accent)' }}>
              <Wave text="how DJ got here!" delay={1400} />
            </div>
          </AgendaCard>
        </div>
        {/* 02 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48 }}>
          <Badge n="02" color="#4FD1C5" glow="rgba(79,209,197," delay={1100} />
          <AgendaCard delay={1300} accent="#4FD1C5">
            <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em' }}>
              What’s this AI thing?
            </div>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SubItem delay={1800}>How can we build the next generation of tech!</SubItem>
              <SubItem delay={2000}>Where is this going next?</SubItem>
            </div>
          </AgendaCard>
        </div>
      </div>
    </Frame>
  );
};
Agenda.transition = settle;

/* ───────────────────────── 03 two super powers ───────────────────────── */

const PowerCard = ({
  n,
  color,
  rgb,
  title,
  children,
}: {
  n: string;
  color: string;
  rgb: string;
  title: ReactNode;
  children: ReactNode;
}) => (
  <div
    className="tc-a tc-r-card"
    style={
      {
        '--g0': `rgba(${rgb},0)`,
        '--g1': `rgba(${rgb},0.3)`,
        position: 'relative',
        height: 446,
        boxSizing: 'border-box',
        padding: 40,
        borderRadius: 'var(--osd-radius)',
        border: `2px solid ${color}`,
        background: `rgba(${rgb},0.08)`,
        overflow: 'hidden',
      } as CSSProperties
    }
  >
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 24,
        bottom: -70,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 360,
        fontWeight: 800,
        lineHeight: 1,
        color,
        opacity: 0.1,
      }}
    >
      {n}
    </div>
    <div style={{ position: 'relative' }}>
      <div style={{ fontFamily: mono, fontSize: 24, letterSpacing: '0.14em', color }}>SUPER POWER {n}</div>
      <div style={{ marginTop: 16, fontSize: 52, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em' }}>{title}</div>
      <div style={{ marginTop: 28 }}>{children}</div>
    </div>
  </div>
);

const PowerSub = ({ color, children }: { color: string; children: ReactNode }) => (
  <div
    className="tc-a tc-r-sub"
    style={{
      marginTop: 32,
      paddingLeft: 24,
      borderLeft: `6px solid ${color}`,
      fontSize: 38,
      lineHeight: 1.4,
      fontWeight: 600,
      color: C.muted,
    }}
  >
    {children}
  </div>
);

const TypingBubble = () => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '22px 32px',
      borderRadius: 48,
      border: '2px solid #FF8A4C',
      background: 'rgba(255,138,76,0.18)',
    }}
  >
    <span className="tc-a tc-dot" style={{ '--d': '0ms' } as CSSProperties} />
    <span className="tc-a tc-dot" style={{ '--d': '160ms' } as CSSProperties} />
    <span className="tc-a tc-dot" style={{ '--d': '320ms' } as CSSProperties} />
  </div>
);

const Chip = ({ color, rgb, delay, children }: { color: string; rgb: string; delay: number; children: ReactNode }) => (
  <span
    className="tc-a tc-chip"
    style={
      {
        '--d': `${delay}ms`,
        padding: '16px 30px',
        borderRadius: 999,
        border: `2px solid ${color}`,
        background: `rgba(${rgb},0.2)`,
        color,
        fontFamily: mono,
        fontSize: 24,
        letterSpacing: '0.1em',
      } as CSSProperties
    }
  >
    {children}
  </span>
);

const Powers: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="03 · BUT FIRST…"
      title={
        <span style={{ display: 'block', ...rise(active, 100) }}>
          But first, did you know
          <br />
          you each have{' '}
          <span style={{ color: 'var(--osd-accent)' }}>
            <Wave text="TWO" delay={800} />
          </span>{' '}
          super powers?
        </span>
      }
    >
      <div
        className={active ? 'tc-active' : undefined}
        style={{
          position: 'absolute',
          top: 350,
          left: 120,
          right: 120,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 56,
          alignItems: 'start',
        }}
      >
        <div>
          <Steps>
            <Step duration={200}>
              <PowerCard n="1" color="#FF8A4C" rgb="255,138,76" title="Ask people about themselves.">
                <TypingBubble />
              </PowerCard>
            </Step>
            <Step duration={200}>
              <PowerSub color="#FF8A4C">
                Because people <b style={{ color: 'var(--osd-accent)' }}>LOVE</b> talking about themselves; we all do!
              </PowerSub>
            </Step>
          </Steps>
        </div>
        <div>
          <Steps>
            <Step duration={200}>
              <PowerCard
                n="2"
                color="#4FD1C5"
                rgb="79,209,197"
                title="You have two ears and one mouth, do 2x more listening than talking!"
              >
                <div style={{ display: 'flex', gap: 16 }}>
                  <Chip color="#4FD1C5" rgb="79,209,197" delay={300}>
                    EAR
                  </Chip>
                  <Chip color="#4FD1C5" rgb="79,209,197" delay={450}>
                    EAR
                  </Chip>
                  <Chip color="#FF8A4C" rgb="255,138,76" delay={600}>
                    MOUTH
                  </Chip>
                </div>
              </PowerCard>
            </Step>
            <Step duration={200}>
              <PowerSub color="#4FD1C5">
                Learn to listen. <b style={{ color: C.gold }}>Free advice!</b>
              </PowerSub>
            </Step>
          </Steps>
        </div>
      </div>
    </Frame>
  );
};
Powers.transition = settle;

/* ───────────────────────── 04 hi, I'm DJ ───────────────────────── */

const Heart = () => (
  <div
    className="tc-a tc-heart"
    style={{ position: 'relative', width: 128, height: 128, filter: 'drop-shadow(0 0 22px rgba(255,93,108,0.65))' }}
  >
    <svg width={128} height={128} viewBox="0 0 100 100" role="img" aria-label="Heart">
      <defs>
        <linearGradient id="tc-heart-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC56B" />
          <stop offset="0.5" stopColor="#FF8A4C" />
          <stop offset="1" stopColor="#FF5D6C" />
        </linearGradient>
      </defs>
      <path
        d="M50 90 C 8 60, -2 30, 22 14 C 36 4, 48 12, 50 25 C 52 12, 64 4, 78 14 C 102 30, 92 60, 50 90 Z"
        fill="url(#tc-heart-g)"
        fillOpacity={0.9}
      />
      <path
        className="tc-a tc-heart-line"
        d="M50 90 C 8 60, -2 30, 22 14 C 36 4, 48 12, 50 25 C 52 12, 64 4, 78 14 C 102 30, 92 60, 50 90 Z"
        fill="none"
        stroke="#F3F6FC"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={300}
      />
      <path d="M26 30 C 28 22, 36 20, 40 24" fill="none" stroke="#F3F6FC" strokeOpacity={0.7} strokeWidth={4} strokeLinecap="round" />
    </svg>
    <Spark x={-18} y={-6} size={34} d="0ms" />
    <Spark x={112} y={14} size={26} d="500ms" />
    <Spark x={104} y={104} size={30} d="900ms" />
  </div>
);

const Spark = ({ x, y, size, d }: { x: number; y: number; size: number; d: string }) => (
  <svg
    aria-hidden="true"
    className="tc-a tc-spark"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    style={{ position: 'absolute', left: x, top: y, '--d': d, opacity: 0 } as CSSProperties}
  >
    <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FFC56B" />
  </svg>
);

const Hello: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="04 · HELLO"
      title={
        <span style={{ fontSize: 120, lineHeight: 1.05 }}>
          <DecodeText text={'Hi, I’m DJ!'} delay={100} />
        </span>
      }
    >
      <div
        className={active ? 'tc-active' : undefined}
        style={{ position: 'absolute', top: 292, left: 120, right: 120 }}
      >
        <p
          className="tc-a"
          style={{
            margin: 0,
            maxWidth: 1400,
            fontSize: 36,
            lineHeight: 1.4,
            fontWeight: 600,
            color: C.muted,
            ...rise(active, 700),
          }}
        >
          &amp; I’m going to take you through my technology career… and sprinkle in some life lessons along the way.
        </p>
        <p
          className="tc-a"
          style={{
            margin: '36px 0 0',
            maxWidth: 1500,
            fontSize: 48,
            lineHeight: 1.25,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            ...rise(active, 1100),
          }}
        >
          I was once <span style={{ color: 'var(--osd-accent)' }}>JUST LIKE YOU!</span> A high schooler looking at
          technology for a career.
        </p>
        <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Steps>
            <Step duration={200}>
              <div className="tc-a tc-row" style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 88, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.04em' }}>
                <span>But why?</span>
                <span className="tc-a tc-why" style={{ display: 'inline-block', fontSize: 96 }}>
                  🤔
                </span>
              </div>
            </Step>
            <Step duration={200}>
              <div className="tc-a tc-row" style={{ fontSize: 80, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.04em' }}>
                Because it was my <span className="tc-a tc-passion">PASSION</span>...
              </div>
            </Step>
            <Step duration={200}>
              <div className="tc-a tc-row" style={{ display: 'flex', alignItems: 'center', gap: 44, fontSize: 80, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.04em' }}>
                <span>
                  Find <span style={{ color: 'var(--osd-accent)' }}>YOUR</span> passion!
                </span>
                <Heart />
              </div>
            </Step>
          </Steps>
        </div>
      </div>
    </Frame>
  );
};
Hello.transition = settle;

/* ───────────────────────── 05 first step: Rutgers ───────────────────────── */

const ROUTE = 'M181 113 C 175 230, 215 345, 420 345 S 900 330, 1100 250 S 1330 190, 1432 145';
const SCARLET = '#CC0033';

const Confetti = ({ x, y, r, color }: { x: number; y: number; r: string; color: string }) => {
  const active = useIsActivePage();
  return (
    <div
      aria-hidden="true"
      className="tc-a"
      style={
        {
          position: 'absolute',
          left: 1432 - 7,
          top: 145 - 7,
          width: 14,
          height: 14,
          borderRadius: 3,
          background: color,
          opacity: 0,
          '--x': `${x}px`,
          '--y': `${y}px`,
          '--r': r,
          animation: active ? 'tc-confetti 12s linear infinite' : undefined,
        } as CSSProperties
      }
    />
  );
};

const Bubble = ({ anim, children }: { anim: string; children: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={{
        position: 'absolute',
        left: 88,
        top: -10,
        padding: '8px 16px',
        borderRadius: 16,
        background: '#F3F6FC',
        color: '#03050C',
        fontFamily: mono,
        fontSize: 20,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        opacity: 0,
        transformOrigin: 'left bottom',
        animation: active ? `${anim} 12s linear infinite` : undefined,
      }}
    >
      {children}
    </div>
  );
};

/** A very determined student with a very large backpack. */
const Walker = () => {
  const active = useIsActivePage();
  const limb = (reverse: boolean, origin: string): CSSProperties => ({
    transformOrigin: origin,
    transformBox: 'view-box',
    animation: active ? `tc-swing 0.7s ease-in-out infinite ${reverse ? 'alternate-reverse' : 'alternate'}` : undefined,
  });
  return (
    <div className="tc-a tc-walker" style={{ animation: active ? 'tc-walk 12s linear infinite' : undefined }}>
      <div
        className="tc-a"
        style={{
          width: 96,
          height: 120,
          transformOrigin: '50% 100%',
          animation: active ? 'tc-bob 0.36s ease-in-out infinite alternate' : undefined,
        }}
      >
        <svg width={96} height={120} viewBox="0 0 120 150" role="img" aria-label="A student walking with a huge backpack">
          {/* back arm + back leg */}
          <g className="tc-a" style={limb(true, '62px 62px')}>
            <line x1={62} y1={62} x2={62} y2={94} stroke="#A9B7D9" strokeWidth={6} strokeLinecap="round" />
            <circle cx={62} cy={96} r={5} fill="#FFD9B3" />
          </g>
          <g className="tc-a" style={limb(true, '60px 100px')}>
            <line x1={60} y1={100} x2={60} y2={132} stroke="#A9B7D9" strokeWidth={7} strokeLinecap="round" />
            <ellipse cx={68} cy={137} rx={12} ry={6} fill="#FF5D6C" />
          </g>
          {/* oversized backpack + bedroll */}
          <rect x={12} y={52} width={42} height={64} rx={10} fill="#FF8A4C" />
          <rect x={17} y={90} width={32} height={20} rx={6} fill="#FFC56B" />
          <rect x={8} y={40} width={50} height={16} rx={8} fill="#4FD1C5" />
          <line x1={52} y1={62} x2={62} y2={64} stroke="#F3F6FC" strokeWidth={4} strokeLinecap="round" />
          {/* body */}
          <line x1={62} y1={56} x2={60} y2={100} stroke="#F3F6FC" strokeWidth={8} strokeLinecap="round" />
          {/* front leg */}
          <g className="tc-a" style={limb(false, '60px 100px')}>
            <line x1={60} y1={100} x2={60} y2={132} stroke="#F3F6FC" strokeWidth={7} strokeLinecap="round" />
            <ellipse cx={68} cy={137} rx={12} ry={6} fill="#FF5D6C" />
          </g>
          {/* head, scarlet beanie */}
          <circle cx={66} cy={34} r={19} fill="#FFD9B3" />
          <path d="M47 32 A19 19 0 0 1 85 32 Z" fill={SCARLET} />
          <rect x={45} y={29} width={42} height={6} rx={3} fill="#F3F6FC" />
          <circle cx={66} cy={13} r={5} fill="#F3F6FC" />
          <circle cx={75} cy={40} r={2.6} fill="#03050C" />
          <path d="M70 47 Q76 52 82 46" fill="none" stroke="#03050C" strokeWidth={2.5} strokeLinecap="round" />
          {/* front arm */}
          <g className="tc-a" style={limb(false, '62px 62px')}>
            <line x1={62} y1={62} x2={62} y2={94} stroke="#F3F6FC" strokeWidth={6} strokeLinecap="round" />
            <circle cx={62} cy={96} r={5} fill="#FFD9B3" />
          </g>
        </svg>
      </div>
      <Bubble anim="tc-say1">are we there yet?</Bubble>
      <Bubble anim="tc-say2">my feet hurt…</Bubble>
      <Bubble anim="tc-say3">NJ!</Bubble>
    </div>
  );
};

const Journey = () => {
  const active = useIsActivePage();
  const ring = (delay: string): CSSProperties => ({
    transformBox: 'fill-box',
    transformOrigin: 'center',
    animation: active ? `tc-ring 1.8s ease-out ${delay} infinite` : undefined,
  });
  return (
    <div style={{ position: 'absolute', top: 140, left: 120, width: 1680, height: 380 }}>
      <style>
        {`.tc-walker { position: absolute; left: 0; top: 0; width: 96px; height: 120px; offset-path: path('${ROUTE}'); offset-rotate: 0deg; offset-anchor: 50% 100%; }`}
      </style>
      <svg width={1680} height={380} viewBox="0 0 1680 380" role="img" aria-label="Stylized map: Burlington, Vermont to Rutgers, New Jersey">
        {/* Vermont */}
        <g transform="translate(150 30)">
          <polygon
            points="17,6 215,6 201,44 158,106 156,167 129,217 120,268 112,336 25,334 27,210 8,210 16,152 13,94"
            fill="rgba(91,228,155,0.10)"
            stroke={C.green}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <path
            d="M95 100 l12 -20 l12 20 M98 160 l12 -20 l12 20 M80 225 l12 -20 l12 20 M72 285 l12 -20 l12 20"
            fill="none"
            stroke={C.green}
            strokeOpacity={0.7}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </g>
        <SvgLabel x={380} y={52} anchor="start" fill={C.green}>
          VERMONT
        </SvgLabel>
        {/* New Jersey */}
        <g transform="translate(1330 40)">
          <polygon
            points="80.6,4.6 150.6,47 140,92 141.8,109 137,149 132.6,190 115,218 62,284 40,253 9,218 17.7,186 44,161 73.5,136 35,92 44,57 53,23"
            fill="rgba(255,93,108,0.10)"
            stroke={C.red}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </g>
        <SvgLabel x={1405} y={366}>
          NEW JERSEY
        </SvgLabel>
        {/* the long way there */}
        <path
          d={ROUTE}
          fill="none"
          stroke={C.gold}
          strokeOpacity={0.85}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="10 14"
          className="tc-a"
          style={{ animation: active ? 'tc-flow 1.1s linear infinite' : undefined }}
        />
        <SvgLabel x={760} y={372} fill={C.dim}>
          just a quick stroll (~300 mi)
        </SvgLabel>
        {/* Burlington */}
        <circle className="tc-a" cx={181} cy={113} r={9} fill="none" stroke={C.green} strokeWidth={3} style={ring('0s')} />
        <circle cx={181} cy={113} r={9} fill={C.green} stroke="#03050C" strokeWidth={3} />
        <SvgLabel x={164} y={120} anchor="end" fill="#F3F6FC">
          BURLINGTON
        </SvgLabel>
        {/* Rutgers */}
        <circle className="tc-a" cx={1432} cy={145} r={9} fill="none" stroke={SCARLET} strokeWidth={3} style={ring('0.9s')} />
        <circle cx={1432} cy={145} r={9} fill={SCARLET} stroke="#F3F6FC" strokeWidth={3} />
        <line x1={1432} y1={136} x2={1432} y2={92} stroke="#F3F6FC" strokeWidth={3} strokeLinecap="round" />
        <path d="M1432 92 L1466 103 L1432 114 Z" fill={SCARLET} />
        <SvgLabel x={1492} y={152} anchor="start" fill="#F3F6FC">
          RUTGERS
        </SvgLabel>
        <SvgLabel x={1492} y={176} anchor="start" size={18} fill={C.dim}>
          (New Brunswick)
        </SvgLabel>
      </svg>
      <Confetti x={-60} y={-70} r="200deg" color={SCARLET} />
      <Confetti x={-20} y={-96} r="-140deg" color="#FFC56B" />
      <Confetti x={30} y={-90} r="260deg" color="#F3F6FC" />
      <Confetti x={70} y={-64} r="-200deg" color="#4FD1C5" />
      <Confetti x={-86} y={-30} r="120deg" color="#FF8A4C" />
      <Confetti x={92} y={-24} r="-90deg" color={SCARLET} />
      <Walker />
    </div>
  );
};

const SvgLabel = ({
  x,
  y,
  size = 22,
  fill: f = C.muted,
  anchor = 'middle',
  children,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  children: ReactNode;
}) => (
  <text x={x} y={y} fontSize={size} fill={f} textAnchor={anchor} style={{ fontFamily: mono, letterSpacing: '0.06em' }}>
    {children}
  </text>
);

/** NEW YORK CITY: letters shoot up like skyscrapers, then ripple and cycle through taxi/neon colours. */
const NycText = () => (
  <>
    {Array.from('NEW YORK CITY').map((ch, i) =>
      ch === ' ' ? (
        // biome-ignore lint/suspicious/noArrayIndexKey: static text, positions never reorder
        <span key={i} style={{ display: 'inline-block', width: '0.3em' }} />
      ) : (
        // biome-ignore lint/suspicious/noArrayIndexKey: static text, positions never reorder
        <span key={i} className="tc-a tc-nyc-g" style={{ '--i': i } as CSSProperties}>
          <span className="tc-a tc-nyc-w" style={{ '--i': i } as CSSProperties}>
            {ch}
          </span>
        </span>
      ),
    )}
  </>
);

const College: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame eyebrow="05 · THE FIRST STEP">
      <Journey />
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', top: 535, left: 120, right: 120 }}>
        <p
          className="tc-a"
          style={{ margin: 0, fontSize: 38, lineHeight: 1.35, fontWeight: 700, color: C.muted, ...rise(active, 600) }}
        >
          My first step after high school graduation was{' '}
          <b style={{ color: 'var(--osd-text)' }}>college</b>. And I went to{' '}
          <b style={{ color: C.red }}>Rutgers University</b> in New Jersey.
        </p>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', gap: 36, whiteSpace: 'nowrap' }}>
          <Steps>
            <Step duration={200}>
              <div className="tc-a tc-row" style={{ fontSize: 72, lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.04em' }}>
                But why there?
              </div>
            </Step>
            <Step duration={200}>
              <div className="tc-a tc-row" style={{ fontSize: 36, lineHeight: 1.2, fontWeight: 700, color: C.muted }}>
                Because it’s so close to the <span className="tc-a tc-passion">center of the universe!</span>
              </div>
            </Step>
          </Steps>
        </div>
        <div style={{ marginTop: 10 }}>
          <Steps>
            <Step duration={200}>
              <div style={{ display: 'inline-block' }}>
                <div style={{ fontSize: 172, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>
                  <NycText />
                </div>
                <div className="tc-a tc-bar" />
              </div>
            </Step>
          </Steps>
        </div>
      </div>
    </Frame>
  );
};
College.transition = settle;

/* ───────────────────────── 06 WINLAB ───────────────────────── */

const WinCard = ({ accent, icon, children }: { accent: string; icon?: ReactNode; children: ReactNode }) => (
  <div
    className="tc-a tc-row"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32,
      minHeight: 134,
      boxSizing: 'border-box',
      padding: '20px 36px',
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${C.line}`,
      borderLeft: `6px solid ${accent}`,
      background: C.panel,
      fontSize: 36,
      lineHeight: 1.3,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    }}
  >
    <div>{children}</div>
    {icon}
  </div>
);

const SignalBars = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
    <span style={{ fontFamily: mono, fontSize: 30, letterSpacing: '0.06em', color: C.teal }}>3G</span>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 72 }}>
      <span className="tc-a tc-sbar" style={{ height: 20, '--d': '0ms' } as CSSProperties} />
      <span className="tc-a tc-sbar" style={{ height: 38, '--d': '150ms' } as CSSProperties} />
      <span className="tc-a tc-sbar" style={{ height: 56, '--d': '300ms' } as CSSProperties} />
      <span className="tc-a tc-sbar" style={{ height: 72, '--d': '450ms' } as CSSProperties} />
    </div>
  </div>
);

const BluetoothLogo = () => (
  <div style={{ position: 'relative', width: 104, height: 104, flex: 'none', marginRight: 24 }}>
    <span className="tc-a tc-bt-ring" style={{ '--d': '0ms' } as CSSProperties} />
    <span className="tc-a tc-bt-ring" style={{ '--d': '1000ms' } as CSSProperties} />
    <svg className="tc-a tc-bt-logo" width={104} height={104} viewBox="0 0 24 24" role="img" aria-label="Bluetooth logo" style={{ position: 'relative' }}>
      <circle cx={12} cy={12} r={12} fill="#0082FC" />
      <polyline
        points="7.5,8 16.5,15.5 12,19.5 12,4.5 16.5,8.5 7.5,16"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const Winlab: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="06 · WINLAB"
      title={
        <span style={{ display: 'block', fontSize: 176, lineHeight: '176px', fontWeight: 900, letterSpacing: '-0.05em' }}>
          <DecodeText text="WinLAB" delay={100} />
        </span>
      }
    >
      <img
        className="tc-a"
        src={winlabLogo}
        alt="WINLAB: Wireless Information Network Laboratory"
        width={700}
        height={140}
        style={{
          position: 'absolute',
          top: 128,
          right: 120,
          display: 'block',
          borderRadius: 'var(--osd-radius)',
          boxShadow: '0 0 60px rgba(0,130,252,0.25)',
          ...rise(active, 500),
        }}
      />
      <p
        className="tc-a"
        style={{
          position: 'absolute',
          top: 314,
          left: 120,
          margin: 0,
          fontSize: 40,
          lineHeight: 1.2,
          fontWeight: 700,
          color: C.muted,
          ...rise(active, 600),
        }}
      >
        The Rutgers <b style={{ color: 'var(--osd-text)' }}>W</b>ireless <b style={{ color: 'var(--osd-text)' }}>I</b>nformation{' '}
        <b style={{ color: 'var(--osd-text)' }}>N</b>etwork <b style={{ color: 'var(--osd-text)' }}>Lab</b>oratory
      </p>
      <img
        className="tc-a"
        src={winlabBuilding}
        alt="The WINLAB building at Rutgers"
        width={540}
        height={405}
        style={{
          position: 'absolute',
          top: 410,
          left: 120,
          display: 'block',
          borderRadius: 'var(--osd-radius)',
          border: `1px solid ${C.line}`,
          ...rise(active, 800),
        }}
      />
      <div
        className={active ? 'tc-active' : undefined}
        style={{
          position: 'absolute',
          top: 410,
          left: 700,
          right: 120,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <Steps>
          <Step duration={200}>
            <WinCard accent="#FF8A4C">
              I studied under legendary wireless researcher <span style={{ color: 'var(--osd-accent)' }}>Roy Yates</span>
            </WinCard>
          </Step>
          <Step duration={200}>
            <WinCard accent="#4FD1C5" icon={<SignalBars />}>
              I worked on amazing technologies: 3G cellular wireless simulations (
              <span style={{ color: C.teal }}>MADRAS</span> / <span style={{ color: C.teal }}>MaRTIni</span>)
            </WinCard>
          </Step>
          <Step duration={200}>
            <WinCard accent="#0082FC" icon={<BluetoothLogo />}>
              And a little project probably going nowhere… <span style={{ color: '#4DA6FF' }}>Bluetooth</span>
            </WinCard>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Winlab.transition = settle;

/* ───────────────────────── 07 the real point: internships ───────────────────────── */

/** "internship(s)." drops in letter by letter, then ripples and cycles colour. */
const InternText = () => (
  <>
    {Array.from('internship(s).').map((ch, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static text, positions never reorder
      <span key={i} className="tc-a tc-int-g" style={{ '--i': i } as CSSProperties}>
        <span className="tc-a tc-int-w" style={{ '--i': i } as CSSProperties}>
          {ch}
        </span>
      </span>
    ))}
  </>
);

/** A student craning their neck up at the word, hand shading their eyes. */
const LookingUp = () => (
  <div className="tc-a tc-row" style={{ position: 'relative', width: 260, height: 400 }}>
    <svg width={260} height={400} viewBox="0 0 260 400" role="img" aria-label="A student looking up in awe">
      <defs>
        <clipPath id="tc-beanie-clip">
          <rect x={60} y={40} width={130} height={46} />
        </clipPath>
      </defs>
      {/* backpack */}
      <rect x={48} y={168} width={46} height={88} rx={12} fill="#FF8A4C" />
      <rect x={54} y={214} width={34} height={28} rx={7} fill="#FFC56B" />
      <rect x={44} y={156} width={54} height={16} rx={8} fill="#4FD1C5" />
      {/* legs + shoes */}
      <line x1={112} y1={300} x2={94} y2={372} stroke="#A9B7D9" strokeWidth={10} strokeLinecap="round" />
      <line x1={112} y1={300} x2={136} y2={372} stroke="#F3F6FC" strokeWidth={11} strokeLinecap="round" />
      <ellipse cx={90} cy={380} rx={17} ry={7} fill="#FF5D6C" />
      <ellipse cx={144} cy={380} rx={17} ry={7} fill="#FF5D6C" />
      {/* torso */}
      <line x1={112} y1={176} x2={112} y2={304} stroke="#F3F6FC" strokeWidth={24} strokeLinecap="round" />
      <line x1={98} y1={190} x2={92} y2={192} stroke="#F3F6FC" strokeWidth={5} strokeLinecap="round" />
      {/* head, tipped back */}
      <g className="tc-a tc-head">
        <circle cx={122} cy={104} r={46} fill="#FFD9B3" />
        <circle cx={122} cy={104} r={46} fill={SCARLET} clipPath="url(#tc-beanie-clip)" />
        <rect x={80} y={83} width={84} height={9} rx={4.5} fill="#F3F6FC" />
        <circle cx={122} cy={55} r={7} fill="#F3F6FC" />
        {/* wide eye, looking up */}
        <ellipse cx={146} cy={106} rx={9} ry={11} fill="#F3F6FC" />
        <circle className="tc-a tc-pupil" cx={149} cy={101} r={5} fill="#03050C" />
        <line x1={136} y1={90} x2={158} y2={86} stroke="#03050C" strokeWidth={3} strokeLinecap="round" />
        {/* open mouth */}
        <ellipse cx={150} cy={136} rx={7} ry={10} fill="#03050C" />
      </g>
      {/* hand shading eyes */}
      <line x1={112} y1={186} x2={176} y2={142} stroke="#F3F6FC" strokeWidth={11} strokeLinecap="round" />
      <line x1={176} y1={142} x2={154} y2={92} stroke="#F3F6FC" strokeWidth={10} strokeLinecap="round" />
      <circle cx={153} cy={88} r={9} fill="#FFD9B3" />
    </svg>
    <div
      className="tc-a tc-ooh"
      style={{
        position: 'absolute',
        left: 188,
        top: -4,
        padding: '8px 18px',
        borderRadius: 16,
        background: '#F3F6FC',
        color: '#03050C',
        fontFamily: mono,
        fontSize: 24,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        opacity: 0,
      }}
    >
      ooh…
    </div>
  </div>
);

const HIGHLIGHT = new Set(['real', 'supervised', 'try', 'career', 'size', 'commit']);
const isKey = (w: string) => HIGHLIGHT.has(w.replace(/[.,;]/g, '').toLowerCase());

const DefWords = ({ text }: { text: string }) => (
  <>
    {text.split(' ').map((w, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static text, positions never reorder
      <span key={i}>
        <span
          className="tc-a tc-wd"
          style={
            {
              '--i': i,
              display: 'inline-block',
              color: isKey(w) ? C.gold : undefined,
              fontWeight: isKey(w) ? 800 : 600,
            } as CSSProperties
          }
        >
          {w}
        </span>{' '}
      </span>
    ))}
  </>
);

const Definition = () => (
  <div
    className="tc-a tc-row"
    style={{
      position: 'relative',
      boxSizing: 'border-box',
      padding: '36px 52px 40px 72px',
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${C.line}`,
      borderLeft: '8px solid var(--osd-accent)',
      background: 'linear-gradient(135deg, rgba(255,138,76,0.12), rgba(255,255,255,0.03))',
      overflow: 'hidden',
    }}
  >
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 22,
        top: -18,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 220,
        fontWeight: 900,
        lineHeight: 1,
        color: 'var(--osd-accent)',
        opacity: 0.25,
      }}
    >
      “
    </div>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 28, whiteSpace: 'nowrap' }}>
      <span className="tc-a tc-passion" style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em' }}>
        in·tern·ship
      </span>
      <span style={{ fontFamily: mono, fontSize: 28, color: C.dim }}>/ˈɪn·tɜrn·ʃɪp/</span>
      <span
        style={{
          fontFamily: mono,
          fontSize: 22,
          letterSpacing: '0.12em',
          padding: '4px 16px',
          borderRadius: 999,
          border: `1px solid ${C.teal}`,
          color: C.teal,
        }}
      >
        NOUN
      </span>
    </div>
    <div style={{ position: 'relative', marginTop: 20, fontSize: 44, lineHeight: 1.4, letterSpacing: '-0.02em' }}>
      <DefWords text="A period of real, supervised work experience in a field you’re curious about; a way to try a career on for size before you commit to it." />
    </div>
  </div>
);

const Internship: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="07 · THE REAL POINT"
      title={
        <span style={{ fontSize: 84 }}>
          And here’s the real point here{' '}
          <span
            className="tc-a"
            style={{
              display: 'inline-block',
              color: 'var(--osd-accent)',
              animation: active ? 'tc-nudge 1.1s ease-in-out infinite' : undefined,
            }}
          >
            →
          </span>
        </span>
      }
    >
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', top: 245, left: 120 }}>
          <Steps>
            <Step duration={200}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="tc-a tc-row" style={{ display: 'flex', alignItems: 'center', gap: 28, whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em' }}>find</span>
                  <span style={{ position: 'relative', isolation: 'isolate', fontSize: 156, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
                    <InternText />
                    <span
                      aria-hidden="true"
                      className="tc-a tc-hl"
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 8,
                        height: 14,
                        borderRadius: 7,
                        background: 'linear-gradient(90deg, rgba(255,138,76,0.9), rgba(255,197,107,0.9))',
                        transformOrigin: 'left',
                        zIndex: -1,
                      }}
                    />
                  </span>
                  <span className="tc-a tc-mag" style={{ display: 'inline-block', fontSize: 130, lineHeight: 1 }}>
                    🔍
                  </span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <LookingUp />
                </div>
              </div>
            </Step>
          </Steps>
        </div>
        <div style={{ position: 'absolute', top: 520, left: 470, right: 120 }}>
          <Steps>
            <Step duration={200}>
              <Definition />
            </Step>
          </Steps>
        </div>
      </div>
    </Frame>
  );
};
Internship.transition = settle;

export const meta: SlideMeta = {
  title: 'What a career in technology looks like & how AI changes everything',
  createdAt: '2026-11-07T16:09:51.435Z',
};
export default [Cover, Agenda, Powers, Hello, College, Winlab, Internship] satisfies Page[];
