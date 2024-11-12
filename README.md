# README

This README would normally document whatever steps are necessary to get your application up and running.

### Host ScaleApp

This branch will be used as host application where we can integrate different modules.

### What is this repository for?

This repository contains a boilerplate for a React application built with TypeScript. It provides a starting point for building a host application, with several features and configurations already set up. Here are the key aspects of this boilerplate:

Login Setup: The boilerplate includes a login setup, which can be extended or modified as needed.

Header and Sidebar: A header and sidebar component are already implemented, providing a basic structure for the application's layout.

Routing: The boilerplate uses React Router v6 with createBrowserRouter for handling client-side routing. Routes are defined in the routes folder, and you can add new routes as needed.

Styles: The boilerplate utilizes Tailwind CSS for styling, with SCSS files for component-specific styles. Dark mode and light mode are already set up, and colors are configured using variables in the index.css file.

Component Library: The boilerplate includes a custom component library built on top of shadcn/ui. These components support light/dark mode by default, and it is recommended to use them throughout the application.

Testing: Jest and React Testing Library are set up for writing and running tests. A **tests** folder can be created under each component folder to maintain at least 80% code coverage.

API Integration: React Query is used for API integration. Custom hooks (GET, PUT, POST, DELETE) are provided for making API calls, with an example implementation in App.tsx.

Linting and Formatting: The boilerplate includes lint setup with lint-staged, ESLint, and Prettier. Linting and testing checks are performed before committing code.

TypeScript: The application is built with TypeScript, ensuring strict type checking for props and other types.

The boilerplate aims to provide a solid foundation for building a React-based host application, with various features and configurations already in place. Developers can focus on adding their components, pages, and business logic while taking advantage of the existing setup.

### How do I get set up?

Getting Started

1. git clone repo
2. cd scale-app
3. npm install
4. npm run dev

Your good to go.
Happy coding.

### Contribution guidelines

Developers are encouraged to contribute to this boilerplate by submitting pull requests with improvements, bug fixes, or new features. When contributing, please follow the established coding conventions and ensure that all tests pass before submitting your changes.
