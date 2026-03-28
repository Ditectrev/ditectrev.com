import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

/**
 * Scans the deployed site root when AXE_BASE_URL is set (CI: staging or production).
 * Local E2E against ng serve does not use this file unless you export AXE_BASE_URL.
 */
test.describe('axe accessibility', () => {
  test('home page has no axe violations', async ({ page }) => {
    const base = process.env['AXE_BASE_URL']?.trim();
    test.skip(!base, 'Set AXE_BASE_URL to scan a deployed URL (e.g. staging or production).');

    const url = `${base.replace(/\/$/, '')}/`;
    await page.goto(url, { waitUntil: 'load', timeout: 120_000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
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
    expect(
      blocking,
      blocking.length ? JSON.stringify(blocking, null, 2) : ''
    ).toEqual([]);
  });
});
