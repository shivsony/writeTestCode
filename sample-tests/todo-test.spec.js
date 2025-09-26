import { test, expect } from '@playwright/test';

test.describe('Todo Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('http://localhost:3002');
    await page.getByTestId('login-email').fill('demo@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    
    // Wait for todo app to load
    await expect(page.getByTestId('todo-list')).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    // Add a new todo
    await page.getByTestId('todo-input').fill('Test new todo item');
    await page.getByTestId('add-todo').click();
    
    // Verify todo was added
    await expect(page.getByTestId('todo-list')).toContainText('Test new todo item');
  });

  test('should mark todo as completed', async ({ page }) => {
    // Find the first todo item
    const firstTodo = page.locator('[data-testid^="todo-item-"]').first();
    const todoId = await firstTodo.getAttribute('data-testid');
    const checkboxId = todoId.replace('todo-item-', 'todo-checkbox-');
    
    // Click the checkbox to mark as completed
    await page.getByTestId(checkboxId).check();
    
    // Verify todo is marked as completed
    await expect(firstTodo).toHaveClass(/completed/);
  });

  test('should delete a todo', async ({ page }) => {
    // Find the first todo item
    const firstTodo = page.locator('[data-testid^="todo-item-"]').first();
    const todoId = await firstTodo.getAttribute('data-testid');
    const deleteButtonId = todoId.replace('todo-item-', 'delete-todo-');
    
    // Get the todo text before deletion
    const todoText = await firstTodo.textContent();
    
    // Click delete button
    await page.getByTestId(deleteButtonId).click();
    
    // Verify todo was deleted
    await expect(page.getByTestId('todo-list')).not.toContainText(todoText);
  });

  test('should show user name after login', async ({ page }) => {
    // Verify user name is displayed
    await expect(page.locator('#user-name')).toContainText('Demo User');
  });

  test('should logout successfully', async ({ page }) => {
    // Click logout button
    await page.click('text=Logout');
    
    // Verify we're back to login form
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
  });
});
