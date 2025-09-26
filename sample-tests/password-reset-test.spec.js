import { test, expect } from '@playwright/test';

test.describe('Password Reset Functionality', () => {
  test('should show password reset form', async ({ page }) => {
    // Navigate to the demo app
    await page.goto('http://localhost:3002');
    
    // Switch to reset password tab
    await page.click('text=Reset Password');
    
    // Verify reset form is visible
    await expect(page.getByTestId('reset-email')).toBeVisible();
    await expect(page.getByTestId('reset-submit')).toBeVisible();
  });

  test('should send reset email for valid user', async ({ page }) => {
    // Navigate to the demo app
    await page.goto('http://localhost:3002');
    
    // Switch to reset password tab
    await page.click('text=Reset Password');
    
    // Fill in valid email
    await page.getByTestId('reset-email').fill('demo@example.com');
    
    // Click submit button
    await page.getByTestId('reset-submit').click();
    
    // Verify success message
    await expect(page.locator('.success')).toContainText('Password reset email sent to demo@example.com');
  });

  test('should show error for invalid user', async ({ page }) => {
    // Navigate to the demo app
    await page.goto('http://localhost:3002');
    
    // Switch to reset password tab
    await page.click('text=Reset Password');
    
    // Fill in invalid email
    await page.getByTestId('reset-email').fill('nonexistent@example.com');
    
    // Click submit button
    await page.getByTestId('reset-submit').click();
    
    // Verify error message
    await expect(page.locator('.error')).toContainText('User not found');
  });

  test('should validate email field', async ({ page }) => {
    // Navigate to the demo app
    await page.goto('http://localhost:3002');
    
    // Switch to reset password tab
    await page.click('text=Reset Password');
    
    // Try to submit without email
    await page.getByTestId('reset-submit').click();
    
    // Verify validation message (browser native validation)
    const emailInput = page.getByTestId('reset-email');
    await expect(emailInput).toHaveAttribute('required');
  });
});
