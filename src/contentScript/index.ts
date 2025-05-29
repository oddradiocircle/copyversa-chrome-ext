/**
 * CopyVersa v2 - Content Script Entry Point
 * Handles activation, content selection, and format conversion
 */

import { CopyVersaCore } from './core/CopyVersaCore'
import { StorageManager } from './core/StorageManager'
import './styles.css'

class CopyVersaContentScript {
  private core: CopyVersaCore | null = null
  private isActive = false
  private storageManager: StorageManager

  constructor() {
    this.storageManager = new StorageManager()
    this.init()
  }

  private async init(): Promise<void> {
    console.info('🚀 CopyVersa v2 Content Script Loading...')
    
    // Load user preferences
    await this.storageManager.init()
    
    // Set up keyboard listeners
    this.setupKeyboardListeners()
    
    // Set up command listener from extension
    this.setupCommandListener()
    
    console.info('✅ CopyVersa v2 Content Script Ready')
  }

  private setupKeyboardListeners(): void {
    document.addEventListener('keydown', (event) => {
      // Ctrl+Shift+C (or Cmd+Shift+C on Mac) to activate
      const isActivationKey = (event.ctrlKey || event.metaKey) && 
                             event.shiftKey && 
                             event.code === 'KeyC'
      
      if (isActivationKey) {
        event.preventDefault()
        event.stopPropagation()
        this.toggleActivation()
      }
      
      // ESC to deactivate
      if (event.code === 'Escape' && this.isActive) {
        event.preventDefault()
        this.deactivate()
      }
    })
  }

  private setupCommandListener(): void {
    // Listen for commands from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.type) {
        case 'ACTIVATE_COPYVERSA':
          this.activate()
          sendResponse({ success: true })
          break
        case 'DEACTIVATE_COPYVERSA':
          this.deactivate()
          sendResponse({ success: true })
          break
        case 'GET_STATUS':
          sendResponse({ active: this.isActive })
          break
      }
    })
  }

  private async toggleActivation(): Promise<void> {
    if (this.isActive) {
      this.deactivate()
    } else {
      await this.activate()
    }
  }

  private async activate(): Promise<void> {
    if (this.isActive) return

    console.info('🎯 Activating CopyVersa...')
    
    try {
      // Create and initialize the core system
      this.core = new CopyVersaCore(this.storageManager)
      await this.core.initialize()
      
      this.isActive = true
      document.body.classList.add('copyversa-active')
      
      // Notify background script
      chrome.runtime.sendMessage({ 
        type: 'COPYVERSA_ACTIVATED',
        url: window.location.href 
      })
      
      console.info('✅ CopyVersa Activated')
    } catch (error) {
      console.error('❌ Failed to activate CopyVersa:', error)
    }
  }

  private deactivate(): void {
    if (!this.isActive) return

    console.info('🔄 Deactivating CopyVersa...')
    
    try {
      // Clean up the core system
      if (this.core) {
        this.core.destroy()
        this.core = null
      }
      
      this.isActive = false
      document.body.classList.remove('copyversa-active')
      
      // Notify background script
      chrome.runtime.sendMessage({ 
        type: 'COPYVERSA_DEACTIVATED',
        url: window.location.href 
      })
      
      console.info('✅ CopyVersa Deactivated')
    } catch (error) {
      console.error('❌ Failed to deactivate CopyVersa:', error)
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CopyVersaContentScript()
  })
} else {
  new CopyVersaContentScript()
}
