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
import compaqLogo from './assets/compaq-logo.svg';
import decAlphaGeneration from './assets/dec-alpha-generation.svg';
import decLogo from './assets/dec-logo.svg';
import broadwayChip from './assets/broadway-chip.jpg';
import g5Angle from './assets/g5-angle.jpg';
import g5Front from './assets/g5-front.jpg';
import g5Open from './assets/g5-open.jpg';
import hpLogo from './assets/hp-logo.svg';
import ibmLogo from './assets/ibm-logo.svg';
import marenostrumA from './assets/marenostrum-a.jpg';
import marenostrumD from './assets/marenostrum-d.jpg';
import mareRacks from './assets/mare.jpg';
import power7Badge from './assets/power7-badge.svg';
import powerpcLogo from './assets/powerpc-logo.svg';
import tru64Login from './assets/tru64.png';
import winlabBuilding from './assets/winlab-building.jpg';
import winlabLogo from './assets/winlab-logo.jpg';
import xbox360Pro from './assets/xbox360-pro.jpg';
import xbox360S from './assets/xbox360-s.jpg';

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
@keyframes tc-crt { 0% { opacity: 0; transform: scale(0.02, 0.004); filter: brightness(6); } 35% { opacity: 1; transform: scale(1, 0.006); filter: brightness(4); } 70% { transform: scale(1, 1.05); filter: brightness(2); } 100% { opacity: 1; transform: none; filter: none; } }
@keyframes tc-roll { from { transform: translateY(-110px); } to { transform: translateY(520px); } }
@keyframes tc-type { from { width: 0; } to { width: 2ch; } }
@keyframes tc-caret { 0%, 49% { border-right-color: #000; } 50%, 100% { border-right-color: transparent; } }
@keyframes tc-pin { 0% { opacity: 0; transform: translateY(-150px) scale(0.6); } 55% { opacity: 1; transform: translateY(0) scale(1.15, 0.85); } 75% { transform: translateY(-16px) scale(0.95, 1.05); } 100% { opacity: 1; transform: none; } }
@keyframes tc-njdraw { from { stroke-dashoffset: 1; fill-opacity: 0; } 70% { fill-opacity: 0; } to { stroke-dashoffset: 0; fill-opacity: 1; } }
@keyframes tc-bobsm { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-9px) rotate(-1.5deg); } }
.tc-active [data-osd-step="revealed"] .tc-in { animation: tc-up 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms) both; }
.tc-active [data-osd-step="revealed"] .tc-win { animation: tc-crt 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 100ms both; }
.tc-active [data-osd-step="revealed"] .tc-roll { animation: tc-roll 4s linear 1100ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-typed { animation: tc-type 500ms steps(2, end) 1300ms both, tc-caret 0.9s steps(1) infinite; }
.tc-active [data-osd-step="revealed"] .tc-plq { animation: tc-up 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) both, tc-bobsm 3.6s ease-in-out calc(var(--d) + 900ms) infinite; }
.tc-active [data-osd-step="revealed"] .tc-bit { animation: tc-chip 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 900ms both, tc-glow 2.4s ease-in-out 1600ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-nj { animation: tc-njdraw 1700ms cubic-bezier(0.4, 0, 0.2, 1) 1500ms both; }
.tc-active [data-osd-step="revealed"] .tc-pin { transform-box: fill-box; transform-origin: 50% 100%; animation: tc-pin 900ms cubic-bezier(0.34, 1.2, 0.64, 1) 2300ms both; }
.tc-active [data-osd-step="revealed"] .tc-rip { transform-box: fill-box; transform-origin: center; animation: tc-ring 2s ease-out var(--d) infinite; }
@keyframes tc-hmm { 0%, 100% { transform: rotate(-10deg) translateY(0); } 25% { transform: rotate(12deg) translateY(-12px); } 50% { transform: rotate(-4deg) translateY(2px); } 75% { transform: rotate(16deg) translateY(-8px); } }
@keyframes tc-qpop { 0%, 100% { opacity: 0; transform: translateY(18px) scale(0.3) rotate(-24deg); } 18%, 62% { opacity: 1; transform: translateY(0) scale(1) rotate(8deg); } 82% { opacity: 0; transform: translateY(-34px) scale(1.3) rotate(18deg); } }
@keyframes tc-clover { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(90deg) scale(1.18); } }
@keyframes tc-sparkle { 0%, 100% { opacity: 0; transform: scale(0.2) rotate(0deg); } 50% { opacity: 1; transform: scale(1) rotate(80deg); } }
@keyframes tc-roadin { to { stroke-dashoffset: 0; } }
@keyframes tc-marchants { to { stroke-dashoffset: -30; } }
@keyframes tc-hop { 0% { opacity: 0; transform: translateY(-110px) scale(0.5); } 55% { opacity: 1; transform: translateY(0) scale(1.18, 0.82); } 78% { transform: translateY(-20px) scale(0.96, 1.05); } 100% { opacity: 1; transform: none; } }
@keyframes tc-return { 0% { offset-distance: 0%; opacity: 0; } 4% { opacity: 1; } 84% { offset-distance: 100%; opacity: 1; } 95% { offset-distance: 100%; opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
@keyframes tc-say4 { 0%, 10% { opacity: 0; transform: scale(0.6); } 13%, 28% { opacity: 1; transform: none; } 31%, 100% { opacity: 0; } }
@keyframes tc-say5 { 0%, 42% { opacity: 0; transform: scale(0.6); } 45%, 60% { opacity: 1; transform: none; } 63%, 100% { opacity: 0; } }
@keyframes tc-say6 { 0%, 80% { opacity: 0; transform: scale(0.6); } 83%, 94% { opacity: 1; transform: none; } 97%, 100% { opacity: 0; } }
@keyframes tc-tie { 0%, 100% { transform: skewX(0deg) rotate(0deg); } 50% { transform: skewX(-8deg) rotate(6deg); } }
.tc-active [data-osd-step="revealed"] .tc-lucky { animation: tc-badge 800ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.tc-active [data-osd-step="revealed"] .tc-clover { transform-box: fill-box; transform-origin: center; animation: tc-chip 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 400ms both, tc-clover 3s ease-in-out 1200ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-spk { animation: tc-sparkle 1.8s ease-in-out var(--d) infinite; }
.tc-active [data-osd-step="revealed"] .tc-road { stroke-dasharray: 1; stroke-dashoffset: 1; animation: tc-roadin 1800ms cubic-bezier(0.4, 0, 0.2, 1) 500ms forwards; }
.tc-active [data-osd-step="revealed"] .tc-ants { animation: tc-marchants 1s linear infinite; }
.tc-active [data-osd-step="revealed"] .tc-hoppin { transform-box: fill-box; transform-origin: 50% 100%; animation: tc-hop 900ms cubic-bezier(0.34, 1.2, 0.64, 1) 2200ms both; }
.tc-active [data-osd-step="revealed"] .tc-hoprip { transform-box: fill-box; transform-origin: center; animation: tc-ring 2s ease-out var(--d) infinite; }
.tc-return-walker { position: absolute; left: 0; top: 0; width: 96px; height: 120px; offset-rotate: 0deg; offset-anchor: 50% 100%; }
.tc-active .tc-return-walker { animation: tc-return 12s linear 700ms infinite both; }
.tc-active .tc-rb4 { animation: tc-say4 12s linear 700ms infinite; }
.tc-active .tc-rb5 { animation: tc-say5 12s linear 700ms infinite; }
.tc-active .tc-rb6 { animation: tc-say6 12s linear 700ms infinite; }
@keyframes tc-stripes { to { background-position: 0 14px; } }
@keyframes tc-bro { 0%, 20%, 54%, 100% { transform: translateY(0); } 36% { transform: translateY(-34px); } }
@keyframes tc-armhit { 0%, 22% { transform: rotate(8deg); } 40%, 50% { transform: rotate(62deg); } 70%, 100% { transform: rotate(8deg); } }
@keyframes tc-slap { 0%, 38% { opacity: 0; transform: scale(0.2) rotate(-20deg); } 44% { opacity: 1; transform: scale(1.4) rotate(6deg); } 56% { opacity: 1; transform: scale(1) rotate(0deg); } 68%, 100% { opacity: 0; transform: scale(0.8); } }
@keyframes tc-corelit { 0%, 100% { background: rgba(77,166,255,0.14); box-shadow: none; } 50% { background: #4DA6FF; box-shadow: 0 0 18px rgba(77,166,255,0.9); } }
@keyframes tc-swknob { 0%, 22% { transform: translateX(0); } 34%, 80% { transform: translateX(78px); } 92%, 100% { transform: translateX(0); } }
@keyframes tc-swon { 0%, 22% { opacity: 1; } 34%, 80% { opacity: 0; } 92%, 100% { opacity: 1; } }
@keyframes tc-swoff { 0%, 22% { opacity: 0; } 34%, 80% { opacity: 1; } 92%, 100% { opacity: 0; } }
@keyframes tc-bugwig { 0%, 100% { transform: rotate(-8deg) scale(1); } 50% { transform: rotate(10deg) scale(1.12); } }
@keyframes tc-peck { 0%, 60%, 100% { transform: rotate(0deg) translateY(0); } 70% { transform: rotate(22deg) translateY(10px); } 80% { transform: rotate(-4deg); } 88% { transform: rotate(20deg) translateY(8px); } }
@keyframes tc-bawk { 0%, 30% { opacity: 0; transform: scale(0.5); } 36%, 62% { opacity: 1; transform: none; } 70%, 100% { opacity: 0; } }
.tc-ibm-bars { display: inline-block; background-image: repeating-linear-gradient(180deg, #4DA6FF 0px, #4DA6FF 10px, transparent 10px, transparent 14px); background-size: 100% 14px; -webkit-background-clip: text; background-clip: text; color: transparent; }
.tc-bluegrad { background-image: linear-gradient(90deg, #4DA6FF, #9AD7FF, #4FD1C5, #4DA6FF); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; }
.tc-active [data-osd-step="revealed"] .tc-bluegrad { animation: tc-hue 3s linear infinite; }
.tc-active [data-osd-step="revealed"] .tc-core { animation: tc-corelit 1.6s ease-in-out var(--d) infinite; }
.tc-active [data-osd-step="revealed"] .tc-sw-knob { animation: tc-swknob 5s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-sw-on { animation: tc-swon 5s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-sw-off { animation: tc-swoff 5s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-bug { animation: tc-swon 5s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-bug > span { animation: tc-bugwig 0.5s ease-in-out infinite; }
.tc-active [data-osd-step="revealed"] .tc-hen { animation: tc-peck 5s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-bawk { animation: tc-bawk 5s ease-in-out 600ms infinite; }
@keyframes tc-polaroid { from { opacity: 0; transform: translateY(-150px) rotate(calc(var(--r) - 16deg)) scale(0.7); } to { opacity: 1; transform: rotate(var(--r)) scale(1); } }
@keyframes tc-popin { from { opacity: 0; transform: scale(0.3) translateY(26px); } to { opacity: 1; transform: none; } }
@keyframes tc-jab { 0%, 55%, 100% { transform: rotate(0deg); } 65% { transform: rotate(-16deg); } 75% { transform: rotate(5deg); } 85% { transform: rotate(-14deg); } }
@keyframes tc-led { 0%, 100% { opacity: 0.18; } 50% { opacity: 1; } }
@keyframes tc-smug { 0%, 100% { transform: rotate(0deg) translateY(0); } 50% { transform: rotate(-3deg) translateY(-5px); } }
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

/* ───────────────────────── 08 second internship: Compaq / HP ───────────────────────── */

const Plaque = ({ src, alt, h, delay }: { src: string; alt: string; h: number; delay: number }) => {
  const active = useIsActivePage();
  return (
    <span
      className="tc-a"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '12px 24px',
        borderRadius: 14,
        background: '#FFFFFF',
        boxShadow: '0 0 40px rgba(255,255,255,0.12)',
        animation: active ? `tc-badge 800ms ${SPRING} ${delay}ms both` : undefined,
      }}
    >
      <img src={src} alt={alt} height={h} style={{ display: 'block', height: h, width: 'auto' }} />
    </span>
  );
};

const SecondTitle = () => {
  const active = useIsActivePage();
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 84, lineHeight: '100px', whiteSpace: 'nowrap' }}>
      <span style={{ ...rise(active, 100) }}>Second Internship:</span>
      <Plaque src={compaqLogo} alt="Compaq" h={52} delay={500} />
      <span
        className="tc-a"
        style={{
          color: 'var(--osd-accent)',
          fontWeight: 900,
          animation: active ? 'tc-wave 2s ease-in-out 1200ms infinite' : undefined,
        }}
      >
        /
      </span>
      <Plaque src={hpLogo} alt="HP" h={64} delay={700} />
    </span>
  );
};

/** The Tru64 login screen on a rolling CRT, with a username being typed in. */
const Tru64Window = () => (
  <div
    className="tc-a tc-win"
    style={{
      position: 'relative',
      width: 1000,
      height: 382,
      borderRadius: 'var(--osd-radius)',
      border: `2px solid ${C.line}`,
      boxShadow: '0 0 70px rgba(255,138,76,0.25)',
      overflow: 'hidden',
      transformOrigin: 'center',
    }}
  >
    <img src={tru64Login} alt="Compaq Tru64 UNIX login screen" width={1000} height={382} style={{ display: 'block', width: 1000, height: 382 }} />
    <div
      style={{
        position: 'absolute',
        left: 232,
        top: 209,
        height: 26,
        fontFamily: mono,
        fontSize: 24,
        lineHeight: '26px',
        color: '#000',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <span className="tc-a tc-typed" style={{ display: 'block', width: '2ch', borderRight: '3px solid #000' }}>
        dj
      </span>
    </div>
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 2px, transparent 2px, transparent 4px)',
      }}
    />
    <div
      aria-hidden="true"
      className="tc-a tc-roll"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 110,
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0))',
      }}
    />
  </div>
);

const ManalapanCard = () => (
  <div
    className="tc-a tc-in"
    style={
      {
        '--d': '1400ms',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        height: 440,
        boxSizing: 'border-box',
        padding: '10px 28px 10px 20px',
        borderRadius: 'var(--osd-radius)',
        border: `1px solid ${C.line}`,
        background: C.panel,
      } as CSSProperties
    }
  >
    <svg width={232} height={420} viewBox="0 0 160 290" role="img" aria-label="Stylized map of New Jersey with a pin on Manalapan">
      <polygon
        className="tc-a tc-nj"
        pathLength={1}
        strokeDasharray={1}
        points="80.6,4.6 150.6,47 140,92 141.8,109 137,149 132.6,190 115,218 62,284 40,253 9,218 17.7,186 44,161 73.5,136 35,92 44,57 53,23"
        fill="rgba(255,93,108,0.14)"
        stroke={C.red}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <circle cx={88} cy={102} r={3.2} fill={SCARLET} stroke="#F3F6FC" strokeWidth={1} />
      <text x={94} y={100} fontSize={7.5} fill={C.dim} style={{ fontFamily: mono }}>
        RUTGERS
      </text>
      <circle className="tc-a tc-rip" cx={105} cy={135} r={6} fill="none" stroke="#FFC56B" strokeWidth={1.6} style={{ '--d': '2800ms', opacity: 0 } as CSSProperties} />
      <circle className="tc-a tc-rip" cx={105} cy={135} r={6} fill="none" stroke="#FFC56B" strokeWidth={1.6} style={{ '--d': '3800ms', opacity: 0 } as CSSProperties} />
      <g className="tc-a tc-pin" style={{ opacity: 0 }}>
        <path d="M105 135 C 96 124, 94 118, 94 113 A11 11 0 0 1 116 113 C 116 118, 114 124, 105 135 Z" fill="#FF8A4C" stroke="#F3F6FC" strokeWidth={1.6} />
        <circle cx={105} cy={113} r={4.2} fill="#03050C" />
      </g>
    </svg>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.12em', color: C.dim }}>WHERE THE DESIGN LAB WAS</div>
      <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em' }}>Manalapan,</div>
      <div
        className="tc-a tc-passion"
        style={{ fontSize: 132, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}
      >
        NJ
      </div>
    </div>
  </div>
);

const Tru64: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame eyebrow="08 · SECOND INTERNSHIP" title={<SecondTitle />}>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          <Step duration={200}>
            <div style={{ position: 'absolute', top: 290, left: 120 }}>
              <Tru64Window />
              <div
                className="tc-a tc-bit"
                style={
                  {
                    '--g0': 'rgba(255,138,76,0)',
                    '--g1': 'rgba(255,138,76,0.5)',
                    position: 'absolute',
                    right: -22,
                    top: -26,
                    padding: '8px 22px',
                    borderRadius: 999,
                    background: 'var(--osd-accent)',
                    color: '#03050C',
                    fontFamily: mono,
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    transform: 'rotate(4deg)',
                  } as CSSProperties
                }
              >
                64-BIT
              </div>
              <p
                className="tc-a tc-in"
                style={
                  {
                    '--d': '600ms',
                    width: 1000,
                    margin: '36px 0 0',
                    fontSize: 40,
                    lineHeight: 1.4,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: C.muted,
                  } as CSSProperties
                }
              >
                I was helping the design team that built{' '}
                <b style={{ color: C.gold }}>Compaq Tru64 OS</b> for{' '}
                <b style={{ color: 'var(--osd-accent)' }}>DEC Alpha</b> Processors.
              </p>
            </div>
            <div style={{ position: 'absolute', top: 290, left: 1180, width: 620, display: 'flex', alignItems: 'center', gap: 24 }}>
              <span
                className="tc-a tc-plq"
                style={{ '--d': '700ms', display: 'inline-flex', padding: '14px 24px', borderRadius: 14, background: '#FFFFFF' } as CSSProperties}
              >
                <img src={decLogo} alt="Digital Equipment Corporation" height={56} style={{ display: 'block', height: 56, width: 'auto' }} />
              </span>
              <span
                className="tc-a tc-plq"
                style={{ '--d': '950ms', display: 'inline-flex', padding: '12px 22px', borderRadius: 14, background: '#FFFFFF' } as CSSProperties}
              >
                <img src={decAlphaGeneration} alt="Alpha Generation" height={118} style={{ display: 'block', height: 118, width: 'auto' }} />
              </span>
            </div>
            <div style={{ position: 'absolute', top: 470, left: 1180, width: 620 }}>
              <ManalapanCard />
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Tru64.transition = settle;

/* ───────────────────────── 09 second point: luck ───────────────────────── */

const HMM_Q = [
  { x: 0, y: 4, size: 74, d: '0ms' },
  { x: 62, y: -22, size: 52, d: '700ms' },
  { x: 118, y: 14, size: 62, d: '1400ms' },
];

/** A thinking emoji with question marks pinging up around it. */
const Hmm = () => {
  const active = useIsActivePage();
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 190, height: 110, verticalAlign: 'middle' }}>
      <span
        aria-hidden="true"
        className="tc-a"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          fontSize: 96,
          lineHeight: '110px',
          animation: active ? 'tc-hmm 3.4s ease-in-out infinite' : undefined,
        }}
      >
        🤔
      </span>
      {HMM_Q.map((q) => (
        <span
          key={q.d}
          aria-hidden="true"
          className="tc-a"
          style={{
            position: 'absolute',
            left: 96 + q.x,
            top: q.y - 6,
            fontFamily: 'var(--osd-font-display)',
            fontSize: q.size,
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--osd-accent)',
            opacity: 0,
            animation: active ? `tc-qpop 2.8s ease-in-out ${q.d} infinite` : undefined,
          }}
        >
          ?
        </span>
      ))}
    </span>
  );
};

