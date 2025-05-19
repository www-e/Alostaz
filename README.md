<p align="center">
  <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/96/000000/external-math-literary-genres-flaticons-flat-flat-icons.png" alt="Math Logo" width="96" height="96"/>
</p>

<div align="center" style="margin: 2rem 0;">
  <a href="https://www-e.github.io/Elostaz/" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: all 0.3s ease;">
    🚀 Visit Our Website
  </a>
</div>

<h1 align="center" dir="rtl" style="font-family: 'Tajawal', 'Cairo', sans-serif; color: #1a365d; font-weight: 700; margin-bottom: 0.5rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.1);">مركز أ/ أشرف حسن للرياضيات</h1>
<h3 align="center" style="color: #2d3748; font-weight: 500; margin-top: 0; font-size: 1.5rem;">Alostaz Math Center - Next.js Application</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-181818?logo=supabase&logoColor=white" alt="Supabase">
</p>

<p align="center" style="max-width: 800px; margin: 0 auto; color: #4a5568; line-height: 1.6;">
  A modern, responsive web application for a mathematics tutoring center featuring course information, student registration, and class scheduling. Built with the latest web technologies to provide the best learning experience.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow?logo=github" alt="License">
  <img src="https://img.shields.io/github/last-commit/www-e/Alostaz" alt="Last Commit">
  <img src="https://img.shields.io/github/issues/www-e/Alostaz" alt="Issues">
  <img src="https://img.shields.io/github/forks/www-e/Alostaz" alt="Forks">
  <img src="https://img.shields.io/github/stars/www-e/Alostaz" alt="Stars">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?logo=git" alt="PRs Welcome">
</p>

## ✨ Key Features

### 🎯 Core Functionality
| Feature | Description |
|---------|-------------|
| **Responsive Design** | Optimized for all devices from mobile to desktop |
| **Dark/Light Mode** | Toggle between themes with persistent preferences |
| **RTL Support** | Full right-to-left text direction for Arabic content |
| **Course Management** | Detailed pages for each grade level and subject |
| **Registration System** | Secure student registration with Supabase backend |
| **Schedule Management** | View and manage class schedules |

### 🖼️ Application Preview

#### Home Page
<p align="center">
  <a href="https://www-e.github.io/Elostaz/" target="_blank">
    <img src="./public/home-dark-alostaz.png" alt="Alostaz Math Center Home Page" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 100%; height: auto; border: 1px solid #e2e8f0;"/>
  </a>
