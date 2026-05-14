import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { Nav } from "@/components/layout/Nav";
import { Analytics } from "@/components/layout/Analytics";
import { ResourceHints } from "@/components/layout/ResourceHints";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const interSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const ccm19ScriptId = "ccm19";
const ccm19ScriptSrc =
  "https://cloud.ccm19.de/app.js?apiKey=eefc8fecf37d0d4d42423ebb8d2ff0c38ee07663469480b8&domain=69c4664129605f52500e0082";
const clarityProjectId = "wmex88aqgx";
const clarityScript = `
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${clarityProjectId}");
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Webdesign Berlin",
    "Website erstellen lassen",
    "Frontend-Entwicklung",
    "Website Relaunch",
    "Technisches SEO",
  ],
  authors: [{ name: "Arthur Marshall" }],
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${interSans.variable} ${interDisplay.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="microsoft-clarity"
          dangerouslySetInnerHTML={{ __html: clarityScript }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ResourceHints />
        <Script
          id={ccm19ScriptId}
          src={ccm19ScriptSrc}
          strategy="beforeInteractive"
          referrerPolicy="origin"
        />
        <Analytics />
        <HashScrollRestorer />
        <div className="relative flex min-h-screen flex-col">
          <Nav />
          <div className="flex-1 pt-20 md:pt-24">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