const Clover = () => (
  <svg className="tc-a tc-clover" width={150} height={150} viewBox="0 0 100 100" role="img" aria-label="Four-leaf clover" style={{ overflow: 'visible' }}>
    {[0, 90, 180, 270].map((a) => (
      <g key={a} transform={`rotate(${a} 50 50)`}>
        <path d="M50 50 C 28 42, 24 12, 50 12 C 76 12, 72 42, 50 50 Z" fill="#5BE49B" fillOpacity={0.88} stroke="#F3F6FC" strokeWidth={1.6} />
        <path d="M50 46 L50 22" stroke="#03050C" strokeOpacity={0.35} strokeWidth={1.6} strokeLinecap="round" />
      </g>
    ))}
    <path d="M50 52 C 52 70, 62 82, 70 92" fill="none" stroke="#5BE49B" strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const Sparkle = ({ x, y, size, d }: { x: number; y: number; size: number; d: string }) => (
  <svg
    aria-hidden="true"
    className="tc-a tc-spk"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    style={{ position: 'absolute', left: x, top: y, '--d': d, opacity: 0 } as CSSProperties}
  >
    <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FFC56B" />
  </svg>
);

const MAP_MINOR = 'M863 155 L859 163 L844 179 M102 -8 L104 -7 M88 70 L122 69 L143 76 M721 169 L731 159 L742 165 M892 193 L879 177 L875 168 L874 160 L860 154 L848 145 L840 135 L833 120 L822 111 M581 -7 L587 -6 L599 -11 M813 51 L811 46 M525 64 L525 67 M536 57 L526 64 L521 62 M732 321 L735 321 L737 315 L732 307 M737 316 L763 305 L791 286 L809 278 L865 319 M731 309 L733 310 M841 81 L832 78 L821 65 L820 53 L817 50 L812 51 L803 62 M712 140 L726 147 M526 16 L521 13 M610 129 L617 118 M381 -6 L379 0 L373 3 M669 181 L677 178 L679 173 L670 151 M-24 115 L-16 124 L-15 133 L-26 154 L-38 163 L-40 169 M143 -31 L105 -7 L96 -12 L92 -12 L85 -5 M112 110 L117 117 L135 127 L140 127 L140 121 L118 104 M16 107 L2 105 L-29 93 L-51 106 L-63 99 M732 321 L726 315 L731 309 M1296 262 L1294 260 L1274 250 L1258 248 L1232 252 L1220 251 L1183 236 L1180 231 L1165 220 L1132 209 L1108 210 L1087 224 L1053 229 L1041 227 L1003 215 L980 203 L964 197 L893 193 L882 199 L851 202 L834 196 L822 189 L808 189 M822 111 L770 73 L737 9 L733 -5 L741 -37 L739 -57 M144 149 L141 148 L137 141 L110 130 L104 132 L97 151 L60 136 M629 -26 L629 -26 M811 233 L818 243 L819 252 L834 264 M445 71 L443 87 L454 97 M136 25 L126 25 L117 35 L114 63 M-79 166 L-78 155 L-61 151 L-55 147 L-18 109 L-14 99 M-18 109 L10 124 M128 61 L124 70 M344 -28 L346 -18 L351 -8 L348 -0 L312 27 L299 35 L282 54 M802 97 L789 111 M607 22 L611 15 L620 7 L620 4 L614 2 L599 12 M723 -2 L718 6 M349 284 L342 293 L341 302 L348 309 L360 307 M114 44 L102 41 M134 36 L129 36 L124 45 M203 -15 L237 7 L259 25 L259 35 L247 59 M764 60 L753 73 L749 82 M7 133 L16 107 M25 352 L48 385 L54 402 L60 411 L74 410 L80 403 L86 401 L92 402 L97 408 M-8 148 L-4 142 L-9 138 L-7 126 M574 96 L543 143 L533 148 L524 167 M29 357 L35 352 M100 143 L132 155 L134 158 L123 186 L119 188 L106 187 L102 180 L114 149 M373 3 L377 14 L386 18 L391 24 L406 34 M76 212 L76 200 L72 177 L75 172 L88 168 L89 164 L65 153 L52 153 L49 158 M64 138 L61 145 L62 153 M-32 159 L-28 164 L-21 166 L-8 161 L-6 155 L-7 149 L-18 141 M141 -33 L148 -37 L164 -25 L154 -13 L150 -13 M757 265 L735 244 M700 11 L702 19 L715 19 L739 33 M24 351 L24 346 L19 339 L14 336 L12 341 L25 352 M114 56 L123 57 L137 69 M763 255 L775 262 M17 138 L15 145 L7 151 L1 162 L-4 163 L-8 161 M13 118 L25 126 L27 133 L21 139 L7 133 M74 190 L84 181 L103 185 M435 288 L429 275 L427 262 L424 258 L375 254 M171 340 L201 360 M682 310 L638 265 L628 258 L610 252 M726 315 L718 311 M594 24 L589 12 L593 6 M851 231 L835 229 L818 233 L806 233 L767 246 M128 -58 L111 -38 L64 -4 M139 7 L133 51 L135 54 L145 57 M712 90 L752 37 M752 36 L794 -19 L864 -118 M704 -12 L710 -8 L711 2 L725 11 M138 17 L148 18 M576 98 L582 89 M740 248 L728 264 L717 266 M570 416 L568 408 L570 395 L593 341 L606 301 L610 252 L592 225 L606 188 L632 153 M-18 141 L-33 141 L-35 149 M741 -37 L751 -29 L752 -20 M754 -17 L754 -17 M89 164 L93 165 M699 140 L712 140 L721 124 L709 113 L700 124 L707 131 L704 140 M108 130 L105 122 L106 115 L116 107 L129 90 L135 75 M715 19 L718 14 L735 6 M597 117 L600 111 L595 102 M103 135 L70 122 L60 136 M138 342 L117 323 L105 303 L87 295 L77 285 M58 408 L51 411 L47 409 L45 397 L41 390 L41 379 L51 374 M-8 148 L-16 155 L-8 161 M38 371 L48 364 L48 361 L44 360 L35 366 M76 87 L76 87 M89 70 L87 79 M87 79 L90 70 M102 63 L84 58 L80 59 L82 64 L84 63 L84 58 M89 58 L89 70 M90 70 L90 59 M201 360 L241 387 L253 392 L261 390 M161 359 L138 342 M735 244 L729 236 L719 215 L707 209 L645 164 L613 132 L542 67 L520 29 M240 252 L243 255 L234 264 M593 6 L613 -7 L623 -6 M292 -35 L290 -25 L300 -18 M75 84 L64 87 L62 89 L65 91 L76 87 M429 276 L420 278 M-19 68 L-29 61 L-38 48 M-36 76 L-22 71 L-18 66 M259 35 L266 37 L278 32 M806 189 L775 197 M808 189 L806 189 M587 108 L579 117 L580 127 L576 133 M735 -16 L744 -17 L746 -14 M838 132 L834 134 L832 145 M102 41 L95 39 M115 45 L114 44 M102 41 L111 45 L114 44 M739 314 L736 313 M351 -4 L373 3 M833 121 L838 118 L850 121 L857 119 L863 113 L863 104 M565 88 L568 84 L568 72 M612 131 L619 125 L626 126 L632 121';
const MAP_MAJOR = 'M10 203 L11 198 M13 161 L5 168 L-14 170 L-20 175 M11 198 L10 171 L13 161 M731 309 L732 321 M379 438 L410 440 L446 446 L466 442 L498 432 L516 436 L538 433 L561 416 L579 416 L585 414 L607 395 L622 385 L639 384 L664 392 L675 391 L680 388 L716 345 M776 187 L781 169 L792 149 L836 93 L841 81 L846 52 L873 14 L878 5 L879 -6 L875 -46 L875 -121 L871 -137 M693 601 L697 592 L711 578 L715 556 L725 535 L731 508 L747 482 L750 475 L744 443 L742 385 L738 377 L729 364 M756 192 L770 197 L773 204 M717 348 L714 347 M520 29 L539 -10 M-22 178 L-9 196 L4 203 M10 203 L-7 197 L-22 177 M152 43 L167 33 L181 9 L199 -10 L230 -55 M149 214 L149 205 L141 172 L148 128 L142 105 L145 57 M753 192 L734 185 L719 167 L708 158 L691 125 L666 101 L649 78 L632 63 L603 17 L539 -52 M191 294 L194 285 L210 253 M189 302 L191 294 M148 48 L146 43 L149 -18 L100 -106 M775 197 L770 197 M68 514 L108 455 L106 450 L96 439 L93 432 L92 421 L96 409 L108 400 L136 393 L146 387 L185 314 L189 302 M149 214 L170 213 L180 216 L185 221 L199 242 L210 253 L227 262 L267 274 L287 289 L295 299 M18 55 L10 45 M-35 -32 L-15 -7 L-1 28 L10 45 M13 161 L32 136 L39 116 L40 102 L38 89 L33 76 L26 65 M26 65 L18 55 M13 203 L14 203 M4 203 L10 203 M14 203 L16 203 M18 204 L28 205 M-20 175 L-22 177 M28 205 L72 212 L137 214 M756 192 L753 192 M731 309 L767 246 M776 189 L776 187 M540 -11 L546 -24 L543 -34 L543 -48 M539 -10 L540 -11 M10 203 L13 203 M16 203 L18 204 M137 214 L149 214 M295 299 L302 323 L308 328 L320 331 M320 331 L329 336 L337 345 L343 387 L348 396 L363 407 L369 415 L375 432 L384 445 L387 462 M148 48 L145 57 M148 48 L148 48 M148 48 L152 43 M145 57 L148 48 M152 43 L148 48 M729 364 L716 345 L732 326 L732 321 M767 246 L776 189';
const MAP_RIVER = 'M269 318 L255 303 L231 294 L209 293 L175 301 L159 298 L148 287 L149 253 L145 246 L139 241 L120 248 L97 270 L88 273 L75 257 L55 216 L38 212 L16 222 L8 221 L-17 198 L-28 182 L-43 175 L-62 175 L-91 185 L-97 190 L-108 208 L-122 217 L-137 217 L-148 212 L-153 206 L-155 196 L-160 192 L-172 191 L-178 193 L-192 210 L-207 258 L-216 273 L-229 287 L-245 289 L-252 284 L-258 245 L-265 230 L-310 195 L-334 171 L-340 170 M540 1038 L512 1027 L489 1015 L456 986 L457 971 L468 954 L478 949 L503 950 L514 945 L517 937 L509 925 L480 896 L460 883 L451 872 L434 868 L429 875 L424 876 L413 871 L412 838 L392 794 L392 755 L386 736 L341 675 L327 667 L287 655 L274 643 L272 634 L274 627 L285 617 L313 601 L331 598 L363 606 L371 602 L374 593 L375 553 L381 507 L377 492 L370 483 L342 476 L334 469 L335 462 L343 444 L357 438 L360 434 L364 417 L359 411 L337 404 L327 395 L322 346 L319 338 L309 333 L281 329 L269 318 M1343 -101 L1337 -95 L1329 -93 L1324 -94 L1322 -99 L1313 -97 L1308 -101 L1300 -104 L1296 -96 L1280 -102 L1269 -98 L1263 -102 L1244 -95 L1231 -112 L1220 -116 L1205 -127 L1202 -132 L1202 -140 L1196 -139 L1181 -148 L1163 -163 L1156 -172 L1151 -172 L1145 -168 L1138 -172 L1126 -167 L1113 -172 L1104 -170 L1092 -185 L1085 -185 L1080 -190 L1063 -194 L1051 -192 L1052 -201 L1047 -207 L1036 -210 L1028 -217 L1013 -221 L1001 -219 L988 -210 L972 -210 L971 -204 L955 -190 L947 -193 L935 -185 L913 -178 L908 -174 L885 -169 L878 -165 L835 -163 L820 -170 L816 -169 L810 -160 L803 -160 L798 -167 L792 -167 L759 -149 L740 -146 L726 -141 L702 -145 L696 -143 L691 -136 L687 -139 L688 -149 L685 -150 L681 -148 L673 -152 L674 -157 L670 -158 L664 -151 L660 -159 L647 -157 L635 -144 L633 -137 L629 -135 L611 -130 L606 -124 L599 -126 L583 -123 L582 -112 L575 -100 L571 -102 L572 -107 L566 -108 L560 -83 L557 -83 L553 -97 L546 -94 L546 -83 L542 -77 L538 -77 L534 -64 L529 -61 L533 -36 L532 -30 L522 -21 L518 -13 L504 -9 L502 0 L495 -4 L493 1 L496 8 L493 11 L483 4 L474 8 L467 2 L462 5 L453 4 L435 -9 L426 -5 L413 -22 L399 -28 L390 -28 L375 -19 L362 -30 L351 -45 L350 -50 L342 -56 L343 -64 L339 -71 L340 -77 L334 -78 L323 -76 L321 -84 L317 -84 L313 -78 L305 -75 L303 -80 L306 -89 L296 -88 L294 -96 L275 -93 L260 -97 L255 -102 L257 -107 L270 -111 L270 -113 L267 -121 L261 -114 L258 -113 L257 -117 L260 -124 L256 -127 L259 -133 L257 -156 L247 -163 L228 -166 L227 -176 L225 -178 L220 -177 L223 -201 L230 -204 L229 -207 L224 -210 L229 -216 L217 -216 L213 -223 L208 -225 L212 -233 L208 -235 L206 -241 L201 -244 L205 -249 L201 -254 L205 -255 L207 -257 L198 -260 L205 -268 L209 -269 L217 -267 L220 -259 L224 -259 L223 -268 L230 -273 L230 -281 L237 -283 L237 -286 L232 -287 L232 -291 L235 -293 L243 -291 L243 -293 L239 -302 L240 -317 L237 -327 L239 -348 L237 -352 L225 -357 L224 -362 L229 -371 L238 -370 L247 -380 L254 -378 L257 -380 L254 -394 L257 -399 L252 -401 L246 -399 L245 -402 L249 -406 L260 -407 L255 -411 L250 -422 L254 -435 L260 -441 L260 -448 L251 -452 L255 -461 L261 -462 L264 -471 L258 -495 L263 -504 L251 -521 L246 -521 L242 -515 L239 -515 L243 -529 L240 -539 L251 -541 L255 -557 L251 -566 L245 -571 L250 -576 L251 -585 L269 -588 L267 -596 L261 -595 L256 -598 L257 -607 L267 -608 L277 -614 L279 -627 L289 -636 L284 -640 L283 -645 L284 -657 L289 -671 L288 -682 L296 -694 L304 -717 L314 -723 L326 -735 L335 -738 L343 -766 L348 -765 L350 -769 L353 -789 L358 -798 L353 -807 L357 -820 L355 -842 L352 -853 L357 -858 L358 -868 L362 -873 L361 -885 L364 -895 L360 -906 L355 -912 L356 -917 L359 -919 L361 -910 L366 -908 L368 -940 L373 -950 L370 -967 L382 -974 L375 -982 L381 -1006 L387 -1013 L397 -999 L401 -1000 L398 -1006 L399 -1015 L397 -1027 L403 -1034 L403 -1045 L422 -1080 L425 -1099 L435 -1126 L447 -1179 L449 -1181 L454 -1179 L464 -1167 L474 -1171 L477 -1176 L476 -1179 L466 -1182 L465 -1198 L454 -1216 L451 -1227 L453 -1232 L457 -1234 L462 -1234 L468 -1229 L472 -1229 L480 -1247 L479 -1257 L474 -1259 L459 -1255 L447 -1264 L442 -1280 L432 -1290 L428 -1302 L428 -1308 L436 -1324 L433 -1346 L435 -1349 L445 -1356 L444 -1368 L454 -1390 L443 -1440 L449 -1447 L463 -1451 L466 -1456 L460 -1468 L458 -1481 L446 -1491 L444 -1502 L434 -1518 L435 -1561 L436 -1565 L448 -1569 L450 -1578 L447 -1586 L429 -1594 L423 -1601 L418 -1616 L410 -1621 L404 -1617 L398 -1589 L383 -1592 L371 -1592 L366 -1628 L374 -1638 L376 -1648 L385 -1661 L381 -1676 L383 -1701 L378 -1713 M937 205 L923 216 L895 219 L889 216 L878 206 L870 208 L859 207 L854 210 L846 209 L842 202 L830 198 L824 192 L809 194 L799 181 L794 181 L788 187 L781 186 L775 188 L761 179 L756 183 L753 197 L735 189 L714 164 L703 158 L700 147 L682 146 L681 142 L692 133 L687 124 L681 121 L661 132 L650 133 L648 126 L655 126 L654 119 L644 118 L645 108 L627 94 L627 89 L624 84 L614 79 L615 72 L612 70 L612 63 L606 61 L597 63 L594 54 L587 49 L588 44 L586 42 L581 41 L577 45 L572 44 L571 37 L567 35 L570 33 L563 17 L557 18 L554 15 L541 -9 L532 -15 L531 -24 L534 -27 L532 -30';
const MAP_SKUNK = 'M320 331 L356 318 L367 287 L372 261 L378 247 L379 221 L389 203 L396 180 L417 143 L442 110 L495 50 L520 29';

/** Real OpenStreetMap geometry of Skunk Hollow Road (Jericho, VT), restyled as a night map. */
const SkunkMap = () => (
  <div
    className="tc-a tc-in"
    style={
      {
        '--d': '0ms',
        position: 'relative',
        width: 840,
        height: 360,
        borderRadius: 'var(--osd-radius)',
        border: `1px solid ${C.line}`,
        overflow: 'hidden',
        background: '#0A1224',
        boxShadow: '0 0 60px rgba(79,209,197,0.12)',
      } as CSSProperties
    }
  >
    <svg width={840} height={360} viewBox="0 0 840 360" role="img" aria-label="Map of Skunk Hollow Road in Jericho, Vermont">
      <path d={MAP_RIVER} fill="none" stroke="#2C6FA8" strokeOpacity={0.85} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={MAP_MINOR} fill="none" stroke="#5D6E99" strokeOpacity={0.55} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={MAP_MAJOR} fill="none" stroke="#A9B7D9" strokeOpacity={0.7} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d={MAP_SKUNK} fill="none" stroke="#FF8A4C" strokeOpacity={0.28} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
      <path className="tc-a tc-road" pathLength={1} d={MAP_SKUNK} fill="none" stroke="#FF8A4C" strokeWidth={6.5} strokeLinecap="round" strokeLinejoin="round" />
      <path className="tc-a tc-ants" d={MAP_SKUNK} fill="none" stroke="#FFF1DE" strokeWidth={2} strokeLinecap="round" strokeDasharray="4 11" strokeLinejoin="round" />
      <text x={430} y={342} fontSize={19} fill={C.dim} style={{ fontFamily: mono, letterSpacing: '0.1em' }}>
        JERICHO · VERMONT
      </text>
      <text x={448} y={70} fontSize={26} textAnchor="end" fill="#FF8A4C" style={{ fontFamily: mono, fontWeight: 700, letterSpacing: '0.08em' }}>
        SKUNK HOLLOW RD
      </text>
      <g>
        <circle className="tc-a tc-hoprip" cx={399} cy={174} r={10} fill="none" stroke="#FFC56B" strokeWidth={3} style={{ '--d': '3200ms', opacity: 0 } as CSSProperties} />
        <circle className="tc-a tc-hoprip" cx={399} cy={174} r={10} fill="none" stroke="#FFC56B" strokeWidth={3} style={{ '--d': '4200ms', opacity: 0 } as CSSProperties} />
        <g className="tc-a tc-hoppin" style={{ opacity: 0 }}>
          <path d="M399 174 C 390 161, 388 154, 388 147 A 22 22 0 0 1 410 147 C 410 154, 408 161, 399 174 Z" fill="#FF5D6C" stroke="#F3F6FC" strokeWidth={3} />
          <circle cx={399} cy={147} r={8} fill="#03050C" />
        </g>
      </g>
    </svg>
    <div
      style={{
        position: 'absolute',
        left: 16,
        bottom: 12,
        fontFamily: mono,
        fontSize: 14,
        letterSpacing: '0.04em',
        color: C.dim,
      }}
    >
      © OpenStreetMap contributors
    </div>
  </div>
);

const RBubble = ({ cls, children }: { cls: string; children: ReactNode }) => (
  <div
    className={`tc-a ${cls}`}
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
    }}
  >
    {children}
  </div>
);

