import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyVersaPanel } from '../ui/components/CopyVersaPanel';

describe('CopyVersaPanel', () => {
  const mockOnClose = jest.fn();
  const mockOnCopy = jest.fn();
  const mockSelectedElements = [
    { textContent: 'Test content 1', tagName: 'P' },
    { textContent: 'Test content 2', tagName: 'H1' }
  ] as Element[];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders panel with correct title', () => {
    render(
      <CopyVersaPanel
        isVisible={true}
        selectedElements={mockSelectedElements}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    expect(screen.getByText('CopyVersa')).toBeInTheDocument();
  });

  it('displays selected elements count', () => {
    render(
      <CopyVersaPanel
        isVisible={true}
        selectedElements={mockSelectedElements}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    expect(screen.getByText('2 elements selected')).toBeInTheDocument();
  });

  it('shows format selection buttons', () => {
    render(
      <CopyVersaPanel
        isVisible={true}
        selectedElements={mockSelectedElements}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    expect(screen.getByText('Markdown')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('calls onCopy with correct format when format button is clicked', async () => {
    render(
      <CopyVersaPanel
        isVisible={true}
        selectedElements={mockSelectedElements}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    const markdownButton = screen.getByText('Markdown');
    fireEvent.click(markdownButton);

    await waitFor(() => {
      expect(mockOnCopy).toHaveBeenCalledWith('markdown');
    });
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <CopyVersaPanel
        isVisible={true}
        selectedElements={mockSelectedElements}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    const closeButton = screen.getByLabelText('Close panel');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not render when isVisible is false', () => {
    render(
      <CopyVersaPanel
        isVisible={false}
        selectedElements={mockSelectedElements}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    expect(screen.queryByText('CopyVersa')).not.toBeInTheDocument();
  });

  it('shows empty state when no elements are selected', () => {
    render(
      <CopyVersaPanel
        isVisible={true}
        selectedElements={[]}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    expect(screen.getByText('No elements selected')).toBeInTheDocument();
  });

  it('displays preview content for selected elements', () => {
    render(
      <CopyVersaPanel
        isVisible={true}
        selectedElements={mockSelectedElements}
        onClose={mockOnClose}
        onCopy={mockOnCopy}
      />
    );

    // Should show preview of selected content
    expect(screen.getByText(/Test content 1/)).toBeInTheDocument();
  });
});
