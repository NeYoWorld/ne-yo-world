import type { Metadata } from "next";

const title = "NeyoDivo Brazil | Ne-Yo Fan Community";

const description =
  "Discover NeyoDivo, a Brazilian Ne-Yo fan community featured on Ne-Yo World, connecting fans and celebrating Ne-Yo and his music.";

const url =
  "https://neyo-world-final.vercel.app/community/brazil/neyodivo";

const socialImage =
  "https://neyo-world-final.vercel.app/ne-yo-world-social.png";

export const metadata: Metadata = {
  title,

  description,

  alternates: {
    canonical: "/community/brazil/neyodivo",
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
        alt: "NeyoDivo Brazil — Ne-Yo Fan Community on Ne-Yo World",
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

export default function NeyoDivoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}