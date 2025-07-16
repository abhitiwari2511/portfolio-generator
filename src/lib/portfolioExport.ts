import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { PortfolioDetails } from "@/types/types";

export const generatePortfolioHTML = (config: PortfolioDetails): string => {
  const { personal, skills, projects, experience, about } = config;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personal.name} | Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        amber: {
                          50: '#FFFDF7',
                          300: '#fcd34d',
                        },
                        primary: {
                            900: '#000000', // Darkest Gray, used as black
                            800: '#1f2937',
                            200: '#F7F9FF',
                            100: '##FAFAFA'
                        }
                    },
                    fontFamily: {
                        'title': ['Inter', 'system-ui', 'sans-serif'],
                        'sans': ['Inter', 'system-ui', 'sans-serif'],
                        'display': ['Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        .dot-pattern {
            background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
            background-size: 20px 20px;
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease;
        }
        
        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hover-lift {
            transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
            transform: translateY(-5px);
            // box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .hover-scale {
            transition: transform 0.5s ease;
        }
        
        .hover-scale:hover {
            transform: scale(1.05);
        }
        
        .project-image {
            transition: all 0.7s ease;
        }
        
        .project-image:hover {
            transform: scale(1.05);
        }
        
        .project-card {
            backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.5);
            transition: all 0.5s ease;
        }
        
        .project-card:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
    </style>
