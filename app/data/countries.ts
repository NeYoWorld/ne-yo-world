export type CountryDestination = {
  slug: string;
  name: string;
  lat: number;
  lon: number;
  href: string;
  enabled: boolean;
};

export const countryDestinations: CountryDestination[] = [
  {
    slug: "portugal",
    name: "Portugal",
    lat: 39.5,
    lon: -8.0,
    href: "/portugal",
    enabled: true,
  },

  {
    slug: "brazil",
    name: "Brazil",
    lat: -14.2,
    lon: -51.9,
    href: "/brazil",
    enabled: true,
  },

  {
    slug: "usa",
    name: "USA",
    lat: 39.8333,
    lon: -98.5833,
    href: "/usa",
    enabled: true,
  },

  /*
    FUTUROS PAÍSES

    Quando um novo país estiver pronto para aparecer no site,
    basta acrescentá-lo aqui e colocar enabled: true.

    Exemplo:

    {
      slug: "united-kingdom",
      name: "United Kingdom",
      lat: 54.5,
      lon: -3.0,
      href: "/united-kingdom",
      enabled: true,
    },

    {
      slug: "brazil",
      name: "Brazil",
      lat: -14.2,
      lon: -51.9,
      href: "/brazil",
      enabled: true,
    },
  */
];

export const activeCountryDestinations =
  countryDestinations.filter(
    (country) => country.enabled
  );