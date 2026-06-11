import { test, expect, type Page } from '@playwright/test';

/**
 * Behavioral coverage for the Base UI migration — keyboard navigation,
 * focus management and dismissal, none of which visual snapshots can catch.
 * All tests drive the stateful `?show=interactive` preview showcase.
 */

async function gotoInteractive(page: Page) {
  await page.goto('/?show=interactive');
  await page.waitForLoadState('networkidle');
}

test.describe('modal', () => {
  test('opens via trigger and closes on Escape, restoring focus', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', { name: 'Open modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('closes on backdrop click', async ({ page }) => {
    await gotoInteractive(page);
    await page.getByRole('button', { name: 'Open modal' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.mouse.click(5, 5);
    await expect(dialog).toBeHidden();
  });

  test('closes via the X button and the footer buttons', async ({ page }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', { name: 'Open modal' });
    const dialog = page.getByRole('dialog');

    await trigger.click();
    await dialog.locator('button:has(svg)').first().click();
    await expect(dialog).toBeHidden();

    await trigger.click();
    await dialog.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).toBeHidden();
  });

  test('traps focus while open', async ({ page }) => {
    await gotoInteractive(page);
    await page.getByRole('button', { name: 'Open modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Base UI traps focus by making everything outside the dialog inert,
    // so a Tab cycle may briefly stop on its sentinel spans or <body> —
    // the guarantee is that no interactive element outside the dialog is
    // ever reachable, and that focus keeps cycling through the dialog.
    const outsideStops: string[] = [];
    let insideStops = 0;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const stop = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        const dialog = document.querySelector('[role="dialog"]');
        if (!el || el === document.body)
          return { outside: null, inside: false };
        if (dialog?.contains(el)) return { outside: null, inside: true };
        const interactive = el.matches(
          'button, [href], input, select, textarea, [role="button"], [role="switch"], [role="combobox"]',
        );
        return {
          outside: interactive
            ? `${el.tagName}:${el.textContent?.slice(0, 20)}`
            : null,
          inside: false,
        };
      });
      if (stop.outside) outsideStops.push(stop.outside);
      if (stop.inside) insideStops++;
    }
    expect(outsideStops).toEqual([]);
    expect(insideStops).toBeGreaterThan(4);
  });
});

test.describe('menu', () => {
  test('opens on click, item click fires onClick and closes', async ({
    page,
  }) => {
    await gotoInteractive(page);
    await page.getByRole('button', { name: 'Open menu' }).click();

    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();

    await page.getByRole('menuitem', { name: 'Second' }).click();
    await expect(menu).toBeHidden();
    await expect(page.getByTestId('menu-last-action')).toHaveText('Second');
  });

  test('full keyboard flow: open, arrows, Enter activates', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await trigger.focus();
    await page.keyboard.press('Enter');

    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();

    // Opening with Enter already highlights the first item.
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(menu).toBeHidden();
    await expect(page.getByTestId('menu-last-action')).toHaveText('Second');
  });

  test('Escape closes and returns focus to the trigger', async ({ page }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await trigger.click();
    await expect(page.getByRole('menu')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe('select', () => {
  test('selects an option by mouse and reports the value', async ({ page }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('combobox');
    await trigger.click();

    const listbox = page.getByRole('listbox');
    await expect(listbox).toBeVisible();

    await page.getByRole('option', { name: 'Table' }).click();
    await expect(listbox).toBeHidden();
    await expect(page.getByTestId('select-value')).toHaveText('table');
    await expect(trigger).toContainText('Table');
  });

  test('full keyboard flow: open, arrows, Enter selects', async ({ page }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('combobox');
    await trigger.focus();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('listbox')).toBeVisible();
    // Keyboard handling is live once the first option is highlighted —
    // arrows pressed before that are dropped.
    await expect(page.getByRole('option', { name: 'Chair' })).toHaveAttribute(
      'data-highlighted',
      '',
    );

    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('option', { name: 'Table' })).toHaveAttribute(
      'data-highlighted',
      '',
    );
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('option', { name: 'Sofa' })).toHaveAttribute(
      'data-highlighted',
      '',
    );
    await page.keyboard.press('Enter');

    await expect(page.getByRole('listbox')).toBeHidden();
    await expect(page.getByTestId('select-value')).toHaveText('sofa');
  });
});

test.describe('switch', () => {
  test('toggles on click', async ({ page }) => {
    await gotoInteractive(page);
    const switchControl = page.getByRole('switch');

    await expect(switchControl).not.toBeChecked();
    await switchControl.click();
    await expect(switchControl).toBeChecked();
    await expect(page.getByTestId('switch-value')).toHaveText('true');
  });

  test('toggles with Space when focused via keyboard', async ({ page }) => {
    await gotoInteractive(page);
    const switchControl = page.getByRole('switch');

    await switchControl.focus();
    await expect(switchControl).toBeFocused();

    await page.keyboard.press('Space');
    await expect(switchControl).toBeChecked();

    await page.keyboard.press('Space');
    await expect(switchControl).not.toBeChecked();
  });
});

test.describe('tooltip', () => {
  test('shows on hover after the open delay and hides on mouse out', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', {
      name: 'Tooltip trigger',
      exact: true,
    });

    await trigger.hover();
    await expect(page.getByText('Interactive tooltip content')).toBeVisible({
      timeout: 2_000,
    });

    await page.mouse.move(0, 0);
    await expect(page.getByText('Interactive tooltip content')).toBeHidden();
  });

  test('shows on keyboard focus', async ({ page }) => {
    await gotoInteractive(page);
    // The tooltip section renders first so a single Tab reaches the trigger
    // via real keyboard navigation (focus-visible), which is what opens a
    // Base UI tooltip — programmatic .focus() doesn't.
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Tooltip trigger', exact: true }),
    ).toBeFocused();
    await expect(page.getByText('Interactive tooltip content')).toBeVisible({
      timeout: 2_000,
    });
  });

  test('asChild trigger composes child handlers with tooltip interactions', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', {
      name: 'Tooltip trigger',
      exact: true,
    });

    await trigger.hover();
    // Both must hold: the child's own onMouseEnter fired AND the tooltip
    // opened — a plain prop spread would sacrifice one for the other.
    await expect(page.getByText('Interactive tooltip content')).toBeVisible({
      timeout: 2_000,
    });
    await expect(page.getByTestId('tooltip-trigger-hovered')).toHaveText(
      'true',
    );
  });

  test('controlled tooltip ignores hover and follows its open prop', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', {
      name: 'Controlled tooltip trigger',
    });

    // Hover past the 500ms open delay — a controlled tooltip must not open.
    await trigger.hover();
    await page.waitForTimeout(900);
    await expect(page.getByText('Controlled tooltip content')).toBeHidden();
    await page.mouse.move(0, 0);

    await page
      .getByRole('button', { name: 'Toggle controlled tooltip' })
      .click();
    await expect(page.getByText('Controlled tooltip content')).toBeVisible();

    // Dismissal still propagates in controlled mode (v1 parity).
    await page.keyboard.press('Escape');
    await expect(page.getByText('Controlled tooltip content')).toBeHidden();
  });
});

