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
import chipAlpha from './assets/chip-alpha.jpg';
import einsteinPatent from './assets/einstein-patent.jpg';
import chipMpc750 from './assets/chip-mpc750.jpg';
import chipOpteron from './assets/chip-opteron.jpg';
import chipPa8000 from './assets/chip-pa8000.jpg';
import chipPentium4 from './assets/chip-pentium4.jpg';
import chipPower7 from './assets/chip-power7.jpg';
import chipPpc970 from './assets/chip-ppc970.jpg';
import chipSparc from './assets/chip-sparc.jpg';
import compaqLogo from './assets/compaq-logo.svg';
import decAlphaGeneration from './assets/dec-alpha-generation.svg';
import decLogo from './assets/dec-logo.svg';
import broadwayChip from './assets/broadway-chip.jpg';
import g5Angle from './assets/g5-angle.jpg';
import g5Front from './assets/g5-front.jpg';
import g5Open from './assets/g5-open.jpg';
import hpLogo from './assets/hp-logo.svg';
import ibmLogo from './assets/ibm-logo.svg';
import mobo1 from './assets/mobo-1.jpg';
import mobo486 from './assets/mobo-486.jpg';
import marenostrumA from './assets/marenostrum-a.jpg';
import marenostrumD from './assets/marenostrum-d.jpg';
import mareRacks from './assets/mare.jpg';
import mapsysPhoto from './assets/mapsys.png';
import kingstonLogo from './assets/customers/kingston.png';
import mitLogo from './assets/customers/mit.svg';
import oclcLogo from './assets/customers/oclc.svg';
import ohioHealthLogo from './assets/customers/ohiohealth.png';
import upmcLogo from './assets/customers/upmc.svg';
import vsLogo from './assets/customers/victorias-secret.svg';
import db2Logo from './assets/ibm/db2.svg';
import ibmZ9 from './assets/ibm/ibm-z9.jpg';
import powerSystemsLogo from './assets/ibm/power-systems.svg';
import redHatLogo from './assets/ibm/redhat.svg';
import wallStreetSign from './assets/ibm/wall-street-sign.jpg';
import watsonxLogo from './assets/ibm/watsonx.svg';
import akCover from './assets/ai101/cover.jpg';
import akSpeaker from './assets/ai101/speaker.jpg';
import wasserstromLogo from './assets/customers/wasserstrom.png';
import power7Badge from './assets/power7-badge.svg';
import powerpcLogo from './assets/powerpc-logo.svg';
import steveJobs from './assets/steve-jobs-stage.jpg';
import tru64Login from './assets/tru64.png';
import uvmLogo from './assets/uvm-logo.svg';
import wafer12 from './assets/wafer-12in.jpg';
import wafer2 from './assets/wafer-2.jpg';
import winlabBuilding from './assets/winlab-building.jpg';
import winlabLogo from './assets/winlab-logo.jpg';
import xbox360Pro from './assets/xbox360-pro.jpg';
import xbox360S from './assets/xbox360-s.jpg';
import aixLogo from './assets/aix-logo.svg';
import ibmILogo from './assets/ibm-i-logo.svg';
import power5I5515 from './assets/power5-i5-515.jpg';
import power5I5570 from './assets/power5-i5-570.jpg';

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
@keyframes tc-spot { 0%, 14%, 100% { box-shadow: 0 0 0 0 var(--g0); } 7% { box-shadow: 0 0 56px 10px var(--g1); } }
@keyframes tc-spin { to { transform: rotate(360deg); } }
@keyframes tc-ching { 0% { opacity: 0; transform: scale(0.2) rotate(-14deg); } 55% { opacity: 1; transform: scale(1.22) rotate(5deg); } 78% { transform: scale(0.96) rotate(-2deg); } 100% { opacity: 1; transform: none; } }
@keyframes tc-usd { 0% { opacity: 0; transform: translateY(40px) scale(0.5) rotate(var(--rot, 0deg)); } 20%, 80% { opacity: 1; } 100% { opacity: 0; transform: translateY(-150px) scale(1.15) rotate(calc(var(--rot, 0deg) * -1)); } }
@keyframes tc-bulbglow { 0%, 100% { transform: scale(0.85); opacity: 0.5; } 50% { transform: scale(1.3); opacity: 1; } }
@keyframes tc-sway { from { transform: rotate(-14deg); } to { transform: rotate(14deg); } }
@keyframes tc-dipwave { from { transform: rotate(-7deg); } to { transform: rotate(9deg); } }
@keyframes tc-writearm { from { transform: rotate(-5deg); } to { transform: rotate(6deg); } }
.tc-active [data-osd-step="revealed"] .tc-ching { animation: tc-ching 800ms cubic-bezier(0.34, 1.56, 0.64, 1) 400ms both, tc-neon 3s linear 1200ms infinite; }
.tc-active [data-osd-step="revealed"] .tc-usd { animation: tc-usd 2.6s ease-out var(--d) infinite both; }
.tc-active [data-osd-step="revealed"] .tc-bulbglow { animation: tc-bulbglow 1.6s ease-in-out 900ms infinite both; }
.tc-active [data-osd-step="revealed"] .tc-bulbpop { animation: tc-popin 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 500ms both; }
.tc-active [data-osd-step="revealed"] .tc-sway { animation: tc-sway 1.4s ease-in-out infinite alternate; }
.tc-active [data-osd-step="revealed"] .tc-dipwave { animation: tc-dipwave 0.9s ease-in-out infinite alternate; }
.tc-active [data-osd-step="revealed"] .tc-writearm { animation: tc-writearm 0.35s ease-in-out infinite alternate; }
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
      <div
        className="tc-a"
        style={{
          position: 'absolute',
          top: 690,
          left: 120,
          width: 1680,
          textAlign: 'center',
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.035em',
          ...rise(active, 600),
        }}
      >
        Going back where I started - <span style={{ color: 'var(--osd-accent)' }}>with a real job!</span>
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

const PhotoCard = ({ src, alt, h, w, d, glow }: { src: string; alt: string; h: number; w?: number; d: number; glow: string }) => (
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
    <img src={src} alt={alt} style={{ display: 'block', height: h, width: w ?? 'auto' }} />
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

/* ───────────────────────── 14 show and tell ───────────────────────── */

const ChipCard = ({
  src,
  alt,
  x,
  y,
  rot,
  d,
  spot,
  color,
  rgb,
  vendor,
  name,
  big,
}: {
  src: string;
  alt: string;
  x: number;
  y: number;
  rot: number;
  d: number;
  spot: number;
  color: string;
  rgb: string;
  vendor: string;
  name: string;
  /** Larger card: a taller photo and a one-line label bar. */
  big?: boolean;
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
          width: big ? 366 : 300,
          height: big ? 420 : 232,
          transform: `rotate(${rot}deg)`,
          animation: active ? `tc-polaroid 900ms ${SPRING} ${d}ms both` : undefined,
        } as CSSProperties
      }
    >
      <div
        className="tc-a"
        style={{
          width: '100%',
          height: '100%',
          animation: active ? `tc-bobsm ${4.4 + (d % 3) * 0.4}s ease-in-out ${d + 1200}ms infinite` : undefined,
        }}
      >
        <div
          className="tc-a"
          style={
            {
              '--g0': `rgba(${rgb},0)`,
              '--g1': `rgba(${rgb},0.6)`,
              position: 'relative',
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              borderRadius: 'var(--osd-radius)',
              border: `2px solid ${color}`,
              background: 'rgba(255,255,255,0.05)',
              overflow: 'hidden',
              animation: active ? `tc-spot 10s ease-in-out ${spot}ms infinite` : undefined,
            } as CSSProperties
          }
        >
          <div
            style={{
              height: big ? 362 : 156,
              boxSizing: 'border-box',
              padding: big ? 0 : 6,
              background: '#F3F6FC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={src} alt={alt} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          {big ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '8px 18px', whiteSpace: 'nowrap' }}>
              <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.14em', color }}>{vendor}</div>
              <div style={{ fontSize: 32, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em' }}>{name}</div>
            </div>
          ) : (
            <div style={{ padding: '6px 16px' }}>
              <div style={{ fontFamily: mono, fontSize: 18, lineHeight: 1.2, letterSpacing: '0.14em', color }}>{vendor}</div>
              <div style={{ whiteSpace: 'nowrap', fontSize: 30, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em' }}>{name}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** A round wafer that slowly spins under a sweeping glint. */
const Wafer = ({ src, alt, x, y, d, size = 165, reverse }: { src: string; alt: string; x: number; y: number; d: number; size?: number; reverse?: boolean }) => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        boxSizing: 'border-box',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #C8D3EE',
        boxShadow: '0 0 40px rgba(180,200,255,0.35)',
        animation: active ? `tc-badge 800ms ${SPRING} ${d}ms both` : undefined,
      }}
    >
      <div
        className="tc-a"
        style={{
          width: '100%',
          height: '100%',
          animation: active ? `tc-spin 30s linear infinite ${reverse ? 'reverse' : 'normal'}` : undefined,
        }}
      >
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div
        aria-hidden="true"
        className="tc-a"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'conic-gradient(from 0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.42) 50%, rgba(255,255,255,0) 60%, rgba(255,255,255,0) 100%)',
          animation: active ? 'tc-spin 4s linear infinite' : undefined,
        }}
      />
    </div>
  );
};

const Board = ({ src, alt, x, y, d, label }: { src: string; alt: string; x: number; y: number; d: number; label: string }) => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 360,
        height: 108,
        boxSizing: 'border-box',
        borderRadius: 'var(--osd-radius)',
        overflow: 'hidden',
        border: `2px solid ${C.teal}`,
        boxShadow: '0 0 36px rgba(79,209,197,0.25)',
        animation: active ? `tc-up 700ms ${SPRING} ${d}ms both` : undefined,
      }}
    >
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
      <div
        aria-hidden="true"
        className="tc-a"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '24%',
          background: 'linear-gradient(90deg, rgba(79,209,197,0), rgba(79,209,197,0.45), rgba(79,209,197,0))',
          animation: active ? `tc-shimmer 4s ease-in-out ${d + 1000}ms infinite` : undefined,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 10,
          bottom: 10,
          padding: '3px 12px',
          borderRadius: 999,
          background: 'rgba(3,5,12,0.82)',
          color: C.teal,
          fontFamily: mono,
          fontSize: 15,
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const ShowTell: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="14 · SHOW AND TELL"
      title={
        <span style={{ display: 'block', fontSize: 112, lineHeight: 1.05, whiteSpace: 'nowrap', ...rise(active, 100) }}>
          Now — <span style={{ color: 'var(--osd-accent)' }}><Wave text="show and tell!" delay={600} /></span>
        </span>
      }
    >
      <ChipCard src={chipPentium4} alt="Intel Pentium 4 processor" x={120} y={262} rot={-2} d={300} spot={1800} color="#4DA6FF" rgb="77,166,255" vendor="INTEL" name="Pentium 4" />
      <ChipCard src={chipOpteron} alt="AMD Opteron processor" x={444} y={262} rot={1.5} d={460} spot={2900} color="#5BE49B" rgb="91,228,155" vendor="AMD" name="Opteron" />
      <ChipCard src={chipPower7} alt="IBM POWER7 processor die" x={768} y={262} rot={-1} d={620} spot={4000} color="#9AD7FF" rgb="154,215,255" vendor="IBM" name="POWER7" />
      <ChipCard src={chipPpc970} alt="IBM PowerPC 970MP processor" x={1092} y={262} rot={2} d={780} spot={5100} color="#4FD1C5" rgb="79,209,197" vendor="IBM" name="PowerPC 970MP" />
      <ChipCard big src={chipMpc750} alt="IBM PowerPC 750 processor" x={120} y={528} rot={1.5} d={940} spot={6200} color="#FFC56B" rgb="255,197,107" vendor="IBM" name="PowerPC 750" />
      <ChipCard big src={chipAlpha} alt="DEC Alpha 21164 processor" x={558} y={528} rot={-1.5} d={1100} spot={7300} color="#FF5D6C" rgb="255,93,108" vendor="DEC" name="Alpha 21164" />
      <ChipCard big src={chipSparc} alt="Sun UltraSPARC II processor" x={996} y={528} rot={1} d={1260} spot={8400} color="#B58CFF" rgb="181,140,255" vendor="SUN" name="UltraSPARC II" />
      <ChipCard big src={chipPa8000} alt="HP PA-8000 PA-RISC processor" x={1434} y={528} rot={-1.5} d={1420} spot={9500} color="#FF8A4C" rgb="255,138,76" vendor="HP" name="PA-8000" />
      <Wafer src={wafer12} alt="12-inch silicon wafer" x={1555} y={72} size={110} d={1600} />
      <Wafer src={wafer2} alt="Silicon wafer with finished chips" x={1690} y={72} size={110} d={1760} reverse />
      <div
        className="tc-a"
        style={{ position: 'absolute', left: 1555, top: 190, width: 245, textAlign: 'center', fontFamily: mono, fontSize: 16, letterSpacing: '0.14em', color: C.dim, ...rise(active, 1900) }}
      >
        SILICON WAFERS
      </div>
      <Board src={mobo1} alt="A computer motherboard" x={1440} y={262} d={2000} label="MOTHERBOARD" />
      <Board src={mobo486} alt="A VIA 486 motherboard with its CPU" x={1440} y={386} d={2200} label="MOTHERBOARD · VIA 486" />
      <Credit>
        Photos via Wikimedia Commons: Henriok, K. Kaiser (CC0) · L. Szalai (public domain) · K. Lanzet, A. Nunome, Architekt1024 (CC BY) · Peellden, S. Fararano (CC BY-SA)
      </Credit>
    </Frame>
  );
};
ShowTell.transition = settle;

/* ───────────────────────── 15 back to learning ───────────────────────── */

const UvmCard = () => {
  const active = useIsActivePage();
  return (
    <div
      className="tc-a tc-row"
      style={{
        position: 'relative',
        display: 'inline-flex',
        overflow: 'hidden',
        padding: '28px 36px',
        borderRadius: 24,
        background: '#FFFFFF',
        boxShadow: '0 0 80px rgba(47,158,107,0.5)',
      }}
    >
      <img src={uvmLogo} alt="University of Vermont logo" style={{ display: 'block', width: 720, height: 229 }} />
      <div
        aria-hidden="true"
        className="tc-a"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '22%',
          background: 'linear-gradient(90deg, rgba(47,158,107,0), rgba(47,158,107,0.28), rgba(47,158,107,0))',
          animation: active ? 'tc-shimmer 4s ease-in-out 1200ms infinite' : undefined,
        }}
      />
    </div>
  );
};

/** A graduate in cap and gown, waving a diploma. */
const GradGuy = () => (
  <div className="tc-a tc-row" style={{ position: 'relative', width: 250, height: 330, flex: 'none' }}>
    <svg width={250} height={330} viewBox="0 0 250 330" role="img" aria-label="A graduate in a cap and gown waving a diploma">
      {/* legs + shoes */}
      <line x1={108} y1={266} x2={102} y2={314} stroke="#A9B7D9" strokeWidth={11} strokeLinecap="round" />
      <line x1={142} y1={266} x2={148} y2={314} stroke="#A9B7D9" strokeWidth={11} strokeLinecap="round" />
      <ellipse cx={98} cy={321} rx={17} ry={7} fill="#FF5D6C" />
      <ellipse cx={152} cy={321} rx={17} ry={7} fill="#FF5D6C" />
      {/* gown, shirt, stole */}
      <path d="M125 142 C 100 144, 86 152, 82 164 L 60 272 L 190 272 L 168 164 C 164 152, 150 144, 125 142 Z" fill="#2F9E6B" />
      <path d="M108 146 L125 188 L142 146 Z" fill="#F3F6FC" />
      <path d="M104 148 L116 268" stroke={C.gold} strokeWidth={9} strokeLinecap="round" fill="none" />
      <path d="M146 148 L134 268" stroke={C.gold} strokeWidth={9} strokeLinecap="round" fill="none" />
      {/* resting arm */}
      <line x1={84} y1={164} x2={70} y2={222} stroke="#2F9E6B" strokeWidth={18} strokeLinecap="round" />
      <circle cx={68} cy={228} r={9} fill="#FFD9B3" />
      {/* head + face */}
      <circle cx={125} cy={96} r={44} fill="#FFD9B3" />
      <circle cx={98} cy={112} r={7} fill="rgba(255,93,108,0.35)" />
      <circle cx={152} cy={112} r={7} fill="rgba(255,93,108,0.35)" />
      <circle cx={110} cy={100} r={5.5} fill="#03050C" />
      <circle cx={140} cy={100} r={5.5} fill="#03050C" />
      <path d="M107 114 Q125 134 143 114" stroke="#03050C" strokeWidth={4} strokeLinecap="round" fill="none" />
      {/* cap */}
      <path d="M90 74 C 90 56, 160 56, 160 74 L 160 82 C 142 90, 108 90, 90 82 Z" fill="#1B6B47" />
      <polygon points="125,28 200,50 125,72 50,50" fill="#23805A" stroke="#1B6B47" strokeWidth={3} strokeLinejoin="round" />
      <circle cx={125} cy={50} r={5} fill={C.gold} />
      <g className="tc-a tc-sway" style={{ transformOrigin: '176px 56px' }}>
        <path d="M125 50 L176 56" stroke={C.gold} strokeWidth={3} strokeLinecap="round" fill="none" />
        <line x1={176} y1={56} x2={176} y2={86} stroke={C.gold} strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={176} cy={94} rx={5.5} ry={10} fill={C.gold} />
      </g>
      {/* raised arm with diploma */}
      <g className="tc-a tc-dipwave" style={{ transformOrigin: '166px 164px' }}>
        <line x1={166} y1={164} x2={206} y2={126} stroke="#2F9E6B" strokeWidth={18} strokeLinecap="round" />
        <g transform="rotate(28 214 112)">
          <rect x={202} y={66} width={24} height={92} rx={12} fill="#F5E9C8" />
          <rect x={202} y={104} width={24} height={9} fill="#FF5D6C" />
        </g>
        <circle cx={209} cy={121} r={10} fill="#FFD9B3" />
      </g>
    </svg>
    <Sparkle x={196} y={4} size={30} d="0ms" />
    <Sparkle x={14} y={40} size={26} d="700ms" />
    <Sparkle x={214} y={196} size={22} d="1200ms" />
  </div>
);

const Dollar = ({ x, y, size, d, rot, children }: { x: number; y: number; size: number; d: string; rot: string; children: ReactNode }) => (
  <span
    aria-hidden="true"
    className="tc-a tc-usd"
    style={
      {
        '--d': d,
        '--rot': rot,
        position: 'absolute',
        left: x,
        top: y,
        fontSize: size,
        fontWeight: 900,
        lineHeight: 1,
        color: C.green,
        textShadow: '0 0 18px rgba(91,228,155,0.6)',
      } as CSSProperties
    }
  >
    {children}
  </span>
);

/** A student with glasses, hard at work with pencil and paper. A light bulb pops over her head. */
const StudyGal = () => (
  <div className="tc-a tc-row" style={{ position: 'relative', width: 330, height: 310, flex: 'none' }}>
    <div
      aria-hidden="true"
      className="tc-a tc-bulbglow"
      style={{
        position: 'absolute',
        left: 168,
        top: -28,
        width: 130,
        height: 130,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,197,107,0.8), rgba(255,197,107,0) 70%)',
      }}
    />
    <svg width={330} height={310} viewBox="0 0 330 310" role="img" aria-label="A student with glasses studying with pencil and paper">
      {/* desk */}
      <rect x={30} y={248} width={12} height={58} rx={4} fill="#C98A2E" />
      <rect x={288} y={248} width={12} height={58} rx={4} fill="#C98A2E" />
      {/* torso */}
      <line x1={122} y1={156} x2={122} y2={238} stroke="#4DA6FF" strokeWidth={30} strokeLinecap="round" />
      <rect x={10} y={232} width={310} height={16} rx={6} fill={C.amber} />
      {/* head */}
      <circle cx={122} cy={100} r={42} fill="#FFD9B3" />
      <path d="M78 100 C 74 62, 100 54, 122 54 C 146 54, 170 64, 166 100 C 152 80, 100 78, 78 100 Z" fill="#7A4B2A" />
      <circle cx={92} cy={52} r={15} fill="#7A4B2A" />
      <circle cx={106} cy={110} r={4.5} fill="#03050C" />
      <circle cx={138} cy={110} r={4.5} fill="#03050C" />
      <circle cx={106} cy={106} r={13} fill="rgba(255,255,255,0.12)" stroke="#F3F6FC" strokeWidth={3.5} />
      <circle cx={138} cy={106} r={13} fill="rgba(255,255,255,0.12)" stroke="#F3F6FC" strokeWidth={3.5} />
      <line x1={119} y1={104} x2={125} y2={104} stroke="#F3F6FC" strokeWidth={3.5} />
      <path d="M114 130 Q122 134 130 130" stroke="#03050C" strokeWidth={3.5} strokeLinecap="round" fill="none" />
      {/* thought dots up to the bulb */}
      <circle cx={174} cy={78} r={4} fill="#F3F6FC" opacity={0.7} />
      <circle cx={188} cy={68} r={6} fill="#F3F6FC" opacity={0.7} />
      {/* books */}
      <rect x={24} y={216} width={76} height={16} rx={3} fill={C.red} />
      <rect x={30} y={200} width={66} height={16} rx={3} fill={C.green} />
      <rect x={26} y={184} width={70} height={16} rx={3} fill="#4DA6FF" />
      {/* paper */}
      <polygon points="190,232 310,232 322,214 202,214" fill="#F3F6FC" />
      <line x1={210} y1={220} x2={304} y2={220} stroke={C.dim} strokeWidth={2} />
      <line x1={206} y1={226} x2={300} y2={226} stroke={C.dim} strokeWidth={2} />
      {/* writing arm */}
      <line x1={122} y1={164} x2={170} y2={202} stroke="#4DA6FF" strokeWidth={15} strokeLinecap="round" />
      <g className="tc-a tc-writearm" style={{ transformOrigin: '170px 202px' }}>
        <line x1={170} y1={202} x2={224} y2={214} stroke="#4DA6FF" strokeWidth={14} strokeLinecap="round" />
        <line x1={214} y1={200} x2={254} y2={226} stroke={C.gold} strokeWidth={7} strokeLinecap="round" />
        <circle cx={212} cy={198} r={4.5} fill={C.red} />
        <path d="M250 222 L260 231 L247 229 Z" fill="#03050C" />
        <circle cx={226} cy={215} r={8.5} fill="#FFD9B3" />
      </g>
    </svg>
    <div
      className="tc-a tc-bulbpop"
      style={{ position: 'absolute', left: 190, top: -4, fontSize: 72, lineHeight: 1 }}
    >
      💡
    </div>
  </div>
);

const Learning: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="15 · BACK TO LEARNING"
      title={
        <span style={{ display: 'block', fontSize: 72, whiteSpace: 'nowrap', ...rise(active, 100) }}>
          Next up, time to get back to <span style={{ color: 'var(--osd-accent)' }}>learning!</span>
        </span>
      }
    >
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        {/* click 1 — the big UVM logo */}
        <div style={{ position: 'absolute', top: 245, left: 120, width: 800, height: 340, display: 'flex', alignItems: 'center' }}>
          <Steps>
            <Step duration={200}>
              <UvmCard />
            </Step>
          </Steps>
        </div>
        {/* click 2 — the Master’s degree */}
        <div style={{ position: 'absolute', top: 245, left: 1000, width: 800, height: 340, display: 'flex', alignItems: 'center' }}>
          <Steps>
            <Step duration={200}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                <GradGuy />
                <div
                  className="tc-a tc-in"
                  style={{ '--d': '500ms', width: 520, fontSize: 46, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}
                >
                  I earned a <span style={{ color: 'var(--osd-accent)' }}>Master’s degree</span> in{' '}
                  <span style={{ color: C.gold }}>Electrical Engineering.</span>
                </div>
              </div>
            </Step>
          </Steps>
        </div>
        {/* click 3 — free, and Cha-Ching */}
        <div style={{ position: 'absolute', top: 610, left: 120, width: 800, height: 320 }}>
          <Steps>
            <Step duration={200}>
              <div style={{ position: 'relative', width: 800, height: 320 }}>
                <div
                  className="tc-a tc-in"
                  style={{ '--d': '0ms', fontSize: 50, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}
                >
                  And it was{' '}
                  <span
                    className="tc-a tc-passion"
                    style={{ background: 'linear-gradient(90deg,#5BE49B,#FFC56B,#4FD1C5,#5BE49B)', backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
                  >
                    FREE
                  </span>{' '}
                  <span style={{ fontSize: 56 }}>🆓</span>, I got <span style={{ color: '#4DA6FF' }}>IBM</span> to pay for it.
                </div>
                <div
                  className="tc-a tc-ching"
                  style={{ position: 'absolute', left: 0, top: 160, whiteSpace: 'nowrap', fontSize: 100, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.04em' }}
                >
                  Cha-Ching!
                </div>
                <Dollar x={600} y={200} size={56} d="0ms" rot="-12deg">
                  $
                </Dollar>
                <Dollar x={655} y={226} size={44} d="500ms" rot="10deg">
                  💵
                </Dollar>
                <Dollar x={705} y={196} size={64} d="1000ms" rot="-8deg">
                  $
                </Dollar>
                <Dollar x={750} y={230} size={44} d="1500ms" rot="14deg">
                  💰
                </Dollar>
                <Dollar x={560} y={236} size={40} d="2000ms" rot="-10deg">
                  $
                </Dollar>
              </div>
            </Step>
          </Steps>
        </div>
        {/* click 4 — never stop learning */}
        <div style={{ position: 'absolute', top: 612, left: 1000, width: 800, height: 320, display: 'flex', alignItems: 'center' }}>
          <Steps>
            <Step duration={200}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                <StudyGal />
                <div style={{ width: 440 }}>
                  <div
                    className="tc-a tc-in"
                    style={{ '--d': '400ms', fontSize: 58, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.04em' } as CSSProperties}
                  >
                    Never stop <span className="tc-a tc-passion">learning.</span>
                  </div>
                  <div
                    className="tc-a tc-in"
                    style={{ '--d': '900ms', marginTop: 18, fontSize: 34, lineHeight: 1.25, fontWeight: 700, color: C.muted } as CSSProperties}
                  >
                    Either formally or on your own.
                  </div>
                </div>
              </div>
            </Step>
          </Steps>
        </div>
      </div>
    </Frame>
  );
};
Learning.transition = settle;

/* ───────────────────────── 16 patents ───────────────────────── */

const PATENT_CSS = `
@keyframes pt-stamp { 0% { opacity: 0; transform: scale(2.6) rotate(-40deg); } 60% { opacity: 1; transform: scale(0.92) rotate(-12deg); } 100% { opacity: 1; transform: scale(1) rotate(-14deg); } }
@keyframes pt-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,93,108,0.0); } 50% { box-shadow: 0 0 36px 4px rgba(255,93,108,0.45); } }
.tc-active [data-osd-step="revealed"] .pt-stamp { animation: pt-stamp 650ms cubic-bezier(0.34, 1.2, 0.64, 1) 1300ms both, pt-pulse 2.4s ease-in-out 2000ms infinite; }
`;

/** One granted patent: number + issue date on the left, title on the right. */
const PatentRow = ({ num, date, title, d }: { num: string; date: string; title: string; d: string }) => (
  <div
    className="tc-a tc-in"
    style={
      {
        '--d': d,
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        height: 80,
        padding: '0 28px',
        borderRadius: 14,
        borderLeft: '5px solid var(--osd-accent)',
        background: C.panel,
      } as CSSProperties
    }
  >
    <div style={{ width: 250, flex: 'none' }}>
      <div style={{ fontFamily: mono, fontSize: 28, lineHeight: 1.2, color: 'var(--osd-accent)' }}>US {num}</div>
      <div style={{ fontFamily: mono, fontSize: 22, lineHeight: 1.3, color: C.muted }}>{date}</div>
    </div>
    <div style={{ fontSize: 30, lineHeight: 1.2, fontWeight: 700 }}>{title}</div>
  </div>
);

/** A slowly turning gear — teeth are a dashed stroke. */
const Gear = ({ x, y, size, dur, reverse }: { x: number; y: number; size: number; dur: number; reverse?: boolean }) => {
  const active = useIsActivePage();
  return (
    <svg
      aria-hidden="true"
      className="tc-a"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        animation: active ? `tc-spin ${dur}s linear infinite ${reverse ? 'reverse' : 'normal'}` : undefined,
      }}
    >
      <circle cx={50} cy={50} r={41} fill="none" stroke={C.gold} strokeWidth={12} strokeDasharray="11.7 11.7" />
      <circle cx={50} cy={50} r={34} fill="none" stroke={C.gold} strokeWidth={8} />
      <line x1={50} y1={16} x2={50} y2={84} stroke={C.gold} strokeWidth={5} />
      <line x1={16} y1={50} x2={84} y2={50} stroke={C.gold} strokeWidth={5} />
      <circle cx={50} cy={50} r={11} fill={C.gold} />
      <circle cx={50} cy={50} r={4.5} fill="#03050C" />
    </svg>
  );
};

/** A floating light bulb with a pulsing glow. */
const Bulb = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => {
  const active = useIsActivePage();
  return (
    <div
      aria-hidden="true"
      className="tc-a"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.8,
        lineHeight: 1,
        animation: active ? `tc-float 4s ease-in-out ${delay}ms infinite` : undefined,
      }}
    >
      <div
        className="tc-a"
        style={{
          position: 'absolute',
          inset: -size * 0.3,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,197,107,0.55), rgba(255,197,107,0) 68%)',
          animation: active ? `tc-bulbglow 1.8s ease-in-out ${delay}ms infinite` : undefined,
        }}
      />
      <span style={{ position: 'relative' }}>💡</span>
    </div>
  );
};

