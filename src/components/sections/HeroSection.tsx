import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import type { Social } from "@/types/types";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useEffect, useState } from "react";

const Hero = () => {
  const { portfolioConfig } = usePortfolio();
  const [personal, setPersonal] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    description:
      "Passionate web developer specializing in React, TypeScript, and modern web technologies. I create beautiful, responsive, and user-friendly applications that solve real-world problems.",
    socials: [
      {
        platform: "github",
        url: "https://github.com/johndoe",
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/johndoe",
      },
      {
        platform: "twitter",
        url: "https://twitter.com/johndoe",
      },
    ],
  });

  useEffect(() => {
    // console.log("Portfolio config updated in Hero:", portfolioConfig);
    setPersonal({
      name: portfolioConfig.personal.name || "John Doe",
      title: portfolioConfig.personal.role || "Full Stack Developer",
      description:
        portfolioConfig.personal.description ||
        "Passionate web developer specializing in React, TypeScript, and modern web technologies. I create beautiful, responsive, and user-friendly applications that solve real-world problems.",
      socials: [
        {
          platform: "github",
          url:
            portfolioConfig.personal.socials.find(
              (s) => s.platform === "GitHub"
            )?.url || "https://github.com/johndoe",
        },
        {
          platform: "linkedin",
          url:
            portfolioConfig.personal.socials.find(
              (s) => s.platform === "LinkedIn"
            )?.url || "https://linkedin.com/in/johndoe",
        },
        {
          platform: "twitter",
          url:
            portfolioConfig.personal.socials.find(
              (s) => s.platform === "Twitter"
            )?.url || "https://twitter.com/johndoe",
        },
      ],
    });
  }, [portfolioConfig]);

  // Hardcoded about information
  const about = {
    title: "About Me",
    description:
      "With over 5 years of experience in web development, I've worked on various projects from e-commerce platforms to enterprise applications. I'm constantly learning new technologies and techniques to improve my skills and deliver better products.",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div>
      <section className="min-h-screen bg-amber-300 flex items-center justify-center bg-gradient-to-b from-primary-100 to-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full pt-16 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 max-w-7xl relative z-10 place-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center sm:text-left">
            <motion.h1
              className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-7xl mb-4 font-bold text-primary-900"
              variants={itemVariants}
            >
              {personal.name}
            </motion.h1>

            <motion.p
              className="section-title text-xl sm:text-2xl text-primary-600 mb-6"
              variants={itemVariants}
            >
              {personal.title}
            </motion.p>

            <motion.p
              className="body-text text-base sm:text-lg text-primary-700 mb-8 max-w-2xl mx-auto sm:mx-0"
              variants={itemVariants}
            >
              {personal.description}
            </motion.p>

            {/* social icons */}
            <motion.div
              className="flex justify-center sm:justify-start space-x-6 mb-8"
              variants={itemVariants}
            >
              {personal.socials.map((social: Social) => (
                <motion.div
                  key={social.platform}
                  className="group relative flex items-center justify-center rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  role="link"
                >
                  {/* Icon */}
                  <motion.a
                    href={social.url}
                    target="_blank"
                    className="relative z-10 bg-white p-4 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300"
                  >
                    {social.platform.toLowerCase() === "github" && (
                      <FaGithub
                        className="text-primary-600 group-hover:text-primary-800 transition-all duration-300"
                        size={28}
                      />
                    )}
                    {social.platform.toLowerCase() === "linkedin" && (
                      <FaLinkedin
                        className="text-primary-600 group-hover:text-primary-800 transition-all duration-300"
                        size={28}
                      />
                    )}
                    {social.platform.toLowerCase() === "twitter" && (
                      <FaXTwitter
                        className="text-primary-600 group-hover:text-primary-800 transition-all duration-300"
                        size={28}
                      />
                    )}
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex ml-2 p-4 flex-col justify-center items-center relative"
            animate={{ y: [0, -10, 0] }}
          >
            <motion.div
              className="relative mt-4 md:mt-12 bg-gradient-to-br from-white to-primary-100  p-6 rounded-lg shadow-lg border-2 border-primary-100 hover:border-primary-300 transition-all duration-300"
              variants={itemVariants}
            >
              <h2 className="text-xl md:text-3xl font-bold font-title text-primary-900 mb-4">
                {about.title}
              </h2>

              <p className="text-primary-700 text-base leading-relaxed">
                {about.description}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hidden absolute bottom-3 lg:flex justify-center w-full z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="size-9 hover:bg-zinc-100 hover:bg-primary-900 border flex justify-center items-center border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-full animate-bounce cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            role="button"
            tabIndex={0}
            aria-label="Scroll down"
          >
            <IoIosArrowDown size={24} />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
