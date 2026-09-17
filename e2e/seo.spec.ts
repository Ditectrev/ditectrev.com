import { expect, test } from '@playwright/test';

test('home page has indexable title, description, and canonical', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('app-root')).toBeVisible({ timeout: 15000 });
  await expect(page).toHaveTitle(/Ditectrev/i);
  await expect(page.locator('meta[name="description"]').first()).toHaveAttribute(
    'content',
    /online education/i
  );
  await expect(page.locator('link[rel="canonical"]').first()).toHaveAttribute(
    'href',
    /https:\/\/ditectrev\.com\/?$/
  );
});

test('about-us page uses a unique title and self-canonical', async ({
  page,
}) => {
  await page.goto('/about-us');
  await expect(page.locator('app-root')).toBeVisible({ timeout: 15000 });
  await expect(page).toHaveTitle(/About Us/i);
  await expect(page.locator('link[rel="canonical"]').first()).toHaveAttribute(
    'href',
    /\/about-us$/
  );
});

test('serves llms.txt for AI agents', async ({ request }) => {
  const response = await request.get('/llms.txt');
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toMatch(/^# Ditectrev/m);
  expect(body).toContain('https://ditectrev.com/faq');
  expect(body).toContain('llms-full.txt');
});

test('serves llms-full.txt with citation Q&A', async ({ request }) => {
  const response = await request.get('/llms-full.txt');
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toContain('What is Ditectrev?');
  expect(body).toContain('IBStructure Daniel Danielecki');
});

test('XML sitemap lists llms.txt for crawler discovery', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toContain('https://ditectrev.com/llms.txt');
  expect(body).toContain('https://ditectrev.com/llms-full.txt');
});

test('unknown routes are marked noindex', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');
  await expect(page.locator('app-root')).toBeVisible({ timeout: 15000 });
  await expect(page).toHaveTitle(/Page Not Found/i);
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
    'content',
    /noindex/i
  );
  await expect(page.getByRole('link', { name: /homepage/i })).toBeVisible();
});
