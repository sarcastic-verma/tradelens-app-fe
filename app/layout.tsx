import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import { FloatingParticles } from "@/components/landing/floating-particles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeLens - Make Trading Trustable",
  description:
    "Follow verified creators, track their trades, and make informed investment decisions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "dark";

  return (
    <html lang="en" className={theme === "light" ? "light" : ""}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialTheme={theme}>
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <div className="absolute inset-0 hero-glow opacity-60" />
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
            <FloatingParticles />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
