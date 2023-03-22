import { test, expect } from '@playwright/test';

test('test-login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/auth?callbackUrl=%2F');
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').fill('manager1@staff.com');
    await page.getByPlaceholder('password').click();
    await page.getByPlaceholder('password').fill('caretaker');
    await page.getByRole('button', { name: 'Submit' }).click();
});




test('test request leave', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/auth?callbackUrl=%2F');
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').fill('caretaker1@staff.com');
    await page.getByPlaceholder('password').click();
    await page.getByPlaceholder('password').fill('caretaker');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Portal' }).click();
    await page.getByRole('button', { name: 'Request Leave' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Request Leave' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('User already has pending leave requests.').click();
});




test('test approve leave request by manager', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/auth?callbackUrl=%2F');
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').fill('manager1@staf.com');
    await page.getByPlaceholder('password').click();
    await page.getByPlaceholder('password').fill('caretaker');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').press('ArrowLeft');
    await page.getByPlaceholder('email').fill('manager1@staf.com');
    await page.getByPlaceholder('email').press('ArrowLeft');
    await page.getByPlaceholder('email').press('ArrowLeft');
    await page.getByPlaceholder('email').press('ArrowLeft');
    await page.getByPlaceholder('email').fill('manager1@staff.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Portal' }).click();
    await page.locator('div:nth-child(6) > .w-full').first().click();
    await page.getByRole('button', { name: 'aprrove/reject' }).first().click();
    await page.getByRole('button', { name: 'confirm' }).click();
});
