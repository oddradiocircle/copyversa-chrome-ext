/**
 * @jest-environment jsdom
 */

describe('Background Script', () => {
  let mockChrome: any
  let consoleInfoSpy: jest.SpyInstance
  let consoleWarnSpy: jest.SpyInstance  
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    // Reset all mocks
    jest.resetModules()
    jest.clearAllMocks()
    
    // Create fresh chrome mocks for each test
    mockChrome = {
      runtime: {
        onStartup: { addListener: jest.fn() },
        onInstalled: { addListener: jest.fn() },
        onMessage: { addListener: jest.fn() },
        getManifest: jest.fn(() => ({ version: '2.0.0' })),
        sendMessage: jest.fn()
      },
      commands: {
        onCommand: { addListener: jest.fn() }
      },
      action: {
        onClicked: { addListener: jest.fn() },
        setIcon: jest.fn().mockResolvedValue(undefined),
        setBadgeText: jest.fn().mockResolvedValue(undefined),
        setBadgeBackgroundColor: jest.fn().mockResolvedValue(undefined),
        setTitle: jest.fn().mockResolvedValue(undefined)
      },
      tabs: {
        onRemoved: { addListener: jest.fn() },
        onUpdated: { addListener: jest.fn() },
        query: jest.fn().mockResolvedValue([]),
        sendMessage: jest.fn().mockResolvedValue({ success: true })
      }
    }

    // Assign to global
    ;(global as any).chrome = mockChrome

    // Mock console methods
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    jest.spyOn(console, 'log').mockImplementation(() => {})
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should initialize and set up event listeners', () => {
    // Import background script to trigger setup
    require('../index')

    // Verify all listeners are registered
    expect(mockChrome.runtime.onStartup.addListener).toHaveBeenCalled()
    expect(mockChrome.runtime.onInstalled.addListener).toHaveBeenCalled()
    expect(mockChrome.runtime.onMessage.addListener).toHaveBeenCalled()
    expect(mockChrome.commands.onCommand.addListener).toHaveBeenCalled()
    expect(mockChrome.action.onClicked.addListener).toHaveBeenCalled()
    expect(mockChrome.tabs.onRemoved.addListener).toHaveBeenCalled()
    expect(mockChrome.tabs.onUpdated.addListener).toHaveBeenCalled()
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('🚀 CopyVersa v2 Background Script Starting...')
    expect(consoleInfoSpy).toHaveBeenCalledWith('✅ CopyVersa v2 Background Script Ready')
  })

  it('should handle installation events correctly', () => {
    require('../index')
    
    const installedCallback = mockChrome.runtime.onInstalled.addListener.mock.calls[0][0] as Function
    
    // Test fresh install
    installedCallback({ reason: 'install' })
    expect(consoleInfoSpy).toHaveBeenCalledWith('📦 CopyVersa v2 Installed:', 'install')
    expect(consoleInfoSpy).toHaveBeenCalledWith('👋 Welcome to CopyVersa v2!')
    
    // Test update
    installedCallback({ reason: 'update' })
    expect(consoleInfoSpy).toHaveBeenCalledWith('📦 CopyVersa v2 Installed:', 'update')
    expect(consoleInfoSpy).toHaveBeenCalledWith('🆙 CopyVersa v2 Updated to version:', '2.0.0')
  })

  it('should handle activate_copyversa command', async () => {
    const mockTab = { id: 123, url: 'https://example.com' }
    ;(mockChrome.tabs.query as jest.Mock).mockResolvedValue([mockTab])
    
    require('../index')
    
    const commandCallback = mockChrome.commands.onCommand.addListener.mock.calls[0][0] as Function
    
    await commandCallback('activate_copyversa')
    
    expect(mockChrome.tabs.query).toHaveBeenCalledWith({ active: true, currentWindow: true })
    expect(mockChrome.tabs.sendMessage).toHaveBeenCalledWith(123, { type: 'ACTIVATE_COPYVERSA' })
    expect(consoleInfoSpy).toHaveBeenCalledWith('⌨️ Command received:', 'activate_copyversa')
  })

  it('should handle unknown commands gracefully', async () => {
    require('../index')
    
    const commandCallback = mockChrome.commands.onCommand.addListener.mock.calls[0][0] as Function
    
    await commandCallback('unknown_command')
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('⌨️ Command received:', 'unknown_command')
    // Should not attempt to activate for unknown commands
    expect(mockChrome.tabs.query).not.toHaveBeenCalled()
  })

  it('should handle extension icon clicks', async () => {
    const mockTab = { id: 456, url: 'https://example.com' }
    
    require('../index')
    
    const clickCallback = mockChrome.action.onClicked.addListener.mock.calls[0][0] as Function
    
    await clickCallback(mockTab)
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('🖱️ Extension icon clicked for tab:', 456)
    expect(mockChrome.tabs.sendMessage).toHaveBeenCalledWith(456, { type: 'ACTIVATE_COPYVERSA' })
  })

  it('should handle content script activation messages', () => {
    require('../index')
    
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 789 } }
    const mockSendResponse = jest.fn()
    
    messageCallback(
      { type: 'COPYVERSA_ACTIVATED', url: 'https://example.com' },
      mockSender,
      mockSendResponse
    )
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('📨 Message received:', 'COPYVERSA_ACTIVATED', 'from tab:', 789)
    expect(consoleInfoSpy).toHaveBeenCalledWith('✅ Content script confirmed activation on tab:', 789, 'URL:', 'https://example.com')
    expect(mockSendResponse).toHaveBeenCalledWith({ success: true })
  })

  it('should handle content script deactivation messages', () => {
    require('../index')
    
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 789 } }
    const mockSendResponse = jest.fn()
    
    messageCallback(
      { type: 'COPYVERSA_DEACTIVATED', url: 'https://example.com' },
      mockSender,
      mockSendResponse
    )
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('✅ Content script confirmed deactivation on tab:', 789, 'URL:', 'https://example.com')
    expect(mockSendResponse).toHaveBeenCalledWith({ success: true })
  })

  it('should handle deactivation requests from content script', async () => {
    require('../index')
    
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 789 } }
    const mockSendResponse = jest.fn()
    
    messageCallback(
      { type: 'DEACTIVATE_REQUEST' },
      mockSender,
      mockSendResponse
    )
    
    expect(mockSendResponse).toHaveBeenCalledWith({ success: true })
    // Should also send deactivate message to tab
    expect(mockChrome.tabs.sendMessage).toHaveBeenCalledWith(789, { type: 'DEACTIVATE_COPYVERSA' })
  })

  it('should handle status requests', () => {
    require('../index')
    
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 123 } }
    const mockSendResponse = jest.fn()
    
    messageCallback(
      { type: 'GET_ACTIVE_STATUS' },
      mockSender,
      mockSendResponse
    )
    
    expect(mockSendResponse).toHaveBeenCalledWith({ active: false })
  })
  it('should handle legacy COUNT messages', () => {
    require('../index')
    
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 123 } }
    const mockSendResponse = jest.fn()
    const consoleLogSpy = jest.spyOn(console, 'log')
    
    messageCallback(
      { type: 'COUNT', count: 42 },
      mockSender,
      mockSendResponse
    )
    
    expect(consoleLogSpy).toHaveBeenCalledWith('📊 Count message from popup:', 42)
    expect(mockSendResponse).toHaveBeenCalledWith({ success: true })
  })

  it('should handle unknown message types gracefully', () => {
    require('../index')
    
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 123 } }
    const mockSendResponse = jest.fn()
    
    messageCallback(
      { type: 'UNKNOWN_MESSAGE' },
      mockSender,
      mockSendResponse
    )
    
    expect(consoleWarnSpy).toHaveBeenCalledWith('⚠️ Unknown message type:', 'UNKNOWN_MESSAGE')
    expect(mockSendResponse).toHaveBeenCalledWith({ 
      success: false, 
      error: 'Unknown message type' 
    })
  })

  it('should clean up on tab removal', () => {
    require('../index')
    
    // First, simulate activation to add tab to active set
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 123 } }
    const mockSendResponse = jest.fn()
    
    messageCallback(
      { type: 'COPYVERSA_ACTIVATED', url: 'https://example.com' },
      mockSender,
      mockSendResponse
    )
    
    // Then simulate tab removal
    const tabRemovedCallback = mockChrome.tabs.onRemoved.addListener.mock.calls[0][0] as Function
    tabRemovedCallback(123)
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('🗑️ Cleaning up closed tab:', 123)
  })

  it('should reset state on tab reload', () => {
    require('../index')
    
    // First, simulate activation
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 123 } }
    const mockSendResponse = jest.fn()
    
    messageCallback(
      { type: 'COPYVERSA_ACTIVATED', url: 'https://example.com' },
      mockSender,
      mockSendResponse
    )
    
    // Then simulate tab reload
    const tabUpdatedCallback = mockChrome.tabs.onUpdated.addListener.mock.calls[0][0] as Function
    tabUpdatedCallback(123, { status: 'loading' })
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('🔄 Tab reloading, resetting state:', 123)
  })

  it('should handle command errors gracefully', async () => {
    ;(mockChrome.tabs.query as jest.Mock).mockRejectedValue(new Error('Tab query failed'))
    
    require('../index')
    
    const commandCallback = mockChrome.commands.onCommand.addListener.mock.calls[0][0] as Function
    
    await commandCallback('activate_copyversa')
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Failed to handle command:', expect.any(Error))
  })

  it('should handle icon state updates', async () => {
    require('../index')
    
    const messageCallback = mockChrome.runtime.onMessage.addListener.mock.calls[0][0] as Function
    const mockSender = { tab: { id: 123 } }
    const mockSendResponse = jest.fn()
    
    // Trigger activation which should update icon state
    messageCallback(
      { type: 'COPYVERSA_ACTIVATED', url: 'https://example.com' },
      mockSender,
      mockSendResponse
    )
    
    // Wait for async icon updates
    await new Promise(resolve => setTimeout(resolve, 10))
    
    expect(mockChrome.action.setBadgeText).toHaveBeenCalledWith({
      tabId: 123,
      text: '●'
    })
    
    expect(mockChrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
      tabId: 123,
      color: '#10B981'
    })
    
    expect(mockChrome.action.setTitle).toHaveBeenCalledWith({
      tabId: 123,
      title: 'CopyVersa v2 - Active (Click to deactivate)'
    })
  })
})
