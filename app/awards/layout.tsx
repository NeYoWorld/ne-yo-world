import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ne-Yo Awards, Nominations & Achievements",

  description:
    "Explore Ne-Yo's awards, nominations and major career achievements, celebrating his impact across music and entertainment.",

  keywords: [
    "Ne-Yo awards",
    "Ne-Yo achievements",
    "Ne-Yo nominations",
    "Ne-Yo Grammy Awards",
    "Ne-Yo career",
    "Ne-Yo music awards",
    "Ne-Yo World",
  ],

  alternates: {
    canonical: "/awards",
  },

  openGraph: {
    title: "Ne-Yo Awards, Nominations & Achievements",
    description:
      "Explore Ne-Yo's awards, nominations and major career achievements on Ne-Yo World.",
    url: "/awards",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function AwardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}