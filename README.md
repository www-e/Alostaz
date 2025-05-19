<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/1903/1903162.png" alt="Math Logo" width="100"/>
  
  <h1 dir="rtl">
    <strong>مركز أ/ أشرف حسن للرياضيات</strong>
  </h1>
  <h2>Alostaz Math Center - Next.js Application</h2>
  
  [![Website](https://img.shields.io/badge/Visit_Our_Website-1a365d?style=for-the-badge&logo=vercel&logoColor=white&labelColor=1a365d)](https://www-e.github.io/Elostaz/)
  
  ---
</div>

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
  <a href="https://github.com/www-e/Alostaz/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow?logo=github" alt="License">
  </a>
  <a href="https://github.com/www-e/Alostaz/commits/main">
    <img src="https://img.shields.io/github/last-commit/www-e/Alostaz" alt="Last Commit">
  </a>
  <a href="https://github.com/www-e/Alostaz/issues">
    <img src="https://img.shields.io/github/issues-raw/www-e/Alostaz" alt="Open Issues">
  </a>
  <a href="https://github.com/www-e/Alostaz/network/members">
    <img src="https://img.shields.io/github/forks/www-e/Alostaz" alt="Forks">
  </a>
  <a href="https://github.com/www-e/Alostaz/stargazers">
    <img src="https://img.shields.io/github/stars/www-e/Alostaz" alt="Stars">
  </a>
  <a href="https://github.com/www-e/Alostaz/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?logo=git" alt="PRs Welcome">
  </a>
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
[![Alostaz Home Page](./public/home-dark-alostaz.png)](https://www-e.github.io/Elostaz/)

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
<summary><h2>🚀 Quick Start</h2></summary>

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

## 📞 Contact Us

<div align="center">

### تواصل معنا

للاستفسارات أو الدعم الفني، يسرنا تواصلكم معنا عبر أي من القنوات التالية:

[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/omar.ashraf.579123)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/201154688628?text=Hello%20I%20came%20from%20Your%20GitHub%21)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/omarashraf871/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:omarasj445@gmail.com)

---

© 2025 مركز أ/ أشرف حسن للرياضيات. جميع الحقوق محفوظة.

</div>
     ```

## 🚀 Deployment

This application can be deployed to any platform that supports Next.js applications. Click on the badges below to deploy:

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://app.netlify.com/start)
[![AWS](https://img.shields.io/badge/AWS_Amplify-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/amplify/)
[![DigitalOcean](https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white)](https://www.digitalocean.com/products/app-platform/)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwww-e%2FAlostaz)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/www-e/Alostaz)

## Credits

- Design and Development: Omar Ashraf