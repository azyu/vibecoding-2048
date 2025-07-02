
import { test, expect } from '@playwright/test';

test.describe('2048 Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the game and display the board', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('2048');
    await expect(page.locator('.grid')).toBeVisible();
    await expect(page.locator('.grid .w-20')).toHaveCount(16); // 4x4 board
  });

  test('should start a new game when the new game button is clicked', async ({ page }) => {
    // Make some moves to change the board state (optional, but good for testing reset)
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');

    const initialScore = await page.locator('text=Score:').textContent();
    const initialBoardState = await page.locator('.grid').innerHTML();

    await page.getByRole('button', { name: 'New Game' }).click();

    // Expect score to reset to 0
    await expect(page.locator('text=Score:')).toHaveText('Score: 0');

    // Expect board to be reset (initial tiles might be different, but structure should be same)
    await expect(page.locator('.grid .w-20')).toHaveCount(16);
    // More robust check: ensure at least two tiles are present and others are empty
    const tileValues = await page.locator('.grid .w-20').allTextContents();
    const nonZeroTiles = tileValues.filter(val => val !== '');
    expect(nonZeroTiles.length).toBeGreaterThanOrEqual(2);
  });

  test('should move tiles when arrow keys are pressed', async ({ page }) => {
    // Get initial board state
    const initialTileValues = await page.locator('.grid .w-20').allTextContents();
    const initialNonZeroTiles = initialTileValues.filter(val => val !== '');

    // Press an arrow key (e.g., ArrowUp)
    await page.keyboard.press('ArrowUp');

    // Get new board state
    const newTileValues = await page.locator('.grid .w-20').allTextContents();
    const newNonZeroTiles = newTileValues.filter(val => val !== '');

    // Expect the number of non-zero tiles to be greater than or equal to initial + 1 (new tile added)
    expect(newNonZeroTiles.length).toBeGreaterThanOrEqual(initialNonZeroTiles.length + 1);

    // More advanced check: verify actual tile movement/merging logic (this would require more complex board state comparison)
    // For now, we'll rely on the number of tiles changing and the game not being stuck.
  });
});
