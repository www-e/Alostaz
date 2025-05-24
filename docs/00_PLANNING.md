# Alostaz Educational Platform - Technical Planning Document

## 🧩 Modular File Map Plan - Enhanced Structure

### Core Application Structure
### THIS FOLDER STRUCTURE HAS BEEN IMPLEMENTED Already 
```
src/
├── app/
│   ├── public/                      # Public routes
│   │   ├── login/                    # Login page
│   │   └── layout.tsx               # Public layout
│   │
│   ├── auth/                       # Auth protected routes
│   │   ├── admin/                  # Admin role routes
│   │   │   ├── dashboard/
│   │   │   ├── students/
│   │   │   │   ├── [id]/            # Student details
│   │   │   │   ├── list/             # Student list
│   │   │   │   └── create/           # Create student
│   │   │   │
│   │   │   ├── attendance/
│   │   │   │   ├── calendar/        # Calendar view
│   │   │   │   ├── reports/          # Attendance reports
│   │   │   │   └── settings/         # Attendance settings
│   │   │   │
│   │   │   ├── payments/
│   │   │   │   ├── transactions/    # Payment records
│   │   │   │   ├── receipts/         # Receipt management
│   │   │   │   └── settings/         # Payment settings
│   │   │   │
│   │   │   └── settings/         # System settings
│   │   │
│   │   ├── student/              # Student role routes
│   │   │   ├── dashboard/
│   │   │   ├── attendance/         # View own attendance
│   │   │   ├── payments/           # View own payments
│   │   │   └── profile/            # Student profile
│   │   │
│   │   └── assistant/            # Assistant role routes
│   │       ├── attendance/         # Mark attendance
│   │       └── students/           # View student list
│   │
│   └── api/                         # API routes
│       └── v1/                      # API versioning
│           ├── admin/               # Admin endpoints
│           │   ├── students/
│           │   ├── attendance/
│           │   └── payments/
│           │
│           ├── student/             # Student endpoints
│           └── shared/              # Shared endpoints
│
├── components/
│   ├── features/                   # Feature-specific components
│   │   ├── auth/
│   │   │   ├── login-form/
│   │   │   └── protected-route/
│   │   │
│   │   ├── students/
│   │   │   ├── student-form/
│   │   │   ├── student-list/
│   │   │   └── student-details/
│   │   │
│   │   └── ...
│   │
│   ├── ui/                         # Reusable UI components
│   │   ├── data-display/           # Cards, tables, etc.
│   │   ├── forms/                  # Form elements
│   │   ├── layout/                 # Layout components
│   │   └── navigation/             # Navigation components
│   │
│   └── shared/                    # Shared components
│       ├── error-boundary/
│       ├── loading-state/
│       └── ...
│
├── features/                       # Feature modules
│   ├── auth/                       # Authentication
│   │   ├── api/                    # API functions
│   │   ├── components/             # Feature components
│   │   ├── hooks/                  # Feature hooks
│   │   └── types/                  # TypeScript types
│   │
│   ├── students/                 # Student management
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── forms/            # Form components
│   │   │   └── tables/           # Table components
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── attendance/               # Attendance tracking
│   ├── payments/                 # Payment processing
│   └── settings/                 # System settings
│
├── lib/
│   ├── api/                      # API clients
│   │   ├── admin-client.ts
│   │   ├── student-client.ts
│   │   └── assistant-client.ts
│   │
│   ├── auth/                     # Auth utilities
│   │   ├── session.ts
│   │   └── permissions.ts
│   │
│   ├── db/                       # Database utilities
│   │   └── supabase.ts
│   │
│   └── utils/                    # Shared utilities
│       ├── formatters/
│       ├── validators/
│       └── ...
│
├── providers/                    # Context providers
│   ├── auth-provider.tsx
│   ├── theme-provider.tsx
│   └── ...
│
├── stores/                      # State management
│   ├── auth-store.ts
│   ├── ui-store.ts
│   └── ...
│
├── types/                       # Global types
│   ├── api/                      # API types
│   ├── database/                 # Database types
│   └── index.ts                  # Type re-exports
│
└── styles/                      # Global styles
    ├── tokens/                   # Design tokens
    │   ├── colors.css
    │   ├── typography.css
    │   ├── spacing.css
    │   └── breakpoints.css
    │
    ├── themes/                   # Theme definitions
    │   ├── light.css
    │   ├── dark.css
    │   └── base.css
    │
    └── utils/                    # Style utilities
        ├── animations.css
        └── utilities.css
```

### Key Improvements

1. **Role-Based Structure**
   - Clear separation of `/admin`, `/student`, and `/assistant` routes
   - Each role has its own layout and navigation
   - Shared components in dedicated directories

