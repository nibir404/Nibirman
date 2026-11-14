import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import { palettes } from "@/lib/time";
import "./globals.css";

const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--nf-serif" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--nf-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--nf-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Imtiaz Ahmed — The Agentic Renaissance", template: "%s · Nibirman" },
  description: "Agentic Product Manager in Dhaka. I turn AI agents into products people trust. A portfolio lit by the real Dhaka clock.",
  openGraph: {
    title: "The Agentic Renaissance — Imtiaz Ahmed",
    description: "A career told as a commission of paintings, lit by the real time in Dhaka.",
    images: ["/paintings/philosopher.jpg"],
  },
  alternates: { types: { "application/rss+xml": "/notebooks/rss.xml" } },
};

export const viewport: Viewport = { themeColor: "#f8f3e7" };

// Runs before first paint: pick the act from the real Dhaka clock so there is no day→night flash.
const themeBoot = `(function(){try{var P=${JSON.stringify(
  Object.fromEntries(Object.entries(palettes).map(([k, p]) => [k, [p.paper, p.ink, p.accent, p.muted, p.card]])),
)};var q=new URLSearchParams(location.search).get('time');var h=+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',hour12:false}).format(new Date())%24;var m=+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',minute:'2-digit'}).format(new Date());var x=h+m/60;var ph=P[q]?q:(x>=5&&x<8?'dawn':x>=8&&x<16.5?'day':x>=16.5&&x<19?'dusk':'night');var c=P[ph],r=document.documentElement;r.dataset.phase=ph;['--paper','--ink','--accent','--muted','--card'].forEach(function(k,i){r.style.setProperty(k,c[i])});}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-phase="day" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
