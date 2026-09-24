import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ne-Yo Concert Map, Shows & Tour",

  description:
    "Explore Ne-Yo concerts, shows and tour locations around the world. Discover the global concert map on Ne-Yo World.",

  keywords: [
    "Ne-Yo concerts",
    "Ne-Yo tour",
    "Ne-Yo shows",
    "Ne-Yo concert map",
    "Ne-Yo live",
    "Ne-Yo tour dates",
    "Ne-Yo World",
  ],

  alternates: {
    canonical: "/concert-map",
  },

  openGraph: {
    title: "Ne-Yo Concert Map, Shows & Tour",
    description:
      "Explore Ne-Yo concerts, shows and tour locations around the world on Ne-Yo World.",
    url: "/concert-map",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function ConcertMapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}