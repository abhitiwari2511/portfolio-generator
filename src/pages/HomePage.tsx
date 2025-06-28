import { Button } from "@/components/Button";
import { ColourText } from "@/components/ColourText";
import { DotBackground } from "@/components/DotBackground";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <DotBackground glow={true} />
      </div>
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl text-center space-y-2 md:text-4xl lg:text-5xl font-bold text-white">
          Don't have a <ColourText value={"Portfolio"} /> <br /> Now it's easy
          to make for yourself !!
        </h1>
        <Link className="mt-10" to="/generate-portfolio">
          <Button />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
