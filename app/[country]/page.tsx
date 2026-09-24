import { notFound } from "next/navigation";
import CountryPage from "../components/CountryPage";
import { supabase } from "../lib/supabase";

type Props = {
  params: Promise<{ country: string }>;
};

export default async function DynamicCountryPage({ params }: Props) {
  const { country } = await params;
  const countrySlug = String(country ?? "").toLowerCase();

  if (!countrySlug) {
    notFound();
  }

  const { data, error } = await supabase
    .from("countries")
    .select("name, slug")
    .eq("slug", countrySlug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <CountryPage
      countryName={data.name}
      countrySlug={data.slug}
    />
  );
}