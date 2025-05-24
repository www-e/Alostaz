# Theme and Styling Plan

## Current Implementation Analysis

### Strengths
- CSS variables for theming
- Dark/light mode support
- Modern color scheme
- Responsive design foundations
- Smooth theme transitions

### Areas for Enhancement
1. **Component System**: No formal component library
2. **Design Tokens**: Basic but could be more comprehensive
3. **Accessibility**: Contrast ratios need verification
4. **RTL Support**: Needs explicit testing

## Recommended Approach

### 1. Component Library: shadcn/ui
- **Why shadcn/ui?**
  - Built on Radix UI primitives
  - Full customization
  - Excellent dark mode support
  - Accessibility first
  - Easy theming

### 2. Design Token Enhancement

#### Colors
```css
:root {
  /* Primary */
  --primary: oklch(0.55 0.25 300);
  --primary-foreground: oklch(0.95 0.01 300);
  
  /* Secondary */
  --secondary: oklch(0.7 0.15 250);
  --secondary-foreground: oklch(0.95 0.01 250);
  
  /* Accent */
  --accent: oklch(0.7 0.2 20);
  --accent-foreground: oklch(0.95 0.01 20);
  
  /* Background */
  --background: oklch(0.98 0.01 0);
  --foreground: oklch(0.15 0.01 0);
  
  /* Card */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.01 0);
  
  /* Popover */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.01 0);
  
  /* Muted */
  --muted: oklch(0.95 0.01 0);
  --muted-foreground: oklch(0.5 0.01 0);
  
  /* Border */
  --border: oklch(0.9 0.01 0);
  --input: oklch(0.9 0.01 0);
  --ring: oklch(0.55 0.25 300);
  
  /* Radius */
  --radius: 0.5rem;
}