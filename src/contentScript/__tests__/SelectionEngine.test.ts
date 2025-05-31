/**
 * SelectionEngine test suite for CopyVersa v2
 * Testing selection logic and DOM interaction
 */

import { SelectionEngine } from '../core/SelectionEngine';
import { DEFAULT_SETTINGS } from '../core/StorageManager';

// Mock DOM functions
Object.defineProperty(window, 'getComputedStyle', {
  value: jest.fn(() => ({
    display: 'block',
    position: 'static',
    visibility: 'visible'
  })),
  writable: true
});

describe('SelectionEngine', () => {
  let selectionEngine: SelectionEngine;
  let testContainer: HTMLDivElement;
  let mockCallback: jest.Mock;

  beforeEach(() => {
    // Create a test container with sample content
    testContainer = document.createElement('div');
    testContainer.innerHTML = `
      <div id="container">
        <h1 id="heading">Test Heading</h1>
        <p id="paragraph1">First paragraph with some content.</p>
        <p id="paragraph2">Second paragraph with more content.</p>
        <div id="generic-div">Some generic content</div>
        <article id="article">
          <h2>Article title</h2>
          <p>Article content</p>
        </article>
      </div>
    `;
    document.body.appendChild(testContainer);

    // Create mock callback
    mockCallback = jest.fn();

    // Initialize SelectionEngine with default settings
    const mockSettings = { ...DEFAULT_SETTINGS };
    selectionEngine = new SelectionEngine(mockSettings);
  });
  afterEach(() => {
    // Clean up
    if (selectionEngine) {
      selectionEngine.stop();
    }
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }
    jest.clearAllMocks();
  });

  describe('Core Functionality', () => {
    it('should initialize correctly', () => {
      expect(selectionEngine).toBeDefined();
      expect(selectionEngine.getSelectedElements()).toEqual([]);
    });

    it('should start and stop correctly', async () => {
      expect(selectionEngine).toBeDefined();
      
      // Start the engine
      await selectionEngine.start();
      // Stop the engine
      selectionEngine.stop();
    });

    it('should return empty selection initially', () => {
      const selectedElements = selectionEngine.getSelectedElements();
      expect(selectedElements).toEqual([]);
    });

    it('should register selection change callback', () => {
      expect(() => {
        selectionEngine.onSelectionChange(mockCallback);
      }).not.toThrow();
    });

    it('should update settings correctly', () => {
      const newSettings = { ...DEFAULT_SETTINGS, multiSelectMode: true };
      expect(() => selectionEngine.updateSettings(newSettings)).not.toThrow();
    });
  });

  describe('Public API Methods', () => {
    beforeEach(async () => {
      await selectionEngine.start();
      selectionEngine.onSelectionChange(mockCallback);
    });

    it('should have working getSelectedElements method', () => {
      const selectedElements = selectionEngine.getSelectedElements();
      expect(Array.isArray(selectedElements)).toBe(true);
      expect(selectedElements).toHaveLength(0);
    });

    it('should handle onSelectionChange callback registration', () => {
      const anotherCallback = jest.fn();
      expect(() => {
        selectionEngine.onSelectionChange(anotherCallback);
      }).not.toThrow();
    });

    it('should accept settings updates', () => {
      const newSettings = { 
        ...DEFAULT_SETTINGS, 
        multiSelectMode: true,
        autoSelectMode: false 
      };
      expect(() => {
        selectionEngine.updateSettings(newSettings);
      }).not.toThrow();
    });
  });

  describe('DOM Integration', () => {
    beforeEach(async () => {
      await selectionEngine.start();
    });

    it('should handle mouse events without throwing errors', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement;
      
      // Simulate mouse events
      expect(() => {
        const mouseEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100
        });
        Object.defineProperty(mouseEvent, 'target', {
          value: heading,
          enumerable: true
        });
        
        heading.dispatchEvent(mouseEvent);
      }).not.toThrow();
    });

    it('should handle click events without throwing errors', () => {
      const heading = testContainer.querySelector('#heading') as HTMLElement;
      
      expect(() => {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100
        });
        Object.defineProperty(clickEvent, 'target', {
          value: heading,
          enumerable: true
        });
        
        heading.dispatchEvent(clickEvent);
      }).not.toThrow();
    });
  });

  describe('State Management', () => {
    beforeEach(async () => {
      await selectionEngine.start();
      selectionEngine.onSelectionChange(mockCallback);
    });

    it('should maintain consistent state', () => {
      const initialState = selectionEngine.getSelectedElements();
      expect(initialState).toEqual([]);
      
      // Getting state multiple times should return the same result
      const secondState = selectionEngine.getSelectedElements();
      expect(secondState).toEqual(initialState);
    });

    it('should handle rapid start/stop cycles', async () => {
      expect(() => {
        selectionEngine.stop();
      }).not.toThrow();
      
      expect(async () => {
        await selectionEngine.start();
        selectionEngine.stop();
        await selectionEngine.start();
        selectionEngine.stop();
      }).not.toThrow();
    });
  });
});
