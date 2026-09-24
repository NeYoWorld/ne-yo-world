"use client";

import CountryPage from "../components/CountryPage";
import {
  portugalFanPages,
  portugalTranslations,
} from "../data/portugal";

export default function PortugalPage() {
  return (
    <CountryPage
      countryName="Portugal"
      countrySlug="portugal"
      fanPages={portugalFanPages}
      moments={[]}
      translations={portugalTranslations}
    />
  );
}