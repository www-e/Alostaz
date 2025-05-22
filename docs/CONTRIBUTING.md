# Contributing to Alostaz

Thank you for considering contributing to Alostaz! We welcome all contributions that help improve our educational platform.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Code Review Process](#code-review-process)

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/alostaz.git
   cd alostaz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (see `.env.example`)
5. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Always work on a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run tests:
   ```bash
   npm test
   ```
4. Ensure code passes linting:
   ```bash
   npm run lint
   ```
5. Commit your changes following our commit guidelines
6. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

## Code Style

- Follow the [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Use Prettier for code formatting
- Follow existing code style in the project
- Keep functions small and focused (under 30 lines when possible)
- Write meaningful variable and function names

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example commit message:
```
feat(auth): add password reset functionality

- Add password reset form component
- Implement API endpoint for password reset
- Add email templates for password reset flow

Fixes #123
```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes to the interface
3. Increase the version number in any examples files and the README.md to the new version that this Pull Request would represent
4. The PR must pass all CI checks before it can be merged
5. You may merge the PR once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you

## Reporting Issues

When creating an issue, please include:

1. A clear, descriptive title
2. Steps to reproduce the issue
3. Expected vs. actual behavior
4. Screenshots if applicable
5. Browser/OS version if frontend issue
6. Any relevant error messages

## Feature Requests

For feature requests, please:

1. Describe the feature and why it's valuable
2. Include any design mockups if applicable
3. List any alternative solutions you've considered
4. Note any additional context

## Code Review Process

1. At least one approval is required before merging
2. All CI checks must pass
3. Code should be reviewed for:
   - Correctness
   - Performance implications
   - Security considerations
   - Test coverage
   - Documentation updates

## Getting Help

If you need help or have questions, please:

1. Check the [documentation](docs/README.md)
2. Search existing issues
3. Open a new issue if your question hasn't been answered

Thank you for contributing to Alostaz!
