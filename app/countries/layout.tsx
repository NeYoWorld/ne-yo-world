import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ne-Yo Global Community & Countries",

  description:
    "Explore the Ne-Yo World global community. Discover countries, fan communities and connections bringing Ne-Yo fans together around the world.",

  keywords: [
    "Ne-Yo",
    "Ne-Yo fans",
    "Ne-Yo fan community",
    "Ne-Yo countries",
    "Ne-Yo worldwide",
    "Ne-Yo global community",
    "Ne-Yo World",
  ],

  alternates: {
    canonical: "/countries",
  },

  openGraph: {
    title: "Ne-Yo Global Community & Countries",
    description:
      "Explore countries and fan communities connected through Ne-Yo World.",
    url: "/countries",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function CountriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}