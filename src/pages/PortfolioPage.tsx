import Experience from "@/components/sections/ExperienceSection";
import { Footer } from "@/components/sections/FooterSection";
import Hero from "@/components/sections/HeroSection";
import Projects from "@/components/sections/ProjectSection";
import Skills from "@/components/sections/SkillSection";

const PortfolioPage = () => {
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
