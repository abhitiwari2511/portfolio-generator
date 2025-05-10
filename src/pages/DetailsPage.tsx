import { ColourText } from "@/components/ColourText";
import { DotBackground } from "@/components/DotBackground";
import UserInput from "@/components/UserInput";

const DetailsPage = () => {
  return (
    <div className="w-full h-full bg-zinc-950 relative">
      {/* background */}
      <div className="absolute inset-0">
        <DotBackground />
      </div>

      {/* user data form content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl text-center mt-6 space-y-2 md:text-4xl lg:text-5xl font-bold text-white">
          <ColourText value="User Details" />
        </h1>
        <div className="w-[60%]">
          {/* add form here */}
          <UserInput />
        </div>
      </div>
    </div>
    );
  };

  export default DetailsPage;
