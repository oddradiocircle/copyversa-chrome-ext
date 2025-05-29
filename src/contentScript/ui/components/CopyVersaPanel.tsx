/**
 * CopyVersa Panel React Component
 * Main UI component for the floating panel
 */

import React, { useState, useEffect } from 'react'
import { CopyVersaSettings } from '../../core/StorageManager'
import { FormatSelector } from './FormatSelector'
import { PreviewArea } from './PreviewArea'
import { ActionButtons } from './ActionButtons'
import { SettingsPanel } from './SettingsPanel'

interface Props {
  settings: CopyVersaSettings
  content: string
  format: 'markdown' | 'html' | 'text'
  onFormatChange: (format: 'markdown' | 'html' | 'text') => void
  onCopy: () => void
  onClose: () => void
  onSettingsChange: (updates: Partial<CopyVersaSettings>) => void
}

export const CopyVersaPanel: React.FC<Props> = ({
  settings,
  content,
  format,
  onFormatChange,
  onCopy,
  onClose,
  onSettingsChange
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Panel drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as Element).closest('.copyversa-panel-header')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onCopy()
      } else if (e.code === 'Tab') {
        e.preventDefault()
        const formats: ('markdown' | 'html' | 'text')[] = ['markdown', 'html', 'text']
        const currentIndex = formats.indexOf(format)
        const nextIndex = (currentIndex + 1) % formats.length
        onFormatChange(formats[nextIndex])
      } else if (e.code === 'Escape') {
        e.preventDefault()
        if (isSettingsOpen) {
          setIsSettingsOpen(false)
        } else {
          onClose()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [format, isSettingsOpen, onFormatChange, onCopy, onClose])

  return (
    <div
      className={`copyversa-panel ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 2147483647
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="copyversa-panel-header">
        <div className="copyversa-panel-title">
          <div className="copyversa-logo">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L12 5L8 9L4 5L8 1Z"
                fill="var(--copyversa-primary)"
                stroke="var(--copyversa-primary)"
                strokeWidth="1"
              />
              <path
                d="M2 11L6 15L10 11"
                stroke="var(--copyversa-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span>CopyVersa</span>
        </div>
        
        <div className="copyversa-panel-actions">
          <button
            className="copyversa-button copyversa-button-ghost"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title="Settings"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 4.5A2.5 2.5 0 107 9.5A2.5 2.5 0 007 4.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M7 1V3M7 11V13M10.5 3.5L9.5 4.5M4.5 9.5L3.5 10.5M13 7H11M3 7H1M10.5 10.5L9.5 9.5M4.5 4.5L3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          
          <button
            className="copyversa-button copyversa-button-ghost"
            onClick={onClose}
            title="Close (Esc)"
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
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={onSettingsChange}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Main Content */}
      {!isSettingsOpen && (
        <>
          {/* Format Selector */}
          <FormatSelector
            currentFormat={format}
            onFormatChange={onFormatChange}
          />

          {/* Preview Area */}
          <PreviewArea
            content={content}
            format={format}
          />

          {/* Action Buttons */}
          <ActionButtons
            hasContent={!!content.trim()}
            multiSelectMode={settings.multiSelectMode}
            onCopy={onCopy}
            onToggleMultiSelect={() => 
              onSettingsChange({ multiSelectMode: !settings.multiSelectMode })
            }
          />

          {/* Keyboard Hints */}
          <div className="copyversa-hints">
            <span>Enter to copy</span>
            <span>Tab to switch format</span>
            <span>Esc to close</span>
          </div>
        </>
      )}
    </div>
  )
}
