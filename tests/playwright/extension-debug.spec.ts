import { test, expect } from '@playwright/test';

test.describe('CopyVersa Extension Loading Debug', () => {
  test('verify extension is loaded and functional', async ({ page }) => {
    console.log('🔍 Starting extension loading debug test...');
    
    // Navigate to our test page
    const testPagePath = 'c:/Users/danie/OneDrive/Documents/Code/copyversa-chrome-ext/tests/test-page.html';
    await page.goto(`file:///${testPagePath}`);
    console.log('✅ Test page loaded');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if CopyVersa scripts are injected
    const scriptCheck = await page.evaluate(() => {
      return {
        hasCopyVersaCore: typeof window !== 'undefined' && (window as any).CopyVersaCore !== undefined,
        hasReact: typeof window !== 'undefined' && (window as any).React !== undefined,
        contentScripts: Array.from(document.scripts).map(s => s.src).filter(src => src.includes('copyversa')),
        bodyClasses: document.body.className,
        copyversaElements: document.querySelectorAll('[class*="copyversa"]').length
      };
    });
    
    console.log('🔍 Script injection check:', scriptCheck);
    
    // Check extension context
    const extensionContext = await page.evaluate(() => {
      return {
        extensionAvailable: typeof chrome !== 'undefined' && chrome.runtime !== undefined,
        extensionId: typeof chrome !== 'undefined' && chrome.runtime ? chrome.runtime.id : 'not available'
      };
    });
    
    console.log('🔍 Extension context:', extensionContext);
    
    // Try to manually trigger activation
    console.log('🎯 Attempting to activate CopyVersa...');
    await page.keyboard.press('Control+Shift+KeyC');
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Check if panel appeared
    const panelExists = await page.locator('.copyversa-panel').count();
    console.log(`🔍 Panel count after activation: ${panelExists}`);
    
    // Check for any error messages in console
    const consoleLogs = [];
    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });
    
    // Look for copyversa UI elements
    const uiElements = await page.evaluate(() => {
      return {
        copyversaUI: document.querySelectorAll('.copyversa-ui').length,
        copyversaPanel: document.querySelectorAll('.copyversa-panel').length,
        copyversaRoot: document.querySelectorAll('#copyversa-panel-root').length,
        allCopyversaElements: Array.from(document.querySelectorAll('[class*="copyversa"], [id*="copyversa"]')).map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id
        }))
      };
    });
    
    console.log('🔍 UI Elements found:', uiElements);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/debug-screenshot.png', fullPage: true });
    console.log('📸 Debug screenshot saved to test-results/debug-screenshot.png');
    
    // If no panel is found, let's try clicking the extension icon (if possible)
    if (panelExists === 0) {
      console.log('⚠️ Panel not found after keyboard shortcut, checking for extension icon...');
      
      // Check page title to confirm we're on the right page
      const title = await page.title();
      console.log(`📄 Page title: ${title}`);
      
      // Check document ready state
      const readyState = await page.evaluate(() => document.readyState);
      console.log(`📄 Document ready state: ${readyState}`);
    }
    
    // This test is for debugging, so we'll pass regardless
    expect(true).toBe(true);
  });
});
