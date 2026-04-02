import "./globals.css";
import { Open_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "../components/ThemeProvider";
import { GoogleTagManager } from '@next/third-parties/google';
import { BackgroundGlow } from "../components/common/BackgroundGlow";
import { Toaster } from "sonner";
import { basicDetails } from "../data/basic";
import CustomCursor from "../components/common/CustomCursor";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: `${basicDetails.name} | ${basicDetails.role}`,
  description: "Explore the professional portfolio of Animesh Srivastava, a passionate Software Developer specializing in building high-performance cross-platform applications.",
  keywords: `${basicDetails.name}, portfolio, Software Developer, Mobile Developer, Web Developer, TypeScript, JavaScript, React, Next.js, React Native, Full Stack Engineer`,
  authors: [{ name: basicDetails.name }],
  creator: basicDetails.name,
  metadataBase: new URL(basicDetails.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${basicDetails.name} | ${basicDetails.role}`,
    description: "Explore the professional portfolio of Animesh Srivastava, a passionate Software Developer specializing in building high-performance cross-platform applications.",
    url: basicDetails.url,
    siteName: "Animesh Srivastava Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${basicDetails.url}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Animesh Srivastava Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${basicDetails.name} | ${basicDetails.role}`,
    description: "Explore the professional portfolio of Animesh Srivastava, a passionate Software Developer specializing in building high-performance cross-platform applications.",
    creator: "@animeshsrivastava246",
    images: [`${basicDetails.url}/og-image.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: basicDetails.name,
  url: basicDetails.url,
  jobTitle: basicDetails.role,
  sameAs: [
    basicDetails.socials.github,
    basicDetails.socials.linkedin,
    "https://hashnode.com/@animesh246"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon0.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>{`${basicDetails.name} | ${basicDetails.role}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="fBQ2jzQeowY2tp8cTpJDqNKiMOD9mcU6U6UocqXqnHc" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />

        {/* Vercel Analytics */}
        <Analytics />

        <BackgroundGlow />
        <CustomCursor />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container-12 min-h-screen flex flex-col md:pt-24">
            {children}
          </div>
        </ThemeProvider>
        <Toaster position="bottom-center" toastOptions={{ className: 'glass' }} />
      </body>
    </html>
  );
}