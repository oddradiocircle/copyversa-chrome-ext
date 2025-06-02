# Manual Testing Guide for CopyVersa v2 Mouse Interaction Fix

## Quick Testing Steps

### 1. Load Extension in Chrome
1. Open Chrome browser
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `dist` folder: `c:\Users\danie\OneDrive\Documents\Code\copyversa-chrome-ext\dist`
6. Extension should appear in the extensions list

### 2. Test Mouse Interactions

#### Step 1: Navigate to Test Page
- Open the test page: `file:///c:/Users/danie/OneDrive/Documents/Code/copyversa-chrome-ext/tests/test-page.html`

#### Step 2: Activate CopyVersa
- Press `Ctrl+Shift+C` OR click the CopyVersa extension icon
- ✅ **EXPECTED**: Panel should appear on screen

#### Step 3: Test Panel Dragging (CRITICAL FIX)
- Click and hold the panel header (where it says "CopyVersa")
- Drag the panel to different positions
- ✅ **EXPECTED**: Panel should move smoothly as you drag
- ❌ **PREVIOUS BUG**: Panel wouldn't respond to mouse drag

#### Step 4: Test Button Interactions
- Click the Settings button (gear icon)
- ✅ **EXPECTED**: Settings panel should open/close
- Click format selector buttons (Markdown, HTML, Text)
- ✅ **EXPECTED**: Buttons should respond and change format

#### Step 5: Test Content Selection
- Click on any paragraph or text on the page
- ✅ **EXPECTED**: Content should be selected and appear in panel preview
- Try clicking different elements
- ✅ **EXPECTED**: Selection should work without interference

#### Step 6: Test Close Functionality
- Press `Escape` key OR click the X button
- ✅ **EXPECTED**: Panel should close

## Technical Fix Applied

**Problem**: The `SelectionEngine` was capturing all mouse events with `preventDefault()` and `stopPropagation()` before checking if the target was a CopyVersa UI element.

**Solution**: Modified mouse event handlers to check for `.copyversa-ui` elements FIRST, then return early without preventing defaults:

```typescript
// Fixed in SelectionEngine.ts
private handleMouseMove(event: MouseEvent): void {
  if (!this.isActive) return

  // Skip CopyVersa UI elements to allow panel interactions
  if ((event.target as Element).closest('.copyversa-ui')) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  // ... rest of handler
}
```

This allows the panel's React event handlers to function normally while still preventing page interactions during selection mode.

## Success Criteria

✅ Panel can be dragged around the screen
✅ All buttons in panel are clickable and responsive  
✅ Content selection works on page elements
✅ Keyboard shortcuts function properly
✅ Panel maintains high z-index and stays on top
✅ No conflicts between selection engine and panel UI

## Next Steps

If manual testing confirms the fix works:
1. Set up Chrome extension in Playwright properly
2. Run automated tests to verify functionality
3. Proceed with remaining integration testing
4. Prepare for Chrome Web Store submission
