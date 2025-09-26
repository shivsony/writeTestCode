import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('should login with valid credentials', async ({ page }) => {
    // Navigate to the demo app
    await page.goto('http://localhost:3002');
    
    // Fill in login form
    await page.getByTestId('login-email').fill('demo@example.com');
    await page.getByTestId('login-password').fill('password123');
    
    // Click login button
    await page.getByTestId('login-submit').click();
    
    // Verify successful login by checking for user name
    await expect(page.locator('#user-name')).toContainText('Demo User');
    
    // Verify todo app is visible
    await expect(page.getByTestId('todo-list')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Navigate to the demo app
    await page.goto('http://localhost:3002');
    
    // Fill in login form with invalid credentials
    await page.getByTestId('login-email').fill('invalid@example.com');
    await page.getByTestId('login-password').fill('wrongpassword');
    
    // Click login button
    await page.getByTestId('login-submit').click();
    
    // Verify error message is shown
    await expect(page.locator('.error')).toContainText('Invalid email or password');
  });

  test('should register new user', async ({ page }) => {
    // Navigate to the demo app
    await page.goto('http://localhost:3002');
    
    // Switch to register tab
    await page.click('text=Register');
    
    // Fill in registration form
    await page.getByTestId('register-name').fill('Test User');
    await page.getByTestId('register-email').fill('test@example.com');
    await page.getByTestId('register-password').fill('testpassword123');
    
    // Click register button
    await page.getByTestId('register-submit').click();
    
    // Verify successful registration
    await expect(page.locator('#user-name')).toContainText('Test User');
  });
});
