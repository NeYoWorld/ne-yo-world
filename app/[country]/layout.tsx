import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
};

function formatCountryName(country: string) {
  const names: Record<string, string> = {
    usa: "USA",
    uk: "UK",
    uae: "UAE",
  };

  return (
    names[country.toLowerCase()] ??
    country
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const countryName = formatCountryName(country);

  const title = `Ne-Yo ${countryName} | Fan Community`;

  const description = `Discover the Ne-Yo fan community in ${countryName} on Ne-Yo World, connecting fans, fan pages and communities celebrating Ne-Yo and his music.`;

  const url = `https://neyo-world-final.vercel.app/${country}`;

  const socialImage =
    "https://neyo-world-final.vercel.app/ne-yo-world-social.png";

  return {
    title,

    description,

    alternates: {
      canonical: `/${country}`,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Ne-Yo World",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1672,
          height: 941,
          alt: `Ne-Yo ${countryName} — Fan Community on Ne-Yo World`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function CountryLayout({ children }: Props) {
  return children;
}