import Experience from "@/components/sections/ExperienceSection";
import { Footer } from "@/components/sections/FooterSection";
import Hero from "@/components/sections/HeroSection";
import Projects from "@/components/sections/ProjectSection";
import Skills from "@/components/sections/SkillSection";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioPage = () => {
  const { portfolioConfig } = usePortfolio();
  const navigate = useNavigate();

  useEffect(() => {
    // context se defalut nhi to local se leke render krana
    if (!portfolioConfig.personal.name) {
      const savedConfig = localStorage.getItem("portfolioConfig");
      if (!savedConfig) {
        // redirect to input page agr koi data nhi
        navigate("/generate-portfolio");
      }
    }
  }, [portfolioConfig, navigate]);

  return (
    <div className="w-full mx-auto">
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
