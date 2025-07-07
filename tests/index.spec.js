// put your tests here
const { test, expect } = require('@playwright/test');

  test('It should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Your average form');
  });