/** A suit-and-tie worker with a briefcase and a Rutgers diploma tube, heading home. */
const WorkerWalker = () => {
  const active = useIsActivePage();
  const limb = (reverse: boolean, origin: string): CSSProperties => ({
    transformOrigin: origin,
    transformBox: 'view-box',
    animation: active ? `tc-swing 0.7s ease-in-out infinite ${reverse ? 'alternate-reverse' : 'alternate'}` : undefined,
  });
  return (
    <div className="tc-a tc-return-walker">
      <div
        className="tc-a"
        style={{
          width: 96,
          height: 120,
          transformOrigin: '50% 100%',
          transform: 'scaleX(-1)',
        }}
      >
        <div
          className="tc-a"
          style={{
            width: 96,
            height: 120,
            transformOrigin: '50% 100%',
            animation: active ? 'tc-bob 0.36s ease-in-out infinite alternate' : undefined,
          }}
        >
          <svg width={96} height={120} viewBox="0 0 120 150" role="img" aria-label="A working professional walking home with a briefcase">
            <g className="tc-a" style={limb(true, '62px 62px')}>
              <line x1={62} y1={62} x2={62} y2={94} stroke="#6E7BA0" strokeWidth={7} strokeLinecap="round" />
              <circle cx={62} cy={96} r={5} fill="#FFD9B3" />
            </g>
            <g className="tc-a" style={limb(true, '60px 100px')}>
              <line x1={60} y1={100} x2={60} y2={132} stroke="#2A3558" strokeWidth={8} strokeLinecap="round" />
              <ellipse cx={68} cy={137} rx={13} ry={6} fill="#0B0F1E" />
            </g>
            {/* torso: suit jacket */}
            <line x1={62} y1={56} x2={60} y2={100} stroke="#3B4C86" strokeWidth={13} strokeLinecap="round" />
            <path d="M58 58 L66 58 L63 80 Z" fill="#F3F6FC" />
            <g className="tc-a" style={{ transformOrigin: '62px 62px', transformBox: 'view-box', animation: active ? 'tc-tie 0.7s ease-in-out infinite' : undefined }}>
              <path d="M62 62 L65 66 L63.5 82 L61 82 L60 66 Z" fill="#FF5D6C" />
            </g>
            {/* front leg */}
            <g className="tc-a" style={limb(false, '60px 100px')}>
              <line x1={60} y1={100} x2={60} y2={132} stroke="#3B4C86" strokeWidth={8} strokeLinecap="round" />
              <ellipse cx={68} cy={137} rx={13} ry={6} fill="#0B0F1E" />
            </g>
            {/* head, short hair, glasses */}
            <circle cx={66} cy={34} r={19} fill="#FFD9B3" />
            <path d="M47 30 A19 19 0 0 1 85 30 Q 70 21 47 30 Z" fill="#6B4A2B" />
            <circle cx={75} cy={36} r={6} fill="none" stroke="#03050C" strokeWidth={1.8} />
            <circle cx={75.8} cy={36} r={2.2} fill="#03050C" />
            <path d="M70 47 Q76 52 82 46" fill="none" stroke="#03050C" strokeWidth={2.5} strokeLinecap="round" />
            {/* briefcase arm */}
            <g className="tc-a" style={limb(false, '62px 62px')}>
              <line x1={62} y1={62} x2={62} y2={96} stroke="#3B4C86" strokeWidth={7} strokeLinecap="round" />
              <circle cx={62} cy={98} r={5} fill="#FFD9B3" />
              <rect x={50} y={100} width={30} height={22} rx={4} fill="#8A5A2B" stroke="#F3F6FC" strokeWidth={1.4} />
              <rect x={59} y={96} width={12} height={5} rx={2} fill="none" stroke="#F3F6FC" strokeWidth={1.4} />
            </g>
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: -10, width: 0, height: 0 }}>
        <RBubble cls="tc-rb4">are we there yet?</RBubble>
        <RBubble cls="tc-rb5">still my feet…</RBubble>
        <RBubble cls="tc-rb6">IBM!</RBubble>
      </div>
    </div>
  );
};

