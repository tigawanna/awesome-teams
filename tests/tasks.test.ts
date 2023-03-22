import { test, expect } from '@playwright/test';

test('test adding new repair task', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/auth?callbackUrl=%2F');
  await page.getByPlaceholder('email').click();
  await page.getByPlaceholder('email').fill('caretaker1@staf.com');
  await page.getByPlaceholder('email').click();
  await page.getByPlaceholder('email').press('ArrowLeft');
  await page.getByPlaceholder('email').press('ArrowLeft');
  await page.getByPlaceholder('email').press('ArrowLeft');
  await page.getByPlaceholder('email').press('ArrowLeft');
  await page.getByPlaceholder('email').fill('caretaker1@staff.com');
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('caretaker');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button').nth(4).click();
  await page.locator('.css-w9q2zk-Input2').first().click();
  await page.getByText('Repairs', { exact: true }).click();
  await page.locator('.css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2').click();
  await page.getByText('Weekly', { exact: true }).click();
  await page.getByPlaceholder('title').click();
  await page.getByPlaceholder('title').fill('Inspect rooftop');
  await page.getByPlaceholder('enter description').click();
  await page.getByPlaceholder('enter description').fill('inspect that ');
  await page.getByPlaceholder('enter description').press('Enter');
  await page.getByPlaceholder('enter description').fill('inspect that \n- the extractor fan  works ');
  await page.getByPlaceholder('enter description').press('Enter');
  await page.getByPlaceholder('enter description').fill('inspect that \n- the extractor fan  works \n- no water is collecting uo theer ');
  await page.getByPlaceholder('enter description').click();
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').press('ArrowLeft');
  await page.getByPlaceholder('enter description').fill('inspect that \n- the extractor fan  works \n- no rain water is collecting uo theer ');
  await page.getByPlaceholder('enter description').click();
  await page.getByPlaceholder('enter description').press('ArrowRight');
  await page.getByPlaceholder('enter description').fill('inspect that \n- the extractor fan  works \n- no rain water is collecting uo there ');
  await page.getByPlaceholder('enter description').press('Enter');
  await page.getByPlaceholder('enter description').fill('inspect that \n- the extractor fan  works \n- no rain water is collecting uo there\n- the water tank has o visible issues ');
  await page.locator('.w-\\[90\\%\\] > .css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2').click();
  await page.getByRole('button', { name: 'Submit' }).click();
});


test('test add todo task', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/auth?callbackUrl=%2F');
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').fill('caretaker1@staff.com');
    await page.getByPlaceholder('password').click();
    await page.getByPlaceholder('password').fill('caretaker');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button').nth(4).click();
    await page.getByPlaceholder('title').click();
    await page.getByPlaceholder('title').fill('reset alarms');
    await page.getByPlaceholder('enter description').click();
    await page.getByPlaceholder('enter description').fill('Reset the alarm pin ');
    await page.getByPlaceholder('deadline').fill('2023-03-24');
    await page.getByRole('button', { name: 'Submit' }).click();
});



test('test approve task by manager', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/auth?callbackUrl=%2F');
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').fill('manager1@staff.com');
    await page.getByPlaceholder('password').click();
    await page.getByPlaceholder('password').fill('caretaker');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'reset alarms by: caretaker_1 (caretaker) todo Wednesday 22-Mar-2023 Reset the alarm pin created Deadline Friday 24-Mar-2023 in 2 days' }).click();
    await page.getByRole('link', { name: 'Inspect rooftop by: caretaker_1 (caretaker) repairs Wednesday 22-Mar-2023 inspect that - the extractor fan works - no rain water is collecting uo there\n- the water tank has o visible issues created Deadline Wednesday 22-Mar-2023 12 hours ago' }).click();
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.getByRole('button', { name: 'confirm' }).click();
    await page.goto('http://localhost:3000/');
});

test('test funding by cashier', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('html').click({
        button: 'right'
    });
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').fill('cashier1@staff.com');
    await page.getByPlaceholder('password').click();
    await page.getByPlaceholder('password').fill('caretaker');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Inspect rooftop by: caretaker_1 (caretaker) repairs Wednesday 22-Mar-2023 inspect that - the extractor fan works - no rain water is collecting uo there\n- the water tank has o visible issues approved Deadline Wednesday 22-Mar-2023 12 hours ago' }).click();
    await page.getByRole('button', { name: 'Fund' }).click();
    await page.getByRole('button', { name: 'confirm' }).click();
});



test('test mark_in_progress mark_complete y anyone', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/auth?callbackUrl=%2F');
    await page.getByPlaceholder('email').click();
    await page.getByPlaceholder('email').fill('caretaker1@staff.com');
    await page.getByPlaceholder('password').click();
    await page.getByPlaceholder('password').fill('caretaker');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: 'Inspect rooftop by: caretaker_1 (caretaker) repairs Wednesday 22-Mar-2023 inspect that - the extractor fan works - no rain water is collecting uo there\n- the water tank has o visible issues funded Deadline Wednesday 22-Mar-2023 12 hours ago' }).click();
    await page.getByRole('button', { name: 'Mark in progress' }).click();
    await page.getByRole('button', { name: 'confirm' }).click();
    await page.getByRole('button', { name: 'Mark Completed' }).click();
    await page.getByRole('button', { name: 'confirm' }).click();
    await page.getByRole('button', { name: 'Completed' }).click();
});

