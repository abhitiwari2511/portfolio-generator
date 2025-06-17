import { PortfolioContext } from "@/context/PortfolioContext";
import { useContext } from "react";

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === null) {
    throw new Error(
      "usePortfolio must be used within a PortfolioProvider",
    );
  }
  return context;
};
