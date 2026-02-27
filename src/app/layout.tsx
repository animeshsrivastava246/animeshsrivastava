import "./globals.css";
import { Open_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "../components/ThemeProvider";
// import { CustomCursor } from "../components/common/CustomCursor";
import { BackgroundGlow } from "../components/common/BackgroundGlow";
import { Toaster } from "sonner";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Animesh Srivastava | Software Developer",
  description: "Portfolio of Animesh Srivastava – Software Developer. Explore projects, experience, and contact details.",
  keywords: "Animesh Srivastava, portfolio, Software Developer, Mobile Developer, TypeScript, JavaScript, software engineer",
  authors: [{ name: "Animesh Srivastava" }],
  creator: "Animesh Srivastava",
  metadataBase: new URL("https://animeshsrivastava.vercel.app"),
  openGraph: {
    title: "Animesh Srivastava | Software Developer",
    description: "Showcasing mobile applications, skills, and achievements of a modern software engineer focused on building impactful cross-platform experiences.",
    url: "https://animeshsrivastava.vercel.app",
    siteName: "Animesh Srivastava Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://animeshsrivastava.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Animesh Srivastava Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animesh Srivastava | Developer Portfolio",
    description: "Explore the developer portfolio of Animesh Srivastava, a passionate Software Developer.",
    creator: "@animeshsrivastava246",
    images: ["https://animeshsrivastava.vercel.app/og-image.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Animesh Srivastava | Software Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="F-3BijcciQLBcKa0qGz_zjFwsVwM_4D-_KDKrjBrdGE" />
      </head>
      <body>
        <BackgroundGlow />
        {/* <CustomCursor /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container-12 min-h-screen flex flex-col md:pt-24 pb-12">
            {children}
          </div>
        </ThemeProvider>
        <Toaster position="bottom-center" toastOptions={{ className: 'glass' }} />
        <Analytics />
      </body>
    </html>
  );
}