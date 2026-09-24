"use client";

import CountryPage from "../components/CountryPage";
import {
  brazilFanPages,
  brazilTranslations,
} from "../data/brazil";

export default function BrazilPage() {
  return (
    <CountryPage
      countryName="Brazil"
      countrySlug="brazil"
      fanPages={brazilFanPages}
      moments={[]}
      translations={brazilTranslations}
    />
  );
}