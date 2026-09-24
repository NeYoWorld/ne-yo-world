import type { Metadata } from "next";

const title = "Ne-Yo Portugal | Portuguese Fan Community";

const description =
  "Discover Ne-Yo Portugal on Ne-Yo World, connecting Portuguese fans, fan pages and communities celebrating Ne-Yo and his music.";

const url = "https://neyo-world-final.vercel.app/portugal";

const socialImage =
  "https://neyo-world-final.vercel.app/ne-yo-world-social.png";

export const metadata: Metadata = {
  title,

  description,

  alternates: {
    canonical: "/portugal",
  },

  openGraph: {
    title,
    description,
    url,
    siteName: "Ne-Yo World",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1672,
        height: 941,
        alt: "Ne-Yo Portugal — Portuguese Fan Community on Ne-Yo World",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function PortugalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}