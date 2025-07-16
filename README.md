# Portfolio Generator 🚀

A modern, interactive web application that helps developers create stunning portfolios in minutes. Built with React, TypeScript, and Vite, featuring a beautiful UI with animations and smooth transitions.

![Portfolio Generator](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.5-blue.svg)

## ✨ Features

- **Interactive Portfolio Builder**: Step-by-step form-based portfolio creation
- **Export Functionality**: Download your portfolio as a complete HTML/CSS/JS package
- **Modern UI Components**: Beautiful, responsive design with smooth animations
- **Multiple Sections**: 
  - Hero section with personal info
  - About section
  - Skills showcase
  - Projects gallery
  - Work experience timeline
  - Footer with social links
- **Responsive Design**: Looks great on desktop, tablet, and mobile
- **Type-Safe**: Full TypeScript implementation for better development experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Type System**: TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.5
- **UI Components**: 
  - Radix UI primitives
  - Custom component library
  - Lucide React icons
- **Animations**: Motion (Framer Motion)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **File Export**: JSZip & FileSaver for portfolio download

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhitiwari2511/portfolio-generator.git
   cd portfolio-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── sections/        # Portfolio section components
│   └── ui/              # Base UI components (buttons, cards, etc.)
├── context/             # React context for state management
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and export logic
├── pages/               # Main application pages
├── types/               # TypeScript type definitions
└── assets/              # Static assets
```

## 🎯 How It Works

1. **Landing Page**: Welcome screen with project introduction
2. **Portfolio Builder**: Multi-step form to input your details:
   - Personal information (name, role, description, socials)
   - About section
   - Skills and technologies
   - Work experience
   - Projects showcase
3. **Live Preview**: Real-time portfolio preview as you fill out the form
4. **Export**: Download your complete portfolio as a ZIP file

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Features in Detail

### Portfolio Sections

- **Hero Section**: Eye-catching introduction with your name, role, and description
- **Skills Section**: Visual display of your technical skills and expertise
- **Projects Section**: Showcase your work with descriptions, technologies used, and links
- **Experience Section**: Professional timeline of your work history
- **Footer**: Contact information and social media links

### UI Components

- **Interactive Buttons**: Hover effects and smooth transitions
- **Colorful Text**: Dynamic text highlighting
- **Dot Background**: Animated background patterns
- **Responsive Cards**: Mobile-friendly project and experience cards
- **Form Controls**: Validated input fields with error handling

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration (implied)
- `components.json` - UI components configuration

## 🌐 Deployment

This project is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy** - Vercel will automatically build and deploy your application

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Abhishek Tiwari**
- GitHub: [@abhitiwari2511](https://github.com/abhitiwari2511)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Animations powered by [Motion](https://motion.dev/)

---

⭐ **Star this repository if you found it helpful!**
