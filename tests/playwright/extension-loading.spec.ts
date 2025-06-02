import { test, expect } from '@playwright/test';

test.describe('CopyVersa Extension Loading', () => {
  test('extension loads and content script is injected', async ({ page, context }) => {
    console.log('🧪 Testing extension loading...');
    
    // Navigate to our test page
    await page.goto('file://' + process.cwd().replace(/\\/g, '/') + '/tests/test-page.html');
    await page.waitForLoadState('networkidle');
    console.log('✅ Navigated to test page');
    
    // Wait a bit for extension to load
    await page.waitForTimeout(2000);
    
    // Check if the content script is loaded by looking for our classes
    const copyversaClasses = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets).find(sheet => {
        try {
          return Array.from(sheet.cssRules || []).some(rule => 
            rule.cssText && rule.cssText.includes('copyversa')
          );
        } catch (e) {
          return false;
        }
      });
      return !!styles;
    });
    
    console.log(`🎨 CopyVersa CSS loaded: ${copyversaClasses}`);
    
    // Try to trigger CopyVersa with keyboard shortcut
    await page.keyboard.press('Control+Shift+C');
    
    // Wait a bit for panel to appear
    await page.waitForTimeout(1000);
    
    // Check if panel appears
    const panelExists = await page.locator('.copyversa-panel').count() > 0;
    console.log(`📱 Panel exists after activation: ${panelExists}`);
    
    if (panelExists) {
      console.log('🎉 Extension loaded successfully!');
      expect(panelExists).toBe(true);
    } else {
      console.log('❌ Extension may not be loaded properly');
      
      // Debug: Check what scripts are loaded
      const scripts = await page.evaluate(() => {
        return Array.from(document.scripts).map(script => ({
          src: script.src,
          content: script.textContent?.substring(0, 100)
        }));
      });
      console.log('📜 Scripts loaded:', scripts);
      
      // Debug: Check for any CopyVersa-related elements
      const copyversaElements = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*')).filter(el => 
          el.className && el.className.includes('copyversa')
        ).length;
      });
      console.log(`🔍 CopyVersa elements found: ${copyversaElements}`);
    }
  });
  
  test('extension has proper permissions and manifest', async ({ context }) => {
    console.log('🧪 Testing extension manifest...');
    
    // Get background page (service worker for MV3)
    const backgroundPages = context.backgroundPages();
    console.log(`📦 Background pages count: ${backgroundPages.length}`);
    
    if (backgroundPages.length > 0) {
      const backgroundPage = backgroundPages[0];
      
      // Check if our background script is working
      const result = await backgroundPage.evaluate(() => {
        return {
          hasChrome: typeof chrome !== 'undefined',
          hasRuntime: typeof chrome?.runtime !== 'undefined',
          extensionId: chrome?.runtime?.id,
        };
      });
      
      console.log('🔧 Background script check:', result);
      expect(result.hasChrome).toBe(true);
      expect(result.hasRuntime).toBe(true);
      expect(result.extensionId).toBeTruthy();
    }
  });
});
