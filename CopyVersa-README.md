# CopyVersa v2 - Chrome Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/copyversa.svg)](https://chrome.google.com/webstore/detail/copyversa)
[![Build Status](https://github.com/danielsaidi/copyversa-chrome-ext/workflows/CI/badge.svg)](https://github.com/danielsaidi/copyversa-chrome-ext/actions)

CopyVersa v2 is a powerful Chrome extension that allows you to select and copy content from web pages in multiple formats (Markdown, HTML, and Plain Text) with an intuitive visual interface. This is a complete rewrite of the popular CopyVersa userscript, now as a native Chrome extension.

## ✨ Features

- **🎯 Smart Content Selection**: Intelligent content detection and selection
- **📝 Multiple Format Support**: Copy as Markdown, HTML, or Plain Text
- **🎨 Visual Feedback**: Beautiful UI with real-time preview
- **🔄 Multi-Select Mode**: Select multiple elements before copying
- **🌙 Dark/Light Themes**: Automatic theme detection with manual override
- **⚡ Performance Optimized**: Built with modern React and TypeScript
- **🔒 Privacy First**: All processing happens locally, no data collection

## 🚀 Quick Start

### Installation

1. **From Chrome Web Store** (Recommended)
   - Visit the [Chrome Web Store page](https://chrome.google.com/webstore/detail/copyversa)
   - Click "Add to Chrome"

2. **From Source** (Development)
   ```bash
   git clone https://github.com/danielsaidi/copyversa-chrome-ext.git
   cd copyversa-chrome-ext
   npm install
   npm run build
   # Load the dist/ folder in Chrome as an unpacked extension
   ```

### Usage

1. **Activate CopyVersa**: Press `Ctrl+Shift+C` (or `Cmd+Shift+C` on Mac)
2. **Select Content**: Click and drag to select content or click individual elements
3. **Choose Format**: Select your preferred output format (Markdown, HTML, Plain Text)
4. **Copy**: Click the copy button or press `Enter`
5. **Paste**: Use `Ctrl+V` to paste the formatted content anywhere

## 📋 Requirements

- Chrome 88+ (Manifest V3 support)
- No additional dependencies required

## 🏗️ Development

### Prerequisites

- Node.js 18+ and npm 8+
- Chrome/Chromium browser for testing

### Setup

```bash
# Clone the repository
git clone https://github.com/danielsaidi/copyversa-chrome-ext.git
cd copyversa-chrome-ext

# Install dependencies
npm install

# Start development mode with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

### Project Structure

```
copyversa-chrome-ext/
├── src/
│   ├── background/          # Service Worker
│   ├── content/            # Content Scripts & React Components
│   ├── popup/              # Extension Popup
│   ├── options/            # Options Page
│   ├── shared/             # Shared utilities and types
│   └── styles/             # Global styles and themes
├── public/                 # Static assets
├── tests/                  # Test files
├── docs/                   # Documentation
└── dist/                   # Built extension (generated)
```

## 📚 Documentation

- [📋 Product Requirements Document](docs/PRD-CopyVersa-v2.md)
- [📖 User Stories](docs/User-Stories-CopyVersa-v2.md)
- [🏗️ Technical Architecture](docs/Technical-Architecture.md)
- [🛠️ Development Guide](docs/Development-Guide.md)
- [🤝 Contributing Guidelines](CONTRIBUTING.md)

## 🗺️ Roadmap

### Sprint 1 (Week 1) - Foundation
- [x] Project setup and configuration
- [ ] Core activation system
- [ ] Basic panel UI

### Sprint 2 (Week 2) - Selection Engine
- [ ] Content selection system
- [ ] Multi-select functionality
- [ ] Visual feedback

### Sprint 3 (Week 3) - Conversion System
- [ ] Markdown conversion
- [ ] HTML preservation
- [ ] Format switching

### Sprint 4 (Week 4) - Polish & Testing
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Accessibility improvements

### Sprint 5 (Week 5) - Release
- [ ] Chrome Web Store preparation
- [ ] Final testing and bug fixes
- [ ] Documentation completion

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🏗️ Built With

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Chrome Extension Manifest V3** - Extension APIs
- **Jest & Playwright** - Testing Framework
- **Tailwind CSS** - Styling

## 🔄 Migration from v1.5

If you're upgrading from the CopyVersa userscript (v1.5), please note:

- **No more Tampermonkey dependency**: CopyVersa v2 is a native Chrome extension
- **Enhanced UI**: Completely redesigned interface with better visual feedback
- **Improved Performance**: Built with modern web technologies for better speed
- **New Features**: Multi-select mode and enhanced format options
- **Better Compatibility**: Works across more websites with improved content detection

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues**: [GitHub Issues](https://github.com/danielsaidi/copyversa-chrome-ext/issues)
- **Discussions**: [GitHub Discussions](https://github.com/danielsaidi/copyversa-chrome-ext/discussions)
- **Email**: daniel.saidi@gmail.com

## 🙏 Acknowledgments

- Original CopyVersa userscript community
- React and TypeScript communities
- Chrome Extension developers community
- All contributors and testers

---

**Made with ❤️ by [Daniel Saidi](https://github.com/danielsaidi)**
