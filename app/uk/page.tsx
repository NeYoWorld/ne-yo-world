"use client";

import CountryPage from "../components/CountryPage";
import {
  ukFanPages,
  ukMoments,
  ukTranslations,
} from "../data/uk";

export default function UKPage() {
  return (
    <CountryPage
      countryName="United Kingdom"
      countrySlug="uk"
      fanPages={ukFanPages}
      moments={ukMoments}
      translations={ukTranslations}
    />
  );
}