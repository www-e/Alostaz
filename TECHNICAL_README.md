# Alostaz Math Center - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Development Environment](#development-environment)
4. [Project Structure](#project-structure)
5. [Build Process](#build-process)
6. [TypeScript Guide](#typescript-guide)
7. [Styling System](#styling-system)
8. [State Management](#state-management)
9. [API Integration](#api-integration)
10. [Deployment](#deployment)

## Project Overview

A modern web application for a mathematics tutoring center, featuring course information, registration, and scheduling.

## Technology Stack

### Core Technologies
- **Next.js 14** - React framework with SSR capabilities
- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service (Database & Auth)

### Development Tools
- **Node.js** - JavaScript runtime
- **npm** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Development Environment

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd Alostaz_React

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout wrapper
│   ├── page.tsx           # Home page
│   └── (other pages)      # Other routes
├── components/            # Reusable UI components
│   ├── Navbar.tsx
│   └── (other components)
├── lib/                   # Utilities and configurations
│   └── supabase.ts        # Supabase client
└── styles/                # Global styles
```

## Build Process

### Development Mode
```bash
npm run dev
```
- Hot-reloading enabled
- Development tools active
- Source maps for debugging

### Production Build
```bash
npm run build
```
- Optimizes and minifies code
- Creates `.next` directory with production build

### Production Server
```bash
npm start
```
- Serves the production build
- Optimized for performance

## TypeScript Guide

### Type Annotations
```typescript
// Variable types
let name: string = "Ali";
let age: number = 25;
let isStudent: boolean = true;

// Function parameters & return types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Interfaces for objects
interface Student {
  id: number;
  name: string;
  grade: string;
  email?: string;  // Optional property
}
```

### Type Inference
TypeScript can often infer types automatically:
```typescript
let count = 0;  // TypeScript infers 'number'
count = "five"; // Error: Type 'string' is not assignable to type 'number'
```

## Styling System

### Tailwind CSS
- Utility-first CSS framework
- Configured in `tailwind.config.js`
- Custom theme settings (colors, fonts, etc.)

Example component with Tailwind:
```tsx
const Button = ({ children }) => (
  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
    {children}
  </button>
);
```

## State Management

### React Hooks
- `useState`: Local component state
- `useEffect`: Side effects
- `useContext`: Global state

### Server Components
Next.js 13+ uses Server Components by default:
- Render on the server
- Smaller client bundle
- Direct database queries

## API Integration

### Supabase Client
Configured in `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Example Query
```typescript
const { data: students, error } = await supabase
  .from('students')
  .select('*')
  .eq('grade', '10');
```

## Deployment

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Build & Start
```bash
npm run build
npm start
```

### Deployment Platforms
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting

## Troubleshooting

### Common Issues
1. **Module not found**
   - Run `npm install`
   - Check import paths

2. **Type errors**
   - Check TypeScript types
   - Ensure all required props are passed

3. **Environment variables**
   - Verify `.env.local` exists
   - Restart dev server after changes

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
