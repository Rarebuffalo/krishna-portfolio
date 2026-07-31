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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
                    theme = prefersLight ? 'light' : 'dark';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <CursorCat />
      </body>
    </html>
  );
}

