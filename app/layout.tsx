import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "Ne-Yo World",
    template: "%s | Ne-Yo World",
  },

  description:
    "Ne-Yo World — One World, One Music, One Love. A global fan project celebrating Ne-Yo and his music.",

  metadataBase: new URL("https://neyo-world-final.vercel.app"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://neyo-world-final.vercel.app",
    siteName: "Ne-Yo World",
    title: "Ne-Yo World",
    description:
      "Ne-Yo World — One World, One Music, One Love. A global fan project celebrating Ne-Yo and his music.",
    images: [
      {
        url: "/ne-yo-world-social.png",
        width: 1672,
        height: 941,
        alt: "Ne-Yo World — One World. One Music. One Love.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ne-Yo World",
    description:
      "Ne-Yo World — One World, One Music, One Love. A global fan project celebrating Ne-Yo and his music.",
    images: ["/ne-yo-world-social.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://neyo-world-final.vercel.app/#website",
  url: "https://neyo-world-final.vercel.app/",
  name: "Ne-Yo World",
  description:
    "Ne-Yo World — One World, One Music, One Love. A global fan project celebrating Ne-Yo and his music.",
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />

        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}