const Patents: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="16 · PATENTS"
      title={
        <span style={{ display: 'block', fontSize: 160, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          <span className="tc-passion">
            <Wave text="Patents!" delay={500} />
          </span>
        </span>
      }
    >
      <style>{PATENT_CSS}</style>
      {/* always-on: intro + ambient fun */}
      <div style={{ position: 'absolute', top: 322, left: 120, width: 1220 }}>
        <div className="tc-a" style={{ fontSize: 38, lineHeight: 1.3, fontWeight: 700, ...rise(active, 500) }}>
          I joined a <span style={{ color: 'var(--osd-accent)' }}>patent group</span> at IBM & found a{' '}
          <span style={{ color: C.gold }}>patent mentor.</span>
        </div>
        <div className="tc-a" style={{ marginTop: 14, fontSize: 34, lineHeight: 1.3, fontWeight: 700, color: C.muted, whiteSpace: 'nowrap', ...rise(active, 900) }}>
          In addition to my design job →{' '}
          <span style={{ color: C.green }}>filed 6+ patents</span> + <span style={{ color: '#4DA6FF' }}>published several papers</span>
        </div>
      </div>
      <Bulb x={1000} y={140} size={96} delay={0} />
      <Bulb x={1200} y={236} size={64} delay={900} />
      <Gear x={1452} y={835} size={110} dur={9} reverse />
      <Gear x={1545} y={795} size={190} dur={14} />
      {/* click 1 — the patents, Einstein, the stamp */}
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', top: 520, left: 120, width: 1220, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PatentRow num="9,043,889" date="May 26, 2015" title="Method and apparatus for secure and reliable computing" d="0ms" />
                <PatentRow num="8,595,468" date="Nov 26, 2013" title="Reverse simultaneous multi-threading" d="180ms" />
                <PatentRow num="8,424,071" date="Apr 16, 2013" title="Method and apparatus for secure and reliable computing" d="360ms" />
                <PatentRow num="7,865,862" date="Jan 4, 2011" title="Design structure for dynamically selecting compiled instructions" d="540ms" />
                <PatentRow num="7,761,690" date="Jul 20, 2010" title="Method, apparatus and computer program product for dynamically selecting compiled instructions" d="720ms" />
              </div>
              {/* Einstein — patent clerk, Bern */}
              <div className="tc-a tc-in" style={{ '--d': '300ms', position: 'absolute', left: 1404, top: 130, width: 396 } as CSSProperties}>
                <div
                  className="tc-a"
                  style={{
                    padding: '14px 14px 20px',
                    background: '#F3EEE2',
                    borderRadius: 6,
                    transform: 'rotate(3deg)',
                    boxShadow: '0 0 70px rgba(255,197,107,0.35)',
                    animation: active ? 'tc-smug 5s ease-in-out infinite' : undefined,
                  }}
                >
                  <img
                    src={einsteinPatent}
                    alt="Albert Einstein, patent examiner"
                    style={{ display: 'block', width: 368, height: 483, objectFit: 'cover', borderRadius: 2 }}
                  />
                  <div style={{ marginTop: 14, textAlign: 'center', fontFamily: mono, fontSize: 20, lineHeight: 1.3, color: '#2A2418' }}>
                    Albert Einstein · patent examiner, Bern
                  </div>
                </div>
              </div>
              <Sparkle x={1372} y={150} size={34} d="900ms" />
              <Sparkle x={1770} y={110} size={28} d="1500ms" />
              <Sparkle x={1790} y={560} size={30} d="2100ms" />
              <div
                className="tc-a tc-in"
                style={{ '--d': '1000ms', position: 'absolute', left: 1426, top: 40, fontFamily: mono, fontSize: 44, color: C.gold, textShadow: '0 0 24px rgba(255,197,107,0.6)' } as CSSProperties}
              >
                E = mc²
              </div>
              {/* PATENTED stamp */}
              <div style={{ position: 'absolute', left: 1640, top: 30, width: 200, height: 200 }}>
                <div
                  className="tc-a pt-stamp"
                  style={{
                    width: 200,
                    height: 200,
                    boxSizing: 'border-box',
                    borderRadius: '50%',
                    border: `8px double ${C.red}`,
                    background: 'rgba(3,5,12,0.62)',
                    color: C.red,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: mono,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 20, letterSpacing: '0.2em' }}>★ ★ ★</div>
                  <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.1, letterSpacing: '0.04em' }}>PATENTED</div>
                  <div style={{ fontSize: 20, letterSpacing: '0.2em' }}>★ ★ ★</div>
                </div>
              </div>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Patents.transition = settle;

/* ───────────────────────── 17 third point ───────────────────────── */

const THINK_CSS = `
@keyframes th-nod { from { transform: rotate(-2.5deg); } to { transform: rotate(4deg); } }
@keyframes th-breathe { from { transform: translateY(0); } to { transform: translateY(3px); } }
@keyframes th-cloud { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-8px) scale(1.03); } }
@keyframes th-dot { 0%, 100% { opacity: 0.25; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.15); } }
@keyframes th-q { 0% { opacity: 0; transform: translateY(14px) rotate(-8deg); } 30%, 70% { opacity: 1; } 100% { opacity: 0; transform: translateY(-40px) rotate(8deg); } }
.tc-active [data-osd-step="revealed"] .th-bulb { animation: tc-popin 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 700ms both; }
.tc-active [data-osd-step="revealed"] .th-bulbglow { animation: tc-bulbglow 1.6s ease-in-out 1200ms infinite both; }
`;

/** A tiny gear that turns inside the thought cloud. */
const ThinkGear = ({ cx, cy, r, dur, reverse }: { cx: number; cy: number; r: number; dur: number; reverse?: boolean }) => {
  const active = useIsActivePage();
  return (
    <g
      className="tc-a"
      style={{
        transformBox: 'fill-box',
        transformOrigin: 'center',
        animation: active ? `tc-spin ${dur}s linear infinite ${reverse ? 'reverse' : 'normal'}` : undefined,
      }}
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.gold} strokeWidth={r * 0.28} strokeDasharray={`${r * 0.46} ${r * 0.46}`} />
      <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke={C.gold} strokeWidth={r * 0.16} />
      <line x1={cx - r * 0.72} y1={cy} x2={cx + r * 0.72} y2={cy} stroke={C.gold} strokeWidth={r * 0.1} />
      <line x1={cx} y1={cy - r * 0.72} x2={cx} y2={cy + r * 0.72} stroke={C.gold} strokeWidth={r * 0.1} />
      <circle cx={cx} cy={cy} r={r * 0.2} fill={C.gold} />
    </g>
  );
};

/** A bronze "Thinker" on a rock: head nods, chest breathes, a thought cloud full of gears floats beside him. */
const Thinker = () => {
  const active = useIsActivePage();
  const bronze = '#C98A2E';
  const light = '#E8B45A';
  const dark = '#8A5A1C';
  return (
    <div className="tc-a" style={{ position: 'relative', width: 600, height: 540 }}>
      <svg width={600} height={540} viewBox="0 0 600 540" role="img" aria-label="A bronze statue of The Thinker, chin on fist, lost in thought" style={{ overflow: 'visible', filter: 'drop-shadow(0 0 40px rgba(255,197,107,0.25))' }}>
        {/* rock */}
        <path d="M30 520 L70 400 L150 372 L300 366 L390 388 L430 456 L452 520 Z" fill="#2A3350" />
        <path d="M70 400 L150 372 L300 366 L390 388 L330 404 L150 410 Z" fill="#3A4670" />
        <path d="M150 410 L330 404 L390 388 L430 456 L452 520 L300 520 Z" fill="#222A44" />
        {/* body — breathes */}
        <g className="tc-a" style={{ animation: active ? 'th-breathe 2.4s ease-in-out infinite alternate' : undefined }}>
          {/* lower leg + foot */}
          <line x1={330} y1={360} x2={316} y2={452} stroke={dark} strokeWidth={36} strokeLinecap="round" />
          <line x1={330} y1={360} x2={316} y2={452} stroke={bronze} strokeWidth={28} strokeLinecap="round" />
          <ellipse cx={304} cy={462} rx={34} ry={12} fill={bronze} />
          {/* thigh */}
          <line x1={176} y1={366} x2={330} y2={356} stroke={dark} strokeWidth={52} strokeLinecap="round" />
          <line x1={176} y1={366} x2={330} y2={356} stroke={bronze} strokeWidth={44} strokeLinecap="round" />
          <line x1={186} y1={354} x2={320} y2={346} stroke={light} strokeWidth={10} strokeLinecap="round" opacity={0.7} />
          {/* torso, hunched forward */}
          <line x1={178} y1={350} x2={262} y2={236} stroke={dark} strokeWidth={78} strokeLinecap="round" />
          <line x1={178} y1={350} x2={262} y2={236} stroke={bronze} strokeWidth={70} strokeLinecap="round" />
          <line x1={196} y1={330} x2={258} y2={246} stroke={light} strokeWidth={14} strokeLinecap="round" opacity={0.6} />
          {/* resting arm */}
          <line x1={238} y1={262} x2={226} y2={344} stroke={dark} strokeWidth={30} strokeLinecap="round" />
          <line x1={238} y1={262} x2={226} y2={344} stroke={bronze} strokeWidth={24} strokeLinecap="round" />
          {/* thinking arm: shoulder → elbow on knee → fist at chin */}
          <line x1={286} y1={246} x2={342} y2={336} stroke={dark} strokeWidth={36} strokeLinecap="round" />
          <line x1={286} y1={246} x2={342} y2={336} stroke={bronze} strokeWidth={30} strokeLinecap="round" />
          <line x1={342} y1={336} x2={338} y2={236} stroke={dark} strokeWidth={30} strokeLinecap="round" />
          <line x1={342} y1={336} x2={338} y2={236} stroke={bronze} strokeWidth={24} strokeLinecap="round" />
          <line x1={348} y1={320} x2={345} y2={250} stroke={light} strokeWidth={7} strokeLinecap="round" opacity={0.7} />
          {/* head — nods */}
          <g className="tc-a" style={{ transformBox: 'view-box', transformOrigin: '288px 232px', animation: active ? 'th-nod 2.8s ease-in-out infinite alternate' : undefined }}>
            <circle cx={316} cy={170} r={50} fill={dark} />
            <circle cx={316} cy={170} r={46} fill={bronze} />
            <path d="M274 160 C 276 124, 310 116, 340 126 C 362 134, 364 156, 360 166 C 346 146, 300 142, 274 160 Z" fill={dark} />
            <path d="M290 178 Q 304 172 318 180" stroke={dark} strokeWidth={5} strokeLinecap="round" fill="none" />
            <path d="M330 174 Q 340 168 350 174" stroke={dark} strokeWidth={5} strokeLinecap="round" fill="none" />
            <ellipse cx={340} cy={226} rx={20} ry={17} fill={light} stroke={dark} strokeWidth={3} />
            <ellipse cx={298} cy={146} rx={10} ry={6} fill={light} opacity={0.6} />
          </g>
        </g>
        {/* thought trail */}
        <circle className="tc-a" cx={402} cy={122} r={8} fill="#F3F6FC" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: active ? 'th-dot 1.8s ease-in-out 0ms infinite' : undefined }} />
        <circle className="tc-a" cx={426} cy={96} r={13} fill="#F3F6FC" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: active ? 'th-dot 1.8s ease-in-out 300ms infinite' : undefined }} />
        {/* thought cloud with gears */}
        <g className="tc-a" style={{ animation: active ? 'th-cloud 4s ease-in-out infinite' : undefined }}>
          <g fill="rgba(243,246,252,0.1)" stroke="#F3F6FC" strokeWidth={4}>
            <ellipse cx={470} cy={52} rx={88} ry={42} />
            <circle cx={410} cy={56} r={36} />
            <circle cx={530} cy={50} r={36} />
            <circle cx={470} cy={26} r={32} />
          </g>
          <ellipse cx={470} cy={52} rx={86} ry={40} fill="#0B1020" />
          <circle cx={412} cy={56} r={32} fill="#0B1020" />
          <circle cx={528} cy={50} r={32} fill="#0B1020" />
          <circle cx={470} cy={28} r={28} fill="#0B1020" />
          <ThinkGear cx={444} cy={50} r={26} dur={6} />
          <ThinkGear cx={492} cy={62} r={20} dur={4.6} reverse />
          <ThinkGear cx={512} cy={30} r={13} dur={3.2} />
        </g>
      </svg>
      {/* drifting question marks */}
      <span aria-hidden="true" className="tc-a" style={{ position: 'absolute', left: 380, top: 150, fontSize: 54, fontWeight: 900, color: C.gold, opacity: 0, animation: active ? 'th-q 3.6s ease-out 0ms infinite' : undefined }}>?</span>
      <span aria-hidden="true" className="tc-a" style={{ position: 'absolute', left: 470, top: 170, fontSize: 40, fontWeight: 900, color: C.teal, opacity: 0, animation: active ? 'th-q 3.6s ease-out 1200ms infinite' : undefined }}>?</span>
      <span aria-hidden="true" className="tc-a" style={{ position: 'absolute', left: 330, top: 100, fontSize: 44, fontWeight: 900, color: 'var(--osd-accent)', opacity: 0, animation: active ? 'th-q 3.6s ease-out 2400ms infinite' : undefined }}>?</span>
    </div>
  );
};

