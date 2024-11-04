import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pokedex.asarmtwo.aawssm.in"),
  title: "Aawssm Pokemon Pokedex",
  description: "A Aawssm Pokedex built with Next.js 14",
  openGraph: {
    title: "Aawssm Pokemon Pokedex",
    description: "A Aawssm Pokedex built with Next.js 14",
    url: "pokedex.asarmtwo.aawssm.in",
    siteName: "Aawssm Pokemon Pokedex",
    images: [
      {
        url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
        width: 135,
        height: 169,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aawssm Pokemon Pokedex",
    description: "A Aawssm Pokedex built with Next.js 14",
    images: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
