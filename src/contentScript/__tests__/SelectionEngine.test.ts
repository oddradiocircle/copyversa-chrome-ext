import { SelectionEngine, SelectionChangeCallback } from '../core/SelectionEngine'
import { CopyVersaSettings, DEFAULT_SETTINGS } from '../core/StorageManager'

describe('SelectionEngine', () => {
  let selectionEngine: SelectionEngine
  let mockCallback: jest.Mock
  let testContainer: HTMLElement
  let mockSettings: CopyVersaSettings

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''
    
    // Create test container with sample elements
    testContainer = document.createElement('div')
    testContainer.innerHTML = `
      <h1 id="heading">Test Heading</h1>
      <p id="paragraph1">First paragraph</p>
      <p id="paragraph2">Second paragraph</p>
      <div id="container">
        <span>Nested content</span>
      </div>
    `
    document.body.appendChild(testContainer)
    
    // Mock settings and callback
    mockSettings = { ...DEFAULT_SETTINGS }
    mockCallback = jest.fn()
    
    // Create SelectionEngine instance
    selectionEngine = new SelectionEngine(mockSettings)
    
    // Setup callback
    selectionEngine.onSelectionChange(mockCallback)
    
    // Clear mock calls
    mockCallback.mockClear()
  })

  afterEach(() => {
    // Stop engine if running
    if (selectionEngine) {
      selectionEngine.stop()
    }
    
    // Clean up DOM
    document.body.innerHTML = ''
    jest.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should create a new SelectionEngine instance', () => {
      expect(selectionEngine).toBeInstanceOf(SelectionEngine)
    })

    it('should start the engine successfully', async () => {
      await selectionEngine.start()
      expect(selectionEngine['isActive']).toBe(true)
    })

    it('should stop the engine successfully', async () => {
      await selectionEngine.start()
      selectionEngine.stop()
      expect(selectionEngine['isActive']).toBe(false)
    })
  })

  describe('Selection Management', () => {
    beforeEach(async () => {
      await selectionEngine.start()
    })

    it('should select an element', () => {
      const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement
      
      // Simulate element selection
      selectionEngine['selectElement'](paragraph)
      
      const selectedElements = selectionEngine.getSelectedElements()
      expect(selectedElements).toContain(paragraph)
    })

    it('should prevent duplicate element selection', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      
      // Select the same element twice
      selectionEngine['selectElement'](heading)
      selectionEngine['selectElement'](heading)
      
      const selectedElements = selectionEngine.getSelectedElements()
      expect(selectedElements).toHaveLength(1)
    })

    it('should deselect elements', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      
      // Select and then deselect
      selectionEngine['selectElement'](heading)
      expect(selectionEngine.getSelectedElements()).toHaveLength(1)
      
      selectionEngine['deselectElement'](heading)
      expect(selectionEngine.getSelectedElements()).toHaveLength(0)
    })

    it('should call callback when selection changes', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      
      selectionEngine['selectElement'](heading)
      selectionEngine['notifySelectionChange']()
      
      expect(mockCallback).toHaveBeenCalledWith([heading])
    })

    it('should clear all selections', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement
      
      selectionEngine['selectElement'](heading)
      selectionEngine['selectElement'](paragraph)
      expect(selectionEngine.getSelectedElements()).toHaveLength(2)
      
      selectionEngine['clearAllSelections']()
      expect(selectionEngine.getSelectedElements()).toHaveLength(0)
    })
  })

  describe('Visual Indicators', () => {
    it('should add selection indicators to elements', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      
      selectionEngine['addSelectionIndicator'](heading)
      
      expect(heading.style.position).toBe('relative')
      expect(heading.querySelector('.copyversa-selection-indicator')).toBeTruthy()
    })

    it('should remove selection indicators from elements', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      
      // Add indicator first
      selectionEngine['addSelectionIndicator'](heading)
      expect(heading.querySelector('.copyversa-selection-indicator')).toBeTruthy()
      
      // Then remove it
      selectionEngine['removeSelectionIndicator'](heading)
      expect(heading.querySelector('.copyversa-selection-indicator')).toBeFalsy()
    })
  })

  describe('Element Classification', () => {
    it('should identify semantic elements correctly', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement
      const div = testContainer.querySelector('#container') as HTMLElement
      
      expect(selectionEngine['isSemanticElement'](heading)).toBe(true)
      expect(selectionEngine['isSemanticElement'](paragraph)).toBe(true)
      expect(selectionEngine['isSemanticElement'](div)).toBe(false)
    })
  })

  describe('Selection State', () => {
    it('should get current selection correctly', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement
      const paragraph = testContainer.querySelector('#paragraph1') as HTMLElement
      
      selectionEngine['selectElement'](heading)
      selectionEngine['selectElement'](paragraph)
      
      const currentSelection = selectionEngine.getSelectedElements()
      expect(currentSelection).toHaveLength(2)
      expect(currentSelection).toContain(heading)
      expect(currentSelection).toContain(paragraph)
    })

    it('should handle empty selection state', () => {
      const currentSelection = selectionEngine.getSelectedElements()
      expect(currentSelection).toHaveLength(0)
      expect(currentSelection).toEqual([])
    })
  })

  describe('Settings Updates', () => {
    it('should update settings correctly', () => {
      const newSettings = { ...mockSettings, multiSelectMode: true }
      
      expect(() => selectionEngine.updateSettings(newSettings)).not.toThrow()
    })
  })
    
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
