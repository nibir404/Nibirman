import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--nf-display" });
const sans = Inter({ subsets: ["latin"], variable: "--nf-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--nf-mono" });

export const metadata: Metadata = {
  title: "Imtiaz Ahmed — The Agentic PM, Vol. 1",
  description:
    "Agentic Product Manager in Dhaka. I turn AI agents into products people trust. 6+ years across GovTech, AI, EdTech, health and transit.",
  openGraph: {
    title: "The Agentic PM — Vol. 1",
    description: "An anime career story by Imtiaz Ahmed, Agentic Product Manager.",
    images: ["/anime/hero-sky.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#0B0B12" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
