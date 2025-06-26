import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useEffect, useState } from "react";
import { type PortfolioDetails } from "@/types/types";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { portfolioConfig } = usePortfolio();
  const [ footerData, setFooterData ] = useState<typeof portfolioConfig.personal>()

  useEffect(() => {
    if (portfolioConfig.personal) {
      setFooterData(portfolioConfig.personal)
    }
  }, [portfolioConfig])

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
              {footerData?.name}
            </motion.h3>
            <p className="text-primary-600 max-w-md leading-relaxed">
              {footerData?.description}
            </p>
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
              {footerData?.socials?.map((social) => (
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
            © {currentYear} {footerData?.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};
