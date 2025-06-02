import { test, expect, chromium } from '@playwright/test';

test.describe('CopyVersa Panel UI Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a test page
    await page.goto('https://example.com');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('panel appears and responds to mouse interactions', async ({ page }) => {
    // Activate CopyVersa using keyboard shortcut
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 5000 });
    
    // Test panel dragging functionality
    const panelHeader = panel.locator('.copyversa-panel-header');
    await expect(panelHeader).toBeVisible();
    
    // Get initial position
    const initialBox = await panel.boundingBox();
    expect(initialBox).toBeTruthy();
    
    // Drag the panel to a new position
    await panelHeader.dragTo(page.locator('body'), {
      targetPosition: { x: 200, y: 200 }
    });
    
    // Verify panel moved
    const newBox = await panel.boundingBox();
    expect(newBox).toBeTruthy();
    expect(Math.abs(newBox!.x - initialBox!.x)).toBeGreaterThan(50);
  });

  test('format selector buttons are clickable', async ({ page }) => {
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 5000 });
    
    // Test format selector buttons
    const markdownButton = panel.locator('button[data-format="markdown"]');
    const htmlButton = panel.locator('button[data-format="html"]');
    const textButton = panel.locator('button[data-format="text"]');
    
    // Click HTML format button
    if (await htmlButton.isVisible()) {
      await htmlButton.click();
      await expect(htmlButton).toHaveClass(/active|selected/);
    }
    
    // Click Text format button
    if (await textButton.isVisible()) {
      await textButton.click();
      await expect(textButton).toHaveClass(/active|selected/);
    }
    
    // Click Markdown format button
    if (await markdownButton.isVisible()) {
      await markdownButton.click();
      await expect(markdownButton).toHaveClass(/active|selected/);
    }
  });

  test('settings button opens settings panel', async ({ page }) => {
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 5000 });
    
    // Click settings button
    const settingsButton = panel.locator('button[title="Settings"]');
    if (await settingsButton.isVisible()) {
      await settingsButton.click();
      
      // Check if settings panel appears
      const settingsPanel = panel.locator('.copyversa-settings-panel');
      await expect(settingsPanel).toBeVisible({ timeout: 2000 });
    }
  });

  test('close button closes the panel', async ({ page }) => {
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 5000 });
    
    // Click close button
    const closeButton = panel.locator('[data-testid="close-button"]');
    if (await closeButton.isVisible()) {
      await closeButton.click();
      
      // Panel should disappear
      await expect(panel).not.toBeVisible({ timeout: 2000 });
    }
  });

  test('panel maintains high z-index and stays on top', async ({ page }) => {
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 5000 });
    
    // Check z-index
    const zIndex = await panel.evaluate(el => 
      window.getComputedStyle(el).zIndex
    );
    
    // Should have very high z-index
    expect(parseInt(zIndex)).toBeGreaterThan(2000000);
  });

  test('escape key closes the panel', async ({ page }) => {
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 5000 });
    
    // Press Escape key
    await page.keyboard.press('Escape');
    
    // Panel should disappear
    await expect(panel).not.toBeVisible({ timeout: 2000 });
  });

  test('panel selection functionality works', async ({ page }) => {
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 5000 });
    
    // Click on a page element (paragraph)
    const paragraph = page.locator('p').first();
    if (await paragraph.isVisible()) {
      await paragraph.click();
      
      // Check if content appears in preview area
      const previewArea = panel.locator('.copyversa-preview');
      if (await previewArea.isVisible()) {
        const content = await previewArea.textContent();
        expect(content).toBeTruthy();
        expect(content!.length).toBeGreaterThan(0);
      }
    }
  });
});
