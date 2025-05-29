# Contributing to CopyVersa v2

Thank you for your interest in contributing to CopyVersa v2! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- Chrome/Chromium browser for testing
- Git for version control
- Basic knowledge of React, TypeScript, and Chrome Extension APIs

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/copyversa-chrome-ext.git
   cd copyversa-chrome-ext
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist/` folder

## 📋 How to Contribute

### Reporting Bugs

Before creating a bug report, please:

1. **Search existing issues** to avoid duplicates
2. **Use the latest version** to ensure the bug hasn't been fixed
3. **Provide clear reproduction steps**

**Bug Report Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome 98, Edge 98]
- Extension Version: [e.g. 2.0.0]

**Additional context**
Any other context about the problem.
```

### Suggesting Features

Feature requests are welcome! Please:

1. **Check existing feature requests** to avoid duplicates
2. **Provide clear use cases** and examples
3. **Consider the scope** - does it fit CopyVersa's purpose?

**Feature Request Template:**
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Screenshots, mockups, or other context.
```

### Code Contributions

#### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/US-XXX-description` - Feature branches (following user story format)
- `hotfix/issue-description` - Critical bug fixes

#### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(content): add multi-select mode for content selection
fix(popup): resolve theme switching bug in popup window
docs(readme): update installation instructions
test(selection): add unit tests for selection engine
```

#### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/US-XXX-description
   ```

2. **Make Changes**
   - Follow our coding standards
   - Write/update tests
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run test:e2e
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/US-XXX-description
   ```

6. **Create Pull Request**
   - Use the PR template
   - Link related issues
   - Request review from maintainers

**Pull Request Template:**
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #XXX

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Include screenshots of UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes introduced
```

## 🏗️ Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Architecture Principles

- **Component-Based**: Use React functional components with hooks
- **Type Safety**: Leverage TypeScript for better developer experience
- **Separation of Concerns**: Keep business logic separate from UI
- **Performance**: Optimize for speed and memory usage
- **Accessibility**: Follow WCAG guidelines
- **Security**: Follow Chrome extension security best practices

### File Structure Guidelines

```
src/
├── background/           # Service Worker code
├── content/             # Content scripts and React components
│   ├── components/      # React UI components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # Business logic services
│   └── utils/          # Utility functions
├── popup/              # Extension popup
├── options/            # Options page
├── shared/             # Shared utilities and types
│   ├── types/          # TypeScript type definitions
│   ├── constants/      # Application constants
│   └── utils/          # Shared utility functions
└── styles/             # Global styles and themes
```

### Testing Guidelines

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Coverage**: Maintain >80% code coverage

```bash
# Run specific test types
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:coverage
```

### User Story Implementation

When implementing user stories:

1. **Reference the User Story**: Link commits to specific user stories (US-XXX)
2. **Follow Acceptance Criteria**: Ensure all criteria are met
3. **Add Tests**: Write tests that validate the acceptance criteria
4. **Update Documentation**: Update relevant documentation

### Component Development

- **Use TypeScript**: All components must be typed
- **Props Interface**: Define clear prop interfaces
- **Accessibility**: Include ARIA labels and keyboard navigation
- **Error Boundaries**: Handle errors gracefully
- **Performance**: Use React.memo for optimization when needed

Example component structure:
```typescript
interface ComponentProps {
  prop1: string;
  prop2?: number;
  onAction: (data: ActionData) => void;
}

const Component: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2 = 0, 
  onAction 
}) => {
  // Component implementation
};

export default Component;
```

## 🧪 Testing Requirements

All contributions must include appropriate tests:

- **New Features**: Unit tests + integration tests + E2E test scenarios
- **Bug Fixes**: Regression tests to prevent the issue from recurring
- **Refactoring**: Maintain existing test coverage

## 📖 Documentation Requirements

- **Code Comments**: Document complex logic and business rules
- **JSDoc**: Use JSDoc for public APIs and complex functions
- **README Updates**: Update documentation for new features
- **Architecture Docs**: Update technical documentation for significant changes

## 🚀 Release Process

1. **Feature Complete**: All user stories in sprint completed
2. **Testing**: All tests passing, manual testing completed
3. **Documentation**: All documentation updated
4. **Version Bump**: Update version numbers
5. **Changelog**: Update CHANGELOG.md
6. **Create Release**: Tag and create GitHub release
7. **Chrome Web Store**: Submit to Chrome Web Store (maintainers only)

## 🆘 Getting Help

- **Discord**: Join our development Discord server
- **GitHub Discussions**: Ask questions in GitHub Discussions
- **Issues**: Create an issue for bugs or feature requests
- **Email**: Reach out to daniel.saidi@gmail.com for major concerns

## 🏷️ Labels and Tags

We use labels to categorize issues and PRs:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority items
- `sprint: X` - Issues assigned to specific sprints

## ✅ Definition of Done

For a contribution to be considered complete:

- [ ] Code is written and follows style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] PR is reviewed and approved
- [ ] CI/CD pipeline passes
- [ ] Manual testing completed
- [ ] Accessibility requirements met
- [ ] Performance requirements met

Thank you for contributing to CopyVersa v2! 🎉
