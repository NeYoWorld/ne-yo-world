import type { Metadata } from "next";

const title = "@neyo_numinous USA | Ne-Yo Fan Community";

const description =
  "Discover @neyo_numinous, a USA Ne-Yo fan community featured on Ne-Yo World, connecting fans and celebrating Ne-Yo and his music.";

const url =
  "https://neyo-world-final.vercel.app/community/usa/neyo-numinous";

const socialImage =
  "https://neyo-world-final.vercel.app/ne-yo-world-social.png";

export const metadata: Metadata = {
  title,

  description,

  alternates: {
    canonical: "/community/usa/neyo-numinous",
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
        alt: "@neyo_numinous USA — Ne-Yo Fan Community on Ne-Yo World",
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

export default function NeyoNuminousLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}