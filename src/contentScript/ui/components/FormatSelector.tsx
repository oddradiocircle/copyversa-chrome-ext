/**
 * Format Selector Component
 * Allows switching between Markdown, HTML, and Text formats
 */

import React from 'react'

interface Props {
  currentFormat: 'markdown' | 'html' | 'text'
  onFormatChange: (format: 'markdown' | 'html' | 'text') => void
}

const formatIcons = {
  markdown: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 3H14V13H2V3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M4 6V10M6 8L8 6V10M10 6V10L12 8V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  html: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2L4 14L8 15L12 14L13 2H3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M11 5H8V7H10.5V9H8V11H11M5 5V11M5 8H7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  text: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 3H13M8 3V13M6 13H10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const FormatSelector: React.FC<Props> = ({ currentFormat, onFormatChange }) => {
  const formats: ('markdown' | 'html' | 'text')[] = ['markdown', 'html', 'text']

  return (
    <div className="copyversa-format-selector">
      {formats.map(format => (
        <button
          key={format}
          className={`copyversa-format-button ${
            currentFormat === format ? 'active' : ''
          }`}
          onClick={() => onFormatChange(format)}
          title={`Convert to ${format.toUpperCase()}`}
        >
          <span className="format-icon">
            {formatIcons[format]}
          </span>
          <span className="format-label">
            {format.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  )
}
