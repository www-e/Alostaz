# Troubleshooting Guide: Node.js UV Thread Pool Error and Missing Components

## Table of Contents
1. [UV Thread Pool Error](#uv-thread-pool-error)
   - [Problem Description](#problem-description)
   - [Root Cause](#root-cause)
   - [Solution](#solution)
2. [Missing Components Error](#missing-components-error)
   - [Problem Description](#problem-description-1)
   - [Solution](#solution-1)
3. [Prevention and Best Practices](#prevention-and-best-practices)

## UV Thread Pool Error

### Problem Description
When attempting to install dependencies using `npm install`, the following error occurs:
```
Assertion failed: new_time >= loop->time, file src\win\core.c, line 327
```

### Root Cause
This error is related to the libuv library used by Node.js and typically occurs due to:
1. Race conditions in the libuv event loop timer implementation
2. Incompatibilities between Node.js versions and Windows system timers
3. Issues with high-precision timers on Windows
4. Particularly common in Node.js v24.x on Windows

### Solution
1. **Clean the project environment**:
   ```powershell
   # Remove node_modules if it exists
   if (Test-Path "node_modules") {
       Remove-Item -Recurse -Force node_modules
   }
   
   # Remove package-lock.json if it exists
   if (Test-Path "package-lock.json") {
       Remove-Item -Force package-lock.json
   }
   
   # Clear npm cache
   npm cache clean --force
   ```

2. **Install dependencies with specific flags**:
   ```powershell
   # Install core dependencies first
   npm install next@14.0.4 react@18 react-dom@18 --no-optional --no-package-lock --no-audit --no-fund
   
   # Install additional dependencies
   npm install @supabase/supabase-js@2.39.0 framer-motion@10.16.16 react-icons@4.12.0 --no-optional --no-package-lock --no-audit --no-fund
   
   # Install development dependencies
   npm install --save-dev @types/node@20 @types/react@18 @types/react-dom@18 autoprefixer@10.0.1 eslint@8 eslint-config-next@14.0.4 postcss@8 tailwindcss@3.3.0 typescript@5 --no-optional --no-package-lock --no-audit --no-fund
   ```

## Missing Components Error

### Problem Description
When starting the development server, the following error occurs:
```
Module not found: Can't resolve '@/components/Navbar'
```

### Solution
1. **Create missing components** in the `src/components` directory:
   - Navbar.tsx
   - HeroSection.tsx
   - AboutSection.tsx
   - CoursesSection.tsx

2. **Update tsconfig.json** to include path aliases:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

3. **Update next.config.js** to handle path aliases:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // ... existing config ...
     webpack: (config) => {
       config.resolve.alias = {
         ...config.resolve.alias,
         '@': path.resolve(__dirname, 'src'),
       };
       return config;
     },
   };
   
   module.exports = nextConfig;
   ```

4. **Install required type definitions** (if not already installed):
   ```bash
   npm install --save-dev @types/node
   ```

## Prevention and Best Practices

1. **Use Node.js LTS Version**:
   - Stick to LTS (Long Term Support) versions of Node.js for better stability
   - Currently, Node.js 20.x LTS is recommended

2. **Version Control**:
   - Always commit `package-lock.json` or `yarn.lock` to ensure consistent dependency versions
   - Include a `.nvmrc` or `.node-version` file to specify the Node.js version

3. **Dependency Management**:
   - Regularly update dependencies to their latest stable versions
   - Use `npm outdated` to check for outdated packages
   - Consider using `npm ci` in CI/CD pipelines for more reliable builds

4. **Error Handling**:
   - Implement proper error boundaries in React components
   - Add TypeScript types to catch potential issues at compile time

5. **Documentation**:
   - Maintain clear documentation of the project setup and common issues
   - Document any workarounds for known issues

6. **Environment Setup**:
   - Document the development environment setup process
   - Include any system-specific configurations needed

For any further assistance, please refer to the project's documentation or contact the development team.
