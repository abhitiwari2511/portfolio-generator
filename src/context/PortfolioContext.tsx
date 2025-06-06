import type { PortfolioDetails } from "@/types/types";
import { createContext, type ReactNode } from "react";

export const PortfolioContext = createContext<PortfolioDetails | null>(
  null
);

export const PortfolioProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const portfolioConfig: PortfolioDetails = {
    personal: {
      name: "",
      role: "",
      description: "",
      avatar: "",
      location: "",
      socials: [],
    },
    about: {
      title: "",
      description: "",
      resume: "",
    },
    projects: [],
    skills: [],
    experience: [],
  };

  return (
    <PortfolioContext.Provider value={portfolioConfig}>
      {children}
    </PortfolioContext.Provider>
  );
};
