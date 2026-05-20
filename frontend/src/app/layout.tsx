import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "react-hot-toast";

import Provider from "@/components/providers/theme-provider";

import { AuthProvider } from "@/context/AuthContext";
import { AnimatePresence } from "framer-motion";

export const metadata: Metadata = {
  title:
    "Unified Wealth Intelligence Platform",

  description:
    "Enterprise Wealth Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>

        <Provider>

          <AuthProvider>

            <Toaster position="top-right" />
              <AnimatePresence>
                {children}
              </AnimatePresence>
          </AuthProvider>

        </Provider>

      </body>
    </html>
  );
}