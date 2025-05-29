/**
 * Preview Area Component
 * Shows the formatted content preview
 */

import React from 'react'

interface Props {
  content: string
  format: 'markdown' | 'html' | 'text'
}

export const PreviewArea: React.FC<Props> = ({ content, format }) => {
  const getPlaceholderText = () => {
    switch (format) {
      case 'markdown':
        return 'Click on elements to select them and see the Markdown preview here...'
      case 'html':
        return 'Click on elements to select them and see the HTML preview here...'
      case 'text':
        return 'Click on elements to select them and see the text preview here...'
      default:
        return 'Click on elements to select them...'
    }
  }

  const renderContent = () => {
    if (!content.trim()) {
      return (
        <div className="copyversa-preview-placeholder">
          {getPlaceholderText()}
        </div>
      )
    }

    // For HTML format, show a sanitized preview
    if (format === 'html') {
      return (
        <div className="copyversa-preview-html">
          <pre><code>{content}</code></pre>
        </div>
      )
    }

    // For markdown and text, show as plain text
    return (
      <div className="copyversa-preview-text">
        <pre><code>{content}</code></pre>
      </div>
    )
  }

  return (
    <div className="copyversa-preview-area">
      <div className="copyversa-preview-header">
        <div className="copyversa-preview-title">
          Preview ({format.toUpperCase()})
        </div>
        {content.trim() && (
          <div className="copyversa-preview-stats">
            {content.length} chars
          </div>
        )}
      </div>
      
      <div className="copyversa-preview-content">
        {renderContent()}
      </div>
    </div>
  )
}
