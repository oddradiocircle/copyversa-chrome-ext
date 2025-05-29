/**
 * Settings Panel Component
 * Configuration options for CopyVersa
 */

import React from 'react'
import { CopyVersaSettings } from '../../core/StorageManager'

interface Props {
  settings: CopyVersaSettings
  onSettingsChange: (updates: Partial<CopyVersaSettings>) => void
  onClose: () => void
}

export const SettingsPanel: React.FC<Props> = ({
  settings,
  onSettingsChange,
  onClose
}) => {
  return (
    <div className="copyversa-settings">
      <div className="copyversa-settings-header">
        <h3>Settings</h3>
        <button
          className="copyversa-button copyversa-button-ghost"
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="copyversa-settings-content">
        {/* Theme Setting */}
        <div className="copyversa-setting">
          <label>Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => onSettingsChange({ 
              theme: e.target.value as 'auto' | 'light' | 'dark' 
            })}
          >
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Default Format */}
        <div className="copyversa-setting">
          <label>Default Format</label>
          <select
            value={settings.defaultFormat}
            onChange={(e) => onSettingsChange({ 
              defaultFormat: e.target.value as 'markdown' | 'html' | 'text' 
            })}
          >
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="text">Text</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="copyversa-setting">
          <label>
            <input
              type="checkbox"
              checked={settings.showAnimations}
              onChange={(e) => onSettingsChange({ showAnimations: e.target.checked })}
            />
            Show animations
          </label>
        </div>

        <div className="copyversa-setting">
          <label>
            <input
              type="checkbox"
              checked={settings.quickCopy}
              onChange={(e) => onSettingsChange({ quickCopy: e.target.checked })}
            />
            Quick copy (auto-close after copy)
          </label>
        </div>

        <div className="copyversa-setting">
          <label>
            <input
              type="checkbox"
              checked={settings.multiSelectMode}
              onChange={(e) => onSettingsChange({ multiSelectMode: e.target.checked })}
            />
            Multi-select mode by default
          </label>
        </div>
      </div>

      <div className="copyversa-settings-footer">
        <div className="copyversa-version">
          CopyVersa v2.0.0
        </div>
      </div>
    </div>
  )
}
