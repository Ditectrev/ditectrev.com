import { expect, Page, test } from '@playwright/test';

async function navigateSpa(page: Page, path: string): Promise<void> {
  await page.goto('/');
  await expect(page.locator('app-root')).toBeVisible({ timeout: 15000 });
  const clicked = await page.evaluate((nextPath: string) => {
    const link = document.querySelector(`a[href="${nextPath}"]`) as HTMLAnchorElement | null;
    if (!link) {
      return false;
    }
    link.click();
    return true;
  }, path);
  if (!clicked) {
    await page.evaluate((nextPath: string) => {
      window.history.pushState({}, '', nextPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, path);
  }
}

const pagesToValidate: Array<{ name: string; path: string; markers: string[] }> = [
  { name: 'about us', path: '/about-us', markers: ['mat-card-title[title="About us"]', 'mat-card-content'] },
  { name: 'methodology', path: '/methodology', markers: ['mat-card-title[title="Methodology"]'] },
  { name: 'services', path: '/services', markers: ['h1', 'text=Cyber Security'] },
  { name: 'faq', path: '/faq', markers: ['mat-card-title[title="FAQ"]'] },
  { name: 'glossary', path: '/glossary', markers: ['mat-card-title[title="Glossary"]'] },
  { name: 'sitemap', path: '/sitemap', markers: ['mat-card-title[title="Sitemap"]'] },
  { name: 'copyrights', path: '/copyrights', markers: ['mat-card-title[title="Copyrights"]'] },
  { name: 'terms of use', path: '/terms-of-use', markers: ['mat-card-title[title="Terms of Use"]'] },
  { name: 'privacy and security', path: '/privacy-and-security', markers: ['mat-card-title[title="Privacy & Security"]'] },
  { name: 'partnerships', path: '/partnerships', markers: ['mat-card-title[title="Partnerships"]'] },
  { name: 'cyber security detail', path: '/services/cyber-security', markers: ['h1[title="Cyber Security"]'] },
  { name: 'digital strategy detail', path: '/services/digital-strategy', markers: ['h1[title="Digital Strategy"]'] },
  { name: 'software development detail', path: '/services/software-development', markers: ['h1[title="Software Development"]'] }
];

test('contact page', async ({ page }) => {
  await page.goto('/');
  await page.locator('a.contact-btn').click();
  await expect(page).toHaveURL(/\/contact$/);
});

for (const pageCase of pagesToValidate) {
  test(`${pageCase.name} page`, async ({ page }) => {
    await navigateSpa(page, pageCase.path);
    for (const marker of pageCase.markers) {
      await expect(page.locator(marker).first()).toBeVisible({ timeout: 15000 });
    }
  });
}
