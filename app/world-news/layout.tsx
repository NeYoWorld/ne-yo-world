import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ne-Yo News & Updates",

  description:
    "Follow Ne-Yo news, updates and highlights from around the world. Discover the latest stories and updates featured on Ne-Yo World.",

  keywords: [
    "Ne-Yo news",
    "Ne-Yo latest news",
    "Ne-Yo updates",
    "Ne-Yo latest",
    "Ne-Yo world news",
    "Ne-Yo fans",
    "Ne-Yo World",
  ],

  alternates: {
    canonical: "/world-news",
  },

  openGraph: {
    title: "Ne-Yo News & Updates",
    description:
      "Follow Ne-Yo news, updates and highlights from around the world on Ne-Yo World.",
    url: "/world-news",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function WorldNewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}