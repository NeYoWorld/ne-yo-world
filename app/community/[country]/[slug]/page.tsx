import { notFound } from "next/navigation";
import FanPageProfile from "../../../components/FanPageProfile";
import { supabase } from "../../../lib/supabase";

type Props = {
  params: Promise<{
    country: string;
    slug: string;
  }>;
};

export default async function DynamicFanPageProfile({
  params,
}: Props) {
  const { country, slug } = await params;

  const countrySlug = String(country ?? "")
    .trim()
    .toLowerCase();

  const fanPageSlug = String(slug ?? "")
    .trim()
    .toLowerCase();

  if (!countrySlug || !fanPageSlug) {
    notFound();
  }

  const { data, error } = await supabase
    .from("fan_pages")
    .select("slug, country")
    .eq("slug", fanPageSlug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return <FanPageProfile slug={fanPageSlug} />;
}