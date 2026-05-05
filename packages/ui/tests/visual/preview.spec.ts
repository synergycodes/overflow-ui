import { test, expect, type Page } from '@playwright/test';

const SECTIONS = [
  'button',
  'nav-button',
  'switch',
  'input',
  'textarea',
  'select',
  'checkbox',
  'radio',
  'snackbar',
  'accordion',
  'segment-picker',
  'avatar',
  'status',
  'separator',
  'date-picker',
] as const;

const FLOATING_SHOWCASES = [
  'modal-regular',
  'modal-large',
  'menu-open',
  'select-open',
  'tooltip-open',
  'snackbar-success',
  'snackbar-error',
  'snackbar-warning',
  'snackbar-info',
  'snackbar-default',
] as const;

async function settle(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
}

test.describe('inline component sections', () => {
  for (const section of SECTIONS) {
    test(`section: ${section}`, async ({ page }) => {
      await page.goto('/');
      await settle(page);
      const locator = page.getByTestId(`section-${section}`);
      await expect(locator).toBeVisible();
      await expect(locator).toHaveScreenshot(`${section}.png`);
    });
  }
});

test.describe('floating showcases', () => {
  for (const showcase of FLOATING_SHOWCASES) {
    test(`showcase: ${showcase}`, async ({ page }) => {
      await page.goto(`/?show=${showcase}`);
      await settle(page);
      if (showcase === 'select-open') {
        await page.getByTestId('select-open-host').locator('button').click();
        await page.waitForTimeout(150);
      }
      await expect(page).toHaveScreenshot(`${showcase}.png`, {
        fullPage: false,
      });
    });
  }
});
