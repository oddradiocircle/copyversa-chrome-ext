# CopyVersa v2 - Development Guide
## Chrome Extension Development Documentation

### 🎯 Project Overview
CopyVersa v2 is a Chrome extension that allows users to copy web content while preserving semantic structure, style, and format. This guide covers everything needed for development, from setup to deployment.

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Development Setup](#development-setup)
4. [Architecture Overview](#architecture-overview)
5. [Development Workflow](#development-workflow)
6. [Testing](#testing)
7. [Build & Deployment](#build--deployment)
8. [Contributing](#contributing)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Chrome**: Latest version for testing
- **Git**: For version control

### 1. Clone & Install
```bash
# Clone the repository
git clone <repository-url>
cd copyversa-chrome-ext

# Install dependencies
npm install

# Start development
npm run dev
```

### 2. Load Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `dist/` folder from the project

### 3. Test the Extension
1. Navigate to any webpage
2. Press `Ctrl+Shift+X` or click the extension icon
3. Start selecting content!

---

## 📁 Project Structure

```
copyversa-v2/
├── docs/                          # Documentation
│   ├── PRD-CopyVersa-v2.md       # Product Requirements
│   ├── User-Stories-CopyVersa-v2.md # User Stories
│   ├── Technical-Architecture.md  # Technical Architecture
│   └── Development-Guide.md       # This file
├── public/                        # Static assets
│   ├── icons/                     # Extension icons
│   │   ├── icon16.png
│   │   ├── icon32.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   └── manifest.json             # Extension manifest
├── src/                          # Source code
│   ├── background/               # Service worker
│   │   └── service-worker.ts
│   ├── content/                  # Content scripts
│   │   ├── content-script.tsx    # Main content script
│   │   ├── components/           # React components
│   │   │   ├── CopyVersaPanel.tsx
│   │   │   ├── ModeSelector.tsx
│   │   │   ├── FormatSelector.tsx
│   │   │   ├── QuickSettings.tsx
│   │   │   └── Toast.tsx
│   │   └── styles/              # Component styles
│   │       ├── panel.css
│   │       ├── selection.css
│   │       └── animations.css
│   ├── popup/                   # Extension popup
│   │   ├── popup.tsx
│   │   ├── popup.html
│   │   └── popup.css
│   ├── options/                 # Options page
│   │   ├── options.tsx
│   │   ├── options.html
│   │   └── options.css
│   ├── lib/                     # Utilities & libraries
│   │   ├── conversion/          # Content conversion
│   │   │   ├── markdown-converter.ts
│   │   │   ├── html-cleaner.ts
│   │   │   └── sanitizer.ts
│   │   ├── selection/           # Selection engine
│   │   │   ├── selection-engine.ts
│   │   │   └── visual-feedback.ts
│   │   ├── storage/            # Data persistence
│   │   │   ├── storage-manager.ts
│   │   │   └── settings.ts
│   │   └── utils/              # General utilities
│   │       ├── dom-utils.ts
│   │       ├── clipboard.ts
│   │       └── messaging.ts
│   └── types/                  # TypeScript definitions
│       ├── extension.ts
│       ├── settings.ts
│       └── messages.ts
├── tests/                      # Test files
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
├── tools/                      # Build tools & scripts
│   ├── build.js               # Custom build scripts
│   └── manifest-parser.js     # Manifest utilities
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # Project README
```

---

## 🔧 Development Setup

### 1. Environment Configuration

Create a `.env` file in the project root:
```env
# Development configuration
NODE_ENV=development
DEBUG=true
LOG_LEVEL=verbose

# Build configuration
BUILD_TARGET=chrome
MANIFEST_VERSION=3

# Optional: Analytics (disabled in development)
ANALYTICS_ENABLED=false
```

### 2. VS Code Setup (Recommended)

Install recommended extensions:
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "chrisdias.vscode-opennewinstance"
  ]
}
```

### 3. Chrome Extension Development Tools

Install helpful Chrome extensions for development:
- **Extension Reloader**: Auto-reload your extension during development
- **React Developer Tools**: Debug React components
- **Chrome Apps & Extensions Developer Tool**: Extension debugging

---

## 🏗️ Architecture Overview

### Component Hierarchy
```
Chrome Extension
├── Service Worker (Background)
│   ├── Message Router
│   ├── Settings Manager
│   ├── Command Handler
│   └── Context Menu Manager
│
├── Content Script (Injected)
│   ├── CopyVersaPanel (React)
│   │   ├── Header
│   │   ├── ModeSelector
│   │   ├── FormatSelector
│   │   ├── QuickSettings
│   │   └── ActionButtons
│   ├── Selection Engine
│   │   ├── Element Detector
│   │   ├── Visual Feedback
│   │   └── Multi-Selection Manager
│   └── Conversion Engine
│       ├── Markdown Converter
│       ├── HTML Cleaner
│       └── Content Sanitizer
│
├── Popup (Extension UI)
│   ├── Status Display
│   ├── Quick Settings
│   └── Navigation Links
│
└── Options Page (Settings)
    ├── Appearance Settings
    ├── Behavior Settings
    ├── Advanced Settings
    └── Data Management
```

### Data Flow
```
User Action → Service Worker → Content Script → React Components → DOM Manipulation
     ↓              ↓              ↓              ↓              ↓
Storage API ← Message Passing ← State Updates ← User Interface ← Visual Feedback
```

---

## 🔄 Development Workflow

### Daily Development Process

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Code Changes**
   - Edit source files in `src/`
   - Vite will automatically rebuild
   - Extension will reload in Chrome

3. **Testing Changes**
   ```bash
   # Run unit tests
   npm run test

   # Run specific test suite
   npm run test:unit
   npm run test:integration

   # Run with watch mode
   npm run test:watch
   ```

4. **Linting & Formatting**
   ```bash
   # Run ESLint
   npm run lint

   # Fix auto-fixable issues
   npm run lint:fix

   # Format code with Prettier
   npm run format
   ```

### Branch Strategy

```
main                    # Production-ready code
  ├── develop          # Integration branch
  │   ├── feature/us-003-activation    # Feature branches
  │   ├── feature/us-004-selection
  │   └── feature/us-007-markdown
  ├── hotfix/          # Critical fixes
  └── release/v2.0.0   # Release preparation
```

### Commit Convention

```bash
# Format: type(scope): description
git commit -m "feat(content): implement element selection engine"
git commit -m "fix(popup): resolve settings persistence issue"
git commit -m "docs(readme): update development setup guide"
git commit -m "test(selection): add unit tests for multi-select"

# Types: feat, fix, docs, style, refactor, test, chore
```

---

## 🧪 Testing

### Test Structure
```
tests/
├── unit/                      # Unit tests
│   ├── lib/
│   │   ├── conversion.test.ts
│   │   ├── selection.test.ts
│   │   └── storage.test.ts
│   └── components/
│       ├── CopyVersaPanel.test.tsx
│       └── ModeSelector.test.tsx
├── integration/               # Integration tests
│   ├── content-script.test.ts
│   ├── popup-communication.test.ts
│   └── storage-sync.test.ts
└── e2e/                      # End-to-end tests
    ├── basic-functionality.spec.ts
    ├── multi-site-compatibility.spec.ts
    └── performance.spec.ts
```

### Running Tests

```bash
# All tests
npm run test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests (requires Chrome)
npm run test:e2e

# Coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Test Examples

```typescript
// Unit test example
describe('MarkdownConverter', () => {
  test('should convert HTML table to GFM', () => {
    const converter = new MarkdownConverter();
    const html = '<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>';
    const result = converter.convert(html);
    expect(result).toContain('| Cell 1 | Cell 2 |');
  });
});

// Integration test example
describe('Content Script Integration', () => {
  test('should inject panel when activated', async () => {
    await chrome.runtime.sendMessage({ type: 'ACTIVATE_EXTENSION' });
    const panel = document.querySelector('#copyversa-root');
    expect(panel).toBeTruthy();
  });
});

// E2E test example
test('should copy Wikipedia content', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Web_scraping');
  await page.keyboard.press('Control+Shift+X');
  await page.click('[data-testid="markdown-button"]');
  await page.click('h1');
  // Assert clipboard content
});
```

---

## 🔨 Build & Deployment

### Build Commands

```bash
# Development build (with source maps)
npm run build:dev

# Production build (optimized)
npm run build

# Build and create CRX package
npm run build:crx

# Build and create ZIP for store submission
npm run build:zip

# Watch mode for development
npm run dev
```

### Build Configuration

The build process uses Vite with custom configuration:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup/popup.html',
        options: 'src/options/options.html',
        'service-worker': 'src/background/service-worker.ts',
        'content-script': 'src/content/content-script.tsx'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
```

### Deployment Checklist

- [ ] All tests passing
- [ ] No console errors in development
- [ ] Performance benchmarks met
- [ ] Cross-browser testing completed
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Version number incremented
- [ ] Changelog updated
- [ ] Screenshots and store assets ready

---

## 🤝 Contributing

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/us-004-element-selection
   ```
3. **Make your changes**
4. **Add tests for new functionality**
5. **Ensure all tests pass**
6. **Submit a pull request**

### Code Style Guidelines

```typescript
// Use TypeScript for all new code
interface SelectionOptions {
  mode: 'single' | 'multiple';
  preserveStyles: boolean;
}

// Use meaningful variable names
const selectedElementsCount = elements.length;

// Use async/await instead of promises
const copyToClipboard = async (content: string): Promise<void> => {
  await navigator.clipboard.writeText(content);
};

// Use proper error handling
try {
  await convertToMarkdown(element);
} catch (error) {
  console.error('Conversion failed:', error);
  showErrorToast('Failed to convert content');
}
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added for new functionality
- [ ] Documentation updated
```

---

## 🐛 Troubleshooting

### Common Issues

#### Extension Not Loading
```bash
# Check for build errors
npm run build

# Verify manifest.json is valid
npm run validate:manifest

# Check Chrome console for errors
# Go to chrome://extensions/ → Details → Inspect views
```

#### Content Script Not Injecting
```javascript
// Check if script is registered in manifest.json
"content_scripts": [{
  "matches": ["<all_urls>"],
  "js": ["content-script.js"]
}]

// Verify permissions
"permissions": ["activeTab"]
```

#### Storage Not Persisting
```typescript
// Use chrome.storage.sync for user settings
await chrome.storage.sync.set({ settings: userSettings });

// Use chrome.storage.local for temporary data
await chrome.storage.local.set({ cache: temporaryData });
```

#### React Components Not Rendering
```typescript
// Ensure Shadow DOM is properly initialized
const shadowRoot = container.attachShadow({ mode: 'open' });
const root = createRoot(shadowRoot);
root.render(<CopyVersaPanel />);
```

### Debug Tools

```bash
# Enable verbose logging
npm run dev -- --debug

# Analyze bundle size
npm run analyze

# Check for type errors
npm run type-check

# Profile performance
npm run profile
```

### Performance Monitoring

```typescript
// Performance timing
console.time('content-script-initialization');
// ... initialization code
console.timeEnd('content-script-initialization');

// Memory usage monitoring
const memoryInfo = (performance as any).memory;
console.log('Memory usage:', memoryInfo.usedJSHeapSize);
```

---

## 📚 Additional Resources

### Documentation
- [Chrome Extension API Reference](https://developer.chrome.com/docs/extensions/reference/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/migrating/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools & Libraries
- [Turndown.js](https://github.com/mixmark-io/turndown) - HTML to Markdown conversion
- [Vite](https://vitejs.dev/) - Build tool
- [Vitest](https://vitest.dev/) - Testing framework
- [Playwright](https://playwright.dev/) - E2E testing

### Community
- [Chrome Extensions Developer Forum](https://groups.google.com/a/chromium.org/g/chromium-extensions)
- [Stack Overflow - Chrome Extensions](https://stackoverflow.com/questions/tagged/google-chrome-extension)

---

**Document maintained by:** GitHub Copilot (Project Manager)  
**Last updated:** Mayo 29, 2025  
**Version:** 2.0.0-alpha
