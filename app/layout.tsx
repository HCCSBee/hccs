import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HCCS — Human Capital Consulting & Services",
  description:
    "HCCS provides end-to-end HR consulting services in Singapore — from EP/PR applications and HR compliance to AI-powered HR solutions. MOM-registered, licensed EA agency with 25+ years experience.",
  openGraph: {
    title: "HCCS — Human Capital Consulting & Services",
    description:
      "Start–Staff–Scale Your SG Business. End-to-end HR consulting, immigration, and AI-driven HR solutions for Singapore businesses.",
    url: "https://hccs.sg",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full flex flex-col bg-white">
        <LangProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
