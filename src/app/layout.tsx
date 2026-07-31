import type { Metadata } from "next";
import "./globals.css";
import CursorCat from "@/components/CursorCat";

export const metadata: Metadata = {
  title: "Krishna — Systems & Backend Engineer",
  description: "Personal portfolio of Krishna, Systems & Backend Engineer. Building production‑grade B2B SaaS developer tools, compliance systems, and async infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
        <CursorCat />
      </body>
    </html>
  );
}