2. **Feature Modules**
   - Each feature is self-contained with its own:
     - API layer
     - Components
     - Hooks
     - Types
   - Prevents files from growing too large

3. **Strict Component Organization**
   - `/components/features` for feature-specific components
   - `/components/ui` for reusable UI elements
   - `/components/shared` for cross-feature components

4. **API Layer**
   - Versioned API routes (`/api/v1/`)
   - Role-based API clients
   - Type-safe API utilities

5. **State Management**
   - Dedicated stores for global state
   - Feature-specific state colocated with features
   - Type-safe state management

6. **Type Safety**
   - Dedicated type directories
   - Feature-specific types
   - Database types from Supabase

7. **Style Organization**
   - Design tokens for consistency
   - Theme variables for theming
   - Utility classes for common styles

## 🔐 Security Plan

### Role-Based Access Control

#### Role Definitions

| Role      | Description                     | Key Permissions |
|-----------|---------------------------------|-----------------|
| Admin     | Full system administrator       | - Manage all user accounts<br>- Configure system settings<br>- Access all financial data<br>- Manage all student records |
| Assistant | Administrative assistant        | - Mark attendance<br>- View student information<br>- Process payments |
| Student   | Regular student user            | - View own attendance<br>- View payment history<br>- Update profile information |

### Security Implementation

#### 1. Authentication & Authorization
- Implement route-level middleware for authentication checks
- Create role-based route guards that redirect unauthorized users
- Establish session management with proper token validation
- Set up automatic redirects for unauthenticated users to login

#### 2. Component-Level Permissions
- Create PermissionGate component for conditional rendering based on user roles
- Implement role-checking hooks for component-level access control
- Build unauthorized access fallback components
- Establish granular permission checking for specific actions

#### 3. Database Security (Supabase RLS)
- Configure Row Level Security policies for all tables
- Set up user role-based data access restrictions
- Implement profile-based authentication policies
- Create secure database queries that respect user permissions

#### 4. API Security
- Implement role-based API endpoint protection
- Add middleware for authentication and authorization checks
- Create role-specific rate limiting
- Establish proper error handling for unauthorized access

#### 5. Rate Limiting
- Configure different rate limits based on user roles
- Implement Redis-based rate limiting for API endpoints
- Add IP-based rate limiting for anonymous users
- Create monitoring for suspicious activity patterns

### Security Best Practices

1. **Input Validation**
   - Use Zod for runtime validation
   - Sanitize all user inputs
   - Implement CSRF protection

2. **Data Protection**
   - Encrypt sensitive data at rest
   - Use HTTPS for all communications
   - Implement proper CORS policies

3. **Session Management**
   - Short-lived access tokens
   - Secure cookie settings
   - Token rotation

4. **Monitoring & Logging**
   - Log security-relevant events
   - Monitor for suspicious activities
   - Regular security audits

5. **Dependencies**
   - Regularly update dependencies
   - Audit for vulnerabilities
   - Use only trusted packages

## 🎨 Theme Architecture & Styling System

### 1. Design Tokens
- Establish CSS custom properties for consistent theming
- Create semantic color system with light/dark mode support
- Define typography scale with Arabic/English font support
- Set up spacing and sizing systems using standardized scales

### 2. Theme System
- Configure theme provider with system preference detection
- Implement theme switching functionality
- Create theme-aware component styling
- Establish RTL/LTR direction support

### 3. Responsive Design
- Implement mobile-first responsive breakpoints
- Create container components for consistent layouts
- Establish responsive typography and spacing
- Build adaptive navigation for different screen sizes

### 4. Component Styling
- Use Tailwind CSS utility classes for consistent styling
- Create reusable component variants
- Implement hover and focus states
- Establish consistent animation and transition patterns

## 🗃️ Supabase Integration Plan

### Table Access Mapping

| Table | Frontend Module | Access Points | Required Policies |
|-------|----------------|---------------|-------------------|
| profiles | auth, users | - User profile<br>- Admin user management | RLS for user/role access |
| students | student, admin | - Student registration<br>- Profile management | RLS for role-based access |
| attendance | attendance | - Mark attendance<br>- View history | RLS for student/teacher access |
| payments | payments | - Record payments<br>- View history | RLS for financial data |

### Query Patterns

1. **Client-Side**
   - Use `@supabase/supabase-js`
   - Type-safe queries with generated types
   - Real-time subscriptions for live updates

2. **Server-Side**
   - API routes for sensitive operations
   - Server components for data fetching
   - Edge functions for complex operations

## 📦 Recommended UI Libraries & Components

