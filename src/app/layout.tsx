import type { Metadata } from "next";
import "./globals.css";
import { RecruiterModeProvider } from "@/context/RecruiterModeContext";

export const metadata: Metadata = {
  title: "KRISHNA OS // AI Systems Engineer",
  description: "The Operating System dashboard of Krishna, AI Systems Engineer. Focused on distributed backends, AI infrastructure, and production workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#050505] text-[#F5F5F7]">
        <RecruiterModeProvider>
          {children}
        </RecruiterModeProvider>
      </body>
    </html>
  );
}