</p>
*Interactive home page with course highlights - [View Live](https://www-e.github.io/Elostaz/)*

#### Mobile View
```mermaid
graph TD
    A[Home] --> B[About]
    A --> C[Courses]
    A --> D[Schedule]
    A --> E[Register]
    
    style A fill:#2b6cb0,color:white
    style B fill:#4299e1
    style C fill:#4299e1
    style D fill:#4299e1
    style E fill:#2c5282,color:white
```
*Mobile navigation flow*

<details>
<summary><h2 style="display: inline;">🚀 Quick Start</h2></summary>

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/www-e/Alostaz.git
   cd Alostaz_React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```
</details>

## 🏗 Project Structure

```mermaid
graph TD
    A[Alostaz_React] --> B[public/]
    A --> C[src/]
    B --> B1[assets/]
    C --> C1[app/]
    C --> C2[components/]
    C --> C3[lib/]
    
    C1 --> C1a[about/]
    C1 --> C1b[grade1/]
    C1 --> C1c[grade2/]
    C1 --> C1d[grade3/]
    C1 --> C1e[registration/]
    C1 --> C1f[schedule/]
    C1 --> C1g[globals.css]
    C1 --> C1h[layout.tsx]
    C1 --> C1i[page.tsx]
    
    C2 --> C2a[AboutSection.tsx]
    C2 --> C2b[ContactSection.tsx]
    C2 --> C2c[CoursesSection.tsx]
    C2 --> C2d[Footer.tsx]
    C2 --> C2e[HeroSection.tsx]
    C2 --> C2f[Navbar.tsx]
    C2 --> C2g[ThemeProvider.tsx]
    
    C3 --> C3a[supabase.ts]
```

### Key Files and Directories

| Directory/File | Purpose |
|----------------|---------|
| `public/assets/` | Static assets (images, icons, PDFs) |
| `src/app/` | Next.js app router pages |
| `src/components/` | Reusable React components |
| `src/lib/` | Utility functions and configurations |
| `src/app/layout.tsx` | Root layout component |
| `src/app/page.tsx` | Home page component |
| `tailwind.config.js` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |

## 🛠️ Technology Stack

### Core Technologies

```mermaid
pie
    title Core Technologies
    "Next.js 14" : 30
    "React 18" : 25
    "TypeScript" : 20
    "Tailwind CSS" : 15
    "Supabase" : 10
```

### Frontend
- **Next.js 14** - React framework with SSR/SSG
- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Backend
- **Supabase** - Backend as a Service
  - Authentication
  - Database
  - Storage
  - Real-time Subscriptions

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **Cypress** - E2E testing

## 📊 Project Status & Progress

### Feature Completion
```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Core Features
    Authentication      :done,    des1, 2025-01-01, 30d
    Course Management   :done,    des2, 2025-02-01, 45d
    User Dashboard      :active,  des3, 2025-03-15, 30d
    Admin Panel         :         des4, 2025-04-15, 45d
    
    section Mobile App
    Design              :         des5, 2025-05-01, 30d
    Development         :         des6, 2025-06-01, 60d
    Testing             :         des7, 2025-08-01, 30d
```

### Progress Overview
| Component | Status | Progress |
|-----------|--------|----------|
| Frontend | 🟢 Complete | 95% |
| Backend | 🟡 In Progress | 80% |
| Testing | 🟠 Planned | 20% |
| Documentation | 🟡 In Progress | 70% |

### Upcoming Features
- [x] User Authentication
- [x] Course Management
- [ ] Interactive Quizzes
- [ ] Progress Tracking
- [ ] Mobile Application
- [ ] Admin Dashboard

## 📚 Documentation

### Getting Started
1. [Installation Guide](./docs/INSTALLATION.md)
2. [Configuration](./docs/CONFIGURATION.md)
3. [Deployment](./docs/DEPLOYMENT.md)

### Development
- [API Reference](./docs/API.md)
- [Component Library](./docs/COMPONENTS.md)
- [Testing Guide](./docs/TESTING.md)

### Additional Resources
- [Technical Documentation](./TECHNICAL_README.md)
- [Contribution Guidelines](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

### API Endpoints
```mermaid
flowchart LR
    A[Client] -->|HTTP Request| B[API Gateway]
    B --> C[Authentication]
    B --> D[Course Service]
    B --> E[User Service]
    C --> F[(Database)]
    D --> F
    E --> F
```

## 🤝 Contributing

Contributions are always welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)

<div align="center" dir="rtl" style="font-family: 'Tajawal', 'Cairo', sans-serif; margin: 3rem 0; padding: 2rem; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
  <h3 style="color: #1a365d; margin-bottom: 1.5rem; font-size: 1.75rem; font-weight: 700;">تواصل معنا</h3>
  <p style="color: #4a5568; margin-bottom: 1.5rem; font-size: 1.1rem; max-width: 600px; margin-left: auto; margin-right: auto;">
    للاستفسارات أو الدعم الفني، يسرنا تواصلكم معنا عبر أي من القنوات التالية:
  </p>
  
  <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
    <a href="https://www.facebook.com/omar.ashraf.579123" target="_blank" style="display: flex; align-items: center; justify-content: center; background: #1877f2; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; max-width: 250px; margin: 0 auto 1rem;">
      <img src="https://img.icons8.com/color/24/ffffff/facebook.png" alt="Facebook" width="24" height="24" style="margin-left: 8px;">
      فيسبوك
    </a>
    
    <a href="https://wa.me/201154688628" target="_blank" style="display: flex; align-items: center; justify-content: center; background: #25d366; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; max-width: 250px; margin: 0 auto 1rem;">
      <img src="https://img.icons8.com/color/24/ffffff/whatsapp--v1.png" alt="WhatsApp" width="24" height="24" style="margin-left: 8px;">
      واتساب: +201154688628
    </a>
    
    <a href="https://www.instagram.com/omarashraf871/" target="_blank" style="display: flex; align-items: center; justify-content: center; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; max-width: 250px; margin: 0 auto;">
      <img src="https://img.icons8.com/color/24/ffffff/instagram-new--v1.png" alt="Instagram" width="24" height="24" style="margin-left: 8px;">
      انستجرام
    </a>
  </div>
  
  <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
    <p style="color: #4a5568; margin: 0.5rem 0;">
      <img src="https://img.icons8.com/color/20/000000/email.png" alt="Email" style="vertical-align: middle; margin-left: 5px;">
      البريد الإلكتروني: omarasj445@gmail.com
    </p>
    <a href="https://wa.me/201154688628?text=Hello%20I%20came%20from%20Your%20GitHub%21" target="_blank" style="text-decoration: none; color: #4a5568; display: block; margin: 0.5rem 0;">
      <img src="https://img.icons8.com/color/20/25D366/whatsapp--v1.png" alt="WhatsApp" style="vertical-align: middle; margin-left: 5px;">
      WhatsApp: +201154688628
    </a>
  </div>
  
  <p style="margin-top: 2rem; color: #718096; font-size: 0.9rem;">
    © 2025 مركز أ/ أشرف حسن للرياضيات. جميع الحقوق محفوظة.
  </p>
</div>
     ```

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as:

- Vercel
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## Credits

- Design and Development: Omar Ashraf