const HomeJourney = () => {
  const active = useIsActivePage();
  return (
    <div style={{ position: 'relative', width: 1680, height: 380 }}>
      <style>{`.tc-return-walker { offset-path: path('M1432 145 C 1330 190, 1100 250, 900 330 S 480 345, 330 270 S 230 150, 181 113'); }`}</style>
      <svg width={1680} height={380} viewBox="0 0 1680 380" role="img" aria-label="Stylized map: Rutgers, New Jersey back to IBM in Burlington, Vermont">
        <g transform="translate(150 30)">
          <polygon
            points="17,6 215,6 201,44 158,106 156,167 129,217 120,268 112,336 25,334 27,210 8,210 16,152 13,94"
            fill="rgba(91,228,155,0.10)"
            stroke={C.green}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </g>
        <SvgLabel x={380} y={52} anchor="start" fill={C.green}>
          VERMONT
        </SvgLabel>
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
        <path
          d="M1432 145 C 1330 190, 1100 250, 900 330 S 480 345, 330 270 S 230 150, 181 113"
          fill="none"
          stroke={C.gold}
          strokeOpacity={0.85}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="10 14"
          className="tc-a"
          style={{ animation: active ? 'tc-flow 1.1s linear infinite reverse' : undefined }}
        />
        <SvgLabel x={760} y={372} fill={C.dim}>
          the long walk home
        </SvgLabel>
        <circle cx={1432} cy={145} r={9} fill={SCARLET} stroke="#F3F6FC" strokeWidth={3} />
        <SvgLabel x={1492} y={152} anchor="start" fill="#F3F6FC">
          RUTGERS
        </SvgLabel>
        <circle className="tc-a" cx={181} cy={113} r={9} fill="none" stroke="#1F70C1" strokeWidth={3} style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: active ? 'tc-ring 1.8s ease-out infinite' : undefined }} />
        <circle cx={181} cy={113} r={9} fill="#1F70C1" stroke="#F3F6FC" strokeWidth={3} />
        <SvgLabel x={164} y={120} anchor="end" fill="#F3F6FC">
          BURLINGTON
        </SvgLabel>
        <image href={ibmLogo} x={36} y={140} width={150} height={60} />
      </svg>
      <WorkerWalker />
    </div>
  );
};

