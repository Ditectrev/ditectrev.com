/** @type {import('@lhci/cli').Config} */
const raw = (process.env['LHCI_BASE_URL'] || 'https://ditectrev-v3-staging-5ad41.web.app').trim();
const base = raw.replace(/\/$/, '');
const url = `${base}/`;

// Local `serve` for offline runs; CI sets HTTPS staging/production URLs (no server).
const isLocal =
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(base) ||
  /localhost:\d+/.test(base) ||
  /127\.0\.0\.1:\d+/.test(base);

const collect = isLocal
  ? {
      numberOfRuns: 1,
      startServerCommand: 'npx serve dist/ditectrev-browser -s -l 3000',
      startServerReadyPattern: 'Accepting connections',
      url: [url],
    }
  : {
      numberOfRuns: 1,
      url: [url],
    };

module.exports = {
  ci: {
    collect,
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.25 }],
        'categories:accessibility': ['warn', { minScore: 0.85 }],
        'categories:best-practices': ['warn', { minScore: 0.75 }],
        'categories:seo': ['warn', { minScore: 0.85 }],
        'categories:pwa': ['warn', { minScore: 0.4 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
