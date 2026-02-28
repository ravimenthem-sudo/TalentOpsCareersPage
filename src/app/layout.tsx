import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalentOps Careers - Join Our Team",
  description: "Explore career opportunities at TalentOps and help us build the future of hiring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 bg-white">
          {children}
        </main>
        <footer className="bg-gray-900 py-12 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} TalentOps Inc. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
