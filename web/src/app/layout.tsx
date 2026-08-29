import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CursorAura } from "@/components/CursorAura";
import { MobileAtmosphere } from "@/components/MobileAtmosphere";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { getOrganizationSchema, getWebSiteSchema, getSoftwareApplicationSchema } from "@/lib/schema";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Mahout — Five elements. One North Star.",
  description:
    "Mahout helps you turn future vision into daily direction by connecting goals, actions, moods, reflection, memory, and North Star guidance.",
  openGraph: {
    title: "Mahout — Five elements. One North Star.",
    description:
      "A calm AI life operating system for goals, actions, emotions, reflection, memory, and future-self guidance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const webSchema = getWebSiteSchema();
  const appSchema = getSoftwareApplicationSchema();

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgSchema, webSchema, appSchema]),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <CursorAura />
        <MobileAtmosphere />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}


