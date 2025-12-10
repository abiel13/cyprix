import '@coinbase/onchainkit/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from '@/components/Provider'
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Crypix – Multi-chain Onramp",
  description: "A sleek, single-page multi-chain onramp experience powered by Coinbase."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
