import { expect, test } from '@playwright/test';

test('scrolls to top when changing routes', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('app-root')).toBeVisible({ timeout: 15000 });

  await page.addStyleTag({
    content: 'html, body, main { min-height: 4000px !important; }',
  });
  await page.evaluate(() => {
    const y = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    window.scrollTo(0, y);
    document.documentElement.scrollTop = y;
    document.body.scrollTop = y;
  });

  const scrolled = await page.evaluate(
    () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
  );
  expect(scrolled).toBeGreaterThan(100);

  await page.locator('.desktop-navigation a[title="About us"]').click();
  await expect(page).toHaveURL(/\/about-us$/);
  await expect(page.locator('mat-card-title[title="About us"]')).toBeVisible({
    timeout: 15000,
  });

  await expect
    .poll(
      async () =>
        page.evaluate(
          () =>
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop
        )
    )
    .toBe(0);
});
