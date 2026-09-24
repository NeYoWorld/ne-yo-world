import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ne-Yo Music, Albums & Songs",

  description:
    "Explore Ne-Yo's music, albums, songs and R&B career. Discover his discography and music highlights on Ne-Yo World.",

  keywords: [
    "Ne-Yo music",
    "Ne-Yo songs",
    "Ne-Yo albums",
    "Ne-Yo discography",
    "Ne-Yo R&B",
    "Ne-Yo singer",
    "Ne-Yo World",
  ],

  alternates: {
    canonical: "/music",
  },

  openGraph: {
    title: "Ne-Yo Music, Albums & Songs",
    description:
      "Explore Ne-Yo's music, albums, songs and R&B career on Ne-Yo World.",
    url: "/music",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}