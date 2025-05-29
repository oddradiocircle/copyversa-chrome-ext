import { CopyVersaCore } from '../core/CopyVersaCore'
import { StorageManager, DEFAULT_SETTINGS } from '../core/StorageManager'

describe('CopyVersaCore', () => {
  let copyVersa: CopyVersaCore
  let mockStorageManager: StorageManager

  beforeEach(() => {
    mockStorageManager = new StorageManager()
    jest.spyOn(mockStorageManager, 'getSettings').mockResolvedValue({ ...DEFAULT_SETTINGS })
    copyVersa = new CopyVersaCore(mockStorageManager)
  })

  afterEach(() => {
    // Clean up any DOM modifications
    copyVersa.destroy()
  })

  test('should initialize successfully', async () => {
    await copyVersa.initialize()
    // Add assertions
    expect(mockStorageManager.getSettings).toHaveBeenCalled()
  })

  test('should handle content selection through selection engine', async () => {
    await copyVersa.initialize()
    
    // Mock DOM elements
    const mockElement = document.createElement('p')
    mockElement.textContent = 'Test content'
    document.body.appendChild(mockElement)
    
    // The selection engine handles selection internally
    // We can test that the system is initialized properly
    expect(copyVersa['selectionEngine']).toBeDefined()
    
    // Clean up
    document.body.removeChild(mockElement)
  })

  test('should copy content through handleCopy method', async () => {
    await copyVersa.initialize()
    
    // Mock DOM elements
    const mockElement = document.createElement('h1')
    mockElement.textContent = 'Test Heading'
    document.body.appendChild(mockElement)
    
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve())
      }
    })

    // Mock the selection engine to return our test element
    jest.spyOn(copyVersa['selectionEngine'], 'getSelectedElements').mockReturnValue([mockElement])
    
    await copyVersa['handleCopy']()
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    
    // Clean up
    document.body.removeChild(mockElement)
  })

  test('should handle format changes', async () => {
    await copyVersa.initialize()
    
    jest.spyOn(mockStorageManager, 'updateSettings').mockResolvedValue()
    
    await copyVersa['handleFormatChange']('html')
    
    expect(mockStorageManager.updateSettings).toHaveBeenCalledWith({ defaultFormat: 'html' })
  })

  test('should handle settings changes', async () => {
    await copyVersa.initialize()
    
    jest.spyOn(mockStorageManager, 'updateSettings').mockResolvedValue()
    
    const updates = { theme: 'dark' as const }
    await copyVersa['handleSettingsChange'](updates)
    
    expect(mockStorageManager.updateSettings).toHaveBeenCalledWith(updates)
  })

  test('should handle empty selection gracefully', async () => {
    await copyVersa.initialize()
    
    // Mock empty selection
    jest.spyOn(copyVersa['selectionEngine'], 'getSelectedElements').mockReturnValue([])
    
    await copyVersa['handleCopy']()
    
    // Should handle gracefully without errors
  })
})