### Core UI Libraries
1. **shadcn/ui** - Modern, accessible components built on Radix UI
2. **Radix UI** - Low-level accessible UI primitives
3. **Lucide React** - Beautiful, consistent icons
4. **React Hook Form** - Performant forms with easy validation
5. **Zod** - TypeScript-first schema validation

### Data Visualization
1. **Recharts** - Composable charting library for React
2. **React Table (TanStack Table)** - Powerful data tables
3. **React Calendar** - Calendar components for attendance

### Additional Utilities
1. **date-fns** - Modern JavaScript date utility library
2. **clsx** - Utility for constructing className strings
3. **tailwind-merge** - Merge Tailwind CSS classes
4. **React Hot Toast** - Beautiful, customizable toast notifications

### Animation & Interaction
1. **Framer Motion** - Production-ready motion library
2. **React Spring** - Spring-physics based animations
3. **Auto-animate** - Zero-config animation utilities

## 📝 Development Phases

### Phase 1: Foundation & Authentication (Week 1-2)
- Set up project configuration and global providers
- Implement authentication system with Supabase
- Create base UI components and theme system
- Build login/logout functionality
- Establish role-based routing structure

### Phase 2: Core Infrastructure (Week 3-4)
- Implement database types and API clients
- Create role-based middleware and permission system
- Build error handling and loading states
- Set up form validation and state management
- Establish rate limiting and security measures

### Phase 3: Admin Dashboard (Week 5-6)
- Create admin dashboard layout and navigation
- Implement student management system
- Build attendance tracking functionality
- Create payment processing interface
- Add reporting and analytics features

### Phase 4: Student Interface (Week 7-8)
- Build student dashboard and profile management
- Implement student attendance viewing
- Create payment history interface
- Add notification system
- Build responsive mobile interface

### Phase 5: Assistant Features (Week 9-10)
- Create assistant dashboard for attendance marking
- Implement student list viewing for assistants
- Build quick attendance entry forms
- Add assistant-specific reporting
- Create mobile-optimized attendance interface

### Phase 6: Advanced Features (Week 11-12)
- Implement real-time updates and notifications
- Add data export and import functionality
- Create advanced reporting and analytics
- Build system settings and configuration
- Add calendar integration and scheduling

### Phase 7: Testing & Optimization (Week 13-14)
- Comprehensive testing (unit, integration, e2e)
- Performance optimization and code splitting
- Security audit and penetration testing
- Accessibility testing and improvements
- Mobile responsiveness testing

### Phase 8: Deployment & Production (Week 15-16)
- Production deployment setup
- Database migration and seeding
- Environment configuration
- Monitoring and logging setup
- Documentation and user training

---

## 🎯 STRICT IMPLEMENTATION ORDER FOR AI CODING ASSISTANT

### IMMEDIATE ANALYSIS REQUIREMENTS
**YOU MUST ANALYZE AND UNDERSTAND THE FOLLOWING BEFORE ANY CODING:**

1. **ANALYZE THE EXISTING SQL FILES** in the sql folder to understand:
   - Database schema structure
   - Table relationships and foreign keys
   - RLS (Row Level Security) policies
   - Existing data types and constraints
   - User roles and permissions structure

2. **UNDERSTAND THE PROJECT STRUCTURE** that has already been created:
   - Review the existing folder structure
   - Understand the modular architecture
   - Identify where each component should be placed
   - Follow the established naming conventions

3. **STUDY THE SECURITY REQUIREMENTS**:
   - Role-based access control (Admin, Student, Assistant)
   - RLS policies for data protection
   - Authentication flow requirements
   - API security measures

### CRITICAL IMPLEMENTATION RULES:

1. **NO MOCKUP DATA** - Use real Supabase connections and actual database operations
2. **FOLLOW RLS POLICIES** - Every database query must respect the existing Row Level Security policies
3. **TYPE SAFETY** - Every component must be fully typed with TypeScript
4. **MODULAR STRUCTURE** - Follow the established folder structure exactly
5. **REAL FUNCTIONALITY** - Every component must be fully functional, not placeholder
6. **SECURITY FIRST** - Implement proper authentication and authorization from the start
7. **RESPONSIVE DESIGN** - All components must work on mobile and desktop
8. **RTL SUPPORT** - Consider Arabic text direction in all UI components

### VALIDATION REQUIREMENTS:
Before marking Phase 1 complete, ensure:
- [ ] User can successfully log in with existing Supabase auth
- [ ] Role-based redirection works correctly
- [ ] Theme switching functions properly
- [ ] All components are responsive and accessible
- [ ] Error handling works for failed requests
- [ ] Loading states display correctly
- [ ] TypeScript compilation has no errors
- [ ] RLS policies are respected in all queries

**ONLY PROCEED TO PHASE 2 AFTER PHASE 1 IS COMPLETELY FUNCTIONAL AND TESTED**