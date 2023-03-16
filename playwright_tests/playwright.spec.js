import { test, expect } from '@playwright/test';

test('mytest', async ({ page }) => {

  await page.route('/api/foodbanks', async route => {
    const json = {
      message: { 'test_breed': [] }
    };
    await route.fulfill({ json });
  });

  await page.goto('http://localhost:4280/api/foodbanks');

  const responsePromise = page.waitForResponse(response => response.url().includes('/api/foodbanks') && response.status() === 200);
  await page.getByText('trigger response').click();
  const response = await responsePromise;

  console.log(response)

})