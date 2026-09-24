import type { Metadata } from "next";

const title = "Join Ne-Yo World | Global Fan Community";

const description =
  "Join Ne-Yo World and submit your Ne-Yo fan page or community to become part of our global fan project.";

const url = "https://neyo-world-final.vercel.app/join";

const socialImage =
  "https://neyo-world-final.vercel.app/ne-yo-world-social.png";

export const metadata: Metadata = {
  title,

  description,

  alternates: {
    canonical: "/join",
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
        alt: "Join Ne-Yo World — Global Fan Community",
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

export default function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}