import type { Metadata } from "next";

const title = "Ne-Yo Brazil | Brazilian Fan Community";

const description =
  "Discover Ne-Yo Brazil on Ne-Yo World, connecting Brazilian fans, fan pages and communities celebrating Ne-Yo and his music.";

const url = "https://neyo-world-final.vercel.app/brazil";

const socialImage =
  "https://neyo-world-final.vercel.app/ne-yo-world-social.png";

export const metadata: Metadata = {
  title,

  description,

  alternates: {
    canonical: "/brazil",
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
        alt: "Ne-Yo Brazil — Brazilian Fan Community on Ne-Yo World",
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

export default function BrazilLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}