const Luck: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="09 · A SECOND POINT"
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 84, whiteSpace: 'nowrap' }}>
          <span style={{ ...rise(active, 100) }}>Here’s a second point</span>
          <span
            className="tc-a"
            style={{
              color: 'var(--osd-accent)',
              animation: active ? 'tc-nudge 1.1s ease-in-out infinite' : undefined,
            }}
          >
            →
          </span>
          <Hmm />
        </span>
      }
    >
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', top: 285, left: 120, width: 840 }}>
          <Steps>
            <Step duration={200}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 40, position: 'relative' }}>
                <div className="tc-a tc-lucky" style={{ fontSize: 150, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
                  <span className="tc-a tc-passion" style={{ background: 'linear-gradient(90deg,#5BE49B,#FFC56B,#4FD1C5,#5BE49B)', backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    Luck!
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Clover />
                  <Sparkle x={-26} y={-12} size={30} d="0ms" />
                  <Sparkle x={128} y={4} size={24} d="600ms" />
                  <Sparkle x={112} y={118} size={32} d="1100ms" />
                </div>
              </div>
              <div
                className="tc-a tc-in"
                style={{ '--d': '700ms', marginTop: 18, fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}
              >
                I got <span style={{ color: C.green }}>Lucky</span>…
              </div>
            </Step>
          </Steps>
        </div>
        <div style={{ position: 'absolute', top: 285, left: 1000, width: 800 }}>
          <Steps>
            <Step duration={200}>
              <p
                className="tc-a tc-in"
                style={{ '--d': '0ms', margin: 0, fontSize: 38, lineHeight: 1.38, fontWeight: 700, letterSpacing: '-0.02em', color: C.muted } as CSSProperties}
              >
                The interviewer, <b style={{ color: 'var(--osd-text)' }}>Larry</b>, recognized the street I grew up on and offered me an{' '}
                <b style={{ color: 'var(--osd-accent)' }}>interview!</b>
              </p>
            </Step>
          </Steps>
        </div>
        <div style={{ position: 'absolute', top: 520, left: 120 }}>
          <Steps>
            <Step duration={200}>
              <SkunkMap />
            </Step>
          </Steps>
        </div>
        <div style={{ position: 'absolute', top: 520, left: 1000, width: 800 }}>
          <Steps>
            <Step duration={200}>
              <div
                className="tc-a tc-in"
                style={{ '--d': '600ms', fontFamily: mono, fontSize: 24, letterSpacing: '0.1em', color: C.dim } as CSSProperties}
              >
                ↑ SKUNK HOLLOW ROAD · JERICHO, VT
              </div>
            </Step>
          </Steps>
        </div>
      </div>
    </Frame>
  );
};
Luck.transition = settle;

/* ───────────────────────── 10 the long walk home ───────────────────────── */

const WalkHome: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="10 · THE WALK HOME"
      title={
        <span style={{ fontSize: 84, whiteSpace: 'nowrap' }}>
          Rutgers <span style={{ color: 'var(--osd-accent)' }}>→</span> IBM Burlington
        </span>
      }
    >
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', top: 230, left: 120, width: 1680, height: 380 }}>
        <HomeJourney />
      </div>
    </Frame>
  );
};
WalkHome.transition = settle;

/* ───────────────────────── 11 & 12  IBM ───────────────────────── */

const IbmTitle = ({ tag, extra }: { tag: ReactNode; extra?: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
      <span style={{ display: 'flex', fontSize: 190, lineHeight: '190px', fontWeight: 900, letterSpacing: '-0.03em' }}>
        {Array.from('IBM').map((ch, i) => (
          <span
            key={ch}
            className="tc-a"
            style={{ display: 'inline-block', animation: active ? `tc-drop 750ms ${SPRING} ${100 + i * 140}ms both` : undefined }}
          >
            <span
              className="tc-a tc-ibm-bars"
              style={{ animation: active ? 'tc-stripes 1.6s linear infinite' : undefined }}
            >
              {ch}
            </span>
          </span>
        ))}
      </span>
      <span
        className="tc-a"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          fontSize: 60,
          lineHeight: '68px',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          whiteSpace: 'nowrap',
          ...rise(active, 800),
        }}
      >
        {tag}
      </span>
      {extra}
    </span>
  );
};

