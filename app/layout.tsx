import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glasshaven Real Estate — Ultra-Luxury Architectural Living",
  description: "Bespoke glass & steel architectural sanctuaries, luxury estates, and private sky-penthouses in Quebec and Vancouver.",
  keywords: ["Luxury Real Estate", "Glass Architecture", "Modern Estates", "Penthouse", "Quebec Luxury Real Estate", "Architectural Sanctuary"],
  authors: [{ name: "Glasshaven Real Estate" }],
  openGraph: {
    title: "Glasshaven Real Estate — Ultra-Luxury Architectural Living",
    description: "Bespoke glass & steel architectural sanctuaries, luxury estates, and private sky-penthouses.",
    type: "website",
    siteName: "Glasshaven Real Estate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glasshaven Real Estate — Ultra-Luxury Architectural Living",
    description: "Bespoke glass & steel architectural sanctuaries, luxury estates, and private sky-penthouses.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="bg-neutral-950 text-neutral-100 antialiased font-sans selection:bg-amber-400 selection:text-neutral-950">
        {children}
      </body>
    </html>
  );
}

