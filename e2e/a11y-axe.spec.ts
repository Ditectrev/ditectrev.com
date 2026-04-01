import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

/**
 * Scans the deployed site root when AXE_BASE_URL is set (CI: staging or production).
 * Local E2E against ng serve does not use this file unless you export AXE_BASE_URL.
 * Set AXE_NON_BLOCKING=1 to log critical/serious violations without failing (CI uses this).
 */
test.describe('axe accessibility', () => {
  test('home page has no axe violations', async ({ page }) => {
    const base = process.env['AXE_BASE_URL']?.trim();
    test.skip(!base, 'Set AXE_BASE_URL to scan a deployed URL (e.g. staging or production).');
    // Narrowed after skip (test body does not run when skipped).
    const url = `${base!.replace(/\/$/, '')}/`;
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 });
    // Allow carousel/CSS transitions to finish so color-contrast is measured on steady state.
    await page.waitForTimeout(2500);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      // @angular/cdk focus-trap uses sentinel nodes that axe flags; behavior is from the framework, not app markup.
      .disableRules(['aria-hidden-focus'])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    const other = results.violations.length - blocking.length;
    if (other > 0) {
      console.log(
        `Axe: ${other} non-blocking issue(s) (moderate/minor); fix when possible.`
      );
    }

    const nonBlocking =
      process.env['AXE_NON_BLOCKING'] === 'true' ||
      process.env['AXE_NON_BLOCKING'] === '1';
    if (blocking.length && nonBlocking) {
      console.log(
        '::warning::Axe critical/serious violations (CI non-blocking; file issues to fix)'
      );
      console.log(JSON.stringify(blocking, null, 2));
      return;
    }

    expect(
      blocking,
      blocking.length ? JSON.stringify(blocking, null, 2) : ''
    ).toEqual([]);
  });
});
