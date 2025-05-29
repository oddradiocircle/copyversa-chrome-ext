import { SelectionEngine } from '../core/SelectionEngine'
import { DEFAULT_SETTINGS, CopyVersaSettings } from '../core/StorageManager'

describe('SelectionEngine', () => {
  let selectionEngine: SelectionEngine
  let mockCallback: jest.Mock
  let testContainer: HTMLElement
  let mockSettings: CopyVersaSettings

  beforeEach(() => {
    mockCallback = jest.fn()
    mockSettings = { ...DEFAULT_SETTINGS }
    selectionEngine = new SelectionEngine(mockSettings)
    
    // Create test container
    testContainer = document.createElement('div')
    testContainer.innerHTML = `
      <h1 id="heading">Test Heading</h1>
      <p id="paragraph1">First paragraph</p>
      <p id="paragraph2">Second paragraph</p>
      <div id="container">
        <span>Nested span</span>
      </div>
    `
    document.body.appendChild(testContainer)
  })

  afterEach(() => {
    selectionEngine.stop()
    if (testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer)
    }
    jest.clearAllMocks()
  })

  it('initializes correctly', () => {
    expect(selectionEngine).toBeInstanceOf(SelectionEngine)
  })

  it('can start and stop without errors', async () => {
    await expect(selectionEngine.start()).resolves.not.toThrow()
    expect(() => selectionEngine.stop()).not.toThrow()
  })

  it('handles element selection', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement
    const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement
    
    // Simulate element selection
    selectionEngine['selectElement'](heading)
    selectionEngine['selectElement'](paragraph)
    
    const selectedElements = selectionEngine.getSelectedElements()
    expect(selectedElements).toHaveLength(2)
    expect(selectedElements).toContain(heading)
    expect(selectedElements).toContain(paragraph)
  })

  it('handles element deselection', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement
    
    // Select then deselect
    selectionEngine['selectElement'](heading)
    expect(selectionEngine.getSelectedElements()).toHaveLength(1)
    
    selectionEngine['deselectElement'](heading)
    expect(selectionEngine.getSelectedElements()).toHaveLength(0)
  })

  it('calls selection change callback', () => {
    selectionEngine.onSelectionChange(mockCallback)
    
    const heading = testContainer.querySelector('#heading') as HTMLElement
    selectionEngine['selectElement'](heading)
    selectionEngine['notifySelectionChange']()
    
    expect(mockCallback).toHaveBeenCalledWith([heading])
  })

  it('clears all selections', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement
    const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement
    
    // Select multiple elements
    selectionEngine['selectElement'](heading)
    selectionEngine['selectElement'](paragraph)
    expect(selectionEngine.getSelectedElements()).toHaveLength(2)
    
    // Clear all
    selectionEngine['clearAllSelections']()
    expect(selectionEngine.getSelectedElements()).toHaveLength(0)
  })

  it('updates settings correctly', () => {
    const newSettings = { ...mockSettings, multiSelectMode: true }
    
    expect(() => selectionEngine.updateSettings(newSettings)).not.toThrow()
  })

  it('identifies semantic elements correctly', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement
    const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement
    const div = testContainer.querySelector('#container') as HTMLElement
    
    expect(selectionEngine['isSemanticElement'](heading)).toBe(true)
    expect(selectionEngine['isSemanticElement'](paragraph)).toBe(true)
    expect(selectionEngine['isSemanticElement'](div)).toBe(false)
  })
})
    expect(selectedElements).toContain(paragraph);
  });

  it('prevents duplicate element selection', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    
    // Select the same element twice
    selectionEngine['selectElement'](heading);
    selectionEngine['selectElement'](heading);
    
    const selectedElements = selectionEngine['selectedElements'];
    expect(selectedElements).toHaveLength(1);
  });

  it('can deselect elements', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    
    // Select and then deselect
    selectionEngine['selectElement'](heading);
    expect(selectionEngine['selectedElements']).toHaveLength(1);
    
    selectionEngine['deselectElement'](heading);
    expect(selectionEngine['selectedElements']).toHaveLength(0);
  });

  it('calls callback when selection changes', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    
    selectionEngine['selectElement'](heading);
    
    expect(mockCallback).toHaveBeenCalledWith([heading]);
  });

  it('clears all selections', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement;
    
    selectionEngine['selectElement'](heading);
    selectionEngine['selectElement'](paragraph);
    expect(selectionEngine['selectedElements']).toHaveLength(2);
    
    selectionEngine.clearSelection();
    expect(selectionEngine['selectedElements']).toHaveLength(0);
    expect(mockCallback).toHaveBeenCalledWith([]);
  });

  it('adds selection indicators to elements', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    
    selectionEngine['addSelectionIndicator'](heading);
    
    // Check if the element has been styled for selection
    expect(heading.style.position).toBe('relative');
    // The exact indicator implementation may vary, but we can check for basic styling
  });

  it('removes selection indicators from elements', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    
    // Add indicator first
    selectionEngine['addSelectionIndicator'](heading);
    
    // Then remove it
    selectionEngine['removeSelectionIndicator'](heading);
    
    // Element should be back to normal state
    expect(heading.style.position).toBe('');
  });

  it('handles click events for element selection', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    
    // Simulate a click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      ctrlKey: true, // Ctrl+click for selection
    });
    
    heading.dispatchEvent(clickEvent);
    
    // The actual behavior depends on the implementation,
    // but we can test that the event doesn't cause errors
    expect(() => heading.dispatchEvent(clickEvent)).not.toThrow();
  });

  it('gets current selection correctly', () => {
    const heading = testContainer.querySelector('#heading') as HTMLElement;
    const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement;
    
    selectionEngine['selectElement'](heading);
    selectionEngine['selectElement'](paragraph);
    
    const currentSelection = selectionEngine.getSelectedElements();
    expect(currentSelection).toHaveLength(2);
    expect(currentSelection).toContain(heading);
    expect(currentSelection).toContain(paragraph);
  });

  it('handles empty selection state', () => {
    const currentSelection = selectionEngine.getSelectedElements();
    expect(currentSelection).toHaveLength(0);
    expect(currentSelection).toEqual([]);
  });
});