const ThirdPoint: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="17 · THE THIRD POINT"
      title={
        <span style={{ display: 'block', fontSize: 112, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          Here’s a <span style={{ color: 'var(--osd-accent)' }}>third point</span>{' '}
          <span className="tc-a" style={{ display: 'inline-block', color: C.gold, animation: active ? 'tc-nudge 1.2s ease-in-out infinite' : undefined }}>
            →
          </span>
        </span>
      }
    >
      <style>{THINK_CSS}</style>
      {/* always-on: the thinker, thinking */}
      <div style={{ position: 'absolute', left: 1240, top: 320 }}>
        <Thinker />
      </div>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — prepared */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', top: 330, left: 120, width: 1060 }}>
                <div className="tc-a tc-in" style={{ '--d': '0ms', fontSize: 136, lineHeight: 1.05, fontWeight: 900, letterSpacing: '-0.045em' } as CSSProperties}>
                  I was <span className="tc-a tc-passion">prepared.</span>
                </div>
                <div className="tc-a tc-in" style={{ '--d': '450ms', marginTop: 18, fontSize: 72, lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.03em', color: C.gold } as CSSProperties}>
                  I put in the work!
                </div>
              </div>
            </div>
          </Step>
          {/* click 2 — never stop */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div
                className="tc-a tc-in"
                style={{ '--d': '0ms', position: 'absolute', top: 690, left: 120, width: 1060, fontSize: 44, lineHeight: 1.3, fontWeight: 800, letterSpacing: '-0.02em' } as CSSProperties}
              >
                Never stop <span style={{ color: C.green }}>learning</span>, never stop <span style={{ color: '#4DA6FF' }}>achieving</span>, never stop{' '}
                <span style={{ color: 'var(--osd-accent)' }}>designing</span> & reaching for{' '}
                <span style={{ color: C.gold }}>what comes next!</span>
              </div>
              <div
                aria-hidden="true"
                className="tc-a th-bulbglow"
                style={{ position: 'absolute', left: 1672, top: 640, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,197,107,0.8), rgba(255,197,107,0) 70%)' }}
              />
              <div className="tc-a th-bulb" style={{ position: 'absolute', left: 1690, top: 665, fontSize: 96, lineHeight: 1 }}>
                💡
              </div>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
ThirdPoint.transition = settle;

/* ───────────────────────── 18 tragedy strikes ───────────────────────── */

const TRAGEDY_CSS = `
@keyframes tp-fall { 0% { transform: translateY(-440px) rotate(-8deg); opacity: 1; } 99% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(0); opacity: 0; } }
@keyframes tp-flash { 0% { opacity: 0; } 6% { opacity: 1; } 100% { opacity: 0; } }
@keyframes tp-ball { 0% { transform: scale(0); opacity: 1; } 60% { opacity: 1; } 100% { transform: scale(1); opacity: 0.85; } }
@keyframes tp-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes tp-cap { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes tp-ring { 0% { transform: scale(0.1); opacity: 0.9; } 100% { transform: scale(3.2); opacity: 0; } }
@keyframes tp-skirt { from { transform: scaleX(0); opacity: 0.9; } to { transform: scaleX(1); opacity: 0.55; } }
@keyframes tp-glow { from { opacity: 0; } to { opacity: 1; } }
@keyframes tp-shake { 0%, 100% { transform: translate(0, 0); } 15% { transform: translate(-9px, 5px); } 30% { transform: translate(8px, -6px); } 45% { transform: translate(-6px, -4px); } 60% { transform: translate(5px, 5px); } 80% { transform: translate(-3px, 2px); } }
@keyframes tp-boil { from { transform: scale(1); } to { transform: scale(1.07); } }
@keyframes tp-sweat { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(46px); opacity: 0; } }
@keyframes tp-panic { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(-4px, 0) rotate(-1.5deg); } 75% { transform: translate(4px, 0) rotate(1.5deg); } }
@keyframes tp-q { 0% { opacity: 0; transform: translateY(10px) rotate(-8deg); } 30%, 70% { opacity: 1; } 100% { opacity: 0; transform: translateY(-46px) rotate(8deg); } }
.tp-o { transform-box: fill-box; transform-origin: 50% 50%; }
.tp-base { transform-box: fill-box; transform-origin: 50% 100%; }
.tc-active [data-osd-step="revealed"] .tp-fall { animation: tp-fall 700ms cubic-bezier(0.55, 0, 1, 0.6) both; }
.tc-active [data-osd-step="revealed"] .tp-flash { animation: tp-flash 1200ms ease-out 700ms both; }
.tc-active [data-osd-step="revealed"] .tp-ball { animation: tp-ball 600ms ease-out 700ms both; }
.tc-active [data-osd-step="revealed"] .tp-stem { animation: tp-grow 900ms cubic-bezier(0.2, 0.7, 0.3, 1) 800ms both; }
.tc-active [data-osd-step="revealed"] .tp-cap { animation: tp-cap 1000ms cubic-bezier(0.34, 1.4, 0.64, 1) 1300ms both; }
.tc-active [data-osd-step="revealed"] .tp-ring { animation: tp-ring 1400ms ease-out 750ms both; }
.tc-active [data-osd-step="revealed"] .tp-skirt { animation: tp-skirt 900ms ease-out 850ms both; }
.tc-active [data-osd-step="revealed"] .tp-glow { animation: tp-glow 1400ms ease-out 800ms both; }
.tc-active [data-osd-step="revealed"] .tp-shake { animation: tp-shake 800ms linear 700ms both; }
.tc-active [data-osd-step="revealed"] .tp-boil1 { animation: tp-boil 1.5s ease-in-out 2300ms infinite alternate; }
.tc-active [data-osd-step="revealed"] .tp-boil2 { animation: tp-boil 1.9s ease-in-out 2700ms infinite alternate-reverse; }
.tc-active [data-osd-step="revealed"] .tp-boom { animation: tc-chip 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 1100ms both; }
.tc-active [data-osd-step="revealed"] .tp-panic { animation: tp-panic 0.5s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .tp-sweat1 { animation: tp-sweat 1.3s ease-in 800ms infinite; }
.tc-active [data-osd-step="revealed"] .tp-sweat2 { animation: tp-sweat 1.3s ease-in 1450ms infinite; }
.tc-active [data-osd-step="revealed"] .tp-q1 { animation: tp-q 2.8s ease-out 900ms infinite; }
.tc-active [data-osd-step="revealed"] .tp-q2 { animation: tp-q 2.8s ease-out 2100ms infinite; }
`;

/** A cartoon nuke drops, flashes, and blooms into a mushroom cloud over a night skyline. */
const BombScene = () => (
  <div
    className="tc-a tp-shake"
    style={{
      position: 'relative',
      width: 740,
      height: 430,
      overflow: 'hidden',
      borderRadius: 22,
      border: `2px solid ${C.line}`,
      boxShadow: '0 0 70px rgba(255,93,108,0.35)',
    }}
  >
    <svg width={740} height={430} viewBox="0 0 740 430" role="img" aria-label="A thermonuclear bomb falling and exploding into a mushroom cloud over a city skyline">
      <defs>
        <linearGradient id="tp-sky-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E0A1C" />
          <stop offset="1" stopColor="#3A1A1A" />
        </linearGradient>
        <radialGradient id="tp-glow-g" cx="370" cy="300" r="380" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF8A4C" stopOpacity="0.65" />
          <stop offset="1" stopColor="#FF5D6C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tp-ball-g">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor="#FFE9A0" />
          <stop offset="0.75" stopColor="#FF8A4C" />
          <stop offset="1" stopColor="#FF5D6C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tp-puff-g">
          <stop offset="0" stopColor="#FFE9A0" />
          <stop offset="0.55" stopColor="#FF9A4C" />
          <stop offset="1" stopColor="#B8342C" />
        </radialGradient>
        <linearGradient id="tp-stem-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF9A4C" />
          <stop offset="1" stopColor="#7A1F1F" />
        </linearGradient>
      </defs>
      <rect width={740} height={430} fill="url(#tp-sky-g)" />
      <rect className="tc-a tp-glow" width={740} height={430} fill="url(#tp-glow-g)" />
      {/* skyline */}
      <g fill="#080C18">
        <rect x={0} y={352} width={52} height={60} />
        <rect x={52} y={326} width={40} height={90} />
        <rect x={96} y={362} width={62} height={50} />
        <rect x={160} y={318} width={36} height={100} />
        <rect x={200} y={346} width={48} height={70} />
        <rect x={250} y={366} width={58} height={50} />
        <rect x={436} y={360} width={52} height={56} />
        <rect x={490} y={330} width={38} height={90} />
        <rect x={532} y={354} width={60} height={64} />
        <rect x={596} y={312} width={42} height={110} />
        <rect x={642} y={348} width={50} height={70} />
        <rect x={694} y={332} width={46} height={90} />
        <rect x={0} y={392} width={740} height={38} />
      </g>
      {/* cloud, back to front */}
      <ellipse className="tc-a tp-o tp-skirt" cx={370} cy={388} rx={170} ry={30} fill="rgba(255,140,60,0.55)" />
      <path className="tc-a tp-base tp-stem" d="M340 394 C 350 330, 346 260, 352 200 L 388 200 C 394 260, 390 330, 400 394 Z" fill="url(#tp-stem-g)" />
      <g className="tc-a tp-o tp-cap">
        <circle className="tc-a tp-o tp-boil1" cx={300} cy={190} r={52} fill="url(#tp-puff-g)" />
        <circle className="tc-a tp-o tp-boil2" cx={440} cy={190} r={52} fill="url(#tp-puff-g)" />
        <circle className="tc-a tp-o tp-boil2" cx={335} cy={130} r={44} fill="url(#tp-puff-g)" />
        <circle className="tc-a tp-o tp-boil1" cx={405} cy={128} r={46} fill="url(#tp-puff-g)" />
        <circle className="tc-a tp-o tp-boil1" cx={370} cy={150} r={64} fill="url(#tp-puff-g)" />
        <circle className="tc-a tp-o tp-boil2" cx={370} cy={205} r={56} fill="url(#tp-puff-g)" />
      </g>
      <circle className="tc-a tp-o tp-ball" cx={370} cy={385} r={92} fill="url(#tp-ball-g)" />
      <ellipse className="tc-a tp-o tp-ring" cx={370} cy={392} rx={60} ry={12} fill="none" stroke="#FFE9B0" strokeWidth={4} />
      {/* the bomb */}
      <g className="tc-a tp-o tp-fall">
        <polygon points="348,276 326,246 348,258" fill="#8B96B8" />
        <polygon points="392,276 414,246 392,258" fill="#8B96B8" />
        <path d="M348 292 C 348 250, 392 250, 392 292 C 392 330, 378 358, 370 372 C 362 358, 348 330, 348 292 Z" fill="#5A6482" />
        <path d="M356 282 C 356 262, 370 258, 376 262" stroke="#A9B7D9" strokeWidth={5} strokeLinecap="round" fill="none" />
        <rect x={349} y={300} width={42} height={12} fill={C.amber} />
        <circle cx={370} cy={306} r={5} fill="#03050C" />
      </g>
      <rect className="tc-a tp-flash" width={740} height={430} fill="#FFFFFF" />
    </svg>
    <div style={{ position: 'absolute', left: 26, top: 18 }}>
      <div className="tc-a tp-boom" style={{ display: 'inline-block' }}>
        <span
          style={{ display: 'inline-block', transform: 'rotate(-6deg)', fontSize: 68, fontWeight: 900, letterSpacing: '-0.04em', color: C.gold, textShadow: '0 0 28px rgba(255,138,76,0.9)' }}
        >
          KA-BOOM!
        </span>
      </div>
    </div>
  </div>
);

/** A professional in a suit, both hands on their head, sweating and panicking. */
const StressedPro = () => (
  <div className="tc-a tp-panic" style={{ position: 'relative', width: 220, height: 220 }}>
    <svg width={220} height={220} viewBox="0 0 220 220" role="img" aria-label="A professional in a suit with both hands on their head, panicking" style={{ overflow: 'visible' }}>
      {/* suit, shirt, tie */}
      <path d="M50 220 L58 152 C 72 134, 152 134, 166 152 L174 220 Z" fill="#2B3558" />
      <rect x={100} y={122} width={24} height={20} fill="#FFD9B3" />
      <polygon points="98,138 112,178 126,138" fill="#F3F6FC" />
      <polygon points="108,150 116,150 120,196 112,208 104,196" fill={C.red} />
      <path d="M98 138 L82 172 M126 138 L142 172" stroke="#1B2340" strokeWidth={4} strokeLinecap="round" fill="none" />
      {/* head */}
      <circle cx={112} cy={84} r={40} fill="#FFD9B3" />
      <path d="M72 80 C 70 40, 154 38, 152 80 C 140 62, 92 62, 72 80 Z" fill="#3A2A20" />
      <circle cx={96} cy={88} r={9} fill="#FFFFFF" />
      <circle cx={128} cy={88} r={9} fill="#FFFFFF" />
      <circle cx={97} cy={90} r={3.6} fill="#03050C" />
      <circle cx={127} cy={90} r={3.6} fill="#03050C" />
      <line x1={86} y1={76} x2={104} y2={68} stroke="#3A2A20" strokeWidth={4} strokeLinecap="round" />
      <line x1={120} y1={68} x2={138} y2={76} stroke="#3A2A20" strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={112} cy={114} rx={11} ry={9} fill="#5A1F2A" />
      <circle cx={84} cy={104} r={6} fill="rgba(255,93,108,0.35)" />
      <circle cx={140} cy={104} r={6} fill="rgba(255,93,108,0.35)" />
      {/* arms up, hands clutching the head */}
      <polyline points="62,158 24,122 62,88" stroke="#2B3558" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="162,158 200,122 162,88" stroke="#2B3558" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={66} cy={78} r={12} fill="#FFD9B3" />
      <circle cx={158} cy={78} r={12} fill="#FFD9B3" />
      {/* sweat */}
      <path className="tc-a tp-sweat1" d="M170 40 C 164 52, 164 58, 170 58 C 176 58, 176 52, 170 40 Z" fill="#7FD3FF" />
      <path className="tc-a tp-sweat2" d="M54 36 C 48 48, 48 54, 54 54 C 60 54, 60 48, 54 36 Z" fill="#7FD3FF" />
    </svg>
    <span aria-hidden="true" className="tc-a tp-q1" style={{ position: 'absolute', left: 90, top: -34, fontSize: 48, fontWeight: 900, color: C.gold, opacity: 0 }}>?</span>
    <span aria-hidden="true" className="tc-a tp-q2" style={{ position: 'absolute', left: 146, top: -22, fontSize: 38, fontWeight: 900, color: C.teal, opacity: 0 }}>?</span>
  </div>
);

const FloatClover = ({ x, y, size, d }: { x: number; y: number; size: number; d: number }) => {
  const active = useIsActivePage();
  return (
    <span
      aria-hidden="true"
      className="tc-a"
      style={{ position: 'absolute', left: x, top: y, fontSize: size, lineHeight: 1, animation: active ? `tc-float 4s ease-in-out ${d}ms infinite` : undefined }}
    >
      🍀
    </span>
  );
};

const Tragedy: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="18 · TRAGEDY"
      title={
        <span style={{ display: 'block', fontSize: 128, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          <span style={{ color: C.red }}>Tragedy</span> Strikes!{' '}
          <span className="tc-a" style={{ display: 'inline-block', animation: active ? 'tc-beat 1.4s ease-in-out infinite' : undefined }}>
            ⚡
          </span>
        </span>
      }
    >
      <style>{TRAGEDY_CSS}</style>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — Jobs picks Intel */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div
                className="tc-a tc-in"
                style={{ '--d': '0ms', position: 'absolute', left: 120, top: 290, width: 900, fontSize: 60, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}
              >
                <span style={{ color: C.gold }}>Steve Jobs</span> of Apple Computer decides to use <span style={{ color: '#4DA6FF' }}>Intel chips!</span>
              </div>
              <div className="tc-a tc-in" style={{ '--d': '200ms', position: 'absolute', left: 1130, top: 270 } as CSSProperties}>
                <div style={{ padding: 10, background: '#FFFFFF', borderRadius: 14, transform: 'rotate(2deg)', boxShadow: '0 0 60px rgba(255,197,107,0.3)' }}>
                  <img src={steveJobs} alt="Steve Jobs on stage pitching an Apple product" style={{ display: 'block', width: 631, height: 420, objectFit: 'cover', borderRadius: 6 }} />
                </div>
              </div>
            </div>
          </Step>
          {/* click 2 — boom, panic */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 120, top: 570 }}>
                <BombScene />
              </div>
              <div
                className="tc-a tc-in"
                style={{ '--d': '1800ms', position: 'absolute', left: 960, top: 850, width: 600, textAlign: 'right', fontSize: 62, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.04em' } as CSSProperties}
              >
                What to do <span style={{ color: C.amber }}>next?</span>
              </div>
              <div className="tc-a tc-in" style={{ '--d': '1500ms', position: 'absolute', left: 1580, top: 780 } as CSSProperties}>
                <StressedPro />
              </div>
            </div>
          </Step>
          {/* click 3 — but! lucky */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(3,5,12,0.95)' }}>
              <div style={{ position: 'absolute', top: 285, left: 120, width: 1680, textAlign: 'center' }}>
                <div className="tc-a tc-in" style={{ '--d': '0ms', fontSize: 130, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.05em' } as CSSProperties}>
                  But!
                </div>
                <div className="tc-a tc-in" style={{ '--d': '500ms', marginTop: 10, fontSize: 54, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em', color: C.muted } as CSSProperties}>
                  Remember, I told you I was
                </div>
                <div
                  className="tc-a tc-lucky"
                  style={{ marginTop: 6, fontSize: 200, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.05em', color: C.green, textShadow: '0 0 60px rgba(91,228,155,0.55)' }}
                >
                  Lucky!
                </div>
              </div>
              <FloatClover x={330} y={560} size={96} d={0} />
              <FloatClover x={1480} y={470} size={80} d={700} />
              <FloatClover x={1560} y={640} size={110} d={1400} />
            </div>
          </Step>
          {/* click 4 — and prepared */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', top: 760, left: 120, width: 1680, textAlign: 'center' }}>
                <div className="tc-a tc-in" style={{ '--d': '0ms', fontSize: 150, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.05em' } as CSSProperties}>
                  And <span className="tc-a tc-passion">Prepared!</span>
                </div>
              </div>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Tragedy.transition = settle;

/* ───────────────────────── 19 opportunity ───────────────────────── */

const OPP_CSS = `
@keyframes ib-sway { 0%, 100% { transform: rotate(-2.5deg) translateY(0); } 50% { transform: rotate(2.5deg) translateY(-8px); } }
@keyframes ib-tie { 0%, 100% { transform: skewX(0deg); } 50% { transform: skewX(-5deg); } }
@keyframes ib-glint { 0%, 70%, 100% { opacity: 0; transform: translateX(-30px); } 80% { opacity: 0.9; } 90% { opacity: 0; transform: translateX(30px); } }
.tc-active [data-osd-step="revealed"] .ib-sway { animation: ib-sway 3.6s ease-in-out 1200ms infinite; }
.tc-active [data-osd-step="revealed"] .ib-tie { transform-box: fill-box; transform-origin: 50% 0%; animation: ib-tie 2.4s ease-in-out infinite; }
.tc-active [data-osd-step="revealed"] .ib-glint { animation: ib-glint 3.2s ease-in-out 1400ms infinite; }
`;

/** A typical IBMer, circa 1985: navy-blue suit, white shirt, red tie, big glasses, moustache. */
const IbmerOf80s = () => (
  <svg width={360} height={460} viewBox="0 0 360 460" role="img" aria-label="Illustration of a typical IBM employee from the 1980s in a blue suit, white shirt and red tie" style={{ display: 'block' }}>
    <rect width={360} height={460} fill="#DCE6F5" />
    {/* suit */}
    <path d="M30 460 L50 340 C 80 306, 280 306, 310 340 L330 460 Z" fill="#1F4FA8" />
    <path d="M148 312 L96 410 L150 384 Z" fill="#173C82" />
    <path d="M212 312 L264 410 L210 384 Z" fill="#173C82" />
    {/* shirt, tie */}
    <polygon points="148,312 180,396 212,312" fill="#F7F9FD" />
    <g className="ib-tie">
      <polygon points="170,330 190,330 196,424 180,446 164,424" fill="#D0202F" />
      <polygon points="168,322 192,322 188,340 172,340" fill="#A8141F" />
    </g>
    {/* pocket square */}
    <polygon points="86,372 112,368 114,382 88,386" fill="#F7F9FD" />
    {/* neck, head */}
    <rect x={160} y={262} width={40} height={54} fill="#E8B98C" />
    <ellipse cx={116} cy={196} rx={10} ry={20} fill="#EDC298" />
    <ellipse cx={244} cy={196} rx={10} ry={20} fill="#EDC298" />
    <ellipse cx={180} cy={190} rx={62} ry={74} fill="#F2C9A0" />
    {/* neat side-parted hair */}
    <path d="M116 188 C 106 100, 254 96, 244 188 C 236 150, 214 138, 190 136 C 160 134, 128 152, 116 188 Z" fill="#3A2A20" />
    {/* big 80s glasses */}
    <rect x={126} y={176} width={50} height={40} rx={9} fill="rgba(170,215,255,0.28)" stroke="#2B2B33" strokeWidth={5} />
    <rect x={184} y={176} width={50} height={40} rx={9} fill="rgba(170,215,255,0.28)" stroke="#2B2B33" strokeWidth={5} />
    <line x1={176} y1={188} x2={184} y2={188} stroke="#2B2B33" strokeWidth={5} />
    <circle cx={151} cy={198} r={5} fill="#1B1B22" />
    <circle cx={209} cy={198} r={5} fill="#1B1B22" />
    <rect className="ib-glint" x={132} y={180} width={10} height={32} rx={4} fill="#FFFFFF" />
    {/* nose, moustache, smile */}
    <path d="M180 204 C 176 222, 176 226, 184 228" stroke="#C99A72" strokeWidth={4} strokeLinecap="round" fill="none" />
    <path d="M142 240 C 160 228, 200 228, 218 240 C 200 248, 190 244, 180 246 C 170 244, 160 248, 142 240 Z" fill="#3A2A20" />
    <path d="M156 258 C 170 270, 192 270, 206 258" stroke="#8C4A3A" strokeWidth={5} strokeLinecap="round" fill="none" />
  </svg>
);

const IbmerPolaroid = () => (
  <div style={{ padding: '14px 14px 18px', background: '#FFFFFF', borderRadius: 14, transform: 'rotate(3deg)', boxShadow: '0 0 60px rgba(77,166,255,0.35)' }}>
    <div className="tc-a ib-sway">
      <IbmerOf80s />
    </div>
    <div style={{ marginTop: 14, textAlign: 'center', fontFamily: mono, fontSize: 26, letterSpacing: '0.06em', color: '#1F4FA8' }}>
      IBM · circa 1985
    </div>
  </div>
);

const AgainText = () => (
  <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
    {Array.from('AGAIN!').map((ch, i) => (
      <span key={i} className="tc-a tc-int-g" style={{ '--i': i } as CSSProperties}>
        <span className="tc-a tc-int-w" style={{ '--i': i } as CSSProperties}>
          {ch}
        </span>
      </span>
    ))}
  </span>
);

const Opportunity: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="19 · OPPORTUNITY"
      title={
        <span style={{ display: 'block', fontSize: 128, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          <span style={{ color: C.green }}>Opportunity!</span>
        </span>
      }
    >
      <style>{OPP_CSS}</style>
      {/* always-on subtitle */}
      <div
        className="tc-a"
        style={{ position: 'absolute', left: 120, top: 305, fontSize: 60, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.03em', color: C.muted, ...rise(active, 450) }}
      >
        <span style={{ color: '#4DA6FF' }}>IBM</span> Back to the Field Initiative
      </div>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — back to school AGAIN */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 120, top: 450, width: 1180 }}>
                <div className="tc-a tc-in" style={{ '--d': '0ms', fontSize: 76, lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}>
                  I was going back to school
                </div>
                <div style={{ marginTop: 6, fontSize: 190, lineHeight: 1.05, fontWeight: 900, letterSpacing: '-0.05em' }}>
                  <AgainText />
                </div>
              </div>
            </div>
          </Step>
          {/* click 2 — IBM Global Sales School + the typical IBMer */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 800, width: 1180, fontSize: 80, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.04em' } as CSSProperties}>
                <span style={{ color: '#4DA6FF' }}>IBM</span> <span style={{ color: C.gold }}>Global Sales School</span>
              </div>
              <div className="tc-a tc-in" style={{ '--d': '300ms', position: 'absolute', left: 1390, top: 340 } as CSSProperties}>
                <IbmerPolaroid />
              </div>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Opportunity.transition = settle;

/* ───────────────────────── 20 fourth point ───────────────────────── */

const FOURTH_CSS = `
@keyframes fp-strike { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes fp-shake { 0%, 100% { transform: translateX(0) rotate(0deg); } 20% { transform: translateX(-10px) rotate(-1deg); } 40% { transform: translateX(9px) rotate(1deg); } 60% { transform: translateX(-6px); } 80% { transform: translateX(4px); } }
@keyframes fp-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes fp-nod { 0%, 100% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(3deg) translateY(4px); } }
@keyframes fp-bubble { 0% { opacity: 0; transform: scale(0.3) translateY(30px); } 100% { opacity: 1; transform: none; } }
.tc-active [data-osd-step="revealed"] .fp-strike { transform-origin: left center; animation: fp-strike 600ms cubic-bezier(0, 0, 0.2, 1) 500ms both; }
.tc-active [data-osd-step="revealed"] .fp-shake { animation: fp-shake 700ms ease-in-out 100ms both; }
.tc-active [data-osd-step="revealed"] .fp-check-circle { transform-box: fill-box; transform-origin: center; animation: tc-chip 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms both; }
.tc-active [data-osd-step="revealed"] .fp-check-path { animation: fp-draw 700ms cubic-bezier(0.4, 0, 0.2, 1) 500ms both; }
.tc-active [data-osd-step="revealed"] .fp-nod { transform-origin: 50% 100%; animation: fp-nod 1.6s ease-in-out 1200ms infinite; }
.tc-active [data-osd-step="revealed"] .fp-bubble { transform-origin: 20% 100%; animation: fp-bubble 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 700ms both; }
`;

const EQ: CSSProperties = { fontSize: 72, lineHeight: 1.2, fontWeight: 900, letterSpacing: '-0.04em', whiteSpace: 'nowrap' };

/** A satisfied professional: hand on chin, nodding along. */
const SatisfiedPro = () => (
  <div className="tc-a fp-nod" style={{ width: 220, height: 220 }}>
    <svg width={220} height={220} viewBox="0 0 220 220" role="img" aria-label="A professional in a suit, hand on chin, nodding in agreement" style={{ overflow: 'visible' }}>
      <path d="M50 220 L58 152 C 72 134, 152 134, 166 152 L174 220 Z" fill="#2B3558" />
      <rect x={100} y={122} width={24} height={20} fill="#FFD9B3" />
      <polygon points="98,138 112,178 126,138" fill="#F3F6FC" />
      <polygon points="108,150 116,150 120,196 112,208 104,196" fill={C.green} />
      <path d="M98 138 L82 172 M126 138 L142 172" stroke="#1B2340" strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx={112} cy={84} r={40} fill="#FFD9B3" />
      <path d="M72 80 C 70 40, 154 38, 152 80 C 140 62, 92 62, 72 80 Z" fill="#3A2A20" />
      <circle cx={96} cy={88} r={8} fill="#FFFFFF" />
      <circle cx={128} cy={88} r={8} fill="#FFFFFF" />
      <circle cx={99} cy={86} r={3.6} fill="#03050C" />
      <circle cx={131} cy={86} r={3.6} fill="#03050C" />
      <line x1={86} y1={74} x2={106} y2={72} stroke="#3A2A20" strokeWidth={4} strokeLinecap="round" />
      <line x1={120} y1={70} x2={138} y2={64} stroke="#3A2A20" strokeWidth={4} strokeLinecap="round" />
      <path d="M96 106 C 106 116, 122 116, 130 104" stroke="#8C4A3A" strokeWidth={4.5} strokeLinecap="round" fill="none" />
      {/* arm folded up, hand on chin */}
      <polyline points="164,160 180,132 142,128" stroke="#2B3558" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={136} cy={124} r={12} fill="#FFD9B3" />
      <polyline points="60,160 50,205" stroke="#2B3558" strokeWidth={22} strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

const GreenCheck = () => (
  <svg width={150} height={150} viewBox="0 0 150 150" role="img" aria-label="Animated green check mark" style={{ overflow: 'visible' }}>
    <circle className="tc-a fp-check-circle" cx={75} cy={75} r={68} fill="rgba(91,228,155,0.16)" stroke={C.green} strokeWidth={8} />
    <path className="tc-a fp-check-path" pathLength={1} strokeDasharray={1} d="M42 78 L66 102 L110 52" fill="none" stroke={C.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FourthPoint: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="20 · THE FOURTH POINT"
      title={
        <span style={{ display: 'block', fontSize: 112, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          Here’s a <span style={{ color: 'var(--osd-accent)' }}>fourth point</span>{' '}
          <span className="tc-a" style={{ display: 'inline-block', color: C.gold, animation: active ? 'tc-nudge 1.2s ease-in-out infinite' : undefined }}>
            →
          </span>
        </span>
      }
    >
      <style>{FOURTH_CSS}</style>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — Seneca */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 270, width: 1680, fontSize: 54, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}>
                “<span style={{ color: C.green }}>Luck</span> is what happens when <span style={{ color: C.teal }}>preparation</span> meets <span style={{ color: C.gold }}>opportunity</span>”
              </div>
              <div className="tc-a tc-in" style={{ '--d': '350ms', position: 'absolute', left: 120, top: 408, fontSize: 34, lineHeight: 1.2, fontWeight: 600, color: C.muted } as CSSProperties}>
                — Seneca, Roman philosopher
              </div>
            </div>
          </Step>
          {/* click 2 — a little maths */}
          <Step duration={200}>
            <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 500, fontSize: 52, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em', color: C.muted } as CSSProperties}>
              How about a little bit of <span style={{ color: 'var(--osd-accent)' }}>maths</span>:
            </div>
          </Step>
          {/* click 3 — Luck = Preparation + Opportunity */}
          <Step duration={200}>
            <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 590, ...EQ } as CSSProperties}>
              <span style={{ color: C.green }}>Luck</span> <span style={{ color: C.dim }}>=</span> <span style={{ color: C.teal }}>Preparation</span> <span style={{ color: C.dim }}>+</span> <span style={{ color: C.gold }}>Opportunity</span>
            </div>
          </Step>
          {/* click 4 — no, no, that can't be right */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div aria-hidden="true" style={{ position: 'absolute', left: 120, top: 590, visibility: 'hidden', ...EQ }}>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Luck = Preparation + Opportunity
                  <span
                    className="tc-a fp-strike"
                    style={{ position: 'absolute', left: -8, right: -8, top: '50%', height: 8, marginTop: -4, borderRadius: 4, background: C.red, boxShadow: '0 0 24px rgba(255,93,108,0.7)', visibility: 'visible' }}
                  />
                </span>
              </div>
              <div className="tc-a tc-in fp-shake" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 695, fontSize: 52, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em', color: C.red } as CSSProperties}>
                No, no, that can’t be right…
              </div>
            </div>
          </Step>
          {/* click 5 — Opportunity = Luck + Preparation */}
          <Step duration={200}>
            <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 785, ...EQ } as CSSProperties}>
              <span style={{ color: C.gold }}>Opportunity</span> <span style={{ color: C.dim }}>=</span> <span style={{ color: C.green }}>Luck</span> <span style={{ color: C.dim }}>+</span> <span style={{ color: C.teal }}>Preparation</span>
            </div>
          </Step>
          {/* click 6 — yeah, that checks out */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div className="tc-a fp-bubble" style={{ position: 'absolute', left: 1440, top: 520, width: 400, boxSizing: 'border-box', padding: '24px 30px', borderRadius: 44, background: '#F3F6FC', color: '#03050C', fontSize: 40, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', boxShadow: '0 0 50px rgba(243,246,252,0.25)' }}>
                “Yeah, that checks out.”
              </div>
              <div aria-hidden="true" className="tc-a fp-bubble" style={{ position: 'absolute', left: 1566, top: 692, width: 34, height: 34, borderRadius: '50%', background: '#F3F6FC', animationDelay: '900ms' }} />
              <div aria-hidden="true" className="tc-a fp-bubble" style={{ position: 'absolute', left: 1548, top: 738, width: 20, height: 20, borderRadius: '50%', background: '#F3F6FC', animationDelay: '1000ms' }} />
              <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 1480, top: 770 } as CSSProperties}>
                <SatisfiedPro />
              </div>
              <div style={{ position: 'absolute', left: 1700, top: 800 }}>
                <GreenCheck />
              </div>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
FourthPoint.transition = settle;

/* ───────────────────────── 21 IBM sales ───────────────────────── */

const SALES_ROUTE = 'M1371 173 C 1250 90, 1090 330, 900 240 S 520 120, 292 312';
const SALES_BLUE = '#4DA6FF';

const SALES_CSS = `
@keyframes sl-arm { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
.sl-walker { position: absolute; left: 0; top: 0; width: 120px; height: 150px; offset-path: path('${SALES_ROUTE}'); offset-rotate: 0deg; offset-anchor: 50% 100%; }
.tc-active [data-osd-step="revealed"] .sl-walker { animation: tc-walk 12s linear 600ms infinite both; }
.tc-active [data-osd-step="revealed"] .sl-b1 { animation: tc-say1 12s linear 600ms infinite; }
.tc-active [data-osd-step="revealed"] .sl-b2 { animation: tc-say2 12s linear 600ms infinite; }
.tc-active [data-osd-step="revealed"] .sl-b3 { animation: tc-say3 12s linear 600ms infinite; }
`;

const SalesText = () => {
  const active = useIsActivePage();
  return (
    <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      {Array.from('IBM SALES').map((ch, i) =>
        ch === ' ' ? (
          <span key={i} style={{ display: 'inline-block', width: '0.3em' }} />
        ) : (
          <span
            key={i}
            className="tc-a"
            style={{
              display: 'inline-block',
              color: i < 3 ? SALES_BLUE : C.gold,
              textShadow: i < 3 ? '0 0 70px rgba(77,166,255,0.55)' : '0 0 70px rgba(255,197,107,0.5)',
              animation: active ? `tc-drop 750ms ${SPRING} ${200 + i * 70}ms both` : undefined,
            }}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
};

const SalesBubble = ({ cls, children }: { cls: string; children: ReactNode }) => (
  <div
    className={`tc-a ${cls}`}
    style={{
      position: 'absolute',
      right: 110,
      top: -40,
      padding: '8px 16px',
      borderRadius: 16,
      background: '#F3F6FC',
      color: '#03050C',
      fontFamily: mono,
      fontSize: 20,
      fontWeight: 700,
      whiteSpace: 'nowrap',
      opacity: 0,
      transformOrigin: 'right bottom',
    }}
  >
    {children}
  </div>
);

/** A professional in a blue suit with a briefcase, striding west (flipped to face left). */
const SalesWalker = () => {
  const active = useIsActivePage();
  const limb = (reverse: boolean, origin: string, anim = 'tc-swing'): CSSProperties => ({
    transformOrigin: origin,
    transformBox: 'view-box',
    animation: active ? `${anim} 0.7s ease-in-out infinite ${reverse ? 'alternate-reverse' : 'alternate'}` : undefined,
  });
  return (
    <div className="tc-a sl-walker">
      <div
        className="tc-a"
        style={{ width: 120, height: 150, transformOrigin: '50% 100%', animation: active ? 'tc-bob 0.36s ease-in-out infinite alternate' : undefined }}
      >
        <svg width={120} height={150} viewBox="0 0 120 150" role="img" aria-label="A professional in a blue suit carrying a briefcase" style={{ transform: 'scaleX(-1)' }}>
          {/* back arm + back leg */}
          <g className="tc-a" style={limb(true, '62px 62px', 'sl-arm')}>
            <line x1={62} y1={62} x2={62} y2={94} stroke="#173C82" strokeWidth={8} strokeLinecap="round" />
            <circle cx={62} cy={96} r={5} fill="#F2C9A0" />
          </g>
          <g className="tc-a" style={limb(true, '60px 100px')}>
            <line x1={60} y1={100} x2={60} y2={132} stroke="#173C82" strokeWidth={9} strokeLinecap="round" />
            <ellipse cx={68} cy={137} rx={12} ry={6} fill="#1B1B22" />
          </g>
          {/* torso: suit, shirt, tie */}
          <rect x={49} y={52} width={26} height={54} rx={9} fill="#1F4FA8" />
          <polygon points="56,52 68,52 62,68" fill="#F7F9FD" />
          <polygon points="60,58 64,58 65,86 62,92 59,86" fill="#D0202F" />
          {/* front leg */}
          <g className="tc-a" style={limb(false, '60px 100px')}>
            <line x1={60} y1={100} x2={60} y2={132} stroke="#1F4FA8" strokeWidth={9} strokeLinecap="round" />
            <ellipse cx={68} cy={137} rx={12} ry={6} fill="#1B1B22" />
          </g>
          {/* head: side-parted hair, glasses */}
          <circle cx={64} cy={34} r={18} fill="#F2C9A0" />
          <path d="M45 32 C 44 12, 84 10, 83 32 C 78 22, 62 20, 54 26 Z" fill="#3A2A20" />
          <rect x={64} y={29} width={13} height={10} rx={3} fill="none" stroke="#2B2B33" strokeWidth={2.5} />
          <circle cx={71} cy={34} r={2.4} fill="#03050C" />
          <path d="M68 45 Q74 50 80 44" fill="none" stroke="#8C4A3A" strokeWidth={2.5} strokeLinecap="round" />
          {/* front arm + briefcase */}
          <g className="tc-a" style={limb(false, '62px 62px', 'sl-arm')}>
            <line x1={62} y1={62} x2={62} y2={94} stroke="#1F4FA8" strokeWidth={8} strokeLinecap="round" />
            <circle cx={62} cy={96} r={5} fill="#F2C9A0" />
            <path d="M54 100 L54 94 L70 94 L70 100" fill="none" stroke="#5E3A1A" strokeWidth={3} strokeLinejoin="round" />
            <rect x={44} y={100} width={36} height={24} rx={4} fill="#8B5A2B" stroke="#5E3A1A" strokeWidth={2} />
            <rect x={58} y={108} width={8} height={5} rx={1} fill={C.gold} />
          </g>
        </svg>
      </div>
      <SalesBubble cls="sl-b1">Ohio, here I come!</SalesBubble>
      <SalesBubble cls="sl-b2">…is that a quota?</SalesBubble>
      <SalesBubble cls="sl-b3">SALES!</SalesBubble>
    </div>
  );
};

const SalesJourney = () => {
  const active = useIsActivePage();
  const ring = (delay: string): CSSProperties => ({
    transformBox: 'fill-box',
    transformOrigin: 'center',
    animation: active ? `tc-ring 1.8s ease-out ${delay} infinite` : undefined,
  });
  return (
    <div style={{ position: 'absolute', top: 450, left: 120, width: 1680, height: 500 }}>
      <style>{SALES_CSS}</style>
      <svg width={1680} height={500} viewBox="0 0 1680 500" role="img" aria-label="Stylized map: Burlington, Vermont to Columbus, Ohio">
        {/* Ohio */}
        <g transform="translate(150 150)">
          <polygon
            points="15,35 95,28 150,45 215,28 292,0 292,95 262,140 240,195 205,250 175,262 130,268 80,285 40,280 22,255 18,150"
            fill="rgba(79,209,197,0.10)"
            stroke={C.teal}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </g>
        <SvgLabel x={300} y={469} fill={C.teal}>
          OHIO
        </SvgLabel>
        {/* Vermont */}
        <g transform="translate(1340 90)">
          <polygon
            points="17,6 215,6 201,44 158,106 156,167 129,217 120,268 112,336 25,334 27,210 8,210 16,152 13,94"
            fill="rgba(91,228,155,0.10)"
            stroke={C.green}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </g>
        <SvgLabel x={1455} y={458} fill={C.green}>
          VERMONT
        </SvgLabel>
        {/* the long way west */}
        <path
          d={SALES_ROUTE}
          fill="none"
          stroke={C.gold}
          strokeOpacity={0.85}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="10 14"
          className="tc-a"
          style={{ animation: active ? 'tc-flow 1.1s linear infinite reverse' : undefined }}
        />
        <SvgLabel x={820} y={350} fill={C.dim}>
          ~700 miles, no big deal
        </SvgLabel>
        {/* Burlington */}
        <circle className="tc-a" cx={1371} cy={173} r={9} fill="none" stroke={C.green} strokeWidth={3} style={ring('0s')} />
        <circle cx={1371} cy={173} r={9} fill={C.green} stroke="#03050C" strokeWidth={3} />
        <SvgLabel x={1352} y={222} anchor="end" fill="#F3F6FC">
          BURLINGTON, VT
        </SvgLabel>
        <SvgLabel x={1352} y={246} anchor="end" size={18} fill={C.dim}>
          (IBM)
        </SvgLabel>
        {/* Columbus */}
        <circle className="tc-a" cx={292} cy={312} r={9} fill="none" stroke={SALES_BLUE} strokeWidth={3} style={ring('0.9s')} />
        <circle cx={292} cy={312} r={9} fill={SALES_BLUE} stroke="#F3F6FC" strokeWidth={3} />
        <line x1={292} y1={303} x2={292} y2={258} stroke="#F3F6FC" strokeWidth={3} strokeLinecap="round" />
        <path d="M292 258 L326 269 L292 280 Z" fill={SALES_BLUE} />
        <SvgLabel x={314} y={340} anchor="start" fill="#F3F6FC">
          COLUMBUS, OH
        </SvgLabel>
        <SvgLabel x={314} y={364} anchor="start" size={18} fill={C.dim}>
          (IBM Sales)
        </SvgLabel>
      </svg>
      <SalesWalker />
    </div>
  );
};

const IbmSales: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame eyebrow="21 · IBM SALES">
      <div
        style={{ position: 'absolute', left: 120, top: 150, fontSize: 250, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.045em' }}
      >
        <SalesText />
      </div>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — the move: Burlington, VT → Columbus, OH */}
          <Step duration={200}>
            <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', inset: 0 } as CSSProperties}>
              <SalesJourney />
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
IbmSales.transition = settle;

/* ───────────────────────── 22 selling what I designed ───────────────────────── */

const ServerShot = ({ src, alt, h, w, d, label }: { src: string; alt: string; h: number; w: number; d: number; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
    <PhotoCard src={src} alt={alt} h={h} w={w} d={d} glow="rgba(77,166,255,0.35)" />
    <div className="tc-a tc-in" style={{ '--d': `${d + 250}ms`, fontFamily: mono, fontSize: 22, letterSpacing: '0.06em', color: C.muted } as CSSProperties}>
      {label}
    </div>
  </div>
);

const OsLogo = ({ src, alt, d, label }: { src: string; alt: string; d: number; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
    <PhotoCard src={src} alt={alt} h={190} w={190} d={d} glow="rgba(255,197,107,0.35)" />
    <div className="tc-a tc-in" style={{ '--d': `${d + 250}ms`, fontFamily: mono, fontSize: 26, letterSpacing: '0.06em', color: C.gold } as CSSProperties}>
      {label}
    </div>
  </div>
);

const SellingDesigned: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="22 · SELLING WHAT I DESIGNED"
      title={
        <span style={{ display: 'block', fontSize: 96, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          I was <span style={{ color: C.gold }}>selling</span> all the stuff
          <br />I just finished <span className="tc-a tc-passion">designing!</span>
        </span>
      }
    >
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — POWER5 servers */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 120, top: 440, display: 'flex', gap: 40 }}>
                <ServerShot src={power5I5570} alt="IBM eServer i5 570 POWER5 servers mounted in a rack" h={380} w={508} d={0} label="POWER5 · eServer i5 570" />
                <ServerShot src={power5I5515} alt="IBM System i5 515 POWER5 tower server with a green-screen terminal" h={380} w={502} d={200} label="POWER5 · System i5 515" />
              </div>
            </div>
          </Step>
          {/* click 2 — AIX and IBM i logos */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 1330, top: 520, display: 'flex', gap: 40 }}>
                <OsLogo src={aixLogo} alt="IBM AIX logo" d={0} label="AIX" />
                <OsLogo src={ibmILogo} alt="IBM i logo" d={200} label="IBM i" />
              </div>
              <Credit>
                Wikimedia Commons · i5 570: CarstenSchulz (CC BY-SA 3.0) · i5 515: C. &amp; H. Graf (CC BY 2.0) · AIX, IBM i logos (public domain)
              </Credit>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
SellingDesigned.transition = settle;

/* ───────────────────────── 23 entrepreneurship ───────────────────────── */

const ENT_CSS = `
@keyframes en-bar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes en-point { 0%, 100% { transform: rotate(-7deg); } 50% { transform: rotate(9deg); } }
@keyframes en-bulb { 0%, 100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.18); } }
@keyframes en-nod { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
@keyframes en-fly { 0% { opacity: 0; transform: translate(0, 40px) scale(0.4) rotate(-10deg); } 25% { opacity: 1; } 75% { opacity: 1; } 100% { opacity: 0; transform: translate(70px, -80px) scale(1.05) rotate(14deg); } }
@keyframes en-badge { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg) scale(1.04); } }
@keyframes en-acorn { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-14px) rotate(6deg); } }
@keyframes en-stamp { 0% { opacity: 0; transform: scale(3.4) rotate(-26deg); } 60% { opacity: 1; transform: scale(0.9) rotate(-8deg); } 80% { transform: scale(1.06) rotate(-8deg); } 100% { opacity: 1; transform: scale(1) rotate(-8deg); } }
.en-o { transform-box: fill-box; transform-origin: 50% 50%; }
.en-base { transform-box: fill-box; transform-origin: 50% 100%; }
.en-point { transform-box: view-box; transform-origin: 100px 160px; }
.tc-active [data-osd-step="revealed"] .en-bar { animation: en-bar 900ms cubic-bezier(0.2, 0.7, 0.3, 1) both; }
.tc-active [data-osd-step="revealed"] .en-point { animation: en-point 1.8s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .en-bulb { animation: en-bulb 1.6s ease-in-out 1200ms infinite both; }
.tc-active [data-osd-step="revealed"] .en-nod { animation: en-nod 1.4s ease-in-out 900ms infinite; }
.tc-active [data-osd-step="revealed"] .en-fly { animation: en-fly 2.6s ease-out infinite; }
.tc-active [data-osd-step="revealed"] .en-badge { animation: en-badge 3s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .en-acorn { animation: en-acorn 2.2s ease-in-out 600ms infinite; }
.tc-active [data-osd-step="revealed"] .en-stamp { animation: en-stamp 700ms cubic-bezier(0.2, 0.9, 0.3, 1) 900ms both; }
`;

/** A consultant at a flipchart, helping a client see the answer (bars rise, lightbulb switches on). */
const ConsultantScene = () => (
  <svg width={420} height={300} viewBox="0 0 400 300" role="img" aria-label="A consultant presenting a rising bar chart to a client whose lightbulb lights up" style={{ overflow: 'visible' }}>
    <line x1={10} y1={262} x2={390} y2={262} stroke={C.dim} strokeWidth={4} strokeLinecap="round" />
    {/* flipchart */}
    <line x1={225} y1={160} x2={200} y2={262} stroke={C.dim} strokeWidth={6} strokeLinecap="round" />
    <line x1={225} y1={160} x2={250} y2={262} stroke={C.dim} strokeWidth={6} strokeLinecap="round" />
    <rect x={160} y={30} width={130} height={130} rx={8} fill="#F3F6FC" />
    <g>
      <rect className="tc-a en-o en-base en-bar" x={178} y={110} width={24} height={30} rx={3} fill={C.teal} style={{ animationDelay: '300ms' }} />
      <rect className="tc-a en-o en-base en-bar" x={213} y={85} width={24} height={55} rx={3} fill={C.gold} style={{ animationDelay: '600ms' }} />
      <rect className="tc-a en-o en-base en-bar" x={248} y={55} width={24} height={85} rx={3} fill={C.green} style={{ animationDelay: '900ms' }} />
    </g>
    <line x1={172} y1={142} x2={278} y2={142} stroke="#9AA5C0" strokeWidth={3} strokeLinecap="round" />
    {/* consultant */}
    <rect x={56} y={146} width={48} height={116} rx={14} fill="#2B3558" />
    <polygon points="70,146 90,146 80,168" fill="#F3F6FC" />
    <polygon points="77,152 83,152 85,190 80,198 75,190" fill={C.green} />
    <circle cx={80} cy={118} r={24} fill="#FFD9B3" />
    <path d="M56 114 C 54 88, 108 86, 104 114 C 96 102, 68 100, 56 114 Z" fill="#3A2A20" />
    <circle cx={89} cy={120} r={3.4} fill="#03050C" />
    <path d="M82 131 Q90 137 98 130" fill="none" stroke="#8C4A3A" strokeWidth={3} strokeLinecap="round" />
    <g className="tc-a en-point">
      <line x1={100} y1={160} x2={150} y2={134} stroke="#2B3558" strokeWidth={14} strokeLinecap="round" />
      <circle cx={153} cy={132} r={8} fill="#FFD9B3" />
    </g>
    {/* client */}
    <g className="tc-a en-nod">
      <rect x={316} y={170} width={50} height={92} rx={14} fill="#7C5CD8" />
      <circle cx={341} cy={140} r={24} fill="#FFD9B3" />
      <path d="M317 136 C 318 112, 366 112, 365 136 C 356 124, 328 124, 317 136 Z" fill="#6B3E26" />
      <circle cx={333} cy={142} r={3.4} fill="#03050C" />
      <circle cx={350} cy={142} r={3.4} fill="#03050C" />
      <path d="M331 152 Q341 160 352 152" fill="none" stroke="#8C4A3A" strokeWidth={3} strokeLinecap="round" />
    </g>
    {/* lightbulb: the client gets it */}
    <g className="tc-a en-o en-bulb">
      <circle cx={341} cy={70} r={20} fill={C.gold} />
      <rect x={333} y={88} width={16} height={9} rx={2} fill="#9AA5C0" />
      <g stroke={C.gold} strokeWidth={4} strokeLinecap="round">
        <line x1={341} y1={34} x2={341} y2={24} />
        <line x1={310} y1={52} x2={302} y2={46} />
        <line x1={372} y1={52} x2={380} y2={46} />
        <line x1={304} y1={74} x2={294} y2={74} />
        <line x1={378} y1={74} x2={388} y2={74} />
      </g>
    </g>
  </svg>
);

/** An @ email badge with a letter flying out of it. */
const EmailBadge = () => (
  <svg width={260} height={260} viewBox="0 0 260 260" role="img" aria-label="An at-sign email logo with a letter flying out" style={{ overflow: 'visible' }}>
    <g className="tc-a en-o en-badge">
      <rect x={20} y={30} width={200} height={200} rx={44} fill="#4DA6FF" />
      <text x={120} y={178} textAnchor="middle" fontSize={150} fontWeight={900} fill="#FFFFFF" style={{ fontFamily: mono }}>
        @
      </text>
    </g>
    <g className="tc-a en-o en-fly">
      <rect x={150} y={60} width={78} height={54} rx={7} fill="#F3F6FC" stroke="#1F4FA8" strokeWidth={4} />
      <polyline points="152,64 189,92 226,64" fill="none" stroke="#1F4FA8" strokeWidth={4} strokeLinejoin="round" />
    </g>
  </svg>
);

const AcornIcon = () => (
  <svg width={110} height={122} viewBox="0 0 90 100" role="img" aria-label="An acorn" style={{ overflow: 'visible' }}>
    <g className="tc-a en-o en-acorn">
      <rect x={42} y={0} width={7} height={14} rx={3} fill="#6B3E1A" />
      <path d="M14 42 C 14 82, 40 96, 45 98 C 50 96, 76 82, 76 42 Z" fill="#C98B4A" />
      <path d="M8 44 C 6 12, 84 12, 82 44 Z" fill="#8B5A2B" />
      <path d="M24 28 C 34 20, 48 20, 58 26" fill="none" stroke="#B07A3E" strokeWidth={4} strokeLinecap="round" />
    </g>
  </svg>
);

const SoldText = () => (
  <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
    {Array.from('Sold the company!').map((ch, i) =>
      ch === ' ' ? (
        <span key={i} style={{ display: 'inline-block', width: '0.3em' }} />
      ) : (
        <span key={i} className="tc-a tc-int-g" style={{ '--i': i } as CSSProperties}>
          <span className="tc-a tc-int-w" style={{ '--i': i } as CSSProperties}>
            {ch}
          </span>
        </span>
      ),
    )}
  </span>
);

const Entrepreneurship: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="23 · ENTREPRENEURSHIP"
      title={
        <span style={{ display: 'block', fontSize: 128, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          <span style={{ color: C.gold }}>Entrepreneurship!</span>
        </span>
      }
    >
      <style>{ENT_CSS}</style>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — two companies, CTO, consultant + email visuals */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 300, width: 1000 } as CSSProperties}>
                <div style={{ fontSize: 54, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.03em', color: C.muted }}>I built two companies:</div>
                <div style={{ marginTop: 10, fontSize: 64, lineHeight: 1.12, fontWeight: 900, letterSpacing: '-0.04em', color: C.green }}>Fiddlehead Consultants</div>
                <div style={{ fontSize: 64, lineHeight: 1.12, fontWeight: 900, letterSpacing: '-0.04em', color: '#4DA6FF' }}>+ Trigger Email Marketing</div>
                <div style={{ marginTop: 6, fontSize: 44, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.03em', color: C.muted }}>
                  …and served as <span style={{ color: C.gold }}>CTO</span>
                </div>
              </div>
              <div className="tc-a tc-in" style={{ '--d': '250ms', position: 'absolute', left: 1130, top: 300 } as CSSProperties}>
                <ConsultantScene />
              </div>
              <div className="tc-a tc-in" style={{ '--d': '500ms', position: 'absolute', left: 1580, top: 320 } as CSSProperties}>
                <EmailBadge />
              </div>
            </div>
          </Step>
          {/* click 2 — acornXA */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 650, width: 1450 } as CSSProperties}>
                <div style={{ fontSize: 60, lineHeight: 1.12, fontWeight: 900, letterSpacing: '-0.04em' }}>
                  I built <span style={{ color: C.gold }}>acornXA</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 38, lineHeight: 1.25, fontWeight: 700, color: C.muted }}>
                  a high-performance email &amp; analytics platform, modeled after the <span style={{ color: '#4DA6FF' }}>NetJets iJet2</span> application.
                </div>
              </div>
              <div className="tc-a tc-in" style={{ '--d': '300ms', position: 'absolute', left: 1640, top: 650 } as CSSProperties}>
                <AcornIcon />
              </div>
            </div>
          </Step>
          {/* click 3 — sold */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 120, top: 835, fontSize: 118, lineHeight: 1.05, fontWeight: 900, letterSpacing: '-0.045em' }}>
                <SoldText />
              </div>
              <div
                aria-hidden="true"
                className="tc-a en-o en-stamp"
                style={{ position: 'absolute', left: 1440, top: 850, padding: '4px 30px', border: `10px solid ${C.red}`, borderRadius: 18, color: C.red, fontFamily: mono, fontSize: 84, lineHeight: 1.1, fontWeight: 900, letterSpacing: '0.08em', opacity: 0 }}
              >
                SOLD
              </div>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Entrepreneurship.transition = settle;

/* ───────────────────────── 24 MAPSYS ───────────────────────── */

const MAP_CSS = `
@keyframes mp-star { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; } 50% { transform: scale(1.3) rotate(18deg); opacity: 1; } }
@keyframes mp-wob { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg) scale(1.04); } }
.tc-active [data-osd-step="revealed"] .mp-star { display: inline-block; animation: mp-star 1.6s ease-in-out 1500ms infinite; }
.tc-active [data-osd-step="revealed"] .mp-wob { animation: mp-wob 2.6s ease-in-out 1200ms infinite; }
`;

const MAP_RANKS: { title: string; color: string }[] = [
  { title: 'Technical Specialist', color: '#4FD1C5' },
  { title: 'Solutions Architect Manager', color: '#5BE49B' },
  { title: 'Executive Director', color: '#FFC56B' },
  { title: 'Chief Technologist', color: '#FF8A4C' },
];

const MAP_BADGES: { label: string; color: string }[] = [
  { label: 'Solution Selling', color: '#4DA6FF' },
  { label: 'Pipeline', color: '#5BE49B' },
  { label: 'Quota', color: '#FFC56B' },
];

const RankBox = ({ title, color, index }: { title: string; color: string; index: number }) => {
  const last = index === MAP_RANKS.length - 1;
  return (
    <div
      className="tc-a tc-in"
      style={
        {
          '--d': `${900 + index * 450}ms`,
          position: 'absolute',
          left: 120 + index * 440,
          top: 830 - index * 20,
          width: 360,
          height: 110,
          boxSizing: 'border-box',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 12,
          borderRadius: 20,
          border: `4px solid ${color}`,
          background: `${color}22`,
          boxShadow: last ? `0 0 60px ${color}88` : `0 0 24px ${color}33`,
          fontSize: 32,
          lineHeight: 1.15,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#F3F6FC',
        } as CSSProperties
      }
    >
      {last ? <span className="tc-a mp-star">★</span> : null}
      <span>{title}</span>
    </div>
  );
};

const RankArrow = ({ index }: { index: number }) => (
  <div
    aria-hidden="true"
    className="tc-a tc-in"
    style={
      {
        '--d': `${1150 + index * 450}ms`,
        position: 'absolute',
        left: 120 + index * 440 + 360,
        top: 830 - index * 20 - 10,
        width: 80,
        textAlign: 'center',
        fontSize: 56,
        fontWeight: 900,
        color: C.gold,
      } as CSSProperties
    }
  >
    ↗
  </div>
);

const Mapsys: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="24 · MAPSYS"
      title={
        <>
          <span style={{ display: 'block', fontSize: 52, fontWeight: 800, color: C.muted, whiteSpace: 'nowrap', ...rise(active, 100) }}>Next, I landed @</span>
          <span style={{ display: 'block', fontSize: 104, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 250) }}>
            <span style={{ color: '#4DA6FF' }}>MAPSYS</span> <span style={{ color: C.green }}>Systems &amp; Solutions</span>
          </span>
        </>
      }
    >
      <style>{MAP_CSS}</style>
      <div
        className="tc-a"
        style={{ position: 'absolute', left: 120, top: 330, width: 1060, fontSize: 38, lineHeight: 1.25, fontWeight: 700, color: C.muted, ...rise(active, 600) }}
      >
        A Columbus, OH based Technology and Consulting firm
        <div style={{ marginTop: 6, color: C.gold }}>(Yay! I don’t have to move!)</div>
      </div>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — home for 17 years + the building */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 500, fontSize: 76, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.04em' } as CSSProperties}>
                My home for <span style={{ color: C.gold }}>17 years!</span>
              </div>
              <div className="mp-wob" style={{ position: 'absolute', left: 1240, top: 330, transformOrigin: '50% 50%' }}>
                <PhotoCard src={mapsysPhoto} alt="The MAPSYS office building in Columbus, Ohio" h={372} w={560} d={200} glow="rgba(77,166,255,0.35)" />
              </div>
            </div>
          </Step>
          {/* click 2 — sales, business acumen, rank progression, fun badges */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', position: 'absolute', left: 120, top: 615, width: 1060, fontSize: 46, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}>
                Here I took <span style={{ color: C.green }}>sales</span> and my <span style={{ color: C.teal }}>business acumen</span> to a whole new level!
              </div>
              <div style={{ position: 'absolute', left: 120, top: 740, display: 'flex', gap: 20 }}>
                {MAP_BADGES.map((b, i) => (
                  <span
                    key={b.label}
                    className="tc-a tc-in"
                    style={
                      {
                        '--d': `${350 + i * 200}ms`,
                        padding: '8px 22px',
                        borderRadius: 999,
                        border: `3px solid ${b.color}`,
                        background: `${b.color}22`,
                        color: b.color,
                        fontFamily: mono,
                        fontSize: 26,
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                      } as CSSProperties
                    }
                  >
                    {b.label}
                  </span>
                ))}
              </div>
              {MAP_RANKS.map((r, i) => (
                <RankBox key={r.title} title={r.title} color={r.color} index={i} />
              ))}
              {[0, 1, 2].map((i) => (
                <RankArrow key={i} index={i} />
              ))}
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Mapsys.transition = settle;

/* ───────────────────────── 25 some of my customers ───────────────────────── */

const CUST_CSS = `
@keyframes cu-splat { 0% { opacity: 0; transform: scale(2.8) rotate(calc(var(--r) + 35deg)); } 50% { opacity: 1; transform: scale(0.86) rotate(var(--r)); } 72% { transform: scale(1.08) rotate(var(--r)); } 100% { opacity: 1; transform: scale(1) rotate(var(--r)); } }
@keyframes cu-ink { 0% { opacity: 0; transform: scale(0.2); } 55% { opacity: 0.55; } 100% { opacity: 0.28; transform: scale(1.35); } }
@keyframes cu-bob { 0%, 100% { transform: translateY(0) rotate(var(--r)); } 50% { transform: translateY(-8px) rotate(calc(var(--r) + 1.2deg)); } }
`;

type Customer = { name: string; logo?: string; color: string; dx: number; dy: number; rot: number; order: number };

const CUSTOMERS: Customer[] = [
  { name: 'Nationwide Children’s Hospital', color: '#4DA6FF', dx: 6, dy: 4, rot: -4, order: 3 },
  { name: 'Victoria’s Secret', logo: vsLogo, color: '#FF5D9E', dx: -8, dy: 14, rot: 3, order: 11 },
  { name: 'HFA-AE.COM', color: '#4FD1C5', dx: 10, dy: -6, rot: -2, order: 7 },
  { name: 'MIT', logo: mitLogo, color: '#FF5D6C', dx: -4, dy: 8, rot: 5, order: 0 },
  { name: 'Ascena Retail', color: '#FF8A4C', dx: 0, dy: -2, rot: -5, order: 13 },
  { name: 'Premium Brands', color: '#FFC56B', dx: 12, dy: 10, rot: 4, order: 5 },
  { name: 'UPMC', logo: upmcLogo, color: '#B07AD0', dx: -10, dy: -4, rot: -3, order: 9 },
  { name: 'Winn Supply', color: '#5BE49B', dx: 4, dy: 12, rot: 6, order: 1 },
  { name: 'Racksquared', color: '#4DA6FF', dx: -6, dy: 0, rot: -6, order: 14 },
  { name: 'Wasserstrom', logo: wasserstromLogo, color: '#4DA6FF', dx: 8, dy: 6, rot: 2, order: 4 },
  { name: 'OCLC', logo: oclcLogo, color: '#F4811F', dx: -2, dy: 10, rot: -4, order: 10 },
  { name: 'Encova Insurance', color: '#5BE49B', dx: 10, dy: -4, rot: 5, order: 2 },
  { name: 'Kingston Memory', logo: kingstonLogo, color: '#FF5D6C', dx: -8, dy: 6, rot: -3, order: 12 },
  { name: 'Richards Industries', color: '#FFC56B', dx: 2, dy: -6, rot: 4, order: 6 },
  { name: 'Ohio Health', logo: ohioHealthLogo, color: '#4DA6FF', dx: -4, dy: 8, rot: -5, order: 8 },
];

const CUST_W = 310;
const CUST_H = 150;

const CustomerTile = ({ c, index }: { c: Customer; index: number }) => {
  const active = useIsActivePage();
  const col = index % 5;
  const row = Math.floor(index / 5);
  const delay = 500 + c.order * 170;
  const left = 120 + col * 345 + c.dx;
  const top = 290 + row * 235 + c.dy;
  const vars = { '--r': `${c.rot}deg` } as CSSProperties;
  return (
    <div style={{ position: 'absolute', left, top, width: CUST_W, height: CUST_H }}>
      <div
        aria-hidden="true"
        className="tc-a"
        style={{
          position: 'absolute',
          left: -26,
          top: -22,
          right: -26,
          bottom: -22,
          background: c.color,
          borderRadius: '58% 42% 63% 37% / 45% 58% 42% 55%',
          filter: 'blur(2px)',
          opacity: 0,
          animation: active ? `cu-ink 900ms ease-out ${delay}ms both` : undefined,
        }}
      />
      <div
        className="tc-a"
        style={{
          ...vars,
          position: 'absolute',
          inset: 0,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: c.logo ? '16px 22px' : '10px 18px',
          borderRadius: 18,
          textAlign: 'center',
          opacity: 0,
          ...(c.logo
            ? { background: '#FFFFFF', boxShadow: `0 0 36px ${c.color}66` }
            : { background: `${c.color}22`, border: `4px solid ${c.color}`, boxShadow: `0 0 28px ${c.color}44` }),
          animation: active
            ? `cu-splat 800ms cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}ms both, cu-bob ${3 + (index % 4) * 0.5}s ease-in-out ${delay + 1600}ms infinite`
            : undefined,
        }}
      >
        {c.logo ? (
          <img src={c.logo} alt={`${c.name} logo`} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <span style={{ fontSize: c.name.length > 16 ? 33 : 40, lineHeight: 1.12, fontWeight: 900, letterSpacing: '-0.03em', color: '#F3F6FC' }}>{c.name}</span>
        )}
      </div>
    </div>
  );
};

const Customers: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="25 · CUSTOMERS"
      title={
        <span style={{ display: 'block', fontSize: 96, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          Some of my <span style={{ color: C.gold }}>Customers:</span>
        </span>
      }
    >
      <style>{CUST_CSS}</style>
      {CUSTOMERS.map((c, i) => (
        <CustomerTile key={c.name} c={c} index={i} />
      ))}
      <Credit>Logos: Wikimedia Commons · trademarks of their respective owners</Credit>
    </Frame>
  );
};
Customers.transition = settle;

/* ───────────────────────── 26 speaking at conferences ───────────────────────── */

const SPK_CSS = `
@keyframes sp-wave { 0% { opacity: 0; transform: scale(0.5); } 30% { opacity: 0.9; } 100% { opacity: 0; transform: scale(1.7); } }
@keyframes sp-mic { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg) translateY(-6px); } }
.sp-o { transform-box: fill-box; transform-origin: 50% 50%; }
.sp-active .sp-wave { animation: sp-wave 2.2s ease-out infinite; }
.sp-active .sp-mic { transform-box: fill-box; transform-origin: 50% 100%; animation: sp-mic 2.8s ease-in-out infinite; }
`;

const SPEAKING: { label: string; sub?: string; color: string }[] = [
  { label: 'IBM TechXchange', color: '#4DA6FF' },
  { label: 'Common', color: '#5BE49B' },
  { label: 'IBM Think', color: '#4FD1C5' },
  { label: 'AI Rising', color: '#FFC56B' },
  { label: 'YouTube: nextGenIT Series', sub: 'plus now the Daneyand@IBM series', color: '#FF5D6C' },
];

const MicStage = ({ active }: { active: boolean }) => (
  <svg
    className={active ? 'sp-active' : undefined}
    width={340}
    height={420}
    viewBox="0 0 340 420"
    role="img"
    aria-label="A microphone on a stand with sound waves radiating outward"
    style={{ overflow: 'visible' }}
  >
    {[0, 0.7, 1.4].map((d) => (
      <circle
        key={d}
        className="tc-a sp-o sp-wave"
        cx={170}
        cy={120}
        r={100}
        fill="none"
        stroke={C.gold}
        strokeWidth={5}
        style={{ animationDelay: `${d}s`, opacity: 0 }}
      />
    ))}
    <line x1={170} y1={230} x2={170} y2={370} stroke={C.dim} strokeWidth={10} strokeLinecap="round" />
    <line x1={100} y1={380} x2={240} y2={380} stroke={C.dim} strokeWidth={12} strokeLinecap="round" />
    <g className="tc-a sp-mic">
      <path d="M120 130 C 120 190, 220 190, 220 130" fill="none" stroke="#A9B7D9" strokeWidth={9} strokeLinecap="round" />
      <rect x={134} y={30} width={72} height={130} rx={36} fill="#2B3558" stroke="#F3F6FC" strokeWidth={6} />
      <g stroke="#6F7BA3" strokeWidth={4} strokeLinecap="round">
        <line x1={142} y1={66} x2={198} y2={66} />
        <line x1={142} y1={88} x2={198} y2={88} />
        <line x1={142} y1={110} x2={198} y2={110} />
      </g>
    </g>
  </svg>
);

const Speaking: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="26 · ON STAGE"
      title={
        <span style={{ display: 'block', fontSize: 96, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          Speaking at <span style={{ color: C.gold }}>conferences:</span>
        </span>
      }
    >
      <style>{SPK_CSS}</style>
      <ul style={{ position: 'absolute', left: 120, top: 290, margin: 0, padding: 0, listStyle: 'none', width: 1250 }}>
        {SPEAKING.map((s, i) => (
          <li
            key={s.label}
            className="tc-a"
            style={{ display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 22, ...rise(active, 500 + i * 300) }}
          >
            <span aria-hidden="true" style={{ flex: '0 0 auto', width: 22, height: 22, marginTop: 28, borderRadius: 6, background: s.color, boxShadow: `0 0 20px ${s.color}` }} />
            <span style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.035em', color: '#F3F6FC' }}>
              {s.label}
              {s.sub ? (
                <span style={{ display: 'block', marginTop: 4, fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', color: s.color }}>+ {s.sub}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
      <div className="tc-a" style={{ position: 'absolute', left: 1480, top: 300, ...rise(active, 700) }}>
        <MicStage active={active} />
      </div>
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — the teaser for what's next */}
          <Step duration={200}>
            <div
              className="tc-a tc-in"
              style={{ '--d': '0ms', position: 'absolute', left: 120, top: 905, fontSize: 56, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.035em', whiteSpace: 'nowrap' } as CSSProperties}
            >
              And now, after <span style={{ color: C.gold }}>17 years</span> @ <span style={{ color: '#4DA6FF' }}>MAPSYS</span>…
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
Speaking.transition = settle;

/* ───────────────────────── 27 back at IBM ───────────────────────── */

const IBM_CSS = `
@keyframes bk-p { 0% { opacity: 0; transform: translate(0, 0) scale(0.4); } 4% { opacity: 1; } 38% { opacity: 1; transform: translate(var(--x), var(--y)) scale(1); } 62% { opacity: 0; transform: translate(var(--x), calc(var(--y) + 46px)) scale(0.6); } 100% { opacity: 0; transform: translate(var(--x), calc(var(--y) + 46px)) scale(0.6); } }
@keyframes bk-core { 0%, 100% { opacity: 0; transform: scale(0.2); } 4% { opacity: 0.9; } 16% { opacity: 0; transform: scale(2.6); } }
`;

const FIREWORKS: { x: number; y: number; r: number; color: string; d: number }[] = [
  { x: 210, y: 360, r: 170, color: '#FFC56B', d: 0 },
  { x: 1000, y: 230, r: 150, color: '#4DA6FF', d: 700 },
  { x: 1730, y: 330, r: 190, color: '#5BE49B', d: 1400 },
  { x: 560, y: 820, r: 160, color: '#FF5D6C', d: 2100 },
  { x: 1280, y: 700, r: 180, color: '#B07AD0', d: 400 },
  { x: 1780, y: 880, r: 140, color: '#FFC56B', d: 1800 },
  { x: 130, y: 880, r: 130, color: '#4FD1C5', d: 1100 },
];

const Fireworks = () => {
  const active = useIsActivePage();
  if (!active) return null;
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {FIREWORKS.map((f) => (
        <div key={`${f.x}-${f.y}`}>
          <div
            className="tc-a"
            style={{ position: 'absolute', left: f.x - 20, top: f.y - 20, width: 40, height: 40, borderRadius: '50%', background: '#FFFFFF', opacity: 0, animation: `bk-core 4s ease-out ${f.d}ms infinite` }}
          />
          {Array.from({ length: 18 }, (_, i) => {
            const a = (i / 18) * Math.PI * 2;
            const rr = f.r * (i % 2 === 0 ? 1 : 0.68);
            return (
              <div
                key={i}
                className="tc-a"
                style={
                  {
                    '--x': `${Math.round(Math.cos(a) * rr)}px`,
                    '--y': `${Math.round(Math.sin(a) * rr)}px`,
                    position: 'absolute',
                    left: f.x - 6,
                    top: f.y - 6,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: i % 3 === 0 ? '#FFFFFF' : f.color,
                    boxShadow: `0 0 16px 3px ${f.color}`,
                    opacity: 0,
                    animation: `bk-p 4s cubic-bezier(0.1, 0.7, 0.3, 1) ${f.d}ms infinite`,
                  } as CSSProperties
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

type IbmTile = { label?: string; sub?: string; src?: string; alt?: string; span?: number; bleed?: boolean; color: string };

const IBM_TILES: IbmTile[] = [
  { src: powerSystemsLogo, alt: 'IBM Power Systems', span: 2, color: '#4DA6FF' },
  { label: 'BAW', sub: 'Business Automation Workflow', color: '#4DA6FF' },
  { label: 'BAI', sub: 'Business Automation Insights', color: '#4FD1C5' },
  { src: ibmZ9, alt: 'IBM System z9 mainframe badge', span: 2, bleed: true, color: '#A9B7D9' },
  { label: 'FileNet', sub: 'Content Manager', color: '#5BE49B' },
  { src: db2Logo, alt: 'IBM Db2', color: '#5BE49B' },
  { label: 'Netezza', sub: 'Data Warehouse', color: '#FFC56B' },
  { src: watsonxLogo, alt: 'IBM watsonx', span: 2, color: '#4DA6FF' },
  { label: 'IBM MQ', sub: 'Messaging', color: '#FF8A4C' },
  { src: redHatLogo, alt: 'Red Hat', span: 2, color: '#FF5D6C' },
  { label: 'Guardium', sub: 'Data Security', color: '#B07AD0' },
];

const IbmTileView = ({ t, index }: { t: IbmTile; index: number }) => (
  <div
    className="tc-a tc-in"
    style={
      {
        '--d': `${index * 130}ms`,
        gridColumn: t.span ? `span ${t.span}` : undefined,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: 16,
        padding: t.src ? (t.bleed ? 0 : '14px 20px') : '6px 10px',
        ...(t.src
          ? { background: t.bleed ? '#3A4046' : '#FFFFFF', boxShadow: `0 0 28px ${t.color}55` }
          : { background: `${t.color}22`, border: `4px solid ${t.color}`, boxShadow: `0 0 22px ${t.color}33` }),
      } as CSSProperties
    }
  >
    {t.src ? (
      <img src={t.src} alt={t.alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: t.bleed ? 'cover' : 'contain' }} />
    ) : (
      <>
        <span style={{ fontSize: 34, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.03em', color: '#F3F6FC' }}>{t.label}</span>
        <span style={{ marginTop: 3, fontFamily: mono, fontSize: 15, lineHeight: 1.15, letterSpacing: '0.02em', color: t.color }}>{t.sub}</span>
      </>
    )}
  </div>
);

const BackAtIbm: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="27 · BACK AT IBM"
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: 44, whiteSpace: 'nowrap', ...rise(active, 100) }}>
          <span style={{ fontSize: 128, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.045em' }}>I’m back at</span>
          <img
            className="tc-a"
            src={ibmLogo}
            alt="IBM"
            style={{
              display: 'block',
              height: 200,
              width: 'auto',
              filter: 'drop-shadow(0 0 40px rgba(77,166,255,0.7))',
              animation: active ? `tc-popin 800ms ${SPRING} 500ms both` : undefined,
            }}
          />
        </span>
      }
    >
      <style>{IBM_CSS}</style>
      <Fireworks />
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — the role */}
          <Step duration={200}>
            <div
              className="tc-a tc-in"
              style={{ '--d': '0ms', position: 'absolute', left: 120, top: 385, width: 1680, fontSize: 58, lineHeight: 1.18, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}
            >
              I’m a <span style={{ color: '#4DA6FF' }}>Technical Leader</span> &amp; <span style={{ color: C.gold }}>Field CTO</span> in the{' '}
              <span style={{ color: C.green }}>US Financial Services</span> Market.
            </div>
          </Step>
          {/* click 2 — Wall Street + the IBM portfolio */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 120, top: 570 }}>
                <PhotoCard src={wallStreetSign} alt="A green Wall St street sign on a glass office tower in New York" h={310} w={443} d={0} glow="rgba(91,228,155,0.35)" />
                <div className="tc-a tc-in" style={{ '--d': '300ms', marginTop: 12, fontFamily: mono, fontSize: 22, letterSpacing: '0.06em', color: C.gold } as CSSProperties}>
                  WALL STREET · US FINANCIAL SERVICES
                </div>
              </div>
              <div
                style={{ position: 'absolute', left: 700, top: 570, width: 1100, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridAutoRows: 100, gridAutoFlow: 'dense', gap: 16 }}
              >
                {IBM_TILES.map((t, i) => (
                  <IbmTileView key={t.alt ?? t.label} t={t} index={i} />
                ))}
              </div>
              <Credit>Wikimedia Commons · Wall St sign: Acediscovery (CC BY 4.0) · IBM, Red Hat, System z9 logos (public domain)</Credit>
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
BackAtIbm.transition = settle;

/* ───────────────────────── 28 fell into AI ───────────────────────── */

const AI_CSS = `
@keyframes ai-node { 0%, 100% { transform: scale(1); opacity: 0.45; } 50% { transform: scale(1.8); opacity: 1; } }
@keyframes ai-rain { from { transform: translateY(-950px); } to { transform: translateY(1100px); } }
@keyframes ai-float { 0%, 100% { transform: translate(0, 0) rotate(var(--r)); } 33% { transform: translate(16px, -24px) rotate(calc(var(--r) + 5deg)); } 66% { transform: translate(-14px, -8px) rotate(calc(var(--r) - 4deg)); } }
@keyframes ai-spin { to { transform: rotate(360deg); } }
@keyframes ai-spin-r { to { transform: rotate(-360deg); } }
@keyframes ai-core { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.14); } }
@keyframes ai-shine { to { background-position: 200% 0; } }
@keyframes ai-type { from { width: 0; } to { width: var(--w); } }
@keyframes ai-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes ai-scan { from { transform: translateY(-120px); } to { transform: translateY(1200px); } }
.ai-shine { background: linear-gradient(90deg, #4DA6FF, #5BE49B, #FFC56B, #FF5D6C, #B07AD0, #4DA6FF); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
.ai-type { overflow: hidden; white-space: nowrap; width: 0; }
.tc-active [data-osd-step="revealed"] .ai-shine { animation: ai-shine 3.5s linear infinite; }
.tc-active [data-osd-step="revealed"] .ai-type { animation: ai-type 1s steps(var(--n)) var(--td) both; }
.tc-active [data-osd-step="revealed"] .ai-cursor { animation: ai-blink 0.9s steps(1) 2.6s infinite; }
.tc-active [data-osd-step="revealed"] .ai-glow { animation: tc-glow 2.4s ease-in-out 1s infinite; }
`;

const aiRand = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const AI_PALETTE = ['#4DA6FF', '#5BE49B', '#FFC56B', '#B07AD0', '#4FD1C5'];
const AI_LAYERS = [4, 6, 5, 7, 5, 6, 4, 5];

const AI_NET = (() => {
  const rnd = aiRand(2016);
  const nodes = AI_LAYERS.map((cnt, li) =>
    Array.from({ length: cnt }, (_, j) => ({
      x: 80 + li * (1760 / (AI_LAYERS.length - 1)) + (rnd() - 0.5) * 30,
      y: 130 + (j + 0.5) * (870 / cnt) + (rnd() - 0.5) * 40,
      r: 4 + rnd() * 4,
    })),
  );
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  nodes.forEach((layer, li) => {
    const next = nodes[li + 1];
    if (!next) return;
    layer.forEach((a, j) => {
      const k = Math.min(next.length - 1, Math.round((j / Math.max(1, layer.length - 1)) * (next.length - 1)));
      Array.from(new Set([k, Math.min(next.length - 1, k + 1)])).forEach((idx) => {
        edges.push({ x1: a.x, y1: a.y, x2: next[idx].x, y2: next[idx].y });
      });
    });
  });
  return { nodes: nodes.flat(), edges };
})();

const AI_RAIN = Array.from({ length: 12 }, (_, i) => {
  const rnd = aiRand(100 + i);
  return {
    x: 30 + i * 158 + (i % 3) * 18,
    text: Array.from({ length: 34 }, () => (rnd() > 0.5 ? '1' : '0')).join('\n'),
    dur: 9 + (i % 5) * 2.2,
    delay: -(i * 1.9),
  };
});

const AI_TOKENS: { t: string; x: number; y: number; c: string; s: number; r: number; dur: number }[] = [
  { t: 'LLM', x: 1560, y: 90, c: '#4DA6FF', s: 34, r: -6, dur: 6 },
  { t: 'tensor', x: 980, y: 40, c: '#5BE49B', s: 26, r: 4, dur: 7.5 },
  { t: 'GPT', x: 1760, y: 560, c: '#FFC56B', s: 38, r: 8, dur: 5.5 },
  { t: 'ML', x: 60, y: 560, c: '#4FD1C5', s: 40, r: -8, dur: 6.5 },
  { t: 'embedding', x: 1500, y: 960, c: '#B07AD0', s: 24, r: 3, dur: 8 },
  { t: 'agent', x: 1120, y: 880, c: '#5BE49B', s: 32, r: -4, dur: 7 },
  { t: 'weights', x: 300, y: 980, c: '#FFC56B', s: 24, r: 5, dur: 6 },
  { t: '0.97', x: 1830, y: 280, c: '#4DA6FF', s: 28, r: -10, dur: 5 },
  { t: 'RAG', x: 760, y: 960, c: '#FF5D6C', s: 30, r: 6, dur: 7 },
  { t: 'DL', x: 1640, y: 790, c: '#B07AD0', s: 36, r: -5, dur: 6.8 },
  { t: '∑ w·x + b', x: 40, y: 330, c: '#4DA6FF', s: 24, r: 9, dur: 8.5 },
  { t: 'inference', x: 1320, y: 40, c: '#4FD1C5', s: 26, r: -3, dur: 7.2 },
  { t: '</>', x: 1000, y: 990, c: '#5BE49B', s: 34, r: 4, dur: 5.8 },
  { t: 'prompt', x: 1790, y: 930, c: '#FFC56B', s: 26, r: -7, dur: 6.4 },
  { t: 'GPU', x: 40, y: 800, c: '#FF8A4C', s: 32, r: 7, dur: 7.6 },
  { t: 'transformer', x: 480, y: 30, c: '#B07AD0', s: 24, r: -4, dur: 8.2 },
];

const AiBackdrop = () => {
  const active = useIsActivePage();
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* binary rain */}
      {AI_RAIN.map((c) => (
        <div
          key={c.x}
          className="tc-a"
          style={{
            position: 'absolute',
            left: c.x,
            top: 0,
            fontFamily: mono,
            fontSize: 22,
            lineHeight: '28px',
            whiteSpace: 'pre',
            color: C.green,
            opacity: 0.16,
            animation: active ? `ai-rain ${c.dur}s linear ${c.delay}s infinite` : undefined,
          }}
        >
          {c.text}
        </div>
      ))}
      {/* the neural network, with signals travelling its edges */}
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0, opacity: 0.6 }}>
        {AI_NET.edges.map((e, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static generated geometry
          <line key={`b${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="rgba(77,166,255,0.16)" strokeWidth={2} />
        ))}
        {AI_NET.edges.map((e, i) =>
          i % 2 === 0 ? (
            <line
              // biome-ignore lint/suspicious/noArrayIndexKey: static generated geometry
              key={`p${i}`}
              className="tc-a"
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={AI_PALETTE[i % 5]}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="10 38"
              style={{ opacity: 0.8, animation: active ? `tc-flow ${1.4 + (i % 5) * 0.35}s linear ${-(i % 7) * 0.3}s infinite` : undefined }}
            />
          ) : null,
        )}
        {AI_NET.nodes.map((n, i) => (
          <circle
            // biome-ignore lint/suspicious/noArrayIndexKey: static generated geometry
            key={`n${i}`}
            className="tc-a"
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={AI_PALETTE[i % 5]}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: active ? `ai-node ${2 + (i % 5) * 0.5}s ease-in-out ${-(i % 9) * 0.4}s infinite` : undefined,
            }}
          />
        ))}
      </svg>
      {/* floating AI vocabulary */}
      {AI_TOKENS.map((k) => (
        <div
          key={k.t}
          className="tc-a"
          style={
            {
              '--r': `${k.r}deg`,
              position: 'absolute',
              left: k.x,
              top: k.y,
              fontFamily: mono,
              fontSize: k.s,
              letterSpacing: '0.04em',
              color: k.c,
              opacity: 0.4,
              textShadow: `0 0 18px ${k.c}`,
              whiteSpace: 'nowrap',
              animation: active ? `ai-float ${k.dur}s ease-in-out infinite` : undefined,
            } as CSSProperties
          }
        >
          {k.t}
        </div>
      ))}
      {/* a scanning beam sweeping the page */}
      <div
        className="tc-a"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 120,
          background: 'linear-gradient(180deg, rgba(77,166,255,0), rgba(77,166,255,0.10), rgba(77,166,255,0))',
          animation: active ? 'ai-scan 7s linear infinite' : undefined,
        }}
      />
    </div>
  );
};

/** A glowing "AI core": counter-rotating rings, orbiting sparks, pulsing heart. */
const AiCore = () => {
  const active = useIsActivePage();
  const spin = (name: string, secs: number): CSSProperties => ({
    transformBox: 'view-box',
    transformOrigin: '110px 110px',
    animation: active ? `${name} ${secs}s linear infinite` : undefined,
  });
  return (
    <svg
      className="tc-a"
      width={220}
      height={220}
      viewBox="0 0 220 220"
      role="img"
      aria-label="A glowing AI core with rotating rings and orbiting sparks"
      style={{ position: 'absolute', left: 1480, top: 215, overflow: 'visible', ...rise(active, 600) }}
    >
      <circle cx={110} cy={110} r={104} fill="none" stroke="#4DA6FF" strokeWidth={3} strokeDasharray="4 14" strokeLinecap="round" className="tc-a" style={spin('ai-spin', 18)} />
      <g className="tc-a" style={spin('ai-spin-r', 11)}>
        <circle cx={110} cy={110} r={84} fill="none" stroke="#5BE49B" strokeWidth={4} strokeDasharray="70 30 20 30" strokeLinecap="round" />
        <circle cx={110} cy={26} r={8} fill="#FFC56B" />
      </g>
      <g className="tc-a" style={spin('ai-spin', 6)}>
        <circle cx={110} cy={110} r={62} fill="none" stroke="#B07AD0" strokeWidth={3} strokeDasharray="30 22" strokeLinecap="round" />
        <circle cx={172} cy={110} r={6} fill="#FF5D6C" />
        <circle cx={48} cy={110} r={5} fill="#4FD1C5" />
      </g>
      <g className="tc-a" style={{ transformBox: 'view-box', transformOrigin: '110px 110px', animation: active ? 'ai-core 2.2s ease-in-out infinite' : undefined }}>
        <circle cx={110} cy={110} r={40} fill="rgba(77,166,255,0.22)" stroke="#4DA6FF" strokeWidth={4} />
        <text x={110} y={126} textAnchor="middle" fontSize={44} fontWeight={900} fill="#F3F6FC" style={{ fontFamily: mono }}>
          AI
        </text>
      </g>
    </svg>
  );
};

const AiChip = ({ caption, color, glow, children, d }: { caption?: string; color: string; glow?: boolean; children: ReactNode; d: number }) => (
  <div className="tc-a tc-in" style={{ '--d': `${d}ms` } as CSSProperties}>
    <div style={{ height: 30, marginBottom: 6, fontFamily: mono, fontSize: 22, letterSpacing: '0.1em', color }}>{caption ?? ''}</div>
    <div
      className={glow ? 'tc-a ai-glow' : undefined}
      style={
        {
          '--g0': `${color}00`,
          '--g1': `${color}99`,
          padding: '20px 30px',
          borderRadius: 20,
          border: `4px solid ${color}`,
          background: `${color}22`,
          fontSize: 40,
          lineHeight: 1.1,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#F3F6FC',
          whiteSpace: 'nowrap',
        } as CSSProperties
      }
    >
      {children}
    </div>
  </div>
);

const AiArrow = ({ d }: { d: number }) => (
  <div aria-hidden="true" className="tc-a tc-in" style={{ '--d': `${d}ms`, alignSelf: 'flex-end', paddingBottom: 26, fontSize: 52, fontWeight: 900, color: C.gold } as CSSProperties}>
    →
  </div>
);

const AI_TERM: { text: string; color: string }[] = [
  { text: '$ agent build my-idea', color: '#F3F6FC' },
  { text: '> planning… writing code…', color: '#FFC56B' },
  { text: '✓ app running on :3000', color: '#5BE49B' },
];

const AgenticTerminal = () => (
  <div
    className="tc-a tc-in"
    style={
      {
        '--d': '600ms',
        position: 'absolute',
        left: 1400,
        top: 772,
        width: 420,
        boxSizing: 'border-box',
        padding: '38px 18px 14px',
        borderRadius: 14,
        background: '#070B16',
        border: '3px solid #4DA6FF',
        boxShadow: '0 0 40px rgba(77,166,255,0.4)',
        fontFamily: mono,
        fontSize: 19,
        lineHeight: '30px',
      } as CSSProperties
    }
  >
    <span aria-hidden="true" style={{ position: 'absolute', left: 14, top: 12, display: 'flex', gap: 8 }}>
      {['#FF5D6C', '#FFC56B', '#5BE49B'].map((c) => (
        <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
      ))}
    </span>
    {AI_TERM.map((l, i) => (
      <div
        key={l.text}
        className="ai-type"
        style={{ '--w': `${l.text.length}ch`, '--n': l.text.length, '--td': `${900 + i * 1000}ms`, color: l.color } as CSSProperties}
      >
        {l.text}
      </div>
    ))}
    <span aria-hidden="true" className="ai-cursor" style={{ display: 'inline-block', width: 11, height: 20, marginTop: 4, background: '#F3F6FC', opacity: 0 }} />
  </div>
);

const FellIntoAi: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame
      eyebrow="28 · A PRIMER ON AI"
      title={
        <span style={{ display: 'block', fontSize: 68, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em', whiteSpace: 'nowrap', ...rise(active, 100) }}>
          Through my career path, I somehow fell into
          <br />
          <span className="ai-shine" style={{ animation: active ? 'ai-shine 3.5s linear infinite' : undefined }}>
            AI
          </span>{' '}
          before it was even{' '}
          <span className="ai-shine" style={{ animation: active ? 'ai-shine 3.5s linear 0.6s infinite' : undefined }}>
            AI
          </span>
          .
        </span>
      }
    >
      <style>{AI_CSS}</style>
      <AiBackdrop />
      <AiCore />
      <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
        <Steps>
          {/* click 1 — since 2016 */}
          <Step duration={200}>
            <div
              className="tc-a tc-in"
              style={{ '--d': '0ms', position: 'absolute', left: 120, top: 310, width: 1300, fontSize: 46, lineHeight: 1.22, fontWeight: 800, letterSpacing: '-0.03em' } as CSSProperties}
            >
              From <span style={{ color: C.gold }}>2016</span> I’ve been <span style={{ color: '#4DA6FF' }}>educating</span>,{' '}
              <span style={{ color: C.green }}>speaking</span>, <span style={{ color: C.teal }}>selling</span> and{' '}
              <span style={{ color: '#B07AD0' }}>engineering</span> AI solutions:
            </div>
          </Step>
          {/* click 2 — ML → DL → neural networks */}
          <Step duration={200}>
            <div style={{ position: 'absolute', left: 120, top: 460, display: 'flex', alignItems: 'flex-end', gap: 22 }}>
              <div className="tc-a tc-in" style={{ '--d': '0ms', alignSelf: 'flex-end', paddingBottom: 26, fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', color: C.muted, whiteSpace: 'nowrap' } as CSSProperties}>
                First with
              </div>
              <AiChip caption="2016" color={C.teal} d={250}>
                machine learning
              </AiChip>
              <AiArrow d={450} />
              <AiChip color={C.gold} d={650}>
                deep learning
              </AiChip>
              <AiArrow d={850} />
              <AiChip caption="NOW" color={C.green} glow d={1050}>
                neural networks
              </AiChip>
            </div>
          </Step>
          {/* click 3 — the primer + the agentic demo */}
          <Step duration={200}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: 120, top: 625, fontSize: 112, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.045em', whiteSpace: 'nowrap' }}>
                {Array.from('& NOW, a Primer on AI.').map((ch, i) =>
                  ch === ' ' ? (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static text
                    <span key={i} style={{ display: 'inline-block', width: '0.28em' }} />
                  ) : (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static text
                    <span key={i} className="tc-a tc-in" style={{ '--d': `${i * 45}ms`, display: 'inline-block' } as CSSProperties}>
                      <span className="ai-shine" style={{ display: 'inline-block' }}>
                        {ch}
                      </span>
                    </span>
                  ),
                )}
              </div>
              <div
                className="tc-a tc-in"
                style={{ '--d': '700ms', position: 'absolute', left: 120, top: 775, width: 1180, fontSize: 36, lineHeight: 1.25, fontWeight: 700, color: C.muted } as CSSProperties}
              >
                (Plus a demo of how to use <span style={{ color: '#4DA6FF' }}>agentic AI</span> to bring your ideas to life —{' '}
                <span style={{ color: C.gold }}>become a developer, a real coder!</span>)
              </div>
              <AgenticTerminal />
            </div>
          </Step>
        </Steps>
      </div>
    </Frame>
  );
};
FellIntoAi.transition = settle;

/* ═════════════════════ 29–40 · AI 101 — Models & Machines ═════════════════════ */

const AK_CSS = `
@keyframes ak-ken { from { transform: scale(1.04) translate(0, 0); } to { transform: scale(1.16) translate(-26px, -14px); } }
@keyframes ak-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ak-drop { from { opacity: 0; transform: translateY(-44px); } to { opacity: 1; transform: none; } }
@keyframes ak-draw { to { stroke-dashoffset: 0; } }
@keyframes ak-flowr { to { stroke-dashoffset: 48; } }
@keyframes ak-breathe { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
@keyframes ak-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes ak-glowf { 0%, 100% { filter: drop-shadow(0 0 0 transparent); } 50% { filter: drop-shadow(0 0 16px var(--gc)); } }
@keyframes ak-cycle { 0% { opacity: 0; transform: translateY(14px); } 5%, 28% { opacity: 1; transform: none; } 33%, 100% { opacity: 0; transform: translateY(-14px); } }
@keyframes ak-cycle4 { 0% { opacity: 0; transform: scale(0.7); } 4%, 21% { opacity: 1; transform: none; } 25%, 100% { opacity: 0; transform: scale(1.15); } }
@keyframes ak-knob { 0%, 100% { left: 0%; } 50% { left: calc(100% - 30px); } }
@keyframes ak-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes ak-squeeze { 0%, 12% { width: var(--w0); } 60%, 85% { width: var(--w1); } 100% { width: var(--w0); } }
@keyframes ak-blinkbox { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes ak-orbit { to { transform: rotate(360deg); } }
@keyframes ak-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
.tc-active [data-osd-step="revealed"] .ak-wipe { animation: ak-wipe var(--t, 1200ms) cubic-bezier(0.2, 0.8, 0.2, 1) var(--d, 0ms) both; }
@keyframes ak-rocket { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 94% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
@keyframes ak-tick { 0% { opacity: 0; transform: scale(0.2); } 10%, 82% { opacity: 1; transform: none; } 94%, 100% { opacity: 0; } }
@keyframes ak-word { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-9px) scale(1.06); } }
@keyframes ak-ripple { from { transform: scale(0.4); opacity: 0.8; } to { transform: scale(3); opacity: 0; } }
@keyframes ak-expert { 0%, 100% { opacity: 0.25; transform: scale(0.92); } 20%, 45% { opacity: 1; transform: scale(1.12); } 65% { opacity: 0.25; transform: scale(0.92); } }
.tc-active [data-osd-step="revealed"] .ak-pop { transform-box: fill-box; transform-origin: center; animation: tc-chip 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms) both; }
.tc-active [data-osd-step="revealed"] .ak-fade { animation: ak-fade 700ms ease var(--d, 0ms) both; }
.tc-active [data-osd-step="revealed"] .ak-drop { animation: ak-drop 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms) both; }
.tc-active [data-osd-step="revealed"] .ak-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ak-draw var(--t, 1200ms) cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0ms) forwards; }
.tc-active [data-osd-step="revealed"] .ak-flow { stroke-dasharray: 10 38; animation: tc-flow var(--t, 1.6s) linear var(--dl, 0s) infinite; }
.tc-active [data-osd-step="revealed"] .ak-flowr { stroke-dasharray: 10 38; animation: ak-flowr var(--t, 1.4s) linear var(--dl, 0s) infinite; }
.tc-active [data-osd-step="revealed"] .ak-breathe { animation: ak-breathe var(--t, 2.4s) ease-in-out var(--dl, 0s) infinite; }
.tc-active [data-osd-step="revealed"] .ak-bob { animation: ak-bob var(--t, 3s) ease-in-out var(--dl, 0s) infinite; }
.tc-active [data-osd-step="revealed"] .ak-glowf { animation: ak-glowf var(--t, 2.4s) ease-in-out var(--dl, 1s) infinite; }
.tc-active [data-osd-step="revealed"] .ak-cycle { animation: ak-cycle 6s ease-in-out var(--dl, 0s) infinite both; }
.tc-active [data-osd-step="revealed"] .ak-cycle4 { animation: ak-cycle4 8s ease-in-out var(--dl, 0s) infinite both; }
.tc-active [data-osd-step="revealed"] .ak-knob { animation: ak-knob 4s ease-in-out infinite; }
.tc-active [data-osd-step="revealed"] .ak-bar { transform-origin: left; animation: ak-grow var(--t, 1200ms) cubic-bezier(0.2, 0.8, 0.2, 1) var(--d, 0ms) both; }
.tc-active [data-osd-step="revealed"] .ak-squeeze { animation: ak-squeeze 6s ease-in-out 1200ms infinite both; }
.tc-active [data-osd-step="revealed"] .ak-orbit { animation: ak-orbit var(--t, 12s) linear infinite; }
.tc-active [data-osd-step="revealed"] .ak-rocket { animation: ak-rocket 7s linear 800ms infinite both; }
.tc-active [data-osd-step="revealed"] .ak-tick { animation: ak-tick 8s ease-in-out var(--dl, 0s) infinite both; }
.tc-active [data-osd-step="revealed"] .ak-word { animation: tc-popin 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms) both, ak-word var(--t, 4s) ease-in-out calc(var(--d, 0ms) + 800ms) infinite; }
.tc-active [data-osd-step="revealed"] .ak-ripple { animation: ak-ripple 3s ease-out var(--dl, 0s) infinite; }
.tc-active [data-osd-step="revealed"] .ak-expert { transform-box: fill-box; transform-origin: center; animation: ak-expert 6s ease-in-out var(--dl, 0s) infinite; }
.tc-active [data-osd-step="revealed"] .ak-wavebar { animation: tc-bars var(--t, 1.2s) ease-in-out var(--dl, 0s) infinite; }
.ak-knob { position: absolute; top: -10px; width: 30px; height: 30px; border-radius: 50%; background: #FFC56B; box-shadow: 0 0 18px rgba(255,197,107,0.8); }
`;

const cv = (o: Record<string, string | number | undefined>) => o as CSSProperties;
const akSvg: CSSProperties = { position: 'absolute', left: 0, top: 0, overflow: 'visible' };

const AkTitle = ({ children, size = 66 }: { children: ReactNode; size?: number }) => {
  const active = useIsActivePage();
  return (
    <span
      style={{ display: 'block', fontSize: size, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em', whiteSpace: 'nowrap', ...rise(active, 100) }}
    >
      {children}
    </span>
  );
};

/** Click-step host: `.tc-active` scopes the reveal animations to the visible page. */
const AkStage = ({ children }: { children: ReactNode }) => {
  const active = useIsActivePage();
  return (
    <div className={active ? 'tc-active' : undefined} style={{ position: 'absolute', inset: 0 }}>
      <Steps>{children}</Steps>
    </div>
  );
};

const AkBullet = ({
  x,
  y,
  w,
  fs = 30,
  color = C.gold,
  d = 200,
  children,
}: {
  x: number;
  y: number;
  w: number;
  fs?: number;
  color?: string;
  d?: number;
  children: ReactNode;
}) => (
  <div
    className="tc-a tc-in"
    style={cv({ '--d': `${d}ms`, position: 'absolute', left: x, top: y, width: w, fontSize: fs, lineHeight: 1.3, fontWeight: 700, color: '#F3F6FC', paddingLeft: '1.1em', textIndent: '-1.1em' })}
  >
    <span style={{ color, marginRight: '0.35em' }}>▸</span>
    {children}
  </div>
);

const AkChip = ({ color, d, fs = 28, children }: { color: string; d: number; fs?: number; children: ReactNode }) => (
  <span
    className="tc-a tc-in"
    style={cv({ '--d': `${d}ms`, display: 'inline-block', margin: '0 12px 12px 0', padding: '8px 18px', borderRadius: 999, border: `2px solid ${color}`, background: `${color}22`, fontSize: fs, fontWeight: 700, color: '#F3F6FC', whiteSpace: 'nowrap' })}
  >
    {children}
  </span>
);

const AkCard = ({
  x,
  y,
  w,
  h,
  color,
  label,
  d = 0,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
  d?: number;
  children: ReactNode;
}) => (
  <div
    className="tc-a tc-in"
    style={cv({ '--d': `${d}ms`, position: 'absolute', left: x, top: y, width: w, height: h, boxSizing: 'border-box', padding: '26px 30px', borderRadius: 24, background: 'rgba(11,16,32,0.86)', border: `3px solid ${color}`, boxShadow: `0 0 44px ${color}33` })}
  >
    <div style={{ fontFamily: mono, fontSize: 24, letterSpacing: '0.14em', color, marginBottom: 14 }}>{label}</div>
    {children}
  </div>
);

/* ───────────────────────── 29 · AI 101 title ───────────────────────── */

const AK_SPARKS = (() => {
  const r = aiRand(101);
  return Array.from({ length: 24 }, () => ({ x: 900 + r() * 960, y: 120 + r() * 840, s: 4 + r() * 8, d: r() * 3, c: AI_PALETTE[Math.floor(r() * 5)] }));
})();

const Ak1: Page = () => {
  const active = useIsActivePage();
  return (
    <Frame eyebrow="29 · AI 101 · WELCOME">
      <style>
        {AI_CSS}
        {AK_CSS}
      </style>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src={akCover}
          alt=""
          className="tc-a"
          style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, objectFit: 'cover', opacity: 0.6, animation: active ? 'ak-ken 26s ease-in-out infinite alternate' : undefined }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,5,12,0.93) 0%, rgba(3,5,12,0.6) 52%, rgba(3,5,12,0.15) 100%)' }} />
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
          {AK_SPARKS.map((s, i) => (
            <circle
              // biome-ignore lint/suspicious/noArrayIndexKey: static generated geometry
              key={i}
              className="tc-a"
              cx={s.x}
              cy={s.y}
              r={s.s}
              fill={s.c}
              style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: active ? `tc-twinkle ${2 + (i % 4) * 0.5}s ease-in-out ${s.d}s infinite` : undefined }}
            />
          ))}
        </svg>
        <div
          className="tc-a"
          style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, background: 'linear-gradient(180deg, rgba(77,166,255,0), rgba(77,166,255,0.12), rgba(77,166,255,0))', animation: active ? 'ai-scan 7s linear infinite' : undefined }}
        />
      </div>
      <AkStage>
        <Step duration={200}>
          <div style={{ position: 'absolute', left: 110, top: 270, fontSize: 310, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
            {Array.from('AI 101').map((ch, i) =>
              ch === ' ' ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: static text
                <span key={i} style={{ display: 'inline-block', width: '0.26em' }} />
              ) : (
                // biome-ignore lint/suspicious/noArrayIndexKey: static text
                <span key={i} className="tc-a tc-in" style={cv({ '--d': `${i * 110}ms`, display: 'inline-block' })}>
                  <span className="ai-shine" style={{ display: 'inline-block' }}>
                    {ch}
                  </span>
                </span>
              ),
            )}
          </div>
        </Step>
        <Step duration={200}>
          <div style={{ position: 'absolute', left: 120, top: 620, fontSize: 96, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>
            <span className="tc-a tc-in" style={cv({ '--d': '0ms', display: 'inline-block', marginRight: 26 })}>
              Models
            </span>
            <span className="tc-a tc-in" style={cv({ '--d': '260ms', display: 'inline-block', marginRight: 26, color: C.gold })}>
              &amp;
            </span>
            <span className="tc-a tc-in" style={cv({ '--d': '520ms', display: 'inline-block' })}>
              Machines
            </span>
            <span className="tc-a tc-in ai-glow" style={cv({ '--d': '900ms', display: 'inline-block', color: '#4DA6FF' })}>
              …
            </span>
          </div>
        </Step>
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              className="tc-a ak-bar"
              style={cv({ '--t': '900ms', position: 'absolute', left: 120, top: 778, width: 180, height: 6, borderRadius: 3, background: 'var(--osd-accent)' })}
            />
            <div className="tc-a tc-in" style={cv({ '--d': '300ms', position: 'absolute', left: 120, top: 810, fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em' })}>
              Daneyand “DJ” Singley
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '650ms', position: 'absolute', left: 120, top: 888, fontSize: 38, fontWeight: 700, color: C.gold })}>
              IBM Technical Leader &amp; Field CTO
            </div>
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak1.transition = settle;

/* ───────────────────────── 30 · building a model ───────────────────────── */

const AK_LAYERS = [5, 6, 6, 4];
const AK_COLX = [310, 520, 730, 940];
const AK_COLORS = [C.red, '#FF8A4C', '#FF8A4C', '#4DA6FF'];
const akNode = (l: number, i: number) => ({ x: AK_COLX[l], y: 530 + (i - (AK_LAYERS[l] - 1) / 2) * 62 });
const AK_EDGES = AK_LAYERS.slice(0, -1).flatMap((n, l) =>
  Array.from({ length: n }, (_, a) => Array.from({ length: AK_LAYERS[l + 1] }, (_, b) => ({ l, a, b, p: akNode(l, a), q: akNode(l + 1, b) }))).flat(),
);
const AK_WLABELS = [
  { l: 0, a: 0, b: 1, v: '0.82' },
  { l: 0, a: 2, b: 3, v: '−0.31' },
  { l: 0, a: 4, b: 4, v: '0.47' },
  { l: 1, a: 1, b: 2, v: '1.20' },
  { l: 1, a: 3, b: 0, v: '−0.64' },
  { l: 1, a: 5, b: 4, v: '0.09' },
  { l: 2, a: 0, b: 1, v: '0.75' },
  { l: 2, a: 3, b: 3, v: '−0.18' },
];
const AK_NAMES = ['input · 5', 'dense · 6', 'dense · 6', 'output · 4'];
const akColTop = (l: number) => 530 - ((AK_LAYERS[l] - 1) / 2) * 62 - 34;

const Ak2: Page = () => {
  return (
    <Frame eyebrow="30 · AI 101 · DEEP LEARNING" title={<AkTitle>Building a model</AkTitle>}>
      <style>{AK_CSS}</style>
      <AkStage>
        {/* click 1 — the trained model box, the network, data flowing through */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              <rect className="tc-a ak-fade" style={cv({ '--d': '400ms' })} x={210} y={300} width={860} height={460} rx={28} fill="rgba(77,166,255,0.06)" />
              <rect className="tc-a ak-draw" style={cv({ '--t': '1500ms' })} pathLength={1} x={210} y={300} width={860} height={460} rx={28} fill="none" stroke="#4DA6FF" strokeWidth={4} />
              <g className="tc-a ak-drop" style={cv({ '--d': '300ms' })}>
                <rect x={210} y={268} width={250} height={46} rx={14} fill="#4DA6FF" />
                <text x={335} y={300} textAnchor="middle" fontSize={26} fontWeight={800} fill="#03050C" style={{ fontFamily: 'var(--osd-font-display)' }}>
                  Trained model
                </text>
              </g>
              <g stroke="rgba(169,183,217,0.26)" strokeWidth={1.6}>
                {AK_EDGES.map((e) => (
                  <line
                    key={`e${e.l}-${e.a}-${e.b}`}
                    className="tc-a ak-fade"
                    style={cv({ '--d': `${700 + e.l * 350}ms` })}
                    x1={e.p.x}
                    y1={e.p.y}
                    x2={e.q.x}
                    y2={e.q.y}
                  />
                ))}
              </g>
              <g className="tc-a ak-fade" style={cv({ '--d': '1500ms' })}>
                {AK_EDGES.filter((_, i) => i % 3 === 0).map((e, i) => (
                  <line
                    key={`f${e.l}-${e.a}-${e.b}`}
                    className="tc-a ak-flow"
                    style={cv({ '--t': `${1.3 + (i % 5) * 0.3}s`, '--dl': `${-(i % 7) * 0.25}s` })}
                    x1={e.p.x}
                    y1={e.p.y}
                    x2={e.q.x}
                    y2={e.q.y}
                    stroke={AI_PALETTE[i % 5]}
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                ))}
              </g>
              {AK_LAYERS.map((n, l) =>
                Array.from({ length: n }, (_, i) => {
                  const p = akNode(l, i);
                  return (
                    <circle
                      key={`n${l}-${i}`}
                      className="tc-a ak-pop"
                      style={cv({ '--d': `${500 + l * 350 + i * 70}ms` })}
                      cx={p.x}
                      cy={p.y}
                      r={17}
                      fill={`${AK_COLORS[l]}40`}
                      stroke={AK_COLORS[l]}
                      strokeWidth={4}
                    />
                  );
                }),
              )}
              <g className="tc-a ak-fade" style={cv({ '--d': '200ms' })}>
                <line x1={118} y1={530} x2={196} y2={530} stroke={C.red} strokeWidth={6} strokeLinecap="round" />
                <polygon points="212,530 190,518 190,542" fill={C.red} />
                <text x={164} y={496} textAnchor="middle" fontSize={22} fill={C.red} style={{ fontFamily: mono }}>
                  input
                </text>
              </g>
              <g className="tc-a ak-fade" style={cv({ '--d': '2200ms' })}>
                <line x1={1086} y1={530} x2={1164} y2={530} stroke="#4DA6FF" strokeWidth={6} strokeLinecap="round" />
                <polygon points="1182,530 1160,518 1160,542" fill="#4DA6FF" />
                <text x={1126} y={496} textAnchor="middle" fontSize={22} fill="#4DA6FF" style={{ fontFamily: mono }}>
                  prediction
                </text>
              </g>
            </svg>
            <div className="tc-a tc-in" style={cv({ '--d': '700ms', position: 'absolute', left: 1250, top: 300, width: 550, fontSize: 36, lineHeight: 1.25, fontWeight: 800, color: C.gold })}>
              A trained model includes:
            </div>
          </div>
        </Step>
        {/* click 2 — the network definition */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              {AK_LAYERS.map((n, l) => (
                <g key={`d${l}`}>
                  <line
                    className="tc-a ak-draw"
                    style={cv({ '--t': '700ms', '--d': `${300 + l * 150}ms` })}
                    pathLength={1}
                    x1={760}
                    y1={296}
                    x2={AK_COLX[l]}
                    y2={akColTop(l)}
                    stroke={C.gold}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                  />
                  <g className="tc-a ak-breathe" style={cv({ '--dl': `${l * 0.3}s` })}>
                    <rect
                      className="tc-a ak-pop"
                      style={cv({ '--d': `${200 + l * 180}ms` })}
                      x={AK_COLX[l] - 32}
                      y={akColTop(l)}
                      width={64}
                      height={(n - 1) * 62 + 68}
                      rx={20}
                      fill="none"
                      stroke={C.gold}
                      strokeWidth={3}
                      strokeDasharray="10 8"
                    />
                  </g>
                  <text className="tc-a ak-fade" style={{ ...cv({ '--d': `${800 + l * 150}ms` }), fontFamily: mono }} x={AK_COLX[l]} y={746} textAnchor="middle" fontSize={20} fill={C.muted}>
                    {AK_NAMES[l]}
                  </text>
                </g>
              ))}
              <g className="tc-a ak-drop" style={cv({ '--d': '100ms' })}>
                <rect x={590} y={250} width={340} height={46} rx={23} fill="rgba(255,197,107,0.18)" stroke={C.gold} strokeWidth={3} />
                <text x={760} y={282} textAnchor="middle" fontSize={26} fontWeight={800} fill={C.gold} style={{ fontFamily: 'var(--osd-font-display)' }}>
                  network definition
                </text>
              </g>
            </svg>
            <AkBullet x={1250} y={372} w={550} fs={34} d={500}>
              a <span style={{ color: C.gold }}>network definition</span> file that describes the layers
            </AkBullet>
          </div>
        </Step>
        {/* click 3 — weights and biases */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              <g className="tc-a ak-fade" style={cv({ '--d': '200ms' })} stroke={C.green} strokeWidth={2.4} opacity={0.6}>
                {AK_EDGES.map((e) => (
                  <line key={`g${e.l}-${e.a}-${e.b}`} x1={e.p.x} y1={e.p.y} x2={e.q.x} y2={e.q.y} />
                ))}
              </g>
              {AK_WLABELS.map((w, i) => {
                const p = akNode(w.l, w.a);
                const q = akNode(w.l + 1, w.b);
                const mx = (p.x + q.x) / 2;
                const my = (p.y + q.y) / 2;
                return (
                  <g key={`w${i}`} className="tc-a ak-pop" style={cv({ '--d': `${400 + i * 110}ms` })}>
                    <rect x={mx - 32} y={my - 14} width={64} height={28} rx={9} fill="#07140D" stroke={C.green} strokeWidth={2} />
                    <text x={mx} y={my + 7} textAnchor="middle" fontSize={17} fontWeight={700} fill={C.green} style={{ fontFamily: mono }}>
                      {w.v}
                    </text>
                  </g>
                );
              })}
              {[1, 2, 3].map((l) =>
                Array.from({ length: AK_LAYERS[l] }, (_, i) => {
                  const p = akNode(l, i);
                  return (
                    <g key={`b${l}-${i}`} className="tc-a ak-drop" style={cv({ '--d': `${1300 + l * 200 + i * 60}ms` })}>
                      <rect x={p.x + 10} y={p.y - 38} width={44} height={24} rx={7} fill="#B07AD0" />
                      <text x={p.x + 32} y={p.y - 21} textAnchor="middle" fontSize={16} fontWeight={800} fill="#fff" style={{ fontFamily: mono }}>
                        +b
                      </text>
                    </g>
                  );
                }),
              )}
              <g className="tc-a ak-fade" style={cv({ '--d': '700ms' })}>
                <line x1={470} y1={800} x2={418} y2={640} stroke={C.green} strokeWidth={3} strokeDasharray="6 7" />
                <rect x={375} y={800} width={190} height={46} rx={23} fill="rgba(91,228,155,0.16)" stroke={C.green} strokeWidth={3} />
                <text x={470} y={832} textAnchor="middle" fontSize={26} fontWeight={800} fill={C.green} style={{ fontFamily: 'var(--osd-font-display)' }}>
                  weights
                </text>
              </g>
              <g className="tc-a ak-fade" style={cv({ '--d': '1700ms' })}>
                <line x1={900} y1={800} x2={966} y2={616} stroke="#B07AD0" strokeWidth={3} strokeDasharray="6 7" />
                <rect x={805} y={800} width={190} height={46} rx={23} fill="rgba(176,122,208,0.2)" stroke="#B07AD0" strokeWidth={3} />
                <text x={900} y={832} textAnchor="middle" fontSize={26} fontWeight={800} fill="#D6B2EE" style={{ fontFamily: 'var(--osd-font-display)' }}>
                  biases
                </text>
              </g>
            </svg>
            <AkBullet x={1250} y={560} w={550} fs={34} color={C.green} d={500}>
              <span style={{ color: C.green }}>weights</span> and <span style={{ color: '#D6B2EE' }}>biases</span> for each layer within that network
            </AkBullet>
          </div>
        </Step>
        {/* click 4 — the assembly */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', left: 210, top: 888, display: 'flex', alignItems: 'center', gap: 22, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>
              {[
                { t: 'network definition', c: C.gold, d: 0 },
                { t: '+', c: C.muted, d: 200 },
                { t: 'weights', c: C.green, d: 400 },
                { t: '+', c: C.muted, d: 600 },
                { t: 'biases', c: '#D6B2EE', d: 800 },
                { t: '=', c: C.muted, d: 1050 },
              ].map((p) => (
                <span
                  key={`${p.t}${p.d}`}
                  className="tc-a tc-in"
                  style={cv({ '--d': `${p.d}ms`, color: p.c, ...(p.t.length > 1 ? { padding: '10px 22px', borderRadius: 16, border: `3px solid ${p.c}`, background: `${p.c}1f` } : { fontSize: 44 }) })}
                >
                  {p.t}
                </span>
              ))}
              <span className="tc-a tc-in" style={cv({ '--d': '1300ms' })}>
                <span
                  className="tc-a ai-glow"
                  style={cv({ '--g0': 'rgba(77,166,255,0)', '--g1': 'rgba(77,166,255,0.7)', display: 'inline-block', padding: '10px 26px', borderRadius: 16, background: '#4DA6FF', color: '#03050C' })}
                >
                  trained model
                </span>
              </span>
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '1600ms', position: 'absolute', left: 1250, top: 760, width: 550, fontFamily: mono, fontSize: 22, lineHeight: 1.4, color: C.muted })}>
              Often called a deep learning algorithm or model.
            </div>
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak2.transition = settle;

/* ───────────────────────── 31 · weights, biases, hyperparameters ───────────────────────── */

const AK3_Y = [400, 540, 680];
const AK3_T = [0.33, 0.5, 0.67];
const AK3_PAIRS = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ({ i, j })));
const AK3_W = [
  [0.82, -0.31, 0.07],
  [0.15, 0.64, -0.52],
  [-0.4, 0.09, 0.77],
];
const AK3_B = [0.1, -0.05, 0.2];

const AkSub = ({ x, y, base, sub, size = 22, fill, bold = true }: { x: number; y: number; base: string; sub: string; size?: number; fill: string; bold?: boolean }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={bold ? 800 : 500} fill={fill} style={{ fontFamily: mono }}>
    {base}
    <tspan fontSize={size * 0.68} dy={size * 0.22}>
      {sub}
    </tspan>
  </text>
);

const AkMatrix = ({ vals, cols, color, d }: { vals: number[]; cols: number; color: string; d: number }) => (
  <div
    style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 82px)`, gap: 6, padding: '6px 10px', borderLeft: `4px solid ${color}`, borderRight: `4px solid ${color}`, borderRadius: 10 }}
  >
    {vals.map((v, k) => (
      <span
        // biome-ignore lint/suspicious/noArrayIndexKey: static matrix cells
        key={k}
        className="tc-a tc-in"
        style={cv({ '--d': `${d + k * 60}ms`, fontFamily: mono, fontSize: 22, textAlign: 'center', padding: '4px 0', borderRadius: 8, background: `${color}1f`, color: '#F3F6FC' })}
      >
        {v.toFixed(2)}
      </span>
    ))}
  </div>
);

const Ak3: Page = () => {
  return (
    <Frame eyebrow="31 · AI 101 · DEEP LEARNING" title={<AkTitle size={60}>Building a model – and what’s a hyperparameter?</AkTitle>}>
      <style>{AK_CSS}</style>
      <AkStage>
        {/* click 1 — inputs, the sum of weighted inputs */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              <text className="tc-a ak-fade" style={{ ...cv({ '--d': '100ms' }), fontFamily: mono }} x={190} y={336} textAnchor="middle" fontSize={22} letterSpacing="0.14em" fill={C.teal}>
                INPUTS
              </text>
              {AK3_PAIRS.map(({ i, j }) => (
                <line
                  key={`e${i}${j}`}
                  className="tc-a ak-fade"
                  style={cv({ '--d': `${300 + i * 120}ms` })}
                  x1={224}
                  y1={AK3_Y[i]}
                  x2={730}
                  y2={AK3_Y[j]}
                  stroke="rgba(169,183,217,0.34)"
                  strokeWidth={2}
                />
              ))}
              <g className="tc-a ak-fade" style={cv({ '--d': '900ms' })}>
                {AK3_PAIRS.map(({ i, j }, k) => (
                  <line
                    key={`f${i}${j}`}
                    className="tc-a ak-flow"
                    style={cv({ '--t': `${1.2 + (k % 4) * 0.3}s`, '--dl': `${-(k % 5) * 0.3}s` })}
                    x1={224}
                    y1={AK3_Y[i]}
                    x2={730}
                    y2={AK3_Y[j]}
                    stroke={AI_PALETTE[k % 5]}
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                ))}
              </g>
              {AK3_Y.map((y, i) => (
                <g key={`x${i}`} className="tc-a ak-pop" style={cv({ '--d': `${i * 140}ms` })}>
                  <circle cx={190} cy={y} r={34} fill={`${C.teal}30`} stroke={C.teal} strokeWidth={4} />
                  <AkSub x={190} y={y + 8} base="x" sub={String(i + 1)} size={28} fill="#F3F6FC" />
                </g>
              ))}
              {AK3_Y.map((y, j) => (
                <g key={`s${j}`} className="tc-a ak-pop" style={cv({ '--d': `${900 + j * 140}ms` })}>
                  <circle cx={756} cy={y} r={26} fill="rgba(243,246,252,0.08)" stroke="#F3F6FC" strokeWidth={3} />
                  <text x={756} y={y + 11} textAnchor="middle" fontSize={32} fontWeight={800} fill="#F3F6FC">
                    Σ
                  </text>
                </g>
              ))}
            </svg>
            <AkBullet x={1370} y={330} w={430} d={900}>
              each layer has <span style={{ color: C.green }}>weights</span> and <span style={{ color: '#D6B2EE' }}>biases</span>
            </AkBullet>
          </div>
        </Step>
        {/* click 2 — the weights */}
        <Step duration={200}>
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
            <text className="tc-a ak-fade" style={{ ...cv({ '--d': '100ms' }), fontFamily: mono }} x={480} y={336} textAnchor="middle" fontSize={22} letterSpacing="0.14em" fill={C.green}>
              WEIGHTS
            </text>
            {AK3_PAIRS.map(({ i, j }, k) => {
              const t = AK3_T[i];
              const cx = 224 + t * (730 - 224);
              const cy = AK3_Y[i] + t * (AK3_Y[j] - AK3_Y[i]);
              return (
                <g key={`w${i}${j}`} className="tc-a ak-pop" style={cv({ '--d': `${200 + k * 110}ms` })}>
                  <ellipse cx={cx} cy={cy} rx={44} ry={19} fill="#0B2A1A" stroke={C.green} strokeWidth={2.5} />
                  <AkSub x={cx - 4} y={cy + 6} base="W" sub={`${i + 1},${j + 1}`} size={20} fill={C.green} />
                </g>
              );
            })}
          </svg>
        </Step>
        {/* click 3 — the biases, softmax and outputs */}
        <Step duration={200}>
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
            <text className="tc-a ak-fade" style={{ ...cv({ '--d': '100ms' }), fontFamily: mono }} x={856} y={336} textAnchor="middle" fontSize={22} letterSpacing="0.14em" fill="#D6B2EE">
              BIASES
            </text>
            <text className="tc-a ak-fade" style={{ ...cv({ '--d': '900ms' }), fontFamily: mono }} x={1015} y={336} textAnchor="middle" fontSize={22} letterSpacing="0.14em" fill={C.gold}>
              SOFTMAX
            </text>
            <text className="tc-a ak-fade" style={{ ...cv({ '--d': '1500ms' }), fontFamily: mono }} x={1210} y={336} textAnchor="middle" fontSize={22} letterSpacing="0.14em" fill="#4DA6FF">
              OUTPUTS
            </text>
            {AK3_Y.map((y, j) => (
              <g key={`b${j}`}>
                <line x1={782} y1={y} x2={818} y2={y} stroke="#B07AD0" strokeWidth={3} className="tc-a ak-fade" style={cv({ '--d': `${200 + j * 150}ms` })} />
                <g className="tc-a ak-drop" style={cv({ '--d': `${200 + j * 150}ms` })}>
                  <rect x={818} y={y - 21} width={76} height={42} rx={10} fill="#B07AD0" />
                  <AkSub x={856} y={y + 7} base="+b" sub={String(j + 1)} size={24} fill="#fff" />
                </g>
                <line className="tc-a ak-flow" style={cv({ '--t': '1.1s', '--dl': `${-j * 0.3}s` })} x1={894} y1={y} x2={960} y2={y} stroke={C.gold} strokeWidth={3.5} strokeLinecap="round" />
                <line className="tc-a ak-flow" style={cv({ '--t': '1.1s', '--dl': `${-j * 0.2}s` })} x1={1070} y1={y} x2={1176} y2={y} stroke="#4DA6FF" strokeWidth={3.5} strokeLinecap="round" />
                <g className="tc-a ak-pop" style={cv({ '--d': `${1600 + j * 150}ms` })}>
                  <circle cx={1210} cy={y} r={34} fill="rgba(77,166,255,0.2)" stroke="#4DA6FF" strokeWidth={4} />
                  <AkSub x={1210} y={y + 8} base="y" sub={String(j + 1)} size={28} fill="#F3F6FC" />
                  <text x={1210} y={y + 66} textAnchor="middle" fontSize={22} fill="#4DA6FF" style={{ fontFamily: mono }}>
                    {['0.70', '0.20', '0.10'][j]}
                  </text>
                </g>
              </g>
            ))}
            <g className="tc-a ak-pop" style={cv({ '--d': '900ms' })}>
              <rect x={960} y={350} width={110} height={380} rx={20} fill={C.gold} />
              <text x={1015} y={540} textAnchor="middle" fontSize={40} fontWeight={900} fill="#2A1C03" transform="rotate(-90 1015 540)" dy={13} style={{ fontFamily: 'var(--osd-font-display)' }}>
                softmax
              </text>
            </g>
          </svg>
        </Step>
        {/* click 4 — training: back-propagation nudges W and b */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              {AK3_PAIRS.map(({ i, j }, k) => (
                <line
                  key={`r${i}${j}`}
                  className="tc-a ak-flowr"
                  style={cv({ '--t': `${1.1 + (k % 4) * 0.25}s`, '--dl': `${-(k % 5) * 0.25}s` })}
                  x1={224}
                  y1={AK3_Y[i]}
                  x2={730}
                  y2={AK3_Y[j]}
                  stroke={C.red}
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              ))}
              {AK3_Y.map((y, j) => (
                <g key={`rb${j}`}>
                  <line className="tc-a ak-flowr" style={cv({ '--t': '1.1s', '--dl': `${-j * 0.3}s` })} x1={894} y1={y} x2={960} y2={y} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
                  <line className="tc-a ak-flowr" style={cv({ '--t': '1.1s', '--dl': `${-j * 0.2}s` })} x1={1070} y1={y} x2={1176} y2={y} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
                </g>
              ))}
              {AK3_PAIRS.map(({ i, j }, k) => {
                const t = AK3_T[i];
                return (
                  <g key={`fl${i}${j}`} className="tc-a ak-breathe" style={cv({ '--dl': `${(k % 5) * 0.2}s` })}>
                    <ellipse cx={224 + t * 506} cy={AK3_Y[i] + t * (AK3_Y[j] - AK3_Y[i])} rx={50} ry={25} fill="none" stroke={C.gold} strokeWidth={3.5} />
                  </g>
                );
              })}
              <text className="tc-a ak-fade" style={{ ...cv({ '--d': '500ms' }), fontFamily: mono }} x={1210} y={800} textAnchor="middle" fontSize={24} fill={C.red}>
                error ↩
              </text>
              <g className="tc-a ak-drop" style={cv({ '--d': '300ms' })}>
                <rect x={330} y={768} width={560} height={46} rx={23} fill="rgba(255,93,108,0.16)" stroke={C.red} strokeWidth={3} />
                <text x={610} y={800} textAnchor="middle" fontSize={25} fontWeight={800} fill={C.red} style={{ fontFamily: 'var(--osd-font-display)' }}>
                  ◀ back propagation nudges W and b
                </text>
              </g>
            </svg>
            <AkBullet x={1370} y={430} w={430} d={500}>
              they are <span style={{ color: C.red }}>modified</span> as the model is trained
            </AkBullet>
          </div>
        </Step>
        {/* click 5 — matrices */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', left: 120, top: 848, display: 'flex', alignItems: 'center', gap: 20, fontSize: 40, fontWeight: 900 }}>
              <span className="tc-a tc-in" style={cv({ '--d': '0ms', color: C.green })}>
                W =
              </span>
              <AkMatrix vals={AK3_W.flat()} cols={3} color={C.green} d={150} />
              <span className="tc-a tc-in" style={cv({ '--d': '700ms', color: '#D6B2EE', marginLeft: 30 })}>
                b =
              </span>
              <AkMatrix vals={AK3_B} cols={1} color="#B07AD0" d={850} />
            </div>
            <AkBullet x={1370} y={580} w={430} d={500}>
              they are held in <span style={{ color: C.teal }}>matrices</span>
            </AkBullet>
          </div>
        </Step>
        {/* click 6 — the hyperparameter: learning rate */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', left: 860, top: 842, width: 940, display: 'flex', alignItems: 'center', gap: 30 }}>
              <div className="tc-a ai-shine tc-in" style={cv({ '--d': '0ms', fontSize: 110, fontWeight: 900, lineHeight: 1 })}>
                η
              </div>
              <div className="tc-a tc-in" style={cv({ '--d': '250ms', width: 300 })}>
                <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '0.1em', color: C.gold, marginBottom: 22 }}>LEARNING RATE</div>
                <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'rgba(169,183,217,0.28)' }}>
                  <div className="tc-a ak-knob" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, fontFamily: mono, fontSize: 18, color: C.dim }}>
                  <span>tiny steps</span>
                  <span>huge steps</span>
                </div>
              </div>
              <div className="tc-a tc-in" style={cv({ '--d': '550ms', fontFamily: mono, fontSize: 34, fontWeight: 700, whiteSpace: 'nowrap' })}>
                w ← w − <span style={{ color: C.gold }}>η</span> · ∂L/∂w
              </div>
            </div>
            <AkBullet x={1370} y={650} w={430} d={500}>
              the amount of change per iteration is the <span style={{ color: C.gold }}>learning rate</span>
            </AkBullet>
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak3.transition = settle;

/* ───────────────────────── 32 · LLMs ───────────────────────── */

const AK_USES = [
  { t: 'generation', c: '#4DA6FF' },
  { t: 'classification', c: C.green },
  { t: 'extraction', c: C.gold },
  { t: 'summarization', c: '#B07AD0' },
  { t: 'Q&A', c: C.teal },
];
const AK_MODELS = [
  { t: 'Meta Llama', c: '#4DA6FF' },
  { t: 'OpenAI GPT', c: C.green },
  { t: 'xAI Grok', c: '#C9D3EC' },
  { t: 'Qwen', c: '#B07AD0' },
  { t: 'IBM Granite & Slate', c: C.gold },
];
const AK_SAMPLES = ['Paris.', 'Paris, of course!', 'The capital is Paris.'];

const Ak4: Page = () => {
  return (
    <Frame eyebrow="32 · AI 101 · LLMs" title={<AkTitle size={84}>LLMs</AkTitle>}>
      <style>{AK_CSS}</style>
      <AkStage>
        {/* click 1 — what is an LLM */}
        <Step duration={200}>
          <AkCard x={120} y={290} w={530} h={640} color="#4DA6FF" label="WHAT IS AN LLM">
            <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25, marginBottom: 22 }}>
              A <span style={{ color: '#4DA6FF' }}>general-purpose</span> language model for:
            </div>
            <div>
              {AK_USES.map((u, i) => (
                <AkChip key={u.t} color={u.c} d={300 + i * 150} fs={30}>
                  {u.t}
                </AkChip>
              ))}
            </div>
            <div
              className="tc-a tc-in"
              style={cv({ '--d': '1200ms', marginTop: 34, padding: '18px 22px', borderRadius: 16, background: 'rgba(3,5,12,0.7)', border: '2px dashed rgba(77,166,255,0.5)', fontFamily: mono, fontSize: 24, lineHeight: 1.5 })}
            >
              <div style={{ color: C.muted }}>Columbus is the capital of</div>
              <div style={{ position: 'relative', height: 40, marginTop: 6 }}>
                {['Ohio', 'the', 'a'].map((w, i) => (
                  <span key={w} className="tc-a ak-cycle" style={cv({ '--dl': `${1.2 + i * 2}s`, position: 'absolute', left: 0, top: 0, color: [C.green, C.gold, '#B07AD0'][i], fontWeight: 700, opacity: 0 })}>
                    {w}
                    <span style={{ color: C.dim, fontSize: 18, marginLeft: 14 }}>{['92%', '3%', '2%'][i]}</span>
                  </span>
                ))}
              </div>
              <div style={{ color: C.dim, fontSize: 18 }}>next-token prediction</div>
            </div>
          </AkCard>
        </Step>
        {/* click 2 — the models */}
        <Step duration={200}>
          <AkCard x={690} y={290} w={530} h={640} color={C.green} label="MODELS">
            {AK_MODELS.map((m, i) => (
              <div key={m.t} className="tc-a tc-in" style={cv({ '--d': `${200 + i * 170}ms`, display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 })}>
                <span
                  className="tc-a ak-glowf"
                  style={cv({ '--gc': m.c, '--dl': `${1 + i * 0.4}s`, width: 22, height: 22, borderRadius: '50%', background: m.c, flexShrink: 0 })}
                />
                <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', color: m.c === '#C9D3EC' ? '#F3F6FC' : '#F3F6FC', borderBottom: `4px solid ${m.c}`, paddingBottom: 2 }}>{m.t}</span>
              </div>
            ))}
            <div className="tc-a tc-in" style={cv({ '--d': '1200ms', marginTop: 30, fontFamily: mono, fontSize: 22, lineHeight: 1.5, color: C.muted })}>
              Open weights, closed APIs, and everything in between.
            </div>
          </AkCard>
        </Step>
        {/* click 3 — non-deterministic */}
        <Step duration={200}>
          <AkCard x={1260} y={290} w={540} h={640} color={C.gold} label="AI IS NON-DETERMINISTIC">
            <div style={{ fontFamily: mono, fontSize: 20, color: C.muted, marginBottom: 8 }}>same prompt → different answers</div>
            <div className="tc-a tc-in" style={cv({ '--d': '200ms', position: 'relative', height: 70, borderRadius: 14, border: `2px solid ${C.gold}`, background: 'rgba(255,197,107,0.1)' })}>
              {AK_SAMPLES.map((s, i) => (
                <span key={s} className="tc-a ak-cycle" style={cv({ '--dl': `${i * 2}s`, position: 'absolute', left: 20, top: 18, fontSize: 30, fontWeight: 800, color: C.gold, opacity: 0 })}>
                  {s}
                </span>
              ))}
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '500ms', marginTop: 26, fontSize: 28, fontWeight: 800 })}>
              Prompt Engineering
            </div>
            <div style={{ marginTop: 10 }}>
              <AkChip color={C.teal} d={700} fs={26}>
                zero-shot
              </AkChip>
              <AkChip color={C.green} d={850} fs={26}>
                one-shot
              </AkChip>
              <AkChip color={C.gold} d={1000} fs={26}>
                few-shot
              </AkChip>
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '1200ms', marginTop: 10, fontSize: 26, lineHeight: 1.35, fontWeight: 700 })}>
              Run locally with <span style={{ color: '#4DA6FF' }}>Ollama</span> — an open-source platform and runtime.
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '1450ms', marginTop: 14, fontSize: 26, lineHeight: 1.35, fontWeight: 700, color: C.muted })}>
              Foundational Models and Inferencing
            </div>
          </AkCard>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak4.transition = settle;

/* ───────────────────────── 33 · tokens and the context window ───────────────────────── */

const AK_TOKS = [
  { t: 'Col', id: '1163' },
  { t: 'umbus', id: '28372' },
  { t: 'is', id: '374' },
  { t: 'the', id: '279' },
  { t: 'capital', id: '6864' },
  { t: 'of', id: '315' },
  { t: 'Ohio', id: '14352' },
  { t: '.', id: '13' },
];

const Ak5: Page = () => {
  return (
    <Frame eyebrow="33 · AI 101 · TOKENS" title={<AkTitle size={64}>Tokens and the context window</AkTitle>}>
      <style>{AK_CSS}</style>
      <AkStage>
        {/* click 1 — tokens */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div className="tc-a tc-in" style={cv({ '--d': '0ms', position: 'absolute', left: 120, top: 262, fontFamily: mono, fontSize: 24, letterSpacing: '0.12em', color: C.gold })}>
              THE MODEL READS TOKENS, NOT WORDS
            </div>
            <div style={{ position: 'absolute', left: 120, top: 310, display: 'inline-flex', flexDirection: 'column' }}>
              <div className="tc-a tc-in" style={cv({ '--d': '150ms', fontSize: 36, fontWeight: 700, color: C.muted, marginBottom: 16 })}>
                “Columbus is the capital of Ohio.”
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                {AK_TOKS.map((k, i) => (
                  <div key={k.t + k.id} style={{ textAlign: 'center' }}>
                    <div
                      className="tc-a tc-in"
                      style={cv({ '--d': `${600 + i * 170}ms`, padding: '12px 26px', borderRadius: 16, border: `3px solid ${AI_PALETTE[i % 5]}`, background: `${AI_PALETTE[i % 5]}26`, fontSize: 54, fontWeight: 800, letterSpacing: '-0.02em' })}
                    >
                      {k.t}
                    </div>
                    <div className="tc-a tc-in" style={cv({ '--d': `${900 + i * 170}ms`, marginTop: 8, fontFamily: mono, fontSize: 20, color: C.dim })}>
                      {k.id}
                    </div>
                  </div>
                ))}
              </div>
              <div className="tc-a tc-in" style={cv({ '--d': '2100ms', height: 16, marginTop: 8, borderLeft: `4px solid ${C.gold}`, borderRight: `4px solid ${C.gold}`, borderBottom: `4px solid ${C.gold}`, borderRadius: '0 0 10px 10px' })} />
              <div className="tc-a tc-in" style={cv({ '--d': '2250ms', textAlign: 'center', marginTop: 8, fontSize: 36, fontWeight: 900, color: C.gold })}>
                8 tokens
              </div>
              <div className="tc-a tc-in" style={cv({ '--d': '2400ms', marginTop: 4, fontFamily: mono, fontSize: 20, color: C.dim })}>
                Illustrative split. Each model family has its own tokenizer.
              </div>
            </div>
          </div>
        </Step>
        {/* click 2 — the context window */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', left: 120, top: 622, width: 1680, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="tc-a tc-in" style={cv({ '--d': '0ms', fontFamily: mono, fontSize: 24, letterSpacing: '0.12em', color: C.gold })}>
                CONTEXT WINDOW = PROMPT + ANSWER
              </span>
              <span className="tc-a tc-in" style={cv({ '--d': '200ms', fontSize: 32, fontWeight: 800 })}>
                <span style={{ color: '#B07AD0' }}>Qwen3-8B</span> · 32,768 tokens
              </span>
            </div>
            <div style={{ position: 'absolute', left: 120, top: 676, width: 1680, height: 76, display: 'flex', borderRadius: 18, overflow: 'hidden', border: '3px solid rgba(169,183,217,0.5)' }}>
              <div className="tc-a ak-bar" style={cv({ '--t': '1300ms', '--d': '300ms', width: 1260, background: 'rgba(77,166,255,0.38)', borderRight: '3px solid #03050C', display: 'flex', alignItems: 'center', paddingLeft: 24, fontSize: 28, fontWeight: 800, whiteSpace: 'nowrap' })}>
                PROMPT <span style={{ color: '#4DA6FF', marginLeft: 12 }}>· 24,576 input tokens</span>
              </div>
              <div className="tc-a ak-fade" style={cv({ '--d': '1500ms', flex: 1, background: 'rgba(91,228,155,0.38)', display: 'flex', alignItems: 'center', paddingLeft: 22, fontSize: 28, fontWeight: 800, whiteSpace: 'nowrap' })}>
                ANSWER <span style={{ color: C.green, marginLeft: 12 }}>· 8,192</span>
              </div>
            </div>
          </div>
        </Step>
        {/* click 3 — squeezing the answer */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', left: 120, top: 818, width: 900, height: 60, display: 'flex', borderRadius: 14, overflow: 'hidden', border: '3px solid rgba(255,93,108,0.7)' }}>
              <div className="tc-a ak-squeeze" style={cv({ '--w0': '675px', '--w1': '900px', width: 675, flexShrink: 0, background: 'rgba(77,166,255,0.42)', display: 'flex', alignItems: 'center', paddingLeft: 20, fontSize: 24, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden' })}>
                PROMPT
              </div>
              <div style={{ flex: 1, minWidth: 0, background: 'rgba(91,228,155,0.38)', display: 'flex', alignItems: 'center', paddingLeft: 16, fontSize: 24, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                ANSWER
              </div>
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '300ms', position: 'absolute', left: 1060, top: 796, width: 740, fontSize: 28, lineHeight: 1.3, fontWeight: 700 })}>
              Fill the window with prompt and there’s <span style={{ color: C.red }}>no room for the answer</span> — and every token in the window takes{' '}
              <span style={{ color: '#4DA6FF' }}>KV-cache memory</span>.
            </div>
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak5.transition = settle;

/* ───────────────────────── 34 · attention and the KV cache ───────────────────────── */

const AK_SENT = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
const AK_ATT = [0.15, 0.35, 0.8, 0.6, 0.5];
const akCx = (i: number) => 320 + i * 256;
const akArc = (i: number) => {
  const h = 90 + (5 - i) * 28;
  return `M ${akCx(5)} 430 C ${akCx(5)} ${430 - h}, ${akCx(i)} ${430 - h}, ${akCx(i)} 430`;
};

const Ak6: Page = () => {
  return (
    <Frame eyebrow="34 · AI 101 · ATTENTION" title={<AkTitle size={64}>Attention and the KV cache</AkTitle>}>
      <style>{AK_CSS}</style>
      <AkStage>
        {/* click 1 — the tokens */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            {AK_SENT.map((w, i) => (
              <div
                key={`${w}${i}`}
                className="tc-a tc-in"
                style={cv({ '--d': `${i * 170}ms`, position: 'absolute', left: akCx(i) - 110, top: 430, width: 220, height: 90, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 18, border: `3px solid ${i === 5 ? C.gold : AI_PALETTE[i % 5]}`, background: i === 5 ? 'rgba(255,197,107,0.2)' : `${AI_PALETTE[i % 5]}22`, fontSize: 52, fontWeight: 800 })}
              >
                {w}
              </div>
            ))}
          </div>
        </Step>
        {/* click 2 — attention */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              {AK_ATT.map((a, i) => (
                <g key={`a${i}`}>
                  <path className="tc-a ak-draw" style={cv({ '--t': '900ms', '--d': `${300 + (4 - i) * 160}ms` })} pathLength={1} d={akArc(i)} fill="none" stroke={C.gold} strokeWidth={2 + a * 9} strokeLinecap="round" opacity={0.35 + a * 0.5} />
                  <path className="tc-a ak-flowr" style={cv({ '--t': `${1.2 + i * 0.2}s` })} d={akArc(i)} fill="none" stroke="#FFF3D6" strokeWidth={3} strokeLinecap="round" />
                </g>
              ))}
              <rect className="tc-a ak-pop" style={cv({ '--d': '100ms' })} x={akCx(5) - 124} y={420} width={248} height={110} rx={26} fill="none" stroke={C.gold} strokeWidth={4} />
              <g className="tc-a ak-drop" style={cv({ '--d': '400ms' })}>
                <rect x={akCx(5) - 100} y={546} width={200} height={40} rx={20} fill={C.gold} />
                <text x={akCx(5)} y={574} textAnchor="middle" fontSize={22} fontWeight={800} fill="#2A1C03" style={{ fontFamily: mono }}>
                  NEW TOKEN
                </text>
              </g>
            </svg>
            <AkCard x={120} y={700} w={530} h={250} color={C.gold} label="ATTENTION">
              <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>Each new token looks back to decide which earlier tokens matter.</div>
            </AkCard>
          </div>
        </Step>
        {/* click 3 — the KV cache */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              {AK_SENT.slice(0, 5).map((w, i) => (
                <g key={`kv${i}`}>
                  <g className="tc-a ak-drop" style={cv({ '--d': `${200 + i * 170}ms` })}>
                    <rect x={akCx(i) - 74} y={548} width={68} height={46} rx={10} fill="#4DA6FF" />
                    <text x={akCx(i) - 40} y={579} textAnchor="middle" fontSize={26} fontWeight={800} fill="#03050C" style={{ fontFamily: mono }}>
                      K
                    </text>
                    <rect x={akCx(i) + 6} y={548} width={68} height={46} rx={10} fill="#B07AD0" />
                    <text x={akCx(i) + 40} y={579} textAnchor="middle" fontSize={26} fontWeight={800} fill="#fff" style={{ fontFamily: mono }}>
                      V
                    </text>
                  </g>
                </g>
              ))}
              <g className="tc-a ak-fade" style={cv({ '--d': '1100ms' })}>
                <path d={`M ${akCx(0) - 100} 614 L ${akCx(0) - 100} 628 L ${akCx(4) + 100} 628 L ${akCx(4) + 100} 614`} fill="none" stroke={C.teal} strokeWidth={3} />
                <text x={(akCx(0) + akCx(4)) / 2} y={662} textAnchor="middle" fontSize={22} letterSpacing="0.1em" fill={C.teal} style={{ fontFamily: mono }}>
                  EARLIER TOKENS · keys + values already cached
                </text>
              </g>
            </svg>
            <AkCard x={690} y={700} w={530} h={250} color="#4DA6FF" label="KV CACHE">
              <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>Keys and values for earlier tokens are stored, not recomputed.</div>
            </AkCard>
          </div>
        </Step>
        {/* click 4 — the cost */}
        <Step duration={200}>
          <AkCard x={1260} y={700} w={540} h={250} color={C.red} label="THE COST">
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>The cache grows with every token in the context.</div>
            <div style={{ marginTop: 22, height: 26, borderRadius: 13, background: 'rgba(255,93,108,0.18)', overflow: 'hidden' }}>
              <div className="tc-a ak-bar" style={cv({ '--t': '3000ms', '--d': '400ms', height: '100%', borderRadius: 13, background: 'linear-gradient(90deg, #FFC56B, #FF5D6C)' })} />
            </div>
            <div style={{ marginTop: 8, fontFamily: mono, fontSize: 20, color: C.dim }}>memory ▸ ▸ ▸</div>
          </AkCard>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak6.transition = settle;

/* ───────────────────────── 35 · generative, agentic, encoder / decoder ───────────────────────── */

const Ak7: Page = () => {
  const lbl = { fontFamily: mono } as CSSProperties;
  return (
    <Frame eyebrow="35 · AI 101 · TERMS" title={<AkTitle size={58}>Generative AI, agentic AI, encoders &amp; decoders</AkTitle>}>
      <style>{AK_CSS}</style>
      <AkStage>
        {/* click 1 — generative */}
        <Step duration={200}>
          <AkCard x={120} y={290} w={530} h={640} color="#4DA6FF" label="GENERATIVE AI">
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>
              Generates <span style={{ color: '#4DA6FF' }}>text, images, videos</span> or other data — often in response to prompts.
            </div>
            <svg width={464} height={270} viewBox="0 0 464 270" style={{ display: 'block', marginTop: 24 }}>
              <g className="tc-a ak-glowf" style={cv({ '--gc': '#4DA6FF', '--dl': '0.5s' })}>
                <rect x={4} y={100} width={120} height={64} rx={14} fill="rgba(77,166,255,0.18)" stroke="#4DA6FF" strokeWidth={3} />
                <text x={64} y={140} textAnchor="middle" fontSize={22} fill="#4DA6FF" style={lbl}>
                  prompt
                </text>
              </g>
              <line className="tc-a ak-flow" x1={130} y1={132} x2={190} y2={132} stroke={C.gold} strokeWidth={4} strokeLinecap="round" />
              <rect x={196} y={20} width={264} height={224} rx={20} fill="rgba(3,5,12,0.7)" stroke="rgba(169,183,217,0.4)" strokeWidth={2} />
              {/* text */}
              <g className="tc-a ak-cycle" style={cv({ '--dl': '0s', opacity: 0 })}>
                <rect x={226} y={70} width={204} height={14} rx={7} fill="#4DA6FF" />
                <rect x={226} y={100} width={160} height={14} rx={7} fill="#5BE49B" />
                <rect x={226} y={130} width={190} height={14} rx={7} fill="#FFC56B" />
                <rect x={226} y={160} width={120} height={14} rx={7} fill="#B07AD0" />
                <text x={328} y={214} textAnchor="middle" fontSize={20} fill={C.muted} style={lbl}>
                  text
                </text>
              </g>
              {/* image */}
              <g className="tc-a ak-cycle" style={cv({ '--dl': '2s', opacity: 0 })}>
                <rect x={236} y={56} width={184} height={124} rx={10} fill="#0B1A33" stroke="#4DA6FF" strokeWidth={3} />
                <circle cx={384} cy={88} r={14} fill={C.gold} />
                <polygon points="236,180 296,106 336,150 366,120 420,180" fill="#5BE49B" />
                <text x={328} y={214} textAnchor="middle" fontSize={20} fill={C.muted} style={lbl}>
                  image
                </text>
              </g>
              {/* video */}
              <g className="tc-a ak-cycle" style={cv({ '--dl': '4s', opacity: 0 })}>
                <rect x={236} y={56} width={184} height={124} rx={10} fill="#1A0B2E" stroke="#B07AD0" strokeWidth={3} />
                <polygon points="304,86 304,150 358,118" fill="#fff" />
                {[0, 1, 2, 3, 4, 5].map((k) => (
                  <rect key={k} x={242 + k * 30} y={186} width={18} height={10} rx={2} fill="#B07AD0" />
                ))}
                <text x={328} y={226} textAnchor="middle" fontSize={20} fill={C.muted} style={lbl}>
                  video
                </text>
              </g>
              {[
                [150, 60],
                [24, 70],
                [168, 200],
              ].map(([x, y], i) => (
                <path key={`sp${i}`} className="tc-a tc-spark" style={cv({ '--d': `${i * 0.5}s` })} d={`M ${x} ${y - 10} L ${x + 3} ${y - 3} L ${x + 10} ${y} L ${x + 3} ${y + 3} L ${x} ${y + 10} L ${x - 3} ${y + 3} L ${x - 10} ${y} L ${x - 3} ${y - 3} Z`} fill={C.gold} />
              ))}
            </svg>
          </AkCard>
        </Step>
        {/* click 2 — agentic */}
        <Step duration={200}>
          <AkCard x={690} y={290} w={530} h={640} color={C.green} label="AGENTIC AI">
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>
              Takes a <span style={{ color: C.green }}>goal</span>, breaks it into steps, decides, uses <span style={{ color: C.gold }}>tools</span> or data sources — and acts with some autonomy.
            </div>
            <svg width={464} height={270} viewBox="0 0 464 270" style={{ display: 'block', marginTop: 14 }}>
              <g className="tc-a ak-pop" style={cv({ '--d': '300ms' })}>
                <rect x={4} y={8} width={130} height={44} rx={22} fill="rgba(91,228,155,0.2)" stroke={C.green} strokeWidth={3} />
                <text x={69} y={38} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.green} style={lbl}>
                  GOAL
                </text>
              </g>
              {[
                { t: 'plan', y: 98 },
                { t: 'decide', y: 154 },
                { t: 'act', y: 210 },
              ].map((s, i) => (
                <g key={s.t}>
                  <line className="tc-a ak-draw" style={cv({ '--t': '500ms', '--d': `${500 + i * 200}ms` })} pathLength={1} x1={32} y1={i === 0 ? 54 : s.y - 52} x2={32} y2={s.y - 14} stroke={C.green} strokeWidth={3} />
                  <rect className="tc-a ak-pop" style={cv({ '--d': `${600 + i * 200}ms` })} x={14} y={s.y - 14} width={36} height={36} rx={9} fill="none" stroke={C.green} strokeWidth={3} />
                  <path className="tc-a ak-tick" style={cv({ '--dl': `${1 + i * 1.3}s`, opacity: 0 })} d={`M 22 ${s.y + 5} L 30 ${s.y + 13} L 44 ${s.y - 6}`} fill="none" stroke={C.green} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                  <text className="tc-a ak-fade" style={{ ...cv({ '--d': `${800 + i * 200}ms` }), ...lbl }} x={66} y={s.y + 14} fontSize={26} fontWeight={700} fill="#F3F6FC">
                    {s.t}
                  </text>
                  <line className="tc-a ak-flow" style={cv({ '--dl': `${-i * 0.4}s` })} x1={180} y1={s.y + 4} x2={290} y2={s.y + 4} stroke={C.gold} strokeWidth={3.5} strokeLinecap="round" />
                </g>
              ))}
              {[
                { t: 'search', y: 98 },
                { t: 'code', y: 154 },
                { t: 'data', y: 210 },
              ].map((s, i) => (
                <g key={s.t} className="tc-a ak-expert" style={cv({ '--dl': `${i * 2}s` })}>
                  <rect x={296} y={s.y - 16} width={150} height={42} rx={21} fill="rgba(255,197,107,0.18)" stroke={C.gold} strokeWidth={3} />
                  <text x={371} y={s.y + 12} textAnchor="middle" fontSize={22} fill={C.gold} style={lbl}>
                    {s.t}
                  </text>
                </g>
              ))}
            </svg>
          </AkCard>
        </Step>
        {/* click 3 — encoder / decoder */}
        <Step duration={200}>
          <AkCard x={1260} y={290} w={540} h={640} color="#B07AD0" label="ENCODER / DECODER">
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>
              An <span style={{ color: '#4DA6FF' }}>encoder</span> builds a representation of the input; a <span style={{ color: C.gold }}>decoder</span> generates what comes next.
            </div>
            <svg width={474} height={270} viewBox="0 0 474 270" style={{ display: 'block', marginTop: 24 }}>
              <g className="tc-a ak-pop" style={cv({ '--d': '300ms' })}>
                <rect x={0} y={96} width={64} height={52} rx={12} fill="rgba(169,183,217,0.16)" stroke={C.muted} strokeWidth={2.5} />
                <text x={32} y={129} textAnchor="middle" fontSize={20} fill={C.muted} style={lbl}>
                  input
                </text>
              </g>
              <line className="tc-a ak-flow" x1={68} y1={122} x2={96} y2={122} stroke="#4DA6FF" strokeWidth={3.5} strokeLinecap="round" />
              <g className="tc-a ak-pop" style={cv({ '--d': '500ms' })}>
                <rect x={100} y={70} width={110} height={104} rx={16} fill="rgba(77,166,255,0.2)" stroke="#4DA6FF" strokeWidth={3.5} />
                <text x={155} y={116} textAnchor="middle" fontSize={20} fontWeight={800} fill="#4DA6FF" style={lbl}>
                  ENCODER
                </text>
              </g>
              <g className="tc-a ak-fade" style={cv({ '--d': '900ms' })}>
                {[0, 1, 2, 3].map((k) => (
                  <rect key={k} className="tc-a ak-breathe" style={cv({ '--dl': `${k * 0.25}s` })} x={226} y={76 + k * 26} width={24} height={20} rx={5} fill={AI_PALETTE[k]} />
                ))}
              </g>
              <line className="tc-a ak-flow" x1={254} y1={122} x2={274} y2={122} stroke={C.gold} strokeWidth={3.5} strokeLinecap="round" />
              <g className="tc-a ak-pop" style={cv({ '--d': '1100ms' })}>
                <rect x={278} y={70} width={110} height={104} rx={16} fill="rgba(255,197,107,0.2)" stroke={C.gold} strokeWidth={3.5} />
                <text x={333} y={116} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.gold} style={lbl}>
                  DECODER
                </text>
              </g>
              <line className="tc-a ak-flow" x1={392} y1={122} x2={414} y2={122} stroke={C.gold} strokeWidth={3.5} strokeLinecap="round" />
              <g className="tc-a ak-pop" style={cv({ '--d': '1300ms' })}>
                <rect x={418} y={96} width={56} height={52} rx={12} fill="rgba(91,228,155,0.2)" stroke={C.green} strokeWidth={2.5} />
                <text x={446} y={129} textAnchor="middle" fontSize={20} fill={C.green} style={lbl}>
                  next
                </text>
              </g>
              <g className="tc-a ak-drop" style={cv({ '--d': '1700ms' })}>
                <rect x={60} y={206} width={354} height={44} rx={22} fill="rgba(255,197,107,0.14)" stroke={C.gold} strokeWidth={2.5} strokeDasharray="8 6" />
                <text x={237} y={235} textAnchor="middle" fontSize={21} fontWeight={700} fill={C.gold} style={lbl}>
                  most chat LLMs: decoder-only
                </text>
              </g>
            </svg>
          </AkCard>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak7.transition = settle;

/* ───────────────────────── 36 · stay curious — the demo ───────────────────────── */

const AK_STARS = (() => {
  const r = aiRand(36);
  return Array.from({ length: 36 }, () => ({ x: 130 + r() * 1040, y: 300 + r() * 640, s: 2 + r() * 4, d: r() * 3 }));
})();

const AkCuriousTitle = () => (
  <AkTitle size={84}>
    Stay <span className="ai-shine">Curious</span>
  </AkTitle>
);

const AkLink = ({ href, w, n, td = '300ms', size = 26 }: { href: string; w: number; n: number; td?: string; size?: number }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{ display: 'inline-block', padding: '14px 22px', borderRadius: 14, background: 'rgba(3,5,12,0.85)', border: `2px solid ${C.gold}`, color: C.gold, textDecoration: 'none', fontFamily: mono, fontSize: size }}
  >
    <span className="tc-a ai-type" style={cv({ '--w': `${w}px`, '--n': n, '--td': td, display: 'inline-block', verticalAlign: 'bottom' })}>
      {href.replace(/^https?:\/\//, '')}
    </span>
    <span className="ai-cursor" style={{ display: 'inline-block', width: 12, height: size, marginLeft: 4, background: C.gold, opacity: 0, verticalAlign: 'bottom' }} />
  </a>
);

const Ak8: Page = () => {
  return (
    <Frame eyebrow="36 · AI 101 · STAY CURIOUS" title={<AkCuriousTitle />}>
      <style>
        {AI_CSS}
        {AK_CSS}
      </style>
      <AkStage>
        {/* click 1 — a demo */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              {AK_STARS.map((s, i) => (
                <circle
                  // biome-ignore lint/suspicious/noArrayIndexKey: static generated geometry
                  key={i}
                  className="tc-a ak-breathe"
                  style={cv({ '--t': `${2 + (i % 4) * 0.6}s`, '--dl': `${s.d}s` })}
                  cx={s.x}
                  cy={s.y}
                  r={s.s}
                  fill="#F3F6FC"
                />
              ))}
              <g className="tc-a ak-pop" style={cv({ '--d': '200ms' })}>
                <circle cx={230} cy={850} r={80} fill="#1B4D8F" stroke="#4DA6FF" strokeWidth={4} />
                <path d="M 190 820 q 22 -22 48 -6 q 18 14 -4 34 q -24 14 -44 -4 z M 250 876 q 22 -8 34 10 q -10 22 -34 12 z" fill="#5BE49B" />
                <text x={230} y={972} textAnchor="middle" fontSize={22} fill={C.muted} style={{ fontFamily: mono }}>
                  EARTH
                </text>
              </g>
            </svg>
            <div className="tc-a tc-in" style={cv({ '--d': '400ms', position: 'absolute', left: 1250, top: 300, width: 550, fontSize: 64, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.04em' })}>
              And now a <span className="ai-shine">demo!</span>
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '800ms', position: 'absolute', left: 1250, top: 440, width: 550, fontSize: 48, lineHeight: 1.15, fontWeight: 800, color: C.gold, letterSpacing: '-0.03em' })}>
              Let’s build something!
            </div>
          </div>
        </Step>
        {/* click 2 — a galactic trip to Mars */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={akSvg}>
              <path className="tc-a ak-draw" style={cv({ '--t': '2400ms', '--d': '200ms' })} pathLength={1} d="M 300 830 C 520 470, 820 960, 1010 500" fill="none" stroke={C.gold} strokeWidth={4} strokeLinecap="round" />
              <g className="tc-a ak-pop" style={cv({ '--d': '2000ms' })}>
                <circle className="tc-a ak-ripple" style={cv({ '--dl': '0s', transformBox: 'fill-box', transformOrigin: 'center' })} cx={1040} cy={470} r={64} fill="none" stroke="#FF5D6C" strokeWidth={3} />
                <circle className="tc-a ak-ripple" style={cv({ '--dl': '1.5s', transformBox: 'fill-box', transformOrigin: 'center' })} cx={1040} cy={470} r={64} fill="none" stroke="#FF5D6C" strokeWidth={3} />
                <circle cx={1040} cy={470} r={64} fill="#B5432E" stroke="#FF8A4C" strokeWidth={4} />
                <circle cx={1016} cy={450} r={12} fill="#8A2F1F" />
                <circle cx={1066} cy={494} r={16} fill="#8A2F1F" />
                <circle cx={1054} cy={436} r={7} fill="#8A2F1F" />
                <text x={1040} y={576} textAnchor="middle" fontSize={22} fill="#FF8A4C" style={{ fontFamily: mono }}>
                  MARS
                </text>
              </g>
            </svg>
            <div
              className="tc-a ak-rocket"
              style={cv({ position: 'absolute', left: 0, top: 0, fontSize: 64, lineHeight: 1, offsetPath: "path('M 300 830 C 520 470, 820 960, 1010 500')", offsetRotate: 'auto 45deg', offsetAnchor: '50% 50%' })}
            >
              🚀
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '300ms', position: 'absolute', left: 1250, top: 600, width: 550, fontSize: 38, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.02em' })}>
              How about a <span style={{ color: '#4DA6FF' }}>Galactic Travel Website</span> to book your vacation to <span style={{ color: '#FF8A4C' }}>Mars</span>!
            </div>
          </div>
        </Step>
        {/* click 3 — the repo */}
        <Step duration={200}>
          <div style={{ position: 'absolute', left: 1250, top: 810 }}>
            <div className="tc-a tc-in" style={cv({ '--d': '0ms', fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', color: C.dim, marginBottom: 10 })}>
              THE CODE
            </div>
            <AkLink href="https://github.com/IBM/galaxium-travels" w={620} n={36} size={25} />
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak8.transition = settle;

/* ───────────────────────── 37 · stay curious — tools you need ───────────────────────── */

const Ak9: Page = () => {
  return (
    <Frame eyebrow="37 · AI 101 · STAY CURIOUS" title={<AkCuriousTitle />}>
      <style>
        {AI_CSS}
        {AK_CSS}
      </style>
      <AkStage>
        <Step duration={200}>
          <div className="tc-a tc-in" style={cv({ '--d': '0ms', position: 'absolute', left: 120, top: 280, fontSize: 66, fontWeight: 900, letterSpacing: '-0.04em' })}>
            Tools you <span className="ai-shine">need</span>
          </div>
        </Step>
        {/* click 2 — LinkedIn */}
        <Step duration={200}>
          <AkCard x={120} y={430} w={820} h={470} color="#0A8CFF" label="LINKEDIN">
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 26 }}>
              <div style={{ position: 'relative', width: 190, height: 190, flexShrink: 0 }}>
                <div className="tc-a ak-ripple" style={cv({ '--dl': '0s', position: 'absolute', inset: 0, borderRadius: 40, border: '3px solid #0A66C2' })} />
                <div className="tc-a ak-ripple" style={cv({ '--dl': '1.5s', position: 'absolute', inset: 0, borderRadius: 40, border: '3px solid #0A66C2' })} />
                <div className="tc-a ak-pop" style={cv({ '--d': '300ms', position: 'absolute', inset: 0, borderRadius: 40, background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, fontWeight: 900, letterSpacing: '-0.06em' })}>
                  in
                </div>
              </div>
              <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>
                <div className="tc-a tc-in" style={cv({ '--d': '600ms' })}>
                  Build your <span style={{ color: '#4DA6FF' }}>network</span>
                </div>
                <div className="tc-a tc-in" style={cv({ '--d': '850ms' })}>
                  Share what you <span style={{ color: C.green }}>learn</span>
                </div>
                <div className="tc-a tc-in" style={cv({ '--d': '1100ms' })}>
                  Be <span style={{ color: C.gold }}>found</span>
                </div>
              </div>
            </div>
          </AkCard>
        </Step>
        {/* click 3 — GitHub */}
        <Step duration={200}>
          <AkCard x={980} y={430} w={820} h={470} color="#B07AD0" label="GITHUB">
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 26 }}>
              <div style={{ position: 'relative', width: 190, height: 190, flexShrink: 0 }}>
                <svg width={190} height={190} viewBox="0 0 190 190" style={{ display: 'block' }}>
                  <circle className="tc-a ak-pop" style={cv({ '--d': '300ms' })} cx={95} cy={95} r={90} fill="#161B26" stroke="#F3F6FC" strokeWidth={5} />
                  <g fill="none" stroke="#F3F6FC" strokeWidth={7} strokeLinecap="round">
                    <path className="tc-a ak-draw" style={cv({ '--t': '700ms', '--d': '600ms' })} pathLength={1} d="M 70 52 L 70 138" />
                    <path className="tc-a ak-draw" style={cv({ '--t': '800ms', '--d': '900ms' })} pathLength={1} d="M 70 112 C 70 82, 126 108, 126 74" />
                  </g>
                  <circle className="tc-a ak-pop" style={cv({ '--d': '600ms' })} cx={70} cy={52} r={13} fill={C.green} />
                  <circle className="tc-a ak-pop" style={cv({ '--d': '700ms' })} cx={70} cy={138} r={13} fill="#4DA6FF" />
                  <circle className="tc-a ak-pop" style={cv({ '--d': '1500ms' })} cx={126} cy={74} r={13} fill={C.gold} />
                </svg>
              </div>
              <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>
                <div className="tc-a tc-in" style={cv({ '--d': '600ms' })}>
                  Where code <span style={{ color: C.green }}>lives</span>
                </div>
                <div className="tc-a tc-in" style={cv({ '--d': '850ms' })}>
                  Fork it, <span style={{ color: '#B07AD0' }}>learn</span> from it
                </div>
                <div className="tc-a tc-in" style={cv({ '--d': '1100ms' })}>
                  Your <span style={{ color: C.gold }}>portfolio</span>
                </div>
              </div>
            </div>
          </AkCard>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak9.transition = settle;

/* ───────────────────────── 38 · stay curious — keep learning ───────────────────────── */

const AK_EXPERTS = Array.from({ length: 8 }, (_, i) => ({ x: 500 + (i % 2) * 150, y: 20 + Math.floor(i / 2) * 140 }));

const Ak10: Page = () => {
  const lbl = { fontFamily: mono } as CSSProperties;
  return (
    <Frame eyebrow="38 · AI 101 · STAY CURIOUS" title={<AkCuriousTitle />}>
      <style>
        {AI_CSS}
        {AK_CSS}
      </style>
      <AkStage>
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div className="tc-a tc-in" style={cv({ '--d': '0ms', position: 'absolute', left: 120, top: 290, fontSize: 80, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 })}>
              KEEP <span className="ai-shine">LEARNING!</span>
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '500ms', position: 'absolute', left: 120, top: 420, width: 760, fontSize: 40, lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.02em' })}>
              IBM’s <span style={{ color: C.gold }}>A Mixture of Experts</span> podcast
            </div>
            {/* podcast player */}
            <div className="tc-a tc-in" style={cv({ '--d': '800ms', position: 'absolute', left: 120, top: 560, width: 760, height: 120, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 26, padding: '0 28px', borderRadius: 60, background: 'rgba(11,16,32,0.9)', border: `3px solid ${C.teal}` })}>
              <svg width={64} height={64} viewBox="0 0 64 64">
                <circle cx={32} cy={32} r={30} fill={C.teal} />
                <polygon points="26,19 26,45 48,32" fill="#03050C" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, height: 80, flex: 1 }}>
                {Array.from({ length: 26 }, (_, i) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: static decoration
                    key={i}
                    className="tc-a tc-sbar"
                    style={cv({ '--d': `${(i * 0.13) % 1.2}s`, width: 10, height: 20 + ((i * 37) % 52), flexShrink: 0 })}
                  />
                ))}
              </div>
            </div>
          </div>
        </Step>
        {/* click 2 — the mixture of experts */}
        <Step duration={200}>
          <svg width={820} height={620} viewBox="0 0 820 620" style={{ position: 'absolute', left: 980, top: 290, overflow: 'visible' }}>
            <g className="tc-a ak-pop" style={cv({ '--d': '100ms' })}>
              <rect x={0} y={250} width={100} height={64} rx={16} fill="rgba(169,183,217,0.16)" stroke={C.muted} strokeWidth={3} />
              <text x={50} y={290} textAnchor="middle" fontSize={22} fill={C.muted} style={lbl}>
                token
              </text>
            </g>
            <line className="tc-a ak-flow" x1={104} y1={282} x2={190} y2={282} stroke="#4DA6FF" strokeWidth={4} strokeLinecap="round" />
            <g className="tc-a ak-pop" style={cv({ '--d': '400ms' })}>
              <circle cx={250} cy={282} r={62} fill="rgba(77,166,255,0.2)" stroke="#4DA6FF" strokeWidth={4} />
              <text x={250} y={290} textAnchor="middle" fontSize={24} fontWeight={800} fill="#4DA6FF" style={lbl}>
                router
              </text>
            </g>
            {AK_EXPERTS.map((e, i) => (
              <g key={`ex${e.x}-${e.y}`}>
                <line x1={312} y1={282} x2={e.x} y2={e.y + 55} stroke="rgba(169,183,217,0.22)" strokeWidth={2} className="tc-a ak-fade" style={cv({ '--d': `${700 + i * 60}ms` })} />
                <line className="tc-a ak-expert" style={cv({ '--dl': `${(i * 0.75) % 6}s` })} x1={312} y1={282} x2={e.x} y2={e.y + 55} stroke={C.gold} strokeWidth={3.5} />
                <g className="tc-a ak-pop" style={cv({ '--d': `${800 + i * 90}ms` })}>
                  <g className="tc-a ak-expert" style={cv({ '--dl': `${(i * 0.75) % 6}s` })}>
                    <rect x={e.x} y={e.y} width={130} height={110} rx={18} fill="rgba(255,197,107,0.2)" stroke={C.gold} strokeWidth={3.5} />
                    <text x={e.x + 65} y={e.y + 52} textAnchor="middle" fontSize={20} fill={C.gold} style={lbl}>
                      expert
                    </text>
                    <text x={e.x + 65} y={e.y + 84} textAnchor="middle" fontSize={30} fontWeight={900} fill="#F3F6FC">
                      {i + 1}
                    </text>
                  </g>
                </g>
              </g>
            ))}
            <text className="tc-a ak-fade" style={{ ...cv({ '--d': '1800ms' }), ...lbl }} x={410} y={606} textAnchor="middle" fontSize={22} fill={C.muted}>
              only a few experts wake up per token
            </text>
          </svg>
        </Step>
        {/* click 3 — the link */}
        <Step duration={200}>
          <div style={{ position: 'absolute', left: 120, top: 740 }}>
            <div className="tc-a tc-in" style={cv({ '--d': '0ms', fontFamily: mono, fontSize: 20, letterSpacing: '0.12em', color: C.dim, marginBottom: 10 })}>
              LISTEN
            </div>
            <AkLink href="https://www.ibm.com/think/podcasts/mixture-of-experts" w={740} n={46} size={24} />
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak10.transition = settle;

/* ───────────────────────── 39 · this concludes ───────────────────────── */

const AK_CLOUD: { t: string; x: number; y: number; s: number; c: string; d: number }[] = [
  { t: 'machine learning', x: 1200, y: 560, s: 54, c: '#4DA6FF', d: 0 },
  { t: 'deep learning', x: 1330, y: 340, s: 42, c: C.gold, d: 120 },
  { t: 'models', x: 1560, y: 450, s: 50, c: C.green, d: 240 },
  { t: 'data', x: 1620, y: 640, s: 60, c: '#B07AD0', d: 360 },
  { t: 'classification', x: 1230, y: 700, s: 36, c: C.teal, d: 480 },
  { t: 'regression', x: 1500, y: 790, s: 38, c: C.red, d: 600 },
  { t: 'neural', x: 1210, y: 430, s: 34, c: '#FF8A4C', d: 720 },
  { t: 'training', x: 1280, y: 810, s: 40, c: C.green, d: 840 },
  { t: 'inference', x: 1600, y: 320, s: 34, c: '#4DA6FF', d: 960 },
  { t: 'weights', x: 1470, y: 900, s: 32, c: C.gold, d: 1080 },
  { t: 'bias', x: 1215, y: 910, s: 30, c: '#B07AD0', d: 1200 },
  { t: 'tokens', x: 1670, y: 880, s: 34, c: C.teal, d: 1320 },
  { t: 'features', x: 1420, y: 640, s: 30, c: '#C9D3EC', d: 1440 },
  { t: 'agents', x: 1690, y: 540, s: 36, c: '#FF8A4C', d: 1560 },
];

const Ak11: Page = () => {
  const rows: { y: number; h: number; node: ReactNode }[] = [
    {
      y: 290,
      h: 90,
      node: (
        <>
          In the future you will <span style={{ color: '#4DA6FF' }}>orchestrate agents</span>…
        </>
      ),
    },
    {
      y: 392,
      h: 130,
      node: (
        <>
          We are living through the <span style={{ color: C.gold }}>fastest, most exciting, fundamental shift</span> of our economy, our lives and how work gets done…
        </>
      ),
    },
    {
      y: 534,
      h: 130,
      node: (
        <>
          Within the last year, AI proved it could do the work of <span style={{ color: C.green }}>100 programmers</span>. In the coming years AI will grow{' '}
          <span style={{ color: '#B07AD0' }}>arms and legs</span> and live with us…
        </>
      ),
    },
  ];
  return (
    <Frame eyebrow="39 · AI 101 · WRAP-UP" title={<AkTitle size={84}>This Concludes</AkTitle>}>
      <style>
        {AI_CSS}
        {AK_CSS}
      </style>
      <AkStage>
        {/* click 1 — the word cloud assembles */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            {AK_CLOUD.map((w) => (
              <span
                key={w.t}
                className="tc-a ak-word"
                style={cv({ '--d': `${w.d}ms`, '--t': `${3.4 + (w.d % 5) * 0.2}s`, position: 'absolute', left: w.x, top: w.y, fontSize: w.s, fontWeight: 800, letterSpacing: '-0.02em', color: w.c, whiteSpace: 'nowrap', textShadow: `0 0 22px ${w.c}66` })}
              >
                {w.t}
              </span>
            ))}
          </div>
        </Step>
        {/* click 2 — the future */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            {rows.map((r, i) => (
              <div key={r.y} className="tc-a tc-in" style={cv({ '--d': `${i * 450}ms`, position: 'absolute', left: 120, top: r.y, width: 1000, height: r.h, fontSize: 33, lineHeight: 1.3, fontWeight: 700 })}>
                {r.node}
              </div>
            ))}
          </div>
        </Step>
        {/* click 3 — the warning */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div className="tc-a tc-in" style={cv({ '--d': '0ms', position: 'absolute', left: 120, top: 686, width: 1000, fontSize: 52, lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.03em' })}>
              The Future is <span className="ai-shine">now!</span>
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '500ms', position: 'absolute', left: 120, top: 760, width: 1000, fontSize: 33, lineHeight: 1.3, fontWeight: 700 })}>
              Do not anthropomorphize AI, it’s <span style={{ color: C.red }}>not alive</span>… We really do not understand how it works.
            </div>
          </div>
        </Step>
        {/* click 4 — use the silence */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div className="tc-a tc-in" style={cv({ '--d': '0ms', position: 'absolute', left: 120, top: 850, width: 1000, fontSize: 36, lineHeight: 1.2, fontWeight: 800, color: C.muted })}>
              Smart people are allowed to think. You are all smart.
            </div>
            <div className="tc-a tc-in ai-glow" style={cv({ '--d': '700ms', '--g0': 'rgba(255,197,107,0)', '--g1': 'rgba(255,197,107,0.7)', position: 'absolute', left: 120, top: 910, display: 'inline-block', padding: '4px 30px', borderRadius: 18, background: C.gold, color: '#2A1C03', fontSize: 52, fontWeight: 900, letterSpacing: '-0.03em' })}>
              Use the silence.
            </div>
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak11.transition = settle;

/* ───────────────────────── 40 · about the speaker ───────────────────────── */

const AK_STATS = [
  { n: '6', l: 'patents', c: C.gold },
  { n: '17', l: 'years at MAPSYS', c: '#4DA6FF' },
  { n: '2', l: 'engineering degrees', c: C.green },
];

const Ak12: Page = () => {
  return (
    <Frame eyebrow="40 · AI 101 · ABOUT THE SPEAKER" title={<AkTitle size={72}>About the speaker:</AkTitle>}>
      <style>
        {AI_CSS}
        {AK_CSS}
      </style>
      <AkStage>
        {/* click 1 — who */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', left: 120, top: 290, width: 380, height: 412 }}>
              <div className="tc-a ak-ripple" style={cv({ '--dl': '0s', position: 'absolute', inset: 0, borderRadius: 28, border: `3px solid ${C.gold}` })} />
              <div className="tc-a ak-ripple" style={cv({ '--dl': '1.5s', position: 'absolute', inset: 0, borderRadius: 28, border: `3px solid ${C.gold}` })} />
              <img
                className="tc-a ak-pop"
                src={akSpeaker}
                alt="Portrait of Daneyand “DJ” Singley"
                style={cv({ '--d': '100ms', position: 'relative', display: 'block', width: 380, height: 412, objectFit: 'cover', borderRadius: 28, border: '6px solid #fff', boxSizing: 'border-box', boxShadow: '0 0 44px rgba(255,197,107,0.4)' })}
              />
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '500ms', position: 'absolute', left: 120, top: 730, fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em' })}>
              Daneyand “DJ” Singley
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '700ms', position: 'absolute', left: 120, top: 790, fontSize: 30, fontWeight: 700, color: C.gold })}>
              Technical Leader &amp; Field CTO · IBM
            </div>
            <div className="tc-a tc-in" style={cv({ '--d': '950ms', position: 'absolute', left: 120, top: 856, fontFamily: mono, fontSize: 28, lineHeight: 1.55, color: C.muted })}>
              <div>
                ✉ <span style={{ color: '#F3F6FC' }}>Daneyand@IBM.com</span>
              </div>
              <div>
                ☎ <span style={{ color: '#F3F6FC' }}>802-598-6057</span>
              </div>
            </div>
          </div>
        </Step>
        {/* click 2 — the career */}
        <Step duration={200}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <AkBullet x={640} y={300} w={1160} fs={34} d={0}>
              <span style={{ color: '#4DA6FF' }}>17 years at MAPSYS</span>, an IBM Business Partner in Columbus, Ohio — Executive Director &amp; Chief Architect, leading the reseller business for a decade
            </AkBullet>
            <AkBullet x={640} y={450} w={1160} fs={34} d={450}>
              Began at IBM as a <span style={{ color: C.gold }}>microprocessor design engineer</span> — Apple G5 Macs, Nintendo Wii and Wii U, IBM Power servers — before moving to technical sales
            </AkBullet>
            <AkBullet x={640} y={600} w={1160} fs={34} d={900} color={C.green}>
              <span style={{ color: C.green }}>Six patents</span> and several published papers
            </AkBullet>
            <AkBullet x={640} y={680} w={1160} fs={34} d={1350} color="#B07AD0">
              <span style={{ color: '#D6B2EE' }}>BS Computer Engineering</span>, Rutgers · <span style={{ color: '#D6B2EE' }}>MS Electrical Engineering</span>, University of Vermont
            </AkBullet>
          </div>
        </Step>
        {/* click 3 — by the numbers */}
        <Step duration={200}>
          <div style={{ position: 'absolute', left: 640, top: 800, display: 'flex', gap: 34 }}>
            {AK_STATS.map((s, i) => (
              <div key={s.l} className="tc-a tc-in ai-glow" style={cv({ '--d': `${i * 250}ms`, '--g0': `${s.c}00`, '--g1': `${s.c}88`, width: 340, padding: '18px 0', borderRadius: 22, border: `3px solid ${s.c}`, background: `${s.c}1c`, textAlign: 'center' })}>
                <div style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, color: s.c }}>{s.n}</div>
                <div style={{ marginTop: 4, fontFamily: mono, fontSize: 22, letterSpacing: '0.06em', color: C.muted }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Step>
      </AkStage>
    </Frame>
  );
};
Ak12.transition = settle;

export const meta: SlideMeta = {
  title: 'What a career in technology looks like & how AI changes everything',
  createdAt: '2026-11-07T16:09:51.435Z',
};
export default [Cover, Agenda, Powers, Hello, College, Winlab, Internship, Tru64, Luck, WalkHome, IbmJob, IbmMore, MareNostrum, ShowTell, Learning, Patents, ThirdPoint, Tragedy, Opportunity, FourthPoint, IbmSales, SellingDesigned, Entrepreneurship, Mapsys, Customers, Speaking, BackAtIbm, FellIntoAi, Ak1, Ak2, Ak3, Ak4, Ak5, Ak6, Ak7, Ak8, Ak9, Ak10, Ak11, Ak12] satisfies Page[];
