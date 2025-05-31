/**
 * CopyVersa v2 - Background Script (Service Worker)
 * Handles extension activation, command processing, and tab management
 */

console.info('🚀 CopyVersa v2 Background Script Starting...')

// Track active tabs
const activeTabs = new Set<number>()

// Extension startup
chrome.runtime.onStartup.addListener(() => {
  console.info('🔄 CopyVersa v2 Extension Started')
})

chrome.runtime.onInstalled.addListener((details) => {
  console.info('📦 CopyVersa v2 Installed:', details.reason)
  
  if (details.reason === 'install') {
    // Show welcome message or open options page
    console.info('👋 Welcome to CopyVersa v2!')
  } else if (details.reason === 'update') {
    console.info('🆙 CopyVersa v2 Updated to version:', chrome.runtime.getManifest().version)
  }
})

// Command handler - Ctrl+Shift+C keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  console.info('⌨️ Command received:', command)
  
  if (command === 'activate_copyversa') {
    try {
      // Get the active tab
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
      
      if (activeTab?.id) {
        await activateCopyVersa(activeTab.id)
      } else {
        console.warn('⚠️ No active tab found for command')
      }
    } catch (error) {
      console.error('❌ Failed to handle command:', error)
    }
  }
})

// Extension icon click handler
chrome.action.onClicked.addListener(async (tab) => {
  console.info('🖱️ Extension icon clicked for tab:', tab.id)
  
  if (tab.id) {
    await toggleCopyVersa(tab.id)
  }
})

// Message handler for communication with content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if extension context is still valid
  if (!chrome.runtime?.id) {
    console.warn('⚠️ Extension context invalidated, message ignored:', message.type)
    sendResponse({ success: false, error: 'Extension context invalidated' })
    return
  }

  console.info('📨 Message received:', message.type, 'from tab:', sender.tab?.id)
  
  try {
    switch (message.type) {
      case 'COPYVERSA_ACTIVATED':
        handleActivation(sender.tab?.id, message.url)
        sendResponse({ success: true })
        break
      
      case 'COPYVERSA_DEACTIVATED':
        handleDeactivation(sender.tab?.id, message.url)
        sendResponse({ success: true })
        break
        
      case 'DEACTIVATE_REQUEST':
        if (sender.tab?.id) {
          deactivateCopyVersa(sender.tab.id)
        }
        sendResponse({ success: true })
        break
        
      case 'GET_ACTIVE_STATUS':
        sendResponse({ 
          active: sender.tab?.id ? activeTabs.has(sender.tab.id) : false 
        })
        break
        
      case 'COUNT':
        // Legacy message handler for compatibility
        console.log('📊 Count message from popup:', message?.count)
        sendResponse({ success: true })
        break
        
      default:
        console.warn('⚠️ Unknown message type:', message.type)
        sendResponse({ success: false, error: 'Unknown message type' })
    }  } catch (error) {
    console.error('❌ Error handling message:', error)
    sendResponse({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })
  }
  
  return true // Keep message channel open for async responses
})

// Tab removal cleanup
chrome.tabs.onRemoved.addListener((tabId) => {
  if (activeTabs.has(tabId)) {
    console.info('🗑️ Cleaning up closed tab:', tabId)
    activeTabs.delete(tabId)
  }
})

// Tab update handler - reset state on navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading' && activeTabs.has(tabId)) {
    console.info('🔄 Tab reloading, resetting state:', tabId)
    activeTabs.delete(tabId)
    updateIconState(tabId, false)
  }
})

/**
 * Activate CopyVersa on the specified tab
 */
async function activateCopyVersa(tabId: number): Promise<void> {
  try {
    console.info('🎯 Activating CopyVersa on tab:', tabId)
    
    // Send activation message to content script
    const response = await chrome.tabs.sendMessage(tabId, { 
      type: 'ACTIVATE_COPYVERSA' 
    })
    
    if (response?.success) {
      activeTabs.add(tabId)
      updateIconState(tabId, true)
      console.info('✅ CopyVersa activated on tab:', tabId)
    } else {
      console.warn('⚠️ Failed to activate CopyVersa on tab:', tabId)
    }
  } catch (error) {
    console.error('❌ Error activating CopyVersa:', error)
    // Content script might not be loaded yet
    console.info('💡 Content script may not be ready. Try refreshing the page.')
  }
}

/**
 * Deactivate CopyVersa on the specified tab
 */
async function deactivateCopyVersa(tabId: number): Promise<void> {
  try {
    console.info('🔄 Deactivating CopyVersa on tab:', tabId)
    
    const response = await chrome.tabs.sendMessage(tabId, { 
      type: 'DEACTIVATE_COPYVERSA' 
    })
    
    if (response?.success) {
      activeTabs.delete(tabId)
      updateIconState(tabId, false)
      console.info('✅ CopyVersa deactivated on tab:', tabId)
    }
  } catch (error) {
    console.error('❌ Error deactivating CopyVersa:', error)
  }
}

/**
 * Toggle CopyVersa state on the specified tab
 */
async function toggleCopyVersa(tabId: number): Promise<void> {
  const isActive = activeTabs.has(tabId)
  
  if (isActive) {
    await deactivateCopyVersa(tabId)
  } else {
    await activateCopyVersa(tabId)
  }
}

/**
 * Handle activation notification from content script
 */
function handleActivation(tabId: number | undefined, url?: string): void {
  if (tabId) {
    console.info('✅ Content script confirmed activation on tab:', tabId, 'URL:', url)
    activeTabs.add(tabId)
    updateIconState(tabId, true)
  }
}

/**
 * Handle deactivation notification from content script
 */
function handleDeactivation(tabId: number | undefined, url?: string): void {
  if (tabId) {
    console.info('✅ Content script confirmed deactivation on tab:', tabId, 'URL:', url)
    activeTabs.delete(tabId)
    updateIconState(tabId, false)
  }
}

/**
 * Update extension icon state based on activation status
 */
async function updateIconState(tabId: number, isActive: boolean): Promise<void> {
  try {
    // Use the same icon for both states
    await chrome.action.setIcon({
      tabId,
      path: {
        16: 'img/logo-16.png',
        32: 'img/logo-32.png',
        48: 'img/logo-48.png',
        128: 'img/logo-128.png'
      }
    })
    
    // Update badge to indicate active state
    await chrome.action.setBadgeText({
      tabId,
      text: isActive ? '●' : ''
    })
    
    // Update badge color
    await chrome.action.setBadgeBackgroundColor({
      tabId,
      color: isActive ? '#10B981' : '#6B7280'
    })
    
    // Update title
    await chrome.action.setTitle({
      tabId,
      title: isActive 
        ? 'CopyVersa v2 - Active (Click to deactivate)' 
        : 'CopyVersa v2 - Click to activate'
    })
    
  } catch (error) {
    console.error('❌ Failed to update icon state:', error)
  }
}

console.info('✅ CopyVersa v2 Background Script Ready')

// Export for testing
export {
  activateCopyVersa,
  deactivateCopyVersa,
  toggleCopyVersa,
  handleActivation,
  handleDeactivation,
  updateIconState
}
