/**
 * Action Buttons Component
 * Copy button and additional actions
 */

import React from 'react'

interface Props {
  hasContent: boolean
  multiSelectMode: boolean
  onCopy: () => void
  onToggleMultiSelect: () => void
}

export const ActionButtons: React.FC<Props> = ({
  hasContent,
  multiSelectMode,
  onCopy,
  onToggleMultiSelect
}) => {
  return (
    <div className="copyversa-actions">
      <div className="copyversa-actions-left">
        <button
          className={`copyversa-button copyversa-toggle ${
            multiSelectMode ? 'active' : ''
          }`}
          onClick={onToggleMultiSelect}
          title="Toggle multi-select mode"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="2"
              y="2"
              width="4"
              height="4"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={multiSelectMode ? 'currentColor' : 'none'}
            />
            <rect
              x="8"
              y="2"
              width="4"
              height="4"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={multiSelectMode ? 'currentColor' : 'none'}
            />
            <rect
              x="2"
              y="8"
              width="4"
              height="4"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={multiSelectMode ? 'currentColor' : 'none'}
            />
            <rect
              x="8"
              y="8"
              width="4"
              height="4"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={multiSelectMode ? 'currentColor' : 'none'}
            />
          </svg>
          <span>Multi-select</span>
        </button>
      </div>

      <div className="copyversa-actions-right">
        <button
          className={`copyversa-button copyversa-button-primary ${
            !hasContent ? 'disabled' : ''
          }`}
          onClick={onCopy}
          disabled={!hasContent}
          title="Copy to clipboard (Enter)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="4"
              y="4"
              width="6"
              height="8"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M6 4V2H12V8H10"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
          <span>Copy</span>
        </button>
      </div>
    </div>
  )
}