const JobTitle = () => {
  const active = useIsActivePage();
  return (
    <span
      className="tc-a"
      style={
        {
          '--g0': 'rgba(206,79,50,0)',
          '--g1': 'rgba(206,79,50,0.35)',
          flex: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 8,
          boxSizing: 'border-box',
          padding: '16px 34px 18px 30px',
          borderRadius: 'var(--osd-radius)',
          border: `1px solid ${C.line}`,
          borderLeft: '6px solid #CE4F32',
          background: C.panel,
          fontSize: 56,
          lineHeight: '64px',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          whiteSpace: 'nowrap',
          animation: active ? `tc-popin 700ms ${SPRING} 1300ms both, tc-glow 3s ease-in-out 2100ms infinite` : undefined,
        } as CSSProperties
      }
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ color: '#4DA6FF' }}>IBM</span>
        <img src={powerpcLogo} alt="PowerPC" style={{ display: 'block', height: 50, width: 'auto' }} />
      </span>
      <span>Design Engineer</span>
    </span>
  );
};

const PartyEmoji = ({ children }: { children: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <span
      aria-hidden="true"
      className="tc-a"
      style={{ display: 'inline-block', animation: active ? 'tc-hmm 2.4s ease-in-out infinite' : undefined }}
    >
      {children}
    </span>
  );
};

const PhotoCard = ({ src, alt, h, d, glow }: { src: string; alt: string; h: number; d: number; glow: string }) => (
  <span
    className="tc-a tc-plq"
    style={
      {
        '--d': `${d}ms`,
        display: 'inline-flex',
        padding: 10,
        borderRadius: 14,
        background: '#FFFFFF',
        boxShadow: `0 0 44px ${glow}`,
      } as CSSProperties
    }
  >
    <img src={src} alt={alt} style={{ display: 'block', height: h, width: 'auto' }} />
  </span>
);

const Credit = ({ children }: { children: ReactNode }) => (
  <div style={{ position: 'absolute', left: 120, bottom: 84, fontFamily: mono, fontSize: 18, letterSpacing: '0.04em', color: C.dim }}>
    {children}
  </div>
);

