"use client";

import React, { useEffect } from "react";
import { FundCard } from '@coinbase/onchainkit/fund';

export default function OnrampModal({
  sessionToken,
  isLoading,
  error,
  onClose
}: {
  sessionToken: string | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 mt-10 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        // Close when clicking the backdrop (not the modal content)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
   

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-lg hover:text-red-400 transition-all hover:scale-110"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Always render FundCard, show loading/error overlay if needed */}
          <div className="relative h-full">
            {/* {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/80 z-10">
                <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-300 text-sm">Creating onramp session...</p>
              </div>
            )}
            {error && (
              <div className="absolute top-4 left-4 right-4 z-10 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )} */}
            <FundCard
              sessionToken={sessionToken || undefined}
              assetSymbol="ETH"
              country="US"
              currency="USD"
            />
          </div>
      </div>
    </div>
  );
}
