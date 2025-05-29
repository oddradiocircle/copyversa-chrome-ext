/**
 * Storage Manager for CopyVersa v2
 * Handles user preferences and settings
 */

/// <reference types="chrome" />

export interface CopyVersaSettings {
  theme: 'auto' | 'light' | 'dark'
  defaultFormat: 'markdown' | 'html' | 'text'
  showAnimations: boolean
  quickCopy: boolean
  multiSelectMode: boolean
  keyboardShortcuts: {
    activate: string
    copy: string
    switchFormat: string
  }
}

export const DEFAULT_SETTINGS: CopyVersaSettings = {
  theme: 'auto',
  defaultFormat: 'markdown',
  showAnimations: true,
  quickCopy: false,
  multiSelectMode: false,
  keyboardShortcuts: {
    activate: 'Ctrl+Shift+C',
    copy: 'Enter',
    switchFormat: 'Tab'
  }
}

export class StorageManager {
  private settings: CopyVersaSettings = DEFAULT_SETTINGS

  async init(): Promise<void> {
    try {
      const stored = await chrome.storage.sync.get('copyversaSettings')
      if (stored.copyversaSettings) {
        this.settings = { ...DEFAULT_SETTINGS, ...stored.copyversaSettings }
      }
    } catch (error) {
      console.warn('Failed to load settings, using defaults:', error)
    }
  }

  async getSettings(): Promise<CopyVersaSettings> {
    return this.settings
  }

  async updateSettings(updates: Partial<CopyVersaSettings>): Promise<void> {
    this.settings = { ...this.settings, ...updates }
    
    try {
      await chrome.storage.sync.set({ copyversaSettings: this.settings })
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  async resetSettings(): Promise<void> {
    this.settings = { ...DEFAULT_SETTINGS }
    
    try {
      await chrome.storage.sync.set({ copyversaSettings: this.settings })
    } catch (error) {
      console.error('Failed to reset settings:', error)
    }
  }

  // Theme detection
  getTheme(): 'light' | 'dark' {
    if (this.settings.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return this.settings.theme
  }
}