const IbmJob: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="11 · A REAL JOB"
      title={
        <IbmTitle
          tag={
            <>
              <span>I made it baby!</span>
              <span style={{ color: C.gold }}>
                A real job! <PartyEmoji>🎉</PartyEmoji>
              </span>
            </>
          }
          extra={<JobTitle />}
        />
      }
    >
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <div
          className="tc-a"
          style={{ position: 'absolute', top: 336, left: 120, fontSize: 46, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em', ...rise(active, 1000) }}
        >
          And I got to work on some{' '}
          <span
            className="tc-a tc-passion"
            style={{ fontWeight: 900, animation: active ? 'tc-hue 3s linear infinite' : undefined }}
          >
            GREAT
          </span>{' '}
          projects:
        </div>
        <div style={{ position: 'absolute', top: 440, left: 120, width: 860 }}>
          <Steps>
            <Step duration={200}>
              <div>
                <div className="tc-a tc-in" style={{ '--d': '0ms', whiteSpace: 'nowrap', fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}>
                  PowerPC 970 <span style={{ color: C.muted }}>for</span> <span style={{ color: C.gold }}>Apple</span> computers.
                </div>
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
                  <PhotoCard src={g5Front} alt="Apple Power Mac G5, front" h={320} d={150} glow="rgba(169,183,217,0.25)" />
                  <PhotoCard src={g5Angle} alt="Apple Power Mac G5, angled" h={320} d={350} glow="rgba(169,183,217,0.25)" />
                  <PhotoCard src={g5Open} alt="Apple Power Mac G5 with the side panel open" h={320} d={550} glow="rgba(169,183,217,0.25)" />
                </div>
              </div>
            </Step>
          </Steps>
        </div>
        <div style={{ position: 'absolute', top: 440, left: 1010, width: 780 }}>
          <Steps>
            <Step duration={200}>
              <div>
                <div className="tc-a tc-in" style={{ '--d': '0ms', whiteSpace: 'nowrap', fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}>
                  <span style={{ color: C.muted }}>Microsoft</span> <span style={{ color: C.green }}>Xbox 360</span>
                </div>
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
                  <PhotoCard src={xbox360Pro} alt="Microsoft Xbox 360 console" h={320} d={150} glow="rgba(91,228,155,0.3)" />
                  <PhotoCard src={xbox360S} alt="Microsoft Xbox 360 S console" h={320} d={350} glow="rgba(91,228,155,0.3)" />
                </div>
              </div>
            </Step>
          </Steps>
        </div>
        <Credit>Photos: Wikimedia Commons · Power Mac G5 (CC BY-SA 3.0) · Xbox 360 (Evan-Amos, public domain)</Credit>
      </div>
    </Frame>
  );
};
IbmJob.transition = settle;

/* ── slide 12 pieces ── */

const Core = ({ d }: { d: string }) => (
  <span
    className="tc-a tc-core"
    style={
      {
        '--d': d,
        width: 44,
        height: 44,
        borderRadius: 8,
        border: '2px solid #4DA6FF',
        background: 'rgba(77,166,255,0.14)',
        display: 'block',
      } as CSSProperties
    }
  />
);

const CoreGrid = () => (
  <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 44px)', gap: 10 }}>
    <Core d="0ms" />
    <Core d="200ms" />
    <Core d="400ms" />
    <Core d="600ms" />
    <Core d="800ms" />
    <Core d="1000ms" />
    <Core d="1200ms" />
    <Core d="1400ms" />
  </div>
);

/** A hand-drawn cartoon plumber (not official Nintendo art), mid-jump, arm swinging in for a high five. */
const Bro = ({ flip, shirt, letter, delay }: { flip?: boolean; shirt: string; letter: string; delay: number }) => {
  const active = useIsActivePage();
  const overall = '#2B58C9';
  return (
    <g transform={flip ? 'translate(480 0) scale(-1 1)' : undefined}>
      <ellipse cx={150} cy={270} rx={62} ry={8} fill="#000" fillOpacity={0.35} />
      <g className="tc-a" style={{ animation: active ? `tc-bro 2.4s ease-in-out ${delay}ms infinite` : undefined }}>
        <ellipse cx={128} cy={258} rx={24} ry={12} fill="#6B3A1E" />
        <ellipse cx={172} cy={258} rx={24} ry={12} fill="#6B3A1E" />
        <rect x={118} y={208} width={30} height={44} rx={10} fill={overall} />
        <rect x={152} y={208} width={30} height={44} rx={10} fill={overall} />
        <line x1={116} y1={146} x2={96} y2={196} stroke={shirt} strokeWidth={18} strokeLinecap="round" />
        <circle cx={94} cy={200} r={11} fill="#FFFFFF" />
        <rect x={108} y={128} width={84} height={90} rx={24} fill={shirt} />
        <rect x={114} y={160} width={72} height={58} rx={16} fill={overall} />
        <rect x={120} y={134} width={14} height={34} rx={5} fill={overall} />
        <rect x={166} y={134} width={14} height={34} rx={5} fill={overall} />
        <circle cx={127} cy={170} r={5} fill="#FFD23F" />
        <circle cx={173} cy={170} r={5} fill="#FFD23F" />
        <circle cx={112} cy={106} r={9} fill="#FFD0A0" />
        <circle cx={188} cy={106} r={9} fill="#FFD0A0" />
        <circle cx={150} cy={100} r={38} fill="#FFD0A0" />
        <circle cx={154} cy={112} r={11} fill="#F2B88A" />
        <ellipse cx={138} cy={98} rx={5} ry={8} fill="#FFFFFF" />
        <circle cx={139} cy={100} r={3} fill="#1B2A6B" />
        <ellipse cx={162} cy={98} rx={5} ry={8} fill="#FFFFFF" />
        <circle cx={163} cy={100} r={3} fill="#1B2A6B" />
        <path d="M114 104 C 112 120, 118 126, 124 122 L 122 102 Z" fill="#4A2A12" />
        <path d="M186 104 C 188 120, 182 126, 176 122 L 178 102 Z" fill="#4A2A12" />
        <path d="M126 124 C 134 114, 150 120, 154 122 C 158 120, 170 114, 178 124 C 168 134, 154 128, 152 126 C 148 128, 134 134, 126 124 Z" fill="#4A2A12" />
        <path d="M110 82 A40 40 0 0 1 190 82 Z" fill={shirt} />
        <ellipse cx={156} cy={82} rx={40} ry={9} fill={shirt} stroke="#000" strokeOpacity={0.18} strokeWidth={2} />
        <circle cx={150} cy={62} r={13} fill="#FFFFFF" />
        <text
          x={150}
          y={68}
          fontSize={18}
          fontWeight={900}
          textAnchor="middle"
          fill={shirt}
          transform={flip ? 'translate(300 0) scale(-1 1)' : undefined}
          style={{ fontFamily: 'var(--osd-font-display)' }}
        >
          {letter}
        </text>
        <g
          className="tc-a"
          style={{
            transformOrigin: '180px 142px',
            transformBox: 'view-box',
            animation: active ? `tc-armhit 2.4s ease-in-out ${delay}ms infinite` : undefined,
            transform: active ? undefined : 'rotate(40deg)',
          }}
        >
          <line x1={180} y1={142} x2={180} y2={82} stroke={shirt} strokeWidth={18} strokeLinecap="round" />
          <circle cx={180} cy={76} r={12} fill="#FFFFFF" />
        </g>
      </g>
    </g>
  );
};

const STAR = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 ? 16 : 36;
  const a = (Math.PI * 2 * i) / 16 - Math.PI / 2;
  return `${(240 + r * Math.cos(a)).toFixed(1)},${(106 + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');

const HighFive = () => {
  const active = useIsActivePage();
  return (
    <svg width={480} height={300} viewBox="0 0 480 300" role="img" aria-label="Two cartoon plumbers high-fiving">
      <Bro shirt="#E8272B" letter="M" delay={0} />
      <Bro flip shirt="#2DB84B" letter="L" delay={0} />
      <g
        className="tc-a"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: active ? 'tc-slap 2.4s ease-in-out infinite' : undefined,
          opacity: active ? 0 : 1,
        }}
      >
        <polygon points={STAR} fill="#FFC56B" stroke="#FF8A4C" strokeWidth={3} strokeLinejoin="round" />
        <text x={240} y={112} fontSize={18} fontWeight={900} textAnchor="middle" fill="#03050C" style={{ fontFamily: mono }}>
          5!
        </text>
      </g>
      <text
        className="tc-a"
        x={240}
        y={24}
        fontSize={24}
        fontWeight={700}
        textAnchor="middle"
        fill="#F3F6FC"
        style={{ fontFamily: mono, letterSpacing: '0.12em', animation: active ? 'tc-slap 2.4s ease-in-out infinite' : undefined, opacity: active ? 0 : 1, transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        HIGH FIVE!
      </text>
    </svg>
  );
};

const ChickenSwitch = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 'none' }}>
    <div className="tc-a tc-bug" style={{ fontSize: 84, lineHeight: 1, opacity: 0.3 }}>
      <span aria-hidden="true" style={{ display: 'inline-block' }}>
        🐛
      </span>
    </div>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative', width: 156, height: 74, borderRadius: 37, overflow: 'hidden', border: '2px solid #F3F6FC' }}>
        <div className="tc-a tc-sw-on" style={{ position: 'absolute', inset: 0, background: C.red, opacity: 0 }} />
        <div className="tc-a tc-sw-off" style={{ position: 'absolute', inset: 0, background: '#2FA66B', opacity: 1 }} />
        <div
          className="tc-a tc-sw-knob"
          style={{ position: 'absolute', left: 7, top: 7, width: 56, height: 56, borderRadius: '50%', background: '#F3F6FC', transform: 'translateX(78px)' }}
        />
      </div>
      <div style={{ position: 'relative', height: 28, marginTop: 10, fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', textAlign: 'center' }}>
        <span className="tc-a tc-sw-on" style={{ position: 'absolute', inset: 0, color: C.red, opacity: 0 }}>
          BUG: ON
        </span>
        <span className="tc-a tc-sw-off" style={{ position: 'absolute', inset: 0, color: C.green }}>
          BUG: OFF ✓
        </span>
      </div>
    </div>
    <div style={{ position: 'relative' }}>
      <div aria-hidden="true" className="tc-a tc-hen" style={{ fontSize: 130, lineHeight: 1, transformOrigin: '50% 90%' }}>
        🐔
      </div>
      <div
        className="tc-a tc-bawk"
        style={{
          position: 'absolute',
          left: 84,
          top: -34,
          padding: '6px 16px',
          borderRadius: 16,
          background: '#F3F6FC',
          color: '#03050C',
          fontFamily: mono,
          fontSize: 22,
          fontWeight: 700,
          whiteSpace: 'nowrap',
          opacity: 0,
          transformOrigin: 'left bottom',
        }}
      >
        bawk!
      </div>
    </div>
  </div>
);

const IbmMore: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="12 · MORE GREAT PROJECTS"
      title={
        <IbmTitle
          tag={
            <>
              <span>…and more</span>
              <span style={{ color: C.gold }}>
                GREAT projects <PartyEmoji>🚀</PartyEmoji>
              </span>
            </>
          }
        />
      }
    >
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', top: 345, left: 120, width: 700 }}>
          <Steps>
            <Step duration={200}>
              <div>
                <div className="tc-a tc-in" style={{ '--d': '0ms', whiteSpace: 'nowrap', fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}>
                  IBM <span style={{ color: '#4DA6FF' }}>Server Group</span> Processors
                </div>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 28 }}>
                  <span
                    className="tc-a tc-plq"
                    style={{ '--d': '150ms', display: 'inline-flex', padding: '12px 18px', borderRadius: 14, background: '#FFFFFF', boxShadow: '0 0 44px rgba(77,166,255,0.3)' } as CSSProperties}
                  >
                    <img src={power7Badge} alt="Built on POWER7" style={{ display: 'block', height: 262, width: 'auto' }} />
                  </span>
                  <div className="tc-a tc-in" style={{ '--d': '400ms' } as CSSProperties}>
                    <div className="tc-a tc-bluegrad" style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
                      POWER7
                    </div>
                    <div style={{ marginTop: 10, fontFamily: mono, fontSize: 24, letterSpacing: '0.1em', color: C.dim }}>UP TO 8 CORES</div>
                    <CoreGrid />
                  </div>
                </div>
              </div>
            </Step>
          </Steps>
        </div>
        <div style={{ position: 'absolute', top: 345, left: 880, width: 920 }}>
          <Steps>
            <Step duration={200}>
              <div>
                <div className="tc-a tc-in" style={{ '--d': '0ms', whiteSpace: 'nowrap', fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}>
                  <span style={{ color: C.red }}>Nintendo Wii’s</span> Broadway Processor
                </div>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div className="tc-a tc-in" style={{ '--d': '150ms' } as CSSProperties}>
                    <HighFive />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <PhotoCard src={broadwayChip} alt="IBM Broadway processor for the Nintendo Wii" h={216} d={500} glow="rgba(255,93,108,0.3)" />
                    <span style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.12em', color: C.dim }}>BROADWAY</span>
                  </div>
                </div>
              </div>
            </Step>
          </Steps>
        </div>
        <div style={{ position: 'absolute', top: 770, left: 120, right: 120 }}>
          <Steps>
            <Step duration={200}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 } as CSSProperties}>
                <p style={{ margin: 0, maxWidth: 1060, fontSize: 40, lineHeight: 1.4, fontWeight: 700, letterSpacing: '-0.02em', color: C.muted }}>
                  Even had the <b style={{ color: C.red }}>biggest bug</b> in the Wii processor — no one’s perfect. Lucky for me, I had a{' '}
                  <b style={{ color: C.gold }}>chicken switch</b>.
                </p>
                <ChickenSwitch />
              </div>
            </Step>
          </Steps>
        </div>
        <Credit>Images: Wikimedia Commons · POWER7 badge (public domain) · Broadway die photo (Henriok, CC0) · Mario &amp; Luigi: my own cartoon drawing</Credit>
      </div>
    </Frame>
  );
};
IbmMore.transition = settle;

/* ───────────────────────── 13 MareNostrum ───────────────────────── */

const MareTitle = () => {
  const active = useIsActivePage();
  const word = (text: string, from: number) => (
    <span style={{ display: 'flex' }}>
      {Array.from(text).map((ch, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static text, positions never reorder
        <span key={i} className="tc-a" style={{ display: 'inline-block', animation: active ? `tc-drop 750ms ${SPRING} ${100 + (from + i) * 90}ms both` : undefined }}>
          <span
            className="tc-a tc-bluegrad"
            style={{ display: 'inline-block', animation: active ? `tc-hue 3s linear ${-(from + i) * 220}ms infinite` : undefined }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
      <span style={{ display: 'flex', gap: 44, fontSize: 168, lineHeight: '170px', fontWeight: 900, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>
        {word('Mare', 0)}
        {word('Nostrum', 4)}
      </span>
      <span
        className="tc-a"
        style={{ display: 'flex', flexDirection: 'column', fontSize: 52, lineHeight: '60px', fontWeight: 800, letterSpacing: '-0.03em', whiteSpace: 'nowrap', ...rise(active, 1000) }}
      >
        <span>Super Computer</span>
        <span style={{ color: C.gold }}>Barcelona, Spain</span>
      </span>
    </span>
  );
};

const IbmSticker = ({ x, y, w, rot, d }: { x: number; y: number; w: number; rot: number; d: number }) => {
  const active = useIsActivePage();
  return (
    <span
      className="tc-a"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'inline-flex',
        padding: `${w * 0.07}px ${w * 0.11}px`,
        borderRadius: 12,
        background: '#FFFFFF',
        boxShadow: '0 6px 26px rgba(0,0,0,0.5), 0 0 30px rgba(77,166,255,0.35)',
        transform: `rotate(${rot}deg)`,
        animation: active ? `tc-badge 800ms ${SPRING} ${d}ms both` : undefined,
      }}
    >
      <img src={ibmLogo} alt="IBM" style={{ display: 'block', width: w, height: 'auto' }} />
    </span>
  );
};

const Led = ({ x, d }: { x: number; d: number }) => {
  const active = useIsActivePage();
  return (
    <span
      aria-hidden="true"
      className="tc-a"
      style={{
        position: 'absolute',
        left: x,
        bottom: 18,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: '#5BE49B',
        boxShadow: '0 0 12px 3px rgba(91,228,155,0.8)',
        animation: active ? `tc-led 1.1s ease-in-out ${d}ms infinite` : undefined,
      }}
    />
  );
};

/** Tilted photo "print" that drops in, then floats gently. */
const Print = ({
  src,
  alt,
  x,
  y,
  w,
  h,
  rot,
  d,
  children,
}: {
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  d: number;
  children?: ReactNode;
}) => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={
        {
          '--r': `${rot}deg`,
          position: 'absolute',
          left: x,
          top: y,
          transform: `rotate(${rot}deg)`,
          animation: active ? `tc-polaroid 900ms ${SPRING} ${d}ms both` : undefined,
        } as CSSProperties
      }
    >
      <div
        className="tc-a"
        style={{
          position: 'relative',
          width: w,
          height: h,
          boxSizing: 'border-box',
          padding: 10,
          borderRadius: 12,
          background: '#F3F6FC',
          boxShadow: '0 12px 44px rgba(0,0,0,0.55), 0 0 50px rgba(77,166,255,0.2)',
          animation: active ? `tc-bobsm 5s ease-in-out ${d + 1200}ms infinite` : undefined,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 4 }}>
          <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          <div
            aria-hidden="true"
            className="tc-a"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '10%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0))',
              animation: active ? `tc-shimmer 5s ease-in-out ${d + 1500}ms infinite` : undefined,
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

/** Smug engineer, thumb jabbing at his own chest. */
const Boaster = () => {
  const active = useIsActivePage();
  return (
    <div className="tc-a" style={{ position: 'absolute', left: 1500, top: 652, width: 240, height: 340, animation: active ? `tc-popin 700ms ${SPRING} 1800ms both` : undefined }}>
      <svg width={240} height={340} viewBox="0 0 240 340" role="img" aria-label="A smug engineer pointing a thumb at his own chest">
        <ellipse cx={120} cy={328} rx={74} ry={9} fill="#000" fillOpacity={0.4} />
        <line x1={106} y1={226} x2={98} y2={312} stroke="#2A3558" strokeWidth={26} strokeLinecap="round" />
        <line x1={134} y1={226} x2={142} y2={312} stroke="#2A3558" strokeWidth={26} strokeLinecap="round" />
        <ellipse cx={92} cy={322} rx={24} ry={9} fill="#0B0F1E" />
        <ellipse cx={148} cy={322} rx={24} ry={9} fill="#0B0F1E" />
        {/* hand on hip */}
        <path d="M92 122 L62 166 L94 198" fill="none" stroke="#3B4C86" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={96} cy={200} r={10} fill="#FFD9B3" />
        {/* torso */}
        <rect x={82} y={104} width={76} height={132} rx={26} fill="#3B4C86" />
        <path d="M110 108 L130 108 L120 150 Z" fill="#F3F6FC" />
        <path d="M120 116 L127 128 L123 184 L120 192 L117 184 L113 128 Z" fill="#FF5D6C" />
        {/* head */}
        <g className="tc-a" style={{ transformOrigin: '120px 100px', transformBox: 'view-box', animation: active ? 'tc-smug 3s ease-in-out 2600ms infinite' : undefined }}>
          <circle cx={120} cy={62} r={38} fill="#FFD9B3" />
          <path d="M82 56 A38 38 0 0 1 158 56 Q 138 40 82 56 Z" fill="#6B4A2B" />
          <circle cx={106} cy={66} r={11} fill="none" stroke="#03050C" strokeWidth={3} />
          <circle cx={136} cy={66} r={11} fill="none" stroke="#03050C" strokeWidth={3} />
          <line x1={117} y1={66} x2={125} y2={66} stroke="#03050C" strokeWidth={3} />
          <circle cx={108} cy={67} r={3.4} fill="#03050C" />
          <circle cx={138} cy={67} r={3.4} fill="#03050C" />
          <path d="M96 49 L116 53" stroke="#6B4A2B" strokeWidth={4} strokeLinecap="round" />
          <path d="M126 53 L144 46" stroke="#6B4A2B" strokeWidth={4} strokeLinecap="round" />
          <path d="M104 86 Q 124 100 146 80" fill="none" stroke="#03050C" strokeWidth={3.6} strokeLinecap="round" />
        </g>
        {/* thumb-jab arm */}
        <g className="tc-a" style={{ transformOrigin: '150px 122px', transformBox: 'view-box', animation: active ? 'tc-jab 2.6s ease-in-out 2600ms infinite' : undefined }}>
          <path d="M150 122 L184 172 L132 156" fill="none" stroke="#3B4C86" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={128} cy={154} r={11} fill="#FFD9B3" />
          <line x1={124} y1={148} x2={116} y2={134} stroke="#FFD9B3" strokeWidth={9} strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

const YeahBubble = () => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={{
        position: 'absolute',
        left: 1430,
        top: 566,
        padding: '16px 34px',
        borderRadius: 26,
        background: '#F3F6FC',
        color: '#03050C',
        fontSize: 42,
        fontWeight: 800,
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        transformOrigin: '70% 100%',
        animation: active ? `tc-popin 650ms ${SPRING} 2500ms both` : undefined,
      }}
    >
      Yeah, I did that.
      <span
        aria-hidden="true"
        style={{ position: 'absolute', left: 170, bottom: -16, width: 34, height: 34, background: '#F3F6FC', transform: 'rotate(45deg)', borderRadius: 4 }}
      />
    </div>
  );
};

const MareNostrum: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame eyebrow="13 · MARE NOSTRUM" title={<MareTitle />}>
      <Print src={marenostrumA} alt="MareNostrum supercomputer, Barcelona Supercomputing Center" x={120} y={372} w={770} h={520} rot={-2} d={400}>
        <Led x={30} d={0} />
        <Led x={52} d={140} />
        <Led x={74} d={280} />
        <Led x={96} d={420} />
        <Led x={118} d={560} />
        <Led x={140} d={700} />
      </Print>
      <Print src={marenostrumD} alt="MareNostrum supercomputer racks" x={930} y={352} w={450} h={308} rot={2.5} d={700} />
      <Print src={mareRacks} alt="MareNostrum racks glowing green behind glass in the Torre Girona chapel" x={930} y={668} w={450} h={280} rot={-2} d={1000} />
      <IbmSticker x={96} y={346} w={190} rot={-8} d={1400} />
      <IbmSticker x={1262} y={600} w={150} rot={9} d={1650} />
      <IbmSticker x={1050} y={896} w={130} rot={-5} d={1900} />
      <IbmSticker x={1430} y={352} w={240} rot={4} d={1200} />
      <div
        className="tc-a"
        style={{
          position: 'absolute',
          left: 1432,
          top: 498,
          padding: '8px 22px',
          borderRadius: 999,
          border: `2px solid ${C.teal}`,
          background: 'rgba(79,209,197,0.12)',
          color: C.teal,
          fontFamily: mono,
          fontSize: 24,
          letterSpacing: '0.1em',
          ...rise(active, 1500),
        }}
      >
        POWERPC 970 BLADES
      </div>
      <YeahBubble />
      <Boaster />
      <Credit>
        Photos: Wikimedia Commons · Vcarceler (CC BY-SA 3.0) · IBM logo is a trademark of IBM
      </Credit>
    </Frame>
  );
};
MareNostrum.transition = settle;

export const meta: SlideMeta = {
  title: 'What a career in technology looks like & how AI changes everything',
  createdAt: '2026-11-07T16:09:51.435Z',
};
export default [Cover, Agenda, Powers, Hello, College, Winlab, Internship, Tru64, Luck, WalkHome, IbmJob, IbmMore, MareNostrum] satisfies Page[];
