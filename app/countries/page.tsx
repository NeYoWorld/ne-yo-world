"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import SiteHeader from "../components/SiteHeader";
import {
  useLanguage,
  type Language,
} from "../context/LanguageContext";
import { supabase } from "../lib/supabase";

type Country = {
  id: string;
  name: string;
  slug: string;
  code: string;
};

type FanPage = {
  country: string;
  username: string;
};

const COMMUNITY_SLUGS = [
  "portugal",
  "brazil",
  "usa",
];

const manualFanPages: Record<string, string[]> = {
  portugal: ["@bestofneyo_"],
  brazil: ["@neyodivooficial"],
  usa: [],
};

const localizedCountryNames: Record<Language, Record<string, string>> = {
  EN: { portugal: "Portugal", brazil: "Brazil", usa: "USA" },
  PT: { portugal: "Portugal", brazil: "Brasil", usa: "EUA" },
  ES: { portugal: "Portugal", brazil: "Brasil", usa: "EE. UU." },
  FR: { portugal: "Portugal", brazil: "Brésil", usa: "États-Unis" },
  DE: { portugal: "Portugal", brazil: "Brasilien", usa: "USA" },
  IT: { portugal: "Portogallo", brazil: "Brasile", usa: "Stati Uniti" },
  JA: { portugal: "ポルトガル", brazil: "ブラジル", usa: "アメリカ合衆国" },
};

const translations: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    intro: string;
    connectedLabel: string;
    fanPage: string;
    fanPages: string;
    noFanPages: string;
    explore: string;
    joinTitle: string;
    joinText: string;
    joinButton: string;
    loading: string;
    oneWorld: string;
  }
