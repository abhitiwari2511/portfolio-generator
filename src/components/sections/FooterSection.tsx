import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Hardcoded data
  const personalData = {
    name: "John Doe",
    description:
      "Full stack developer specializing in React, TypeScript, and modern web technologies. Creating beautiful and functional web applications.",
    email: "john.doe@example.com",
    socials: [
      {
        platform: "GitHub",
        url: "https://github.com/johndoe",
        icon: <FaGithub size={20} />,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/johndoe",
        icon: <FaLinkedin size={20} />,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/johndoe",
        icon: <FaXTwitter size={20} />,
      },
      {
        platform: "Email",
        url: "mailto:john.doe@example.com",
        icon: <MdEmail size={20} />,
      },
    ],
  };

  const menuItems = [
    { title: "About Me", href: "hero" },
    { title: "Projects", href: "projects" },
    { title: "Skills", href: "skills" },
    { title: "Experience", href: "experience" },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      id={"footer"}
      className="bg-gradient-to-b from-white to-primary-50 border-t border-primary-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h3
              whileHover={{ x: 2 }}
              className="font-display text-2xl font-semibold text-primary-900"
            >
              {personalData.name}
            </motion.h3>
            <p className="text-primary-600 max-w-md leading-relaxed">
              {personalData.description}
            </p>
            <motion.div className="mt-4" whileHover={{ y: -2 }}>
              <a
                href={`mailto:${personalData.email}`}
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary-100 hover:bg-primary-200 text-primary-700 transition-colors duration-300"
              >
                <MdEmail className="mr-2" />
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-title text-xl font-semibold text-primary-900">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              {menuItems.map((menuItem) => (
                <motion.div key={menuItem.href} whileHover={{ x: 4 }}>
                  <Link
                    smooth={true}
                    className="text-primary-600 cursor-pointer hover:text-primary-900 transition-colors duration-300 inline-block"
                    to={menuItem.href}
                  >
                    {menuItem.title}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-title text-xl font-semibold text-primary-900">
              Connect
            </h4>
            <div className="flex space-x-4 items-center">
              {personalData.socials.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect on ${social.platform}`}
                  className="p-3 bg-white shadow-sm rounded-full text-primary-600 hover:text-primary-900 hover:shadow-md transition-all duration-300 border border-primary-100"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-6 -mb-10 border-t border-primary-200"
        >
          <p className="text-center text-primary-600">
            © {currentYear} {personalData.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};
