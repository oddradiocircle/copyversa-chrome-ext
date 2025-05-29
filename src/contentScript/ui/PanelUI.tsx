/**
 * Panel UI for CopyVersa v2
 * React-based floating panel interface
 */

import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { CopyVersaSettings } from '../core/StorageManager'
import { CopyVersaPanel } from './components/CopyVersaPanel'

export interface PanelCallbacks {
  onFormatChange: (format: 'markdown' | 'html' | 'text') => void
  onCopy: () => void
  onClose: () => void
  onSettingsChange: (updates: Partial<CopyVersaSettings>) => void
}

export class PanelUI {
  private settings: CopyVersaSettings
  private callbacks: PanelCallbacks
  private container: HTMLDivElement | null = null
  private root: Root | null = null
  private currentContent = ''
  private currentFormat: 'markdown' | 'html' | 'text' = 'markdown'

  constructor(settings: CopyVersaSettings, callbacks: PanelCallbacks) {
    this.settings = settings
    this.callbacks = callbacks
    this.currentFormat = settings.defaultFormat
  }

  show(): void {
    if (this.container) return

    // Create container
    this.container = document.createElement('div')
    this.container.id = 'copyversa-panel-root'
    this.container.className = 'copyversa-ui'
    
    // Append to body
    document.body.appendChild(this.container)

    // Create React root and render
    this.root = createRoot(this.container)
    this.render()
  }

  hide(): void {
    if (this.root) {
      this.root.unmount()
      this.root = null
    }

    if (this.container) {
      this.container.remove()
      this.container = null
    }
  }

  updatePreview(content: string, format: 'markdown' | 'html' | 'text'): void {
    this.currentContent = content
    this.currentFormat = format
    this.render()
  }

  showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    // Re-render with message
    this.render()
    
    // Auto-hide message after 3 seconds
    setTimeout(() => {
      this.render()
    }, 3000)
  }

  private render(): void {
    if (!this.root) return

    this.root.render(
      <CopyVersaPanel
        settings={this.settings}
        content={this.currentContent}
        format={this.currentFormat}
        onFormatChange={this.callbacks.onFormatChange}
        onCopy={this.callbacks.onCopy}
        onClose={this.callbacks.onClose}
        onSettingsChange={this.callbacks.onSettingsChange}
      />
    )
  }
}
