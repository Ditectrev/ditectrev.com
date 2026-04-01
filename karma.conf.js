// Karma configuration for Angular unit tests.
// See https://karma-runner.github.io/latest/config/configuration-file.html

module.exports = function (config) {
  const isCi = !!process.env['CI'];

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {},
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated trace
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: isCi ? ['progress', 'coverage'] : ['progress', 'kjhtml', 'coverage'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-extensions',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--use-gl=angle',
          '--use-angle=swiftshader',
          '--remote-debugging-port=9222',
        ],
      },
    },
    autoWatch: !isCi,
    singleRun: isCi,
    restartOnFileChange: !isCi,
    concurrency: 1,
    // Increase timeouts to avoid flaky disconnects in CI (slow Chrome on shared runners).
    captureTimeout: 300000,
    browserNoActivityTimeout: 300000,
    browserDisconnectTolerance: 5,
    browserDisconnectTimeout: 60000,
  });
};