> = {
  EN: {
    eyebrow: "GLOBAL COMMUNITY",
    title: "Explore the Community",
    intro:
      "Explore the countries currently represented in the Ne-Yo World community. Each country has its own story, memories and space for participating fan pages.",
    connectedLabel: "CONNECTED COUNTRIES",
    fanPage: "Pagina fan",
    fanPages: "Fan Pages",
    noFanPages: "No fan pages yet",
    explore: "Explore Country",
    joinTitle: "More countries can join the community",
    joinText:
      "As new fan pages join Ne-Yo World, more countries can become part of the Global Community.",
    joinButton: "Join the Project",
    loading: "Loading community...",
    oneWorld: "ONE WORLD",
  },
  PT: {
    eyebrow: "COMUNIDADE GLOBAL",
    title: "Explorar a Comunidade",
    intro:
      "Explora os países atualmente representados na comunidade Ne-Yo World. Cada país tem a sua própria história, memórias e espaço para páginas de fãs participantes.",
    connectedLabel: "PAÍSES LIGADOS",
    fanPage: "Página de Fãs",
    fanPages: "Páginas de Fãs",
    noFanPages: "Ainda sem páginas de fãs",
    explore: "Explorar País",
    joinTitle: "Mais países podem juntar-se à comunidade",
    joinText:
      "À medida que novas páginas de fãs entram no Ne-Yo World, mais países podem passar a fazer parte da Comunidade Global.",
    joinButton: "Juntar-se ao Projeto",
    loading: "A carregar comunidade...",
    oneWorld: "UM MUNDO",
  },
  ES: {
    eyebrow: "COMUNIDAD GLOBAL",
    title: "Explorar la Comunidad",
    intro:
      "Explora los países actualmente representados en la comunidad Ne-Yo World. Cada país tiene su propia historia, recuerdos y espacio para las páginas de fans participantes.",
    connectedLabel: "PAÍSES CONECTADOS",
    fanPage: "Página de Fans",
    fanPages: "Páginas de Fans",
    noFanPages: "Aún no hay páginas de fans",
    explore: "Explorar País",
    joinTitle: "Más países pueden unirse a la comunidad",
    joinText:
      "A medida que nuevas páginas de fans se unan a Ne-Yo World, más países podrán formar parte de la Comunidad Global.",
    joinButton: "Únete al Proyecto",
    loading: "Cargando comunidad...",
    oneWorld: "UN MUNDO",
  },
  FR: {
    eyebrow: "COMMUNAUTÉ MONDIALE",
    title: "Explorer la Communauté",
    intro:
      "Découvrez les pays actuellement représentés dans la communauté Ne-Yo World. Chaque pays possède sa propre histoire, ses souvenirs et un espace pour les pages de fans participantes.",
    connectedLabel: "PAYS CONNECTÉS",
    fanPage: "Page de Fans",
    fanPages: "Pages de Fans",
    noFanPages: "Aucune page de fans pour le moment",
    explore: "Explorer le Pays",
    joinTitle: "D'autres pays peuvent rejoindre la communauté",
    joinText:
      "À mesure que de nouvelles pages de fans rejoignent Ne-Yo World, d'autres pays peuvent intégrer la Communauté Mondiale.",
    joinButton: "Rejoindre le Projet",
    loading: "Chargement de la communauté...",
    oneWorld: "UN MONDE",
  },
  DE: {
    eyebrow: "GLOBALE GEMEINSCHAFT",
    title: "Die Gemeinschaft entdecken",
    intro:
      "Entdecke die Länder, die derzeit in der Ne-Yo World Gemeinschaft vertreten sind. Jedes Land hat seine eigene Geschichte, Erinnerungen und Raum für teilnehmende Fanseiten.",
    connectedLabel: "VERBUNDENE LÄNDER",
    fanPage: "Fanseite",
    fanPages: "Fanseiten",
    noFanPages: "Noch keine Fanseiten",
    explore: "Land entdecken",
    joinTitle: "Weitere Länder können Teil der Gemeinschaft werden",
    joinText:
      "Wenn neue Fanseiten zu Ne-Yo World kommen, können weitere Länder Teil der Globalen Gemeinschaft werden.",
    joinButton: "Dem Projekt beitreten",
    loading: "Gemeinschaft wird geladen...",
    oneWorld: "EINE WELT",
  },
  IT: {
    eyebrow: "COMUNITÀ GLOBALE",
    title: "Esplora la Comunità",
    intro:
      "Esplora i paesi attualmente rappresentati nella comunità di Ne-Yo World. Ogni paese ha la propria storia, i propri ricordi e uno spazio per le fan page partecipanti.",
    connectedLabel: "PAESI CONNESSI",
    fanPage: "Fan Page",
    fanPages: "Pagine fan",
    noFanPages: "Nessuna fan page per ora",
    explore: "Esplora il Paese",
    joinTitle: "Altri paesi possono entrare nella comunità",
    joinText:
      "Con l'ingresso di nuove fan page in Ne-Yo World, altri paesi potranno entrare a far parte della Comunità Globale.",
    joinButton: "Unisciti al Progetto",
    loading: "Caricamento comunità...",
    oneWorld: "UN MONDO",
  },
  JA: {
    eyebrow: "グローバルコミュニティ",
    title: "コミュニティを探索",
    intro:
      "現在Ne-Yo Worldのコミュニティに参加している国々を紹介します。それぞれの国に、独自のストーリー、思い出、参加するファンページのためのスペースがあります。",
    connectedLabel: "つながっている国",
    fanPage: "ファンページ",
    fanPages: "ファンページ",
    noFanPages: "ファンページはまだありません",
    explore: "国を見る",
    joinTitle: "これからさらに多くの国が参加できます",
    joinText:
      "新しいファンページがNe-Yo Worldに参加することで、さらに多くの国がグローバルコミュニティの一員になれます。",
    joinButton: "プロジェクトに参加",
    loading: "コミュニティを読み込み中...",
    oneWorld: "ひとつの世界",
  },
};

function normalizeUsername(username: string) {
  return username
    .trim()
    .toLowerCase()
    .replace(/^@/, "");
}

