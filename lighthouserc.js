/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'npx serve dist/ditectrev-browser -s -l 3000',
      // `serve` prints "Accepting connections at ..." — not "listen" / "ready"
      startServerReadyPattern: 'Accepting connections',
      url: ['http://localhost:3000'],
    },
    assert: {
      // Do not use lighthouse:recommended here: it asserts many per-audit scores that
      // fail for static `serve` (no cache headers, large SPA payload, third-party scripts).
      assertions: {
        // Static `serve` + cold CI runners often score ~0.3–0.4; keep threshold conservative.
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