</head>
<body class="bg-white">

    <section id="hero" class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fed236] to-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div class="w-full pt-16 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 max-w-7xl relative z-10 place-items-center fade-in-up">
            <div class="text-center sm:text-left">
                <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-7xl mb-4 font-bold text-primary-900 font-title">
                    ${personal.name}
                </h1>
                <p class="text-xl sm:text-2xl text-primary-900 mb-6 font-sans">
                    ${personal.role}
                </p>
                <div class="flex justify-center sm:justify-start space-x-4 mb-8">
                    ${personal.socials
                      ?.map(
                        (social) => `
                        <a href="${
                          social.url
                        }" target="_blank" class="relative z-10 bg-white p-4 space-y-4 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover-scale">
                            <i class="fab fa-${social.platform.toLowerCase()} text-primary-900" style="font-size: 24px;"></i>
                        </a>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="flex ml-2 p-4 flex-col justify-center items-center relative" style="animation: float 6s ease-in-out infinite;">
                <div class="relative mt-4 md:mt-12 bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/50">
                    <h2 class="text-xl md:text-3xl font-bold font-title text-primary-900 mb-4">
                        ${about?.title || "About Me"}
                    </h2>
                    <p class="text-primary-900 text-base leading-relaxed">
                        ${about?.description || personal.description}
                    </p>
                </div>
            </div>
        </div>
        
        <div class="hidden absolute bottom-5 lg:flex justify-center w-full z-10">
            <div class="size-9 border-2 flex justify-center items-center border-zinc-100 text-primary-900 rounded-full animate-bounce cursor-pointer" onclick="window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })">
                <i class="fas fa-arrow-down"></i>
            </div>
        </div>
    </section>

    ${
      projects?.length
        ? `
    <section id="projects" class="py-24 bg-white relative overflow-hidden">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 fade-in-up">
                <h2 class="text-4xl md:text-5xl font-title font-semibold text-primary-900">Featured Projects</h2>
            </div>
            
            <div class="space-y-20">
                ${projects
                  .map(
                    (project, index) => `
                    <div class="group relative project-card rounded-2xl p-6 md:p-8 border border-primary-300 shadow-sm fade-in-up" style="--index: ${index};">
                        <div class="flex flex-col lg:flex-row gap-8 items-center">
                            ${
                              project.image
                                ? `
                            <div class="w-full lg:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-xl">
                                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover project-image">
                            </div>`
                                : ""
                            }
                            <div class="w-full lg:w-1/2 space-y-6">
                                <h3 class="text-3xl font-bold text-primary-900 font-title">${
                                  project.title
                                }</h3>
                                <p class="text-lg text-primary-900 leading-relaxed">${
                                  project.description
                                }</p>
                                <div class="flex flex-wrap gap-3">
                                    ${project.tags
                                      .map(
                                        (tag) => `
                                        <span class="px-4 hover:scale-105 transition-all duration-200 py-2 text-sm font-medium bg-white text-primary-900 rounded-lg border border-zinc-200">${tag}</span>
                                    `
                                      )
                                      .join("")}
                                </div>
                                <div class="flex gap-6 pt-4">
                                    ${
                                      project.github
                                        ? `
                                    <a href="${project.github}" target="_blank" class="flex items-center gap-2 text-primary-900 hover-lift duration-300 transition-all">
                                        <i class="fab fa-github" style="font-size: 22px;"></i>
                                        <span class="font-medium">View Code</span>
                                    </a>`
                                        : ""
                                    }
                                    ${
                                      project.url
                                        ? `
                                    <a href="${project.url}" target="_blank" class="flex items-center gap-2 text-primary-900 hover-lift transition-all">
                                        <i class="fas fa-external-link-alt" style="font-size: 20px;"></i>
                                        <span class="font-medium">Live Demo</span>
                                    </a>`
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    </section>`
        : ""
    }

    ${
      skills?.length
        ? `
    <section id="skills" class="py-20 bg-white relative overflow-hidden w-full">
        <div class="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 fade-in-up">
                <h2 class="text-4xl md:text-5xl font-title font-semibold text-primary-900 mb-12">Technical Skills</h2>
                <p class="font-sans text-lg text-primary-900 tracking-medium leading-relaxed max-w-2xl mx-auto">
                    A comprehensive list of technologies and tools I work with
                </p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                ${skills
                  .map(
                    (skill, index) => `
                    <div class="group cursor-pointer fade-in-up hover-scale" style="--index: ${index};">
                        <div class="bg-white/50 backdrop-blur-sm border border-primary-300 rounded-full p-3 shadow-sm hover:shadow-md hover:border-primary-400 transition-all duration-300 hover:bg-white/80">
                            <div class="text-center">
                                <h3 class="text-base md:text-lg text-primary-900 hover:text-primary-900 transition-colors duration-300 px-2">${skill.name}</h3>
                            </div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    </section>`
        : ""
    }

    ${
      experience?.length
        ? `
    <section id="experience" class="py-20 bg-white relative overflow-hidden w-full">
        <div class="dot-pattern absolute inset-0 opacity-50"></div>
        <div class="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20 fade-in-up">
                <h2 class="font-display text-4xl md:text-5xl font-medium text-primary-900 mb-12">Professional Experience</h2>
                <p class="font-sans text-lg md:text-xl font-normal text-primary-900 tracking-normal leading-relaxed max-w-2xl mx-auto">
                    My journey in the industry
                </p>
            </div>
            
            <div class="relative">
                <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary-200 transform md:-translate-x-px"></div>
                ${experience
                  .map(
                    (exp, index) => `
                    <div class="relative bg-white rounded-2xl p-6 md:p-8 mb-12 border border-primary-300 shadow-sm hover-lift md:w-[calc(50%-2rem)] ${
                      index % 2 === 0
                        ? "md:mr-[calc(50%+2rem)]"
                        : "md:ml-[calc(50%+2rem)]"
                    } fade-in-up" style="--index: ${index};">
                        <div class="absolute top-1/2 w-5 h-5 rounded-full bg-primary-900 border-4 border-white hidden md:block transform -translate-y-1/2 ${
                          index % 2 === 0
                            ? "right-0 translate-x-[calc(100%+0.5rem)]"
                            : "left-0 -translate-x-[calc(100%+0.5rem)]"
                        }"></div>
                        <div class="mb-6">
                            <h3 class="font-title text-xl md:text-2xl font-semibold text-primary-900 mb-2">${
                              exp.role
                            }</h3>
                            <p class="font-title text-lg text-primary-900 mb-3">${
                              exp.company
                            }</p>
                            <div class="px-3 py-1 inline-block bg-primary-100 rounded-full">
                                <p class="font-sans text-sm uppercase tracking-wider font-medium text-primary-900">${formatDate(
                                  exp.startDate
                                )} - ${
                      !exp.endDate ? "Present" : formatDate(exp.endDate)
                    }</p>
                            </div>
                        </div>
                        <ul class="space-y-4">
                            ${exp.responsibilities
                              .map(
                                (responsibility) => `
                                <li class="flex items-start">
                                    <span class="inline-block w-1.5 h-1.5 rounded-full bg-primary-900 mt-2 mr-3 flex-shrink-0"></span>
                                    <p class="font-sans text-base text-primary-900 leading-relaxed">${responsibility}</p>
                                </li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    </section>`
        : ""
    }

    <footer id="footer" class="bg-white border-t border-zinc-200">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-primary-900">
                <div class="space-y-6">
                    <h3 class="font-display text-2xl font-semibold">${
                      personal.name
                    }</h3>
                    <p class="max-w-md leading-relaxed">${personal.role}</p>
                </div>
                <div class="space-y-6">
                    <h4 class="font-title text-xl font-semibold">Quick Links</h4>
                    <nav class="flex bg-white flex-col space-y-3">
                        <a href="#hero" class="transition-all hover-lift">About Me</a>
                        <a href="#projects" class="transition-all hover-lift">Projects</a>
                        <a href="#skills" class="transition-all hover-lift">Skills</a>
                        <a href="#experience" class="transition-all hover-lift">Experience</a>
                    </nav>
                </div>
                <div class="space-y-6">
                    <h4 class="font-title text-xl font-semibold">Connect</h4>
                    <div class="flex space-x-4 items-center">
                        ${personal.socials
                          ?.map(
                            (social) => `
                            <a href="${
                              social.url
                            }" target="_blank" class="w-12 h-12 bg-white border border-primary-300 text-primary-900 hover:bg-primary-200 transition-all duration-300 rounded-full hover-lift flex items-center justify-center">
                                <i class="fab fa-${social.platform.toLowerCase()}" style="font-size: 24px;"></i>
                            </a>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            <div class="mt-6 pt-6 border-t border-primary-300">
                <p class="text-center text-primary-900">
                    © ${new Date().getFullYear()} ${
    personal.name
  }. All rights reserved.
                </p>
            </div>
        </div>
    </footer>

    <script>
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>`;
};

export const downloadPortfolioZip = async (config: PortfolioDetails) => {
  const zip = new JSZip();
  const htmlContent = generatePortfolioHTML(config);
  zip.file("portfolio.html", htmlContent);

  const readmeContent = `# ${config.personal.name}'s Portfolio
This is a standalone portfolio website generated by Portfolio Builder.
## Features:
✨ Fully responsive design
🎨 Beautiful animations and transitions
🎯 Modern gradient backgrounds
📱 Mobile-friendly layout
🚀 Fast loading with CDN resources
💼 Professional styling

## How to use:
1. Extract all files to a folder
2. Open portfolio.html in your web browser
3. To host online, upload all files to any web hosting service

## Deployment Options:
- **Netlify**: Drag and drop the extracted folder
- **Vercel**: Import the project folder
- **GitHub Pages**: Upload to a GitHub repository
- **Firebase Hosting**: Use Firebase CLI to deploy

## Customization:
The HTML file contains inline CSS that you can modify to change:
- Colors and gradients
- Fonts and typography
- Animations and transitions
- Layout and spacing

To use, extract all files and open index.html in your browser.
Generated on: ${new Date().toLocaleDateString()}
Built with ❤️ by Portfolio Builder
`;
  zip.file("README.md", readmeContent);

  const deployGuide = `# Quick Deployment Guide

## 🚀 Netlify (Recommended - Free)
1. Go to https://netlify.com
2. Drag and drop your portfolio folder
3. Your site goes live instantly!
4. Get a free domain like: yourname.netlify.app

## ⚡ Vercel (Free)
1. Go to https://vercel.com
2. Import your project
3. Deploy with one click
4. Get a domain like: yourname.vercel.app

## 📚 GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload your files
3. Go to Settings > Pages
4. Select source branch
5. Your site: username.github.io/repository-name

## 🔥 Firebase Hosting (Free tier available)
1. Install Firebase CLI: npm install -g firebase-tools
2. Run: firebase login
3. Run: firebase init hosting
4. Deploy: firebase deploy

## Custom Domain:
Most services allow custom domains for a professional look!
`;

  zip.file("DEPLOYMENT.md", deployGuide);

  const content = await zip.generateAsync({ type: "blob" });
  const fileName = `${config.personal.name.replace(/\s+/g, "_")}_Portfolio.zip`;
  saveAs(content, fileName);
};
