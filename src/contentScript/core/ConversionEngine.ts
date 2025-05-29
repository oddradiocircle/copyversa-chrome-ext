/**
 * Conversion Engine for CopyVersa v2
 * Handles content conversion to different formats (Markdown, HTML, Text)
 */

import { CopyVersaSettings } from './StorageManager'

export class ConversionEngine {
  private settings: CopyVersaSettings

  constructor(settings: CopyVersaSettings) {
    this.settings = settings
  }

  updateSettings(settings: CopyVersaSettings): void {
    this.settings = settings
  }

  async convert(elements: Element[], format: 'markdown' | 'html' | 'text'): Promise<string> {
    if (!elements.length) return ''

    switch (format) {
      case 'markdown':
        return this.convertToMarkdown(elements)
      case 'html':
        return this.convertToHTML(elements)
      case 'text':
        return this.convertToText(elements)
      default:
        throw new Error(`Unsupported format: ${format}`)
    }
  }

  private convertToMarkdown(elements: Element[]): string {
    const results: string[] = []

    for (const element of elements) {
      const markdown = this.elementToMarkdown(element)
      if (markdown.trim()) {
        results.push(markdown.trim())
      }
    }

    return results.join('\n\n')
  }

  private elementToMarkdown(element: Element): string {
    const tagName = element.tagName.toLowerCase()

    switch (tagName) {
      case 'h1':
        return `# ${this.getTextContent(element)}`
      case 'h2':
        return `## ${this.getTextContent(element)}`
      case 'h3':
        return `### ${this.getTextContent(element)}`
      case 'h4':
        return `#### ${this.getTextContent(element)}`
      case 'h5':
        return `##### ${this.getTextContent(element)}`
      case 'h6':
        return `###### ${this.getTextContent(element)}`
      
      case 'p':
        return this.convertInlineElements(element)
      
      case 'blockquote':
        const content = this.convertInlineElements(element)
        return content.split('\n').map(line => `> ${line}`).join('\n')
      
      case 'pre':
        const codeElement = element.querySelector('code')
        if (codeElement) {
          const language = this.getCodeLanguage(codeElement)
          return `\`\`\`${language}\n${codeElement.textContent}\n\`\`\``
        }
        return `\`\`\`\n${element.textContent}\n\`\`\``
      
      case 'code':
        if (element.parentElement?.tagName.toLowerCase() === 'pre') {
          return '' // Handled by pre
        }
        return `\`${element.textContent}\``
      
      case 'ul':
        return this.convertList(element, '-')
      
      case 'ol':
        return this.convertList(element, '1.')
      
      case 'li':
        return this.convertInlineElements(element)
      
      case 'a':
        const href = element.getAttribute('href')
        const text = this.getTextContent(element)
        return href ? `[${text}](${href})` : text
      
      case 'img':
        const src = element.getAttribute('src')
        const alt = element.getAttribute('alt') || ''
        const title = element.getAttribute('title')
        return title ? `![${alt}](${src} "${title}")` : `![${alt}](${src})`
      
      case 'strong':
      case 'b':
        return `**${this.getTextContent(element)}**`
      
      case 'em':
      case 'i':
        return `*${this.getTextContent(element)}*`
      
      case 'table':
        return this.convertTable(element)
      
      case 'br':
        return '\n'
      
      case 'hr':
        return '---'
      
      default:
        // For other elements, process children
        return this.convertInlineElements(element)
    }
  }

  private convertInlineElements(element: Element): string {
    let result = ''
    
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent || ''
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        result += this.elementToMarkdown(node as Element)
      }
    }
    
    return result
  }

  private convertList(listElement: Element, marker: string): string {
    const items: string[] = []
    const listItems = listElement.querySelectorAll(':scope > li')
    
    listItems.forEach((li, index) => {
      const listMarker = marker === '1.' ? `${index + 1}.` : marker
      const content = this.convertInlineElements(li)
      items.push(`${listMarker} ${content}`)
    })
    
    return items.join('\n')
  }

  private convertTable(table: Element): string {
    const rows = table.querySelectorAll('tr')
    if (!rows.length) return ''

    const result: string[] = []
    let isFirstRow = true

    rows.forEach(row => {
      const cells = row.querySelectorAll('td, th')
      const cellContents = Array.from(cells).map(cell => 
        this.getTextContent(cell).replace(/\|/g, '\\|')
      )
      
      result.push(`| ${cellContents.join(' | ')} |`)
      
      // Add header separator after first row
      if (isFirstRow && row.querySelector('th')) {
        const separator = cellContents.map(() => '---').join(' | ')
        result.push(`| ${separator} |`)
        isFirstRow = false
      }
    })

    return result.join('\n')
  }

  private getCodeLanguage(codeElement: Element): string {
    // Try to detect language from class names
    const className = codeElement.className
    const languageMatch = className.match(/language-(\w+)/)
    return languageMatch ? languageMatch[1] : ''
  }

  private convertToHTML(elements: Element[]): string {
    const results: string[] = []

    for (const element of elements) {
      // Clone the element to avoid modifying the original
      const clone = element.cloneNode(true) as Element
      
      // Clean up the HTML
      this.cleanHTML(clone)
      
      results.push(clone.outerHTML)
    }

    return results.join('\n')
  }

  private cleanHTML(element: Element): void {
    // Remove CopyVersa specific classes and elements
    element.classList.remove('copyversa-selected', 'copyversa-hover')
    
    // Remove selection indicators
    const indicators = element.querySelectorAll('.copyversa-selection-indicator')
    indicators.forEach(indicator => indicator.remove())
    
    // Clean child elements recursively
    const children = element.querySelectorAll('*')
    children.forEach(child => {
      child.classList.remove('copyversa-selected', 'copyversa-hover')
    })
  }

  private convertToText(elements: Element[]): string {
    const results: string[] = []

    for (const element of elements) {
      const text = this.getTextContent(element)
      if (text.trim()) {
        results.push(text.trim())
      }
    }

    return results.join('\n\n')
  }

  private getTextContent(element: Element): string {
    return element.textContent || ''
  }
}
