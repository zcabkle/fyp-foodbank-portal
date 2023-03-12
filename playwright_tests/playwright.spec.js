import { test, expect } from '@playwright/test';

/* test('basic test', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('div div')).toContainText('Hello World');
}) */

test('mytest', async ({ page }) => {

  /* await page.goto('/foodbanks');
  await page.waitForResponse(resp => resp.url().includes('/api/foodbanks') && resp.status() === 200),
  await expect(page.locator('div div')).toContainText('Foodbanks'); */

  await page.goto('/foodbanks');

  await page.route('https://localhost/4280/api/foodbanks', async route => {
  const json = {
    message: { 'test_breed': [] }
  };
  await route.fulfill({ json });
});

  const responsePromise = page.waitForResponse(response => response.url().includes('/api/foodbanks') && response.status() === 200);
  await page.getByText('trigger response').click();
  const response = await responsePromise;

  console.log(response)

})