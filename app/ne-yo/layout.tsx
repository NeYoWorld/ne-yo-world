import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ne-Yo – Artist, Music & Career",

  description:
    "Discover Ne-Yo's story, music, career, achievements and legacy. Explore the artist behind the songs and his journey through R&B, songwriting and entertainment.",

  keywords: [
    "Ne-Yo",
    "Ne-Yo artist",
    "Ne-Yo singer",
    "Ne-Yo music",
    "Ne-Yo songs",
    "Ne-Yo career",
    "Ne-Yo biography",
    "Ne-Yo R&B",
    "Shaffer Chimere Smith",
    "Ne-Yo World",
  ],

  alternates: {
    canonical: "/ne-yo",
  },

  openGraph: {
    title: "Ne-Yo – Artist, Music & Career",
    description:
      "Discover Ne-Yo's story, music, career, achievements and legacy on Ne-Yo World.",
    url: "/ne-yo",
    type: "website",
    siteName: "Ne-Yo World",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ne-Yo – Artist, Music & Career",
    description:
      "Discover Ne-Yo's story, music, career, achievements and legacy on Ne-Yo World.",
  },
};

export default function NeYoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}