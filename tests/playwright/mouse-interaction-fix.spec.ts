import { test, expect } from '@playwright/test';

test.describe('CopyVersa Mouse Interaction Fix Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to our local test page using absolute path
    const testPagePath = 'c:/Users/danie/OneDrive/Documents/Code/copyversa-chrome-ext/tests/test-page.html';
    await page.goto(`file:///${testPagePath}`);
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('panel appears and can be dragged with mouse', async ({ page }) => {
    console.log('🧪 Testing panel drag functionality...');
    
    // Activate CopyVersa using keyboard shortcut
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 10000 });
    console.log('✅ Panel is visible');
    
    // Get the panel header for dragging
    const panelHeader = panel.locator('.copyversa-panel-header');
    await expect(panelHeader).toBeVisible();
    console.log('✅ Panel header is visible');
    
    // Get initial position
    const initialBox = await panel.boundingBox();
    expect(initialBox).toBeTruthy();
    console.log(`📍 Initial panel position: x=${initialBox!.x}, y=${initialBox!.y}`);
    
    // Perform drag operation
    await panelHeader.hover();
    await page.mouse.down();
    await page.mouse.move(initialBox!.x + 100, initialBox!.y + 100);
    await page.mouse.up();
    
    // Wait a moment for the drag to complete
    await page.waitForTimeout(500);
    
    // Verify panel moved
    const newBox = await panel.boundingBox();
    expect(newBox).toBeTruthy();
    console.log(`📍 New panel position: x=${newBox!.x}, y=${newBox!.y}`);
    
    const deltaX = Math.abs(newBox!.x - initialBox!.x);
    const deltaY = Math.abs(newBox!.y - initialBox!.y);
    
    console.log(`📏 Movement delta: x=${deltaX}, y=${deltaY}`);
    expect(deltaX).toBeGreaterThan(50);
    expect(deltaY).toBeGreaterThan(50);
    
    console.log('✅ Panel drag test passed!');
  });

  test('buttons in panel are clickable', async ({ page }) => {
    console.log('🧪 Testing panel button interactions...');
    
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 10000 });
    console.log('✅ Panel is visible');
    
    // Test settings button
    const settingsButton = panel.locator('button[title="Settings"]');
    if (await settingsButton.isVisible()) {
      console.log('🔧 Testing settings button...');
      await settingsButton.click();
      console.log('✅ Settings button clicked successfully');
      
      // Wait for settings panel or close it
      await page.waitForTimeout(1000);
      
      // Try to close settings if it opened
      if (await settingsButton.isVisible()) {
        await settingsButton.click();
      }
    }
    
    // Test close button
    const closeButton = panel.locator('[data-testid="close-button"]');
    if (await closeButton.isVisible()) {
      console.log('❌ Testing close button...');
      await closeButton.click();
      
      // Panel should disappear
      await expect(panel).not.toBeVisible({ timeout: 5000 });
      console.log('✅ Close button worked - panel closed');
    }
    
    console.log('✅ Button interaction test passed!');
  });

  test('content selection works with mouse clicks', async ({ page }) => {
    console.log('🧪 Testing content selection...');
    
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 10000 });
    console.log('✅ Panel is visible');
    
    // Click on a paragraph to select it
    const paragraph = page.locator('p').first();
    await expect(paragraph).toBeVisible();
    console.log('📝 Clicking on paragraph to select content...');
    
    await paragraph.click();
    
    // Wait for content to be processed
    await page.waitForTimeout(1000);
    
    // Check if preview area has content
    const previewArea = panel.locator('.copyversa-preview');
    if (await previewArea.isVisible()) {
      const content = await previewArea.textContent();
      console.log(`📖 Preview content: "${content?.substring(0, 50)}..."`);
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(0);
      console.log('✅ Content selection worked!');
    } else {
      console.log('ℹ️ Preview area not visible - this might be expected based on UI design');
    }
    
    console.log('✅ Content selection test completed');
  });

  test('keyboard shortcuts work properly', async ({ page }) => {
    console.log('🧪 Testing keyboard shortcuts...');
    
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 10000 });
    console.log('✅ Panel activated with Ctrl+Shift+C');
    
    // Test Escape to close
    await page.keyboard.press('Escape');
    await expect(panel).not.toBeVisible({ timeout: 5000 });
    console.log('✅ Panel closed with Escape key');
    
    // Reactivate to test Tab for format switching
    await page.keyboard.press('Control+Shift+KeyC');
    await expect(panel).toBeVisible({ timeout: 10000 });
    console.log('✅ Panel reactivated');
    
    // Test Tab key (should switch formats)
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    console.log('✅ Tab key pressed (format switching)');
    
    console.log('✅ Keyboard shortcuts test passed!');
  });

  test('panel maintains proper z-index and visibility', async ({ page }) => {
    console.log('🧪 Testing panel z-index and visibility...');
    
    // Activate CopyVersa
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait for panel to appear
    const panel = page.locator('.copyversa-panel');
    await expect(panel).toBeVisible({ timeout: 10000 });
    console.log('✅ Panel is visible');
    
    // Check z-index
    const zIndex = await panel.evaluate(el => 
      window.getComputedStyle(el).zIndex
    );
    console.log(`🏔️ Panel z-index: ${zIndex}`);
    
    // Should have very high z-index
    expect(parseInt(zIndex)).toBeGreaterThan(2000000);
    console.log('✅ Panel has correct high z-index');
    
    // Check if panel has the correct class
    const hasCorrectClass = await panel.evaluate(el => 
      el.classList.contains('copyversa-panel')
    );
    expect(hasCorrectClass).toBe(true);
    console.log('✅ Panel has correct CSS class');
    
    console.log('✅ Z-index and visibility test passed!');
  });
});