export default function CountriesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [countries, setCountries] =
    useState<Country[]>([]);
  const [fanPages, setFanPages] =
    useState<FanPage[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    async function loadCommunity() {
      setLoading(true);

      const countriesResult = await supabase
        .from("countries")
        .select("id, name, slug, code")
        .eq("is_active", true)
        .in("slug", COMMUNITY_SLUGS);

      if (!active) return;

      if (countriesResult.error) {
        setCountries([]);
      } else {
        const order = new Map(
          COMMUNITY_SLUGS.map((slug, index) => [
            slug,
            index,
          ])
        );

        setCountries(
          [...(countriesResult.data ?? [])].sort(
            (a, b) =>
              (order.get(a.slug) ?? 999) -
              (order.get(b.slug) ?? 999)
          )
        );
      }

      // Countries can render immediately. Fan-page data is supplementary
      // and loads afterwards so it cannot delay the main community cards.
      setLoading(false);

      const fanPagesResult = await supabase
        .from("fan_pages")
        .select("country, username")
        .eq("is_active", true);

      if (!active) return;

      if (!fanPagesResult.error) {
        setFanPages(fanPagesResult.data ?? []);
      }
    }

    loadCommunity();

    return () => {
      active = false;
    };
  }, []);

  const communityCountries =
    useMemo(() => {
      return countries.map((country) => {
        const manual =
          manualFanPages[
            country.slug
          ] ?? [];

        const manualSet =
          new Set(
            manual.map(
              normalizeUsername
            )
          );

        const dynamicCount =
          fanPages.filter((page) => {
            const sameCountry =
              page.country
                ?.trim()
                .toLowerCase() ===
              country.name
                .trim()
                .toLowerCase();

            const alreadyManual =
              manualSet.has(
                normalizeUsername(
                  page.username ?? ""
                )
              );

            return (
              sameCountry &&
              !alreadyManual
            );
          }).length;

        return {
          ...country,
          fanPageCount:
            manual.length +
            dynamicCount,
        };
      });
    }, [countries, fanPages]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-12%] top-[8%] h-[520px] w-[520px] rounded-full bg-[#D51C24]/5 blur-[180px]" />
        <div className="absolute right-[-8%] top-[12%] h-[620px] w-[620px] rounded-full bg-[#D4AF37]/5 blur-[200px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.86)_100%)]" />
      </div>

      <SiteHeader />

      <section className="relative z-10 border-b border-[#D4AF37]/10 px-6 pb-10 pt-10 lg:px-10 lg:pb-12 lg:pt-12">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_300px]">
            <div className="max-w-[850px]">
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-[#D51C24]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                  {t.eyebrow}
                </p>
              </div>

              <h1 className="mt-5 max-w-[850px] text-5xl font-black tracking-[-0.04em] md:text-6xl">
                {t.title}
              </h1>

              <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-white/55">
                {t.intro}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#08090A] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                {t.connectedLabel}
              </p>
              <p className="mt-2 text-3xl font-black text-[#D4AF37]">
                {communityCountries.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1450px]">
          {loading ? (
            <div className="text-sm text-white/45">
              {t.loading}
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-3">
              {communityCountries.map(
                (country) => (
                  <Link
                    key={country.id}
                    href={`/${country.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#08090A] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/55"
                  >
                    <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[#D51C24]/5 blur-[80px]" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                            {country.code}
                          </p>

                          <h2 className="mt-3 text-2xl font-black tracking-[-0.03em]">
                            {localizedCountryNames[language][country.slug] ?? country.name}
                          </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/25 text-[#D51C24] transition group-hover:border-[#D4AF37]/60">
                          →
                        </div>
                      </div>

                      <div className="my-6 h-px bg-white/8" />

                      {country.fanPageCount ===
                      0 ? (
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                          {t.noFanPages}
                        </p>
                      ) : (
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                          <span className="font-bold text-[#D4AF37]">
                            {
                              country.fanPageCount
                            }
                          </span>{" "}
                          {country.fanPageCount ===
                          1
                            ? t.fanPage
                            : t.fanPages}
                        </p>
                      )}

                      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D51C24]">
                        {t.explore}
                        <span className="ml-4 text-[#D4AF37]">
                          →
                        </span>
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </section>

      <section className="relative z-10 px-6 pb-16 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="rounded-[24px] border border-[#D4AF37]/20 bg-[#08090A] p-6 md:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
              {t.oneWorld}
            </p>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                  {t.joinTitle}
                </h2>

                <p className="mt-5 max-w-[720px] text-sm leading-8 text-white/50">
                  {t.joinText}
                </p>
              </div>

              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-5 rounded-xl border border-[#D51C24]/55 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
              >
                {t.joinButton}
                <span className="text-[#D51C24]">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
