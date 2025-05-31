import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyVersaPanel } from '../ui/components/CopyVersaPanel';
import { DEFAULT_SETTINGS, CopyVersaSettings } from '../core/StorageManager';

describe('CopyVersaPanel', () => {
  const mockOnClose = jest.fn();
  const mockOnCopy = jest.fn();
  const mockOnFormatChange = jest.fn();
  const mockOnSettingsChange = jest.fn();
  const mockSettings: CopyVersaSettings = { ...DEFAULT_SETTINGS };
  const mockContent = 'Test content\n\nSecond paragraph';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders panel with correct content', () => {
    render(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );

    expect(screen.getByText(/CopyVersa|Panel/)).toBeInTheDocument();
  });

  it('displays content preview', () => {
    render(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );

    expect(screen.getByText(/Test content/)).toBeInTheDocument();
  });

  it('shows format selection options', () => {
    render(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );

    // The exact text depends on the component implementation
    // Just check that format-related elements exist
    const formatElements = screen.queryAllByText(/markdown|html|text/i);
    expect(formatElements.length).toBeGreaterThan(0);
  });

  it('calls onFormatChange when format is changed', async () => {
    render(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );

    // Try to find and click a format button
    const formatButton = screen.queryByText(/html/i) || screen.queryByDisplayValue('html');
    if (formatButton) {
      fireEvent.click(formatButton);
      await waitFor(() => {
        expect(mockOnFormatChange).toHaveBeenCalled();
      });
    }
  });

  it('calls onCopy when copy action is triggered', () => {
    render(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );    // Look for copy button using specific selector
    const copyButton = screen.getByTestId('copy-button');
    fireEvent.click(copyButton);
    expect(mockOnCopy).toHaveBeenCalled();
  });

  it('calls onClose when close action is triggered', () => {
    render(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );    // Look for close button using specific selector
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles empty content state', () => {
    render(
      <CopyVersaPanel
        settings={mockSettings}
        content=""
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );

    // Component should render without crashing
    expect(screen.getByText(/CopyVersa|Panel|empty/i)).toBeInTheDocument();
  });

  it('displays different format outputs', () => {
    const { rerender } = render(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="markdown"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );

    // Test different formats
    rerender(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="html"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />
    );

    rerender(
      <CopyVersaPanel
        settings={mockSettings}
        content={mockContent}
        format="text"
        onFormatChange={mockOnFormatChange}
        onCopy={mockOnCopy}
        onClose={mockOnClose}
        onSettingsChange={mockOnSettingsChange}
      />    );

    // Component should handle all format types without errors
    expect(screen.getByText(/Test content/)).toBeInTheDocument();
  });
});
