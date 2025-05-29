import { ConversionEngine } from '../core/ConversionEngine';
import { DEFAULT_SETTINGS, CopyVersaSettings } from '../core/StorageManager';

describe('ConversionEngine', () => {
  let conversionEngine: ConversionEngine;
  let mockSettings: CopyVersaSettings;

  beforeEach(() => {
    mockSettings = { ...DEFAULT_SETTINGS };
    conversionEngine = new ConversionEngine(mockSettings);
  });
  describe('convert to markdown', () => {
    it('converts heading elements correctly', async () => {
      const h1 = document.createElement('h1');
      h1.textContent = 'Main Heading';
      
      const h2 = document.createElement('h2');
      h2.textContent = 'Sub Heading';

      const result = await conversionEngine.convert([h1, h2], 'markdown');
      
      expect(result).toBe('# Main Heading\n\n## Sub Heading');
    });

    it('converts paragraph elements correctly', async () => {
      const p1 = document.createElement('p');
      p1.textContent = 'First paragraph';
      
      const p2 = document.createElement('p');
      p2.textContent = 'Second paragraph';

      const result = await conversionEngine.convert([p1, p2], 'markdown');
      
      expect(result).toBe('First paragraph\n\nSecond paragraph');
    });

    it('converts link elements correctly', async () => {
      const a = document.createElement('a');
      a.href = 'https://example.com';
      a.textContent = 'Example Link';

      const result = await conversionEngine.convert([a], 'markdown');
      
      expect(result).toBe('[Example Link](https://example.com)');
    });

    it('converts strong elements correctly', async () => {
      const strong = document.createElement('strong');
      strong.textContent = 'Bold text';

      const result = await conversionEngine.convert([strong], 'markdown');
      
      expect(result).toBe('**Bold text**');
    });    it('converts emphasis elements correctly', async () => {
      const em = document.createElement('em');
      em.textContent = 'Italic text';

      const result = await conversionEngine.convert([em], 'markdown');
      
      expect(result).toBe('*Italic text*');
    });

    it('converts list items correctly', async () => {
      const ul = document.createElement('ul');
      const li1 = document.createElement('li');
      li1.textContent = 'First item';
      const li2 = document.createElement('li');
      li2.textContent = 'Second item';
      ul.appendChild(li1);
      ul.appendChild(li2);

      const result = await conversionEngine.convert([ul], 'markdown');
      
      expect(result).toBe('- First item\n- Second item');
    });

    it('handles nested elements correctly', async () => {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = 'bold';
      p.appendChild(document.createTextNode('This is '));
      p.appendChild(strong);
      p.appendChild(document.createTextNode(' text'));

      const result = await conversionEngine.convert([p], 'markdown');
      
      expect(result).toBe('This is **bold** text');
    });

    it('handles empty elements', async () => {
      const empty = document.createElement('div');

      const result = await conversionEngine.convert([empty], 'markdown');
      
      expect(result).toBe('');
    });
  });
  describe('convert to HTML', () => {
    it('preserves HTML structure', async () => {
      const h1 = document.createElement('h1');
      h1.textContent = 'Heading';
      
      const p = document.createElement('p');
      p.textContent = 'Paragraph';

      const result = await conversionEngine.convert([h1, p], 'html');
      
      expect(result).toBe('<h1>Heading</h1>\n<p>Paragraph</p>');
    });

    it('preserves attributes', async () => {
      const a = document.createElement('a');
      a.href = 'https://example.com';
      a.className = 'test-link';
      a.textContent = 'Link';

      const result = await conversionEngine.convert([a], 'html');
      
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('class="test-link"');
    });

    it('handles nested elements', async () => {
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = 'Nested paragraph';
      div.appendChild(p);

      const result = await conversionEngine.convert([div], 'html');
      
      expect(result).toBe('<div><p>Nested paragraph</p></div>');
    });
  });
  describe('convert to plain text', () => {
    it('extracts plain text correctly', async () => {
      const h1 = document.createElement('h1');
      h1.textContent = 'Heading';
      
      const p = document.createElement('p');
      p.textContent = 'Paragraph';

      const result = await conversionEngine.convert([h1, p], 'text');
      
      expect(result).toBe('Heading\n\nParagraph');
    });

    it('handles nested elements', async () => {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = 'bold';
      p.appendChild(document.createTextNode('This is '));
      p.appendChild(strong);
      p.appendChild(document.createTextNode(' text'));

      const result = await conversionEngine.convert([p], 'text');
      
      expect(result).toBe('This is bold text');
    });

    it('handles empty elements', async () => {
      const empty = document.createElement('div');

      const result = await conversionEngine.convert([empty], 'text');
      
      expect(result).toBe('');
    });

    it('filters out whitespace-only text nodes', async () => {
      const div = document.createElement('div');
      div.innerHTML = '   \n\t   ';

      const result = await conversionEngine.convert([div], 'text');
      
      expect(result).toBe('');
    });
  });
});
