/**
 * Selection Engine for CopyVersa v2
 * Handles intelligent content selection and visual feedback
 */

import { CopyVersaSettings } from './StorageManager'

export type SelectionChangeCallback = (elements: Element[]) => void

export class SelectionEngine {
  private settings: CopyVersaSettings
  private selectedElements: Set<Element> = new Set()
  private isActive = false
  private onSelectionChangeCallback?: SelectionChangeCallback
  private currentHoverElement: Element | null = null

  // Mouse event handlers
  private boundMouseMoveHandler = this.handleMouseMove.bind(this)
  private boundMouseDownHandler = this.handleMouseDown.bind(this)
  private boundMouseUpHandler = this.handleMouseUp.bind(this)
  private boundClickHandler = this.handleClick.bind(this)

  constructor(settings: CopyVersaSettings) {
    this.settings = settings
  }

  async start(): Promise<void> {
    if (this.isActive) return

    console.info('🎯 Starting Selection Engine...')

    // Add event listeners
    document.addEventListener('mousemove', this.boundMouseMoveHandler, true)
    document.addEventListener('mousedown', this.boundMouseDownHandler, true)
    document.addEventListener('mouseup', this.boundMouseUpHandler, true)
    document.addEventListener('click', this.boundClickHandler, true)

    // Prevent text selection while active
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'

    this.isActive = true
    console.info('✅ Selection Engine Started')
  }

  stop(): void {
    if (!this.isActive) return

    console.info('🛑 Stopping Selection Engine...')

    // Remove event listeners
    document.removeEventListener('mousemove', this.boundMouseMoveHandler, true)
    document.removeEventListener('mousedown', this.boundMouseDownHandler, true)
    document.removeEventListener('mouseup', this.boundMouseUpHandler, true)
    document.removeEventListener('click', this.boundClickHandler, true)

    // Restore text selection
    document.body.style.userSelect = ''
    document.body.style.webkitUserSelect = ''

    // Clear all selections and highlights
    this.clearAllSelections()
    this.clearHover()

    this.isActive = false
    console.info('✅ Selection Engine Stopped')
  }

  onSelectionChange(callback: SelectionChangeCallback): void {
    this.onSelectionChangeCallback = callback
  }

  getSelectedElements(): Element[] {
    return Array.from(this.selectedElements)
  }

  updateSettings(settings: CopyVersaSettings): void {
    this.settings = settings
  }
  private handleMouseMove(event: MouseEvent): void {
    if (!this.isActive) return

    // Skip CopyVersa UI elements to allow panel interactions
    if ((event.target as Element).closest('.copyversa-ui')) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const element = this.getSelectableElement(event.target as Element)
    if (element && element !== this.currentHoverElement) {
      this.clearHover()
      this.setHover(element)
    }
  }
  private handleMouseDown(event: MouseEvent): void {
    if (!this.isActive) return
    
    // Skip CopyVersa UI elements to allow panel interactions
    if ((event.target as Element).closest('.copyversa-ui')) {
      return
    }
    
    event.preventDefault()
    event.stopPropagation()
  }
  private handleMouseUp(event: MouseEvent): void {
    if (!this.isActive) return
    
    // Skip CopyVersa UI elements to allow panel interactions
    if ((event.target as Element).closest('.copyversa-ui')) {
      return
    }
    
    event.preventDefault()
    event.stopPropagation()
  }
  private handleClick(event: MouseEvent): void {
    if (!this.isActive) return

    // Skip CopyVersa UI elements to allow panel interactions
    if ((event.target as Element).closest('.copyversa-ui')) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const element = this.getSelectableElement(event.target as Element)
    if (!element) return

    if (this.settings.multiSelectMode) {
      // Toggle selection in multi-select mode
      if (this.selectedElements.has(element)) {
        this.deselectElement(element)
      } else {
        this.selectElement(element)
      }
    } else {
      // Single selection mode - replace current selection
      this.clearAllSelections()
      this.selectElement(element)
    }

    this.notifySelectionChange()
  }

  private getSelectableElement(target: Element): Element | null {
    if (!target || target === document.body || target === document.documentElement) {
      return null
    }

    // Skip CopyVersa UI elements
    if (target.closest('.copyversa-ui')) {
      return null
    }

    // Find the most appropriate selectable element
    let current = target
    while (current && current !== document.body) {
      // Prefer semantic elements
      if (this.isSemanticElement(current)) {
        return current
      }
        // Stop at block-level elements
      if (this.isBlockElement(current)) {
        return current
      }

      current = current.parentElement!
    }

    return target
  }

  private isSemanticElement(element: Element): boolean {
    const semanticTags = [
      'article', 'section', 'header', 'footer', 'nav', 'aside',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'blockquote', 'pre', 'code',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'figure', 'figcaption', 'img'
    ]
    
    return semanticTags.includes(element.tagName.toLowerCase())
  }

  private isBlockElement(element: Element): boolean {
    const computedStyle = window.getComputedStyle(element)
    return computedStyle.display === 'block' || 
           computedStyle.display === 'flex' ||
           computedStyle.display === 'grid'
  }

  private selectElement(element: Element): void {
    this.selectedElements.add(element)
    element.classList.add('copyversa-selected')
    
    // Add selection indicator
    this.addSelectionIndicator(element)
  }

  private deselectElement(element: Element): void {
    this.selectedElements.delete(element)
    element.classList.remove('copyversa-selected')
    
    // Remove selection indicator
    this.removeSelectionIndicator(element)
  }

  private clearAllSelections(): void {
    this.selectedElements.forEach(element => {
      element.classList.remove('copyversa-selected')
      this.removeSelectionIndicator(element)
    })
    this.selectedElements.clear()
  }

  private setHover(element: Element): void {
    this.currentHoverElement = element
    element.classList.add('copyversa-hover')
  }

  private clearHover(): void {
    if (this.currentHoverElement) {
      this.currentHoverElement.classList.remove('copyversa-hover')
      this.currentHoverElement = null
    }
  }
  private addSelectionIndicator(element: Element): void {
    if (element.querySelector('.copyversa-selection-indicator')) return

    const indicator = document.createElement('div')
    indicator.className = 'copyversa-selection-indicator'
    indicator.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
    
    ;(element as HTMLElement).style.position = 'relative'
    element.appendChild(indicator)
  }

  private removeSelectionIndicator(element: Element): void {
    const indicator = element.querySelector('.copyversa-selection-indicator')
    if (indicator) {
      indicator.remove()
    }
  }

  private notifySelectionChange(): void {
    if (this.onSelectionChangeCallback) {
      this.onSelectionChangeCallback(Array.from(this.selectedElements))
    }
  }
}
