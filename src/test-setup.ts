/**
 * Karma/Jasmine test setup (stubs). Loaded via polyfills in angular.json.
 * Zone/zone-testing order is handled by angular.json polyfills and the builder.
 */

/**
 * Stub matchMedia so Angular CDK layout (BreakpointObserver) does not throw in tests.
 * CDK expects the return value to have addListener and removeListener.
 */
const g = typeof window !== 'undefined' ? window : (globalThis as any);
if (typeof g.matchMedia === 'undefined') {
  g.matchMedia = () => ({
    matches: true,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  });
}

/** Stub process.env for browser tests (e.g. contact component spec). */
const processStub = {
  env: {
    FIRESTORE_COLLECTION_MESSAGES: 'messages',
    FIRESTORE_COLLECTION_FILES: 'files',
  },
};
if (typeof (g as any).process === 'undefined') {
  (g as any).process = processStub;
}
if (typeof (globalThis as any).process === 'undefined') {
  (globalThis as any).process = processStub;
}

/**
 * Prevent runaway animation loops during unit tests.
 * Many components schedule recursive requestAnimationFrame callbacks.
 * In CI this can starve the browser event loop and cause Karma disconnects.
 */
if (typeof g.requestAnimationFrame === 'undefined') {
  g.requestAnimationFrame = () => 0;
} else {
  g.requestAnimationFrame = () => 0;
}
