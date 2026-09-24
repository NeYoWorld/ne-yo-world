import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://neyo-world-final.vercel.app";

  const routes = [
    "",
    "/about",
    "/awards",
    "/brazil",
    "/concert-map",
    "/countries",
    "/fan-memories",
    "/film-tv-stage",
    "/join",
    "/messages",
    "/music",
    "/ne-yo",
    "/portugal",
    "/usa",
    "/world-news",
    "/community/brazil/neyodivo",
    "/community/portugal/bestofneyo",
    "/community/usa/neyo-numinous",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}