/**
 * CopyVersa Core System
 * Main orchestrator for content selection and conversion
 */

import { StorageManager, CopyVersaSettings } from './StorageManager'
import { SelectionEngine, SelectionChangeCallback } from './SelectionEngine'
import { ConversionEngine } from './ConversionEngine'
import { PanelUI } from '../ui/PanelUI.js'

export class CopyVersaCore {
  private storageManager: StorageManager
  private settings!: CopyVersaSettings
  private selectionEngine!: SelectionEngine
  private conversionEngine!: ConversionEngine
  private panelUI!: PanelUI
  private isInitialized = false

  constructor(storageManager: StorageManager) {
    this.storageManager = storageManager
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    console.info('🔧 Initializing CopyVersa Core...')

    try {
      // Load settings
      this.settings = await this.storageManager.getSettings()

      // Initialize engines
      this.selectionEngine = new SelectionEngine(this.settings)
      this.conversionEngine = new ConversionEngine(this.settings)

      // Initialize UI
      this.panelUI = new PanelUI(this.settings, {
        onFormatChange: this.handleFormatChange.bind(this),
        onCopy: this.handleCopy.bind(this),
        onClose: this.handleClose.bind(this),
        onSettingsChange: this.handleSettingsChange.bind(this)
      })      // Set up selection engine callbacks
      this.selectionEngine.onSelectionChange((elements: Element[]) => {
        this.updatePanelContent(elements)
      })

      // Apply theme
      this.applyTheme()

      // Start the selection engine
      await this.selectionEngine.start()

      // Show the panel
      this.panelUI.show()

      this.isInitialized = true
      console.info('✅ CopyVersa Core Initialized')

    } catch (error) {
      console.error('❌ Failed to initialize CopyVersa Core:', error)
      throw error
    }
  }

  destroy(): void {
    if (!this.isInitialized) return

    console.info('🧹 Destroying CopyVersa Core...')

    try {
      // Stop selection engine
      this.selectionEngine?.stop()

      // Hide and cleanup UI
      this.panelUI?.hide()

      // Remove theme classes
      document.documentElement.classList.remove('copyversa-theme-light', 'copyversa-theme-dark')

      this.isInitialized = false
      console.info('✅ CopyVersa Core Destroyed')

    } catch (error) {
      console.error('❌ Failed to destroy CopyVersa Core:', error)
    }
  }

  private async updatePanelContent(elements: Element[]): Promise<void> {
    if (!elements.length) {
      this.panelUI.updatePreview('', this.settings.defaultFormat)
      return
    }

    try {
      // Convert selected content to current format
      const content = await this.conversionEngine.convert(elements, this.settings.defaultFormat)
      this.panelUI.updatePreview(content, this.settings.defaultFormat)
    } catch (error) {
      console.error('Failed to update panel content:', error)
      this.panelUI.updatePreview('Error converting content', this.settings.defaultFormat)
    }
  }

  private async handleFormatChange(format: 'markdown' | 'html' | 'text'): Promise<void> {
    // Update settings
    this.settings.defaultFormat = format
    await this.storageManager.updateSettings({ defaultFormat: format })

    // Update preview with new format
    const selectedElements = this.selectionEngine.getSelectedElements()
    await this.updatePanelContent(selectedElements)
  }

  private async handleCopy(): Promise<void> {
    const selectedElements = this.selectionEngine.getSelectedElements()
    
    if (!selectedElements.length) {
      this.panelUI.showMessage('No content selected', 'error')
      return
    }

    try {
      // Convert to current format
      const content = await this.conversionEngine.convert(selectedElements, this.settings.defaultFormat)
      
      // Copy to clipboard
      await navigator.clipboard.writeText(content)
      
      // Show success message
      this.panelUI.showMessage(`Copied as ${this.settings.defaultFormat.toUpperCase()}!`, 'success')
      
      // Auto-close if quick copy is enabled
      if (this.settings.quickCopy) {
        setTimeout(() => this.handleClose(), 1000)
      }

    } catch (error) {
      console.error('Failed to copy content:', error)
      this.panelUI.showMessage('Failed to copy content', 'error')
    }
  }

  private handleClose(): void {
    // Notify parent to deactivate
    chrome.runtime.sendMessage({ type: 'DEACTIVATE_REQUEST' })
  }

  private async handleSettingsChange(updates: Partial<CopyVersaSettings>): Promise<void> {
    // Update local settings
    this.settings = { ...this.settings, ...updates }
    
    // Save to storage
    await this.storageManager.updateSettings(updates)
    
    // Apply theme changes
    if (updates.theme) {
      this.applyTheme()
    }
    
    // Update engines with new settings
    this.selectionEngine.updateSettings(this.settings)
    this.conversionEngine.updateSettings(this.settings)
  }

  private applyTheme(): void {
    const theme = this.storageManager.getTheme()
    document.documentElement.classList.remove('copyversa-theme-light', 'copyversa-theme-dark')
    document.documentElement.classList.add(`copyversa-theme-${theme}`)
  }
}
