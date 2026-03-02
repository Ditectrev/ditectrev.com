/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'npx serve dist/ditectrev-browser -s -l 3000',
      url: ['http://localhost:3000'],
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
