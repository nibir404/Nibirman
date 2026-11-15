import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Silkscreen, Pixelify_Sans, VT323, Orbitron } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--f-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--f-mono" });
const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--f-serif" });
const pixel = Silkscreen({ weight: ["400", "700"], subsets: ["latin"], variable: "--f-pixel" });
const pixel2 = Pixelify_Sans({ subsets: ["latin"], variable: "--f-pixel2" });
const vt = VT323({ weight: "400", subsets: ["latin"], variable: "--f-vt" });
const orbit = Orbitron({ subsets: ["latin"], variable: "--f-orbit" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Imtiaz Ahmed — AI Product Architect", template: "%s — Imtiaz Ahmed" },
  description: "Imtiaz Ahmed is an AI Product Architect working across product strategy, UX research, product design, intelligent systems, and digital product development.",
  openGraph: { title: "Imtiaz Ahmed — AI Product Architect", description: "Building What Comes Next.", images: ["/art/portrait-studio.jpg"] },
};

export const viewport: Viewport = { themeColor: "#E9E8E3", width: "device-width", initialScale: 1 };

// Pick the right light before first paint (no flash).
const boot = `(function(){try{var h=+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',hour12:false}).format(new Date())%24;var d=h>=17||h<5;var m=localStorage.getItem('ia:mode');if(m==='dark')d=true;if(m==='light')d=false;var r=document.documentElement;r.dataset.dark=d;if(d){r.style.setProperty('--bg','#0A0A0B');r.style.setProperty('--ink','#E9E8E3');}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-world="editorial" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${serif.variable} ${pixel.variable} ${pixel2.variable} ${vt.variable} ${orbit.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
