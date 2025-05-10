import { cn } from "../lib/utils";
import { DotPattern } from "./ui/dot-pattern";

export function DotBackground({ glow }: { glow?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <DotPattern
        glow={glow}
        className={cn(
          "[mask-image:radial-gradient(100vh_circle_at_center,white,transparent)] text-white",
        )}
      />
    </div>
  );
}
