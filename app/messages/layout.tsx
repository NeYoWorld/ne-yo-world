import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Messages for Ne-Yo | Global Fan Messages",
  description:
    "Read messages from Ne-Yo fans around the world and join the global Ne-Yo World community by sharing your own message.",
  keywords: [
    "Ne-Yo messages",
    "messages for Ne-Yo",
    "Ne-Yo fans",
    "Ne-Yo fan messages",
    "Ne-Yo World",
    "Ne-Yo community",
  ],
  alternates: {
    canonical: "/messages",
  },
  openGraph: {
    title: "Messages for Ne-Yo | Global Fan Messages",
    description:
      "Read messages from Ne-Yo fans around the world and share your own message with the global Ne-Yo World community.",
    url: "/messages",
    type: "website",
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