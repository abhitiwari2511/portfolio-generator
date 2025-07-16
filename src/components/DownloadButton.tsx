import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { downloadPortfolioZip } from "@/lib/portfolioExport";
import { Download, Loader2, CheckCircle } from "lucide-react";

const DownloadButton: React.FC = () => {
  const { portfolioConfig } = usePortfolio();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    // data check krna
    if (!portfolioConfig.personal.name) {
      alert(
        "Please fill in your portfolio details first! Go to the form page to add your information."
      );
      return;
    }

    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      await downloadPortfolioZip(portfolioConfig);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Download failed:", error);
      alert(
        "Download failed. Please try again. Make sure you have filled in all required fields."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        fixed top-4 right-4 z-50 flex items-center gap-2 px-6 py-3 rounded-full font-medium
        transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
        ${
          downloadSuccess
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        }
        ${isDownloading ? "cursor-not-allowed opacity-80" : "cursor-pointer"}
        backdrop-blur-lg border border-white/20
      `}
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Generating...</span>
        </>
      ) : downloadSuccess ? (
        <>
          <CheckCircle className="h-5 w-5" />
          <span>Downloaded!</span>
        </>
      ) : (
        <>
          <Download className="h-5 w-5" />
          <span>Download Portfolio</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
