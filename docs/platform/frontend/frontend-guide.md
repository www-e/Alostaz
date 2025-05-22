# FILE: frontend-guide.md

# Frontend Documentation

## Overview

The Alostaz frontend is built with Next.js 13+ using the App Router, TypeScript, and Chakra UI. This document covers the architecture, components, and best practices for the frontend codebase.

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Chakra UI + Emotion
- **State Management**: React Query + Zustand
- **Form Handling**: React Hook Form + Yup
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── student/           # Student portal
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── common/            # Common components (buttons, cards, etc.)
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   ├── api/               # API clients
│   └── utils/             # Helper functions
├── services/              # API service layer
├── stores/                # State management stores
├── styles/                # Global styles and theme
├── types/                 # TypeScript type definitions
└── utils/                 # Shared utilities
```

## Key Components

### 1. Layout Components

#### `AppLayout`
The root layout component that wraps all pages.

#### `DashboardLayout`
Layout for authenticated dashboard pages with sidebar and header.

#### `AuthLayout`
Layout for authentication pages.

### 2. Common Components

#### `DataTable`
A reusable data table component with sorting, filtering, and pagination.

#### `FormField`
A wrapper for form inputs with validation and error handling.

#### `Modal`
A reusable modal/dialog component.

### 3. Form Components

#### `StudentForm`
Form for creating/editing student records.

#### `AttendanceForm`
Form for recording attendance.

#### `PaymentForm`
Form for recording payments.

## State Management

### Server State (React Query)
Used for:
- Data fetching and caching
- Background updates
- Optimistic updates
- Pagination and infinite loading

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['students'],
  queryFn: fetchStudents
});
```

### Client State (Zustand)
Used for:
- UI state
- Form state
- Global app state

```typescript
const { isSidebarOpen, toggleSidebar } = useUIStore();
```

## Styling

### Theme
Custom theme configuration in `src/styles/theme.ts`:

```typescript
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      // ...
    },
  },
  fonts: {
    heading: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
});
```

### Responsive Design
Use Chakra's responsive array syntax:

```tsx
<Box p={[2, 4, 6]}>
  {/* 2 on mobile, 4 on tablet, 6 on desktop */}
</Box>
```

## Routing

### File-system based routing
```
app/
  admin/
    students/
      page.tsx      # /admin/students
      [id]/
        page.tsx  # /admin/students/123
  student/
    dashboard/    # /student/dashboard
    attendance/   # /student/attendance
    payments/     # /student/payments
```

### Route Groups
Use parentheses to group routes without affecting the URL:
```
app/
  (auth)/
    login/
      page.tsx    # /login
    register/
      page.tsx    # /register
  (dashboard)/
    admin/       # /admin
    student/     # /student
```

## Performance

### Code Splitting
- Automatic with Next.js App Router
- Use `dynamic` imports for heavy components

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile"
  width={500}
  height={300}
  priority
/>
```

## Testing

### Unit Tests
```typescript
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Integration Tests
```typescript
describe('StudentForm', () => {
  it('submits the form', async () => {
    render(<StudentForm onSubmit={mockSubmit} />);
    // Test form submission
  });
});
```

## Best Practices

1. **Component Design**
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Document components with JSDoc

2. **State Management**
   - Prefer React Query for server state
   - Use Zustand for global client state
   - Keep form state local when possible

3. **Performance**
   - Use `React.memo` for expensive renders
   - Memoize callbacks with `useCallback`
   - Avoid large bundle sizes with code splitting

4. **Accessibility**
   - Use semantic HTML
   - Add ARIA attributes when needed
   - Ensure keyboard navigation works
   - Test with screen readers
