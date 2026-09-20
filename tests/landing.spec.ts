import { test, expect } from '@playwright/test';

const apiProducts = [
  { id: 'book-1', title: 'Top Notch 1A', coverUrl: '/books/top-notch-1a.webp', coverAlt: 'جلد Top Notch 1A', price: 490000, discountedPrice: 220000, discountPercent: 55, remainingPercent: 36 },
  { id: 'book-2', title: 'First Friends 1', coverUrl: '/books/first-friends-1.webp', coverAlt: 'جلد First Friends 1', price: 320000, discountedPrice: 176000, discountPercent: 45, remainingPercent: 42 },
  { id: 'book-3', title: 'Family and Friends 1', coverUrl: '/books/family-and-friends-1.webp', coverAlt: 'جلد Family and Friends 1', price: 385000, discountedPrice: 231000, discountPercent: 40, remainingPercent: 28 },
];

test.beforeEach(async ({ page }) => {
  await page.route('**/api/v1/products/best-selling**', async route => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get('q')?.toLocaleLowerCase('fa') ?? '';
    const data = url.pathname.endsWith('/search') ? apiProducts.filter(product => product.title.toLocaleLowerCase('fa').includes(query)) : apiProducts;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data, meta: { requestId: 'test', serverTime: new Date().toISOString() } }) });
  });
});

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
    const books = await page.getByLabel('مجموعه کتاب‌های زبان', { exact: true }).boundingBox();
    expect(heading).not.toBeNull();
    expect(books).not.toBeNull();
    if (width < 1024) {
      expect(books!.y + books!.height).toBeLessThanOrEqual(heading!.y);
      const menu = page.getByRole('button', { name: 'باز کردن منو' });
      await menu.click();
      await expect(page.getByRole('navigation', { name: 'منوی موبایل' })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(menu).toBeFocused();
      await expect(page.getByRole('navigation', { name: 'منوی موبایل' })).toBeHidden();
      await menu.click();
      await page.getByRole('navigation', { name: 'منوی موبایل' }).getByText('تماس با ما', { exact: true }).click();
      await expect(page.getByRole('navigation', { name: 'منوی موبایل' })).toBeHidden();
      await page.goto('/');
    } else {
      expect(books!.x + books!.width).toBeLessThanOrEqual(heading!.x);
      await expect(page.getByRole('navigation', { name: 'منوی اصلی' })).toBeVisible();
    }
    await expect(page.getByRole('link', { name: 'تماس تلفنی برای ثبت سفارش' })).toHaveAttribute('href', 'tel:09100559253');
    for (const label of ['پیام در بله', 'پیام در ایتا']) {
      for (const button of await page.getByRole('button', { name: label }).all()) await expect(button).toBeDisabled();
    }
    await expect(page.locator('#products article')).toHaveCount(3);
    await expect(page.locator('#order-process li')).toHaveCount(4);
    await expect(page.getByRole('heading', { name: 'سوالات متداول', exact: true })).toBeVisible();
    const productCards = await page.locator('#products article').all();
    const first = (await productCards[0].boundingBox())!;
    const second = (await productCards[1].boundingBox())!;
    if (width < 768) expect(second.y).toBeGreaterThan(first.y + first.height);
    else expect(second.y).toBe(first.y);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `test-results/landing-${width}.png`, fullPage: true });
  });
}

test('menu resets after switching to desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto('/');
  await page.getByRole('button', { name: 'باز کردن منو' }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole('navigation', { name: 'منوی موبایل' })).toBeHidden();
  await expect(page.locator('[aria-controls="mobile-menu"]')).toHaveAttribute('aria-expanded', 'false');
  await page.setViewportSize({ width: 390, height: 850 });
  await expect(page.getByRole('button', { name: 'باز کردن منو' })).toHaveAttribute('aria-expanded', 'false');
});

test('FAQ supports keyboard, exclusive expansion and closing', async ({ page }) => {
  await page.goto('/');
  const first = page.getByRole('button', { name: 'آیا امکان خرید با چک وجود دارد؟' });
  const second = page.getByRole('button', { name: 'قیمت عمده از چه تعدادی محاسبه می‌شود؟' });
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-panel-cheque')).toBeHidden();
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-panel-cheque')).toBeVisible();
  await second.click();
  await expect(page.locator('#faq-panel-cheque')).toBeHidden();
  await expect(page.locator('#faq-panel-wholesale')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(second).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-panel-wholesale')).toBeHidden();
});

test('navigation and all product enquiries reach existing unique sections', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  for (const link of await page.getByRole('navigation', { name: 'منوی اصلی', exact: true }).getByRole('link').all()) {
    const href = (await link.getAttribute('href'))!;
    await expect(page.locator(href)).toHaveCount(1);
    await link.click();
    expect(new URL(page.url()).hash).toBe(href);
    await expect(page.locator(href)).toBeInViewport();
  }
  for (const link of await page.locator('#products').getByRole('link', { name: /استعلام و سفارش/ }).all()) {
    await link.click();
    await expect(page.locator('#contact')).toBeInViewport();
  }
  await expect(page.locator('#products').getByRole('link', { name: 'مشاهده همه محصولات' })).toHaveAttribute('href', '/products');
  const duplicateIds = await page.locator('[id]').evaluateAll(elements => {
    const ids = elements.map(element => element.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  expect(duplicateIds).toEqual([]);
});

test('products page loads all products and searches after debounce', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/products');
  await expect(page.getByRole('heading', { level: 1, name: 'محصولات' })).toBeVisible();
  await expect(page.locator('main article')).toHaveCount(3);
  const search = page.getByRole('searchbox', { name: 'جست‌وجوی کتاب' });
  await search.fill('Fa');
  await expect(page.locator('main article')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Family and Friends 1' })).toBeVisible();
  await page.screenshot({ path: 'test-results/products-1440.png', fullPage: true });
});
