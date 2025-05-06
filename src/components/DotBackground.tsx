import { cn } from "../lib/utils";
import { DotPattern } from "./magicui/dot-pattern";

export function DotBackground() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(100vh_circle_at_center,white,transparent)] text-white",
        )}
      />
    </div>
  );
}