test.describe('date picker', () => {
  test('opens the calendar, picking a day updates the trigger and closes', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', { name: '05/05/2026' });
    await trigger.click();

    const grid = page.getByRole('grid');
    await expect(grid).toBeVisible();

    await grid.getByText('15', { exact: true }).click();
    await expect(grid).toBeHidden();
    await expect(
      page.getByRole('button', { name: '15/05/2026' }),
    ).toBeVisible();
  });

  test('Escape closes the calendar without changing the value', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', { name: '05/05/2026' });
    await trigger.click();
    await expect(page.getByRole('grid')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('grid')).toBeHidden();
    await expect(trigger).toHaveText('05/05/2026');
  });

  test('re-clicking the selected day keeps the value (no deselect)', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const trigger = page.getByRole('button', { name: '05/05/2026' });
    await trigger.click();

    const grid = page.getByRole('grid');
    await grid.getByText('5', { exact: true }).click();
    await expect(grid).toBeHidden();
    await expect(trigger).toHaveText('05/05/2026');
  });

  test('range: partial pick reports null, completing fires once and closes', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const host = page.getByTestId('section-ix-date-picker-range');
    const trigger = host.getByRole('button');
    await expect(trigger).toHaveText('10/05/2026 – 12/05/2026');
    await trigger.click();

    const grid = page.getByRole('grid');
    await expect(grid).toBeVisible();

    // Clicking the existing range start restarts the pick: the value goes
    // back to the placeholder while the draft highlights the start day.
    await grid.getByText('10', { exact: true }).click();
    await expect(trigger).toHaveText('dd/mm/yyyy');
    await expect(grid).toBeVisible();

    await grid.getByText('15', { exact: true }).click();
    await expect(grid).toBeHidden();
    await expect(trigger).toHaveText('10/05/2026 – 15/05/2026');
  });

  test('multiple: third pick keeps the first two dates selected', async ({
    page,
  }) => {
    await gotoInteractive(page);
    const host = page.getByTestId('section-ix-date-picker-multiple');
    const trigger = host.getByRole('button');
    await trigger.click();

    const grid = page.getByRole('grid');
    await grid.getByText('12', { exact: true }).click();
    await expect(trigger).toHaveText('06/05/2026, 12/05/2026');

    // The regression: with exactly 2 dates selected, the third pick used to
    // wipe the previous ones.
    await grid.getByText('19', { exact: true }).click();
    await expect(trigger).toHaveText('06/05/2026, 12/05/2026, 19/05/2026');
    await expect(grid).toBeVisible();
  });
});
