import { ColourfulText } from "@/components/ui/colourful-text";
import { Button } from "./Button";
import { Link } from "react-router-dom";

export function ColourText() {
  return (
    <div className="h-screen w-full flex flex-col space-y-12 items-center justify-center relative overflow-hidden">
      <h1 className="text-2xl space-y-2 md:text-4xl lg:text-5xl font-bold text-center text-white relative z-2 font-sans">
        Don't have a <ColourfulText text="Portfolio?" /> <br /> Now it's easy to make for yourself !!
      </h1>
      <Link to="/generate-your-portfolio">
        <Button />
      </Link>
    </div>
  );
}
