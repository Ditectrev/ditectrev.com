import { expect, test } from '@playwright/test';

type RouteSmokeCase = {
  path: string;
  markerSelector: string;
};

const routeSmokeCases: RouteSmokeCase[] = [
  { path: '/about-us', markerSelector: '[title="About us"]' },
  { path: '/contact', markerSelector: '[title="Contact"]' },
  { path: '/methodology', markerSelector: '[title="Methodology"]' },
  { path: '/services', markerSelector: '[title="Services"]' },
  { path: '/faq', markerSelector: '[title="Faq"], [title="FAQ"]' },
  { path: '/glossary', markerSelector: '[title="Glossary"]' },
  { path: '/sitemap', markerSelector: '[title="Sitemap"]' },
  { path: '/copyrights', markerSelector: '[title="Copyrights"]' },
  { path: '/terms-of-use', markerSelector: '[title="Terms of Use"]' },
  { path: '/privacy-and-security', markerSelector: '[title="Privacy & Security"]' },
  { path: '/partnerships', markerSelector: '[title="Partnerships"]' }
];

test('home route smoke', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#particles-js')).toBeVisible({ timeout: 15000 });
});

test('all routes are represented by navigation links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('app-root')).toBeVisible({ timeout: 15000 });
  for (const routeCase of routeSmokeCases) {
    await expect(page.locator(routeCase.markerSelector).first(), `Missing route link for ${routeCase.path}`).toBeAttached();
  }
});
