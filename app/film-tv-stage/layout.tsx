import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Ne-Yo Film, TV & Stage",

  description:
    "Explore Ne-Yo's work across film, television and stage, including acting roles, screen appearances and theatrical projects.",

  keywords: [
    "Ne-Yo movies",
    "Ne-Yo films",
    "Ne-Yo TV",
    "Ne-Yo television",
    "Ne-Yo acting",
    "Ne-Yo actor",
    "Ne-Yo stage",
    "Ne-Yo World",
  ],

  alternates: {
    canonical: "/film-tv-stage",
  },

  openGraph: {
    title: "Ne-Yo Film, TV & Stage",
    description:
      "Explore Ne-Yo's work across film, television and stage on Ne-Yo World.",
    url: "/film-tv-stage",
    type: "website",
    siteName: "Ne-Yo World",
  },
};

export default function SectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}