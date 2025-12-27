# Hello World React Project Instructions

## Project Overview
This is a professional React contact management application built with Vite. It features a sidebar navigation with sections for creating new entries, managing existing entries, and viewing information about the app. Data is stored in localStorage with full CRUD functionality, SweetAlert notifications, and data export capabilities.

## Architecture
- **Framework**: React with Vite for fast development and building
- **Main Component**: [src/App.jsx](src/App.jsx) - Contains navigation state, form logic, CRUD operations, validation, notifications, and view rendering
- **Styling**: [src/App.css](src/App.css) - Professional CSS with sidebar layout, responsive design, table styling, and modern UI
- **Storage**: Browser localStorage for persisting contact data
- **Notifications**: SweetAlert2 for success/error messages
- **Export**: CSV and JSON export functionality for contact data
- **Structure**: Standard Vite React structure with sidebar navigation and main content area

## Developer Workflows
- **Development Server**: Run `npm run dev` to start the development server
- **Build**: Run `npm run build` to create a production build
- **Preview**: Run `npm run preview` to preview the production build
- **Linting**: Run `npm run lint` to check code quality

## Code Patterns & Conventions
- **State Management**: Use React's `useState` hook for form inputs, submissions array, editing state, and navigation view
- **Side Effects**: Use `useEffect` to load data from localStorage on component mount
- **Event Handling**: Handle form submission, input changes, navigation clicks, CRUD button actions, and export actions
- **Validation**: Client-side validation with minimum length requirements and SweetAlert error notifications
- **Data Persistence**: Store submissions as JSON in localStorage, parse on load, update on changes
- **Navigation**: State-based view switching with sidebar navigation
- **CRUD Operations**: Implement create (new entry form), read (manage view table), update (edit mode), delete (remove) for contacts
- **Export Functionality**: Generate and download CSV/JSON files using Blob API
- **JSX Structure**: Use semantic HTML, controlled inputs, conditional rendering for views, table with action buttons
- **Styling**: CSS classes for sidebar layout, professional color scheme, hover effects, table styling, and responsive design

## Dependencies & Integrations
- **React**: Core library for UI components and hooks
- **Vite**: Build tool and development server
- **SweetAlert2**: Library for beautiful modal notifications
- **ESLint**: Code linting (configured in eslint.config.js)
- **localStorage**: Browser API for client-side data storage

## Key Files
- [src/App.jsx](src/App.jsx) - Main application component with navigation, form, CRUD logic, validation, notifications, and export functionality
- [src/App.css](src/App.css) - Professional styling for sidebar, forms, buttons, table, and layout
- [package.json](package.json) - Project dependencies and scripts