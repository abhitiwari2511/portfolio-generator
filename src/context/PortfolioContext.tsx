import type { PortfolioDetails } from "@/types/types";
import { createContext, useState, type ReactNode } from "react";

export const PortfolioContext = createContext<{
  portfolioConfig: PortfolioDetails;
  updatePortfolioConfig: (newData: Partial<PortfolioDetails>) => void;
} | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioConfig, setPortfolioConfig] = useState<PortfolioDetails>({
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
    },
    projects: [],
    skills: [],
    experience: [],
  });

  const updatePortfolioConfig = (newData: Partial<PortfolioDetails>) => {
    setPortfolioConfig((prev) => {
      const updated = {
        ...prev,
        ...newData
      };
      return updated;
    });
  }

  return (
    <PortfolioContext.Provider value={{ portfolioConfig, updatePortfolioConfig }}>
      {children}
    </PortfolioContext.Provider>
  );
};
