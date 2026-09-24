import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ne-Yo Fan Memories & Stories",
  description:
    "Discover memories and stories shared by Ne-Yo fans from around the world and celebrate special moments connected to his music and career.",
  keywords: [
    "Ne-Yo fan memories",
    "Ne-Yo fan stories",
    "Ne-Yo fans",
    "Ne-Yo memories",
    "Ne-Yo fan community",
    "Ne-Yo World",
  ],
  alternates: {
    canonical: "/fan-memories",
  },
  openGraph: {
    title: "Ne-Yo Fan Memories & Stories",
    description:
      "Discover memories and stories shared by Ne-Yo fans from around the world and celebrate special moments connected to his music and career.",
    url: "/fan-memories",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function FanMemoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}