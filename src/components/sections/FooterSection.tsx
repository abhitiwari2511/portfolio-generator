import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaGithub, FaGlobe, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { usePortfolio } from "@/hooks/usePortfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { portfolioConfig } = usePortfolio();

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
          {/* just user name */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h3
              whileHover={{ x: 2 }}
              className="font-display text-2xl font-semibold text-primary-900"
            >
              {portfolioConfig.personal.name}
            </motion.h3>
            <p className="text-primary-600 max-w-md leading-relaxed">
              {portfolioConfig.personal.role}
            </p>
          </motion.div>

          {/* quick Links */}
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

          {/* social Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-title text-xl font-semibold text-primary-900">
              Connect
            </h4>
            <div className="flex space-x-4 items-center">
              {portfolioConfig.personal.socials?.map((social) => (
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
                  {social.platform.toLowerCase() === "github" && (
                    <FaGithub size={20} />
                  )}
                  {social.platform.toLowerCase() === "linkedin" && (
                    <FaLinkedin size={20} />
                  )}
                  {social.platform.toLowerCase() === "twitter" && (
                    <FaXTwitter size={20} />
                  )}
                  {!["github", "linkedin", "twitter"].includes(
                    social.platform.toLowerCase()
                  ) && <FaGlobe size={20} />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-6 -mb-10 border-t border-primary-200"
        >
          <p className="text-center text-primary-600">
            © {currentYear} {portfolioConfig.personal.name}. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
