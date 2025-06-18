import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { DotBackground } from "../DotBackground";

const Projects = () => {
  // Hardcoded projects data
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product search, cart management, and secure payment processing with Stripe.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      github: "https://github.com/username/ecommerce-platform",
      url: "https://ecommerce-demo.example.com",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates using Socket.io. Users can create workspaces, assign tasks, set deadlines, and track progress with interactive charts.",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRhc2slMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      tags: ["React", "TypeScript", "Firebase", "Socket.io", "Chart.js"],
      github: "https://github.com/username/task-management",
      url: "https://task-app-demo.example.com",
    },
    {
      title: "AI Image Generator",
      description:
        "An application that leverages OpenAI's DALL-E API to generate unique images from text prompts. Includes features for customization, history tracking, and image sharing.",
      image:
        "https://images.unsplash.com/photo-1675571309844-80e0bcadcd7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWklMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["React", "OpenAI API", "Node.js", "AWS S3", "Tailwind CSS"],
      github: "https://github.com/username/ai-image-generator",
      url: "https://ai-image-gen.example.com",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const projectVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section
      id={"projects"}
      className="min-h-screen py-24 bg-gradient-to-b from-primary-100 to-white relative overflow-hidden"
    >
      <DotBackground glow={true} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            variants={projectVariants}
            className="text-4xl md:text-5xl font-title font-semibold text-primary-800 mb-12 text-center"
          >
            Featured Projects
          </motion.h2>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={projectVariants}
                className="group relative backdrop-blur-sm bg-white/50 rounded-2xl p-6 md:p-8 border border-primary-300 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  {/* Project Image with enhanced animation */}
                  <div className="w-full lg:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-700">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.5 },
                      }}
                      className="h-full"
                    >
                      <div className="absolute inset-0 bg-primary-900/20 group-hover:bg-primary-900/0 transition-all duration-500" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform transition-all duration-700"
                      />
                    </motion.div>
                  </div>

                  {/* Project Info with enhanced styling */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <motion.h3
                      whileHover={{
                        color: "var(--color-primary-600)",
                        x: 5,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold text-primary-900 transition-all duration-300 cursor-pointer"
                    >
                      {project.title}
                    </motion.h3>

                    <p className="text-lg text-primary-600 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 text-sm font-medium bg-primary-100 text-primary-700 rounded-lg border border-primary-200 hover:border-primary-300 transition-all duration-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-6 pt-4">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View project code"
                          className="flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-all duration-300"
                          whileHover={{ scale: 1.05, x: 3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub size={22} />
                          <span className="font-medium">View Code</span>
                        </motion.a>
                      )}
                      {project.url && (
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View live demo"
                          className="flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-all duration-300"
                          whileHover={{ scale: 1.05, x: 3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaExternalLinkAlt size={20} />
                          <span className="font-medium">Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
