import type { OpenSlideConfig } from '@open-slide/core';

declare const process: { env: Record<string, string | undefined> };

const openSlideConfig: OpenSlideConfig = {
  // GitHub Pages serves this project under /techCareer-AI-2026/.
  // GITHUB_ACTIONS is set automatically in CI, so Netlify/Vercel/local keep "/".
  ...(process.env.GITHUB_ACTIONS ? { base: '/techCareer-AI-2026/' } : {}),
};

export default openSlideConfig;
