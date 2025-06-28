import type { PortfolioDetails } from "@/types/types";
import { createContext, useState, type ReactNode, useEffect } from "react";

export const PortfolioContext = createContext<{
  portfolioConfig: PortfolioDetails;
  updatePortfolioConfig: (newData: Partial<PortfolioDetails>) => void;
} | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioConfig, setPortfolioConfig] = useState<PortfolioDetails>(
    () => {
      // Try to load from localStorage on initial render
      const savedConfig = localStorage.getItem("portfolioConfig");
      if (savedConfig) {
        try {
          return JSON.parse(savedConfig);
        } catch (error) {
          console.error("Failed to parse saved portfolio config:", error);
        }
      }

      // Default values if nothing in localStorage
      return {
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
      };
    }
  );

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem("portfolioConfig", JSON.stringify(portfolioConfig));
  }, [portfolioConfig]);

  const updatePortfolioConfig = (newData: Partial<PortfolioDetails>) => {
    setPortfolioConfig((prev) => {
      const updated = {
        ...prev,
        ...newData,
      };
      return updated;
    });
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolioConfig, updatePortfolioConfig }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
