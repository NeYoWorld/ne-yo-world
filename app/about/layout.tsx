import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ne-Yo World | Global Fan Project",
  description:
    "Learn about Ne-Yo World, a global fan project connecting Ne-Yo fans, communities and fan pages from countries around the world.",
  keywords: [
    "Ne-Yo World",
    "Ne-Yo fan project",
    "Ne-Yo fans",
    "Ne-Yo fan community",
    "Ne-Yo global community",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ne-Yo World | Global Fan Project",
    description:
      "Learn about Ne-Yo World, a global fan project connecting Ne-Yo fans, communities and fan pages from countries around the world.",
    url: "/about",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}