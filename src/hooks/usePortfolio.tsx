import { PortfolioContext } from "@/context/PortfolioContext";
import { use } from "react";

export const usePortfolio = () => {
  const context = use(PortfolioContext);
  if (context === null) {
    throw new Error(
      "usePortfolio must be used within a PortfolioProvider",
    );
  }
  return context;
};
