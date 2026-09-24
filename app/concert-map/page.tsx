"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import SiteHeader from "../components/SiteHeader";
import { concertMapTranslations } from "../components/ConcertMapTranslations";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";


type Country = {
  id: string;
  name: string;
  slug: string;
  code: string;
};


type FeaturedLinkType =
  | "video"
  | "coverage"
  | "event"
  | null;


type Concert = {
  id: string;
  country_id: string;
  event_date: string;
  city: string;
  region: string | null;
  venue: string | null;
  tour_name: string | null;
  event_name: string | null;
  event_type: string;
  latitude: number | null;
  longitude: number | null;

  /*
   * Fonte usada pelo arquivo para documentação/verificação.
   * Esta fonte não é mostrada automaticamente ao visitante.
   */
  source_url: string | null;

  /*
   * Conteúdo público selecionado porque realmente
   * vale a pena abrir.
   */
  featured_url: string | null;

  featured_link_type: FeaturedLinkType;

  is_verified: boolean;
  is_published: boolean;

  countries?: {
    name?: string;
    slug?: string;
    code?: string;
  } | null;
};


function ConcertMapLoading() {
  const { language } = useLanguage();
  const t = concertMapTranslations[language];

  return (
    <div className="flex min-h-[620px] items-center justify-center rounded-[24px] border border-[#D4AF37]/15 bg-[#08090A]">
      <p className="text-sm uppercase tracking-[0.18em] text-white/35">
        {t.load}
      </p>
    </div>
  );
}


const ConcertMapClient = dynamic(
  () => import("../components/ConcertMapClient"),
  {
    ssr: false,
    loading: () => <ConcertMapLoading />,
  }
);


function formatEventType(type: string, labels: Record<string, string>) {
  return labels[type] ?? type.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}


export default function ConcertMapPage() {
  const { language } = useLanguage();
  const t = concertMapTranslations[language];
  const [concerts, setConcerts] =
    useState<Concert[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [selectedYear, setSelectedYear] =
    useState("all");

  const [selectedCountry, setSelectedCountry] =
    useState("all");

  const [selectedType, setSelectedType] =
    useState("all");


  /* =========================================================
     LOAD CONCERT DATA
  ========================================================== */

  useEffect(() => {
    let active = true;


    async function loadConcerts() {
      setLoading(true);
      setErrorMessage("");


      /* =====================================================
         1. LOAD PUBLISHED + VERIFIED CONCERTS
      ====================================================== */

      const {
        data: concertData,
        error: concertError,
      } = await supabase
        .from("concerts")
        .select(`
          id,
          country_id,
          event_date,
          city,
          region,
          venue,
          tour_name,
          event_name,
          event_type,
          latitude,
          longitude,
          source_url,
          featured_url,
          featured_link_type,
          is_verified,
          is_published
        `)
        .eq("is_published", true)
        .eq("is_verified", true)
        .order("event_date", {
          ascending: true,
        });


      if (!active) {
        return;
      }


      if (concertError) {
        setErrorMessage(
          concertError.message ||
            t.load
        );

        setConcerts([]);
        setLoading(false);

        return;
      }


      /* =====================================================
         2. LOAD COUNTRIES
      ====================================================== */

      const {
        data: countryData,
        error: countryError,
      } = await supabase
        .from("countries")
        .select("id, name, slug, code")
        .eq("is_active", true);


      if (!active) {
        return;
      }


      if (countryError) {
        setErrorMessage(
          countryError.message ||
            t.load
        );

        setConcerts([]);
        setLoading(false);

        return;
      }


      /* =====================================================
         3. JOIN COUNTRIES + CONCERTS
      ====================================================== */

      const countryMap =
        new Map<string, Country>();


      (
        (countryData ?? []) as Country[]
      ).forEach((country) => {
        countryMap.set(
          country.id,
          country
        );
      });


      const joinedConcerts = (
        concertData ?? []
      ).map((concert) => {
        const country =
          countryMap.get(
            concert.country_id
          );

        return {
          ...concert,

          countries: country
            ? {
                name: country.name,
                slug: country.slug,
                code: country.code,
              }
            : null,
        };
      }) as Concert[];


      setConcerts(joinedConcerts);
      setLoading(false);
    }


    loadConcerts();


    return () => {
      active = false;
    };
  }, [t.load]);


  /* =========================================================
     AVAILABLE YEARS
  ========================================================== */

  const availableYears =
    useMemo(() => {
      const years =
        new Set(
          concerts.map(
            (concert) =>
              concert.event_date.slice(
                0,
                4
              )
          )
        );

      return Array.from(
        years
      ).sort(
        (a, b) =>
          Number(b) -
          Number(a)
      );
    }, [concerts]);


  /* =========================================================
     AVAILABLE COUNTRIES
  ========================================================== */

  const availableCountries =
    useMemo(() => {
      const countryMap =
        new Map<string, string>();


      concerts.forEach(
        (concert) => {
          const slug =
            concert.countries?.slug;

          const name =
            concert.countries?.name;


          if (slug && name) {
            countryMap.set(
              slug,
              name
            );
          }
        }
      );


      return Array.from(
        countryMap.entries()
      )
        .map(
          ([slug, name]) => ({
            slug,
            name,
          })
        )
        .sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
    }, [concerts]);


  /* =========================================================
     AVAILABLE EVENT TYPES
  ========================================================== */

  const availableTypes =
    useMemo(() => {
      const types =
        new Set(
          concerts
            .map(
              (concert) =>
                concert.event_type
            )
            .filter(Boolean)
        );

      return Array.from(
        types
      ).sort();
    }, [concerts]);


  /* =========================================================
     FILTERED CONCERTS
  ========================================================== */

  const filteredConcerts =
    useMemo(() => {
      return concerts.filter(
        (concert) => {
          const year =
            concert.event_date.slice(
              0,
              4
            );


          const matchesYear =
            selectedYear === "all" ||
            year === selectedYear;


          const matchesCountry =
            selectedCountry === "all" ||
            concert.countries?.slug ===
              selectedCountry;


          const matchesType =
            selectedType === "all" ||
            concert.event_type ===
              selectedType;


          return (
            matchesYear &&
            matchesCountry &&
            matchesType
          );
        }
      );
    }, [
      concerts,
      selectedYear,
      selectedCountry,
      selectedType,
    ]);


  /* =========================================================
     FILTERED STATISTICS
  ========================================================== */

  const countryCount =
    useMemo(() => {
      const countries =
        new Set(
          filteredConcerts
            .map(
              (concert) =>
                concert
                  .countries
                  ?.name
            )
            .filter(Boolean)
        );

      return countries.size;
    }, [filteredConcerts]);


  const cityCount =
    useMemo(() => {
      const cities =
        new Set(
          filteredConcerts.map(
            (concert) => {
              const country =
                concert
                  .countries
                  ?.name ??
                "";

              return `${concert.city}|${country}`;
            }
          )
        );

      return cities.size;
    }, [filteredConcerts]);


  const venueCount =
    useMemo(() => {
      const venues =
        new Set(
          filteredConcerts
            .map(
              (concert) =>
                concert.venue
            )
            .filter(Boolean)
        );

      return venues.size;
    }, [filteredConcerts]);


  /* =========================================================
     ACTIVE FILTERS
  ========================================================== */

  const hasActiveFilters =
    selectedYear !== "all" ||
    selectedCountry !== "all" ||
    selectedType !== "all";


  function resetFilters() {
    setSelectedYear("all");
    setSelectedCountry("all");
    setSelectedType("all");
  }


  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">


      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute left-[-15%] top-[10%] h-[520px] w-[520px] rounded-full bg-[#D51C24]/5 blur-[180px]" />

        <div className="absolute right-[-10%] top-[18%] h-[700px] w-[700px] rounded-full bg-[#D4AF37]/5 blur-[210px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.86)_100%)]" />

      </div>


      {/* =====================================================
          HEADER
      ====================================================== */}

      <SiteHeader />


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 px-6 pb-8 pt-12 lg:px-10 lg:pt-16">

        <div className="mx-auto max-w-[1500px]">

          <div className="max-w-[850px]">

            <div className="flex items-center gap-4">

              <div className="h-px w-10 bg-[#D51C24]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                {t.heroEyebrow}
              </p>

            </div>


            <h1 className="mt-7 text-5xl font-black uppercase tracking-[-0.045em] md:text-6xl">
              {t.title}
            </h1>


            <p className="mt-7 max-w-[760px] text-[15px] leading-7 text-white/60 md:text-[16px]">

              {t.heroText}

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          ARCHIVE NOTICE
      ====================================================== */}

      <section className="relative z-10 px-6 pb-8 lg:px-10">

        <div className="mx-auto max-w-[1500px]">

          <div className="relative overflow-hidden rounded-[24px] border border-[#D4AF37]/15 bg-[#08090A]/90 p-6 md:p-8">


            <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-[220px] w-[220px] rounded-full bg-[#D4AF37]/5 blur-[80px]" />


            <div className="relative flex flex-col gap-5 md:flex-row md:items-start">


              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5">

                <span className="text-lg font-semibold text-[#D4AF37]">
                  i
                </span>

              </div>


              <div className="max-w-[1050px]">

                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                  {t.archiveTitle}
                </p>


                <p className="mt-3 text-[14px] leading-7 text-white/55 md:text-[15px]">

                  {t.archiveText}

                </p>


                <div className="mt-4 flex items-center gap-3">

                  <div className="h-px w-7 bg-[#D51C24]" />

                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                    {t.archiveNote}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="relative z-10 px-6 pb-8 lg:px-10">

        <div className="mx-auto grid max-w-[1500px] gap-3 sm:grid-cols-2 lg:grid-cols-4">


          {/* DOCUMENTED SHOWS */}

          <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#08090A]/90 p-6">

            <p className="text-[9px] uppercase tracking-[0.24em] text-white/30">
              {t.shows}
            </p>

            <p className="mt-2 text-3xl font-black text-[#D4AF37]">
              {filteredConcerts.length}
            </p>

          </div>


          {/* COUNTRIES */}

          <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#08090A]/90 p-6">

            <p className="text-[9px] uppercase tracking-[0.24em] text-white/30">
              {t.countries}
            </p>

            <p className="mt-2 text-3xl font-black text-[#D4AF37]">
              {countryCount}
            </p>

          </div>


          {/* CITIES */}

          <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#08090A]/90 p-6">

            <p className="text-[9px] uppercase tracking-[0.24em] text-white/30">
              {t.cities}
            </p>

            <p className="mt-2 text-3xl font-black text-[#D4AF37]">
              {cityCount}
            </p>

          </div>


          {/* VENUES */}

          <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#08090A]/90 p-6">

            <p className="text-[9px] uppercase tracking-[0.24em] text-white/30">
              {t.venues}
            </p>

            <p className="mt-2 text-3xl font-black text-[#D4AF37]">
              {venueCount}
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAP AREA
      ====================================================== */}

      <section className="relative z-10 px-6 pb-24 lg:px-10">

        <div className="mx-auto max-w-[1500px]">


          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="mb-5 rounded-2xl border border-[#D4AF37]/15 bg-[#08090A]/90 p-6">


            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">


              <div>

                <p className="text-[9px] uppercase tracking-[0.26em] text-[#D51C24]">
                  {t.filters}
                </p>


                <p className="mt-2 text-sm text-white/45">

                  {t.showing}{" "}

                  <span className="font-semibold text-[#D4AF37]">
                    {filteredConcerts.length}
                  </span>{" "}

                  {t.of}{" "}

                  <span className="text-white/70">
                    {concerts.length}
                  </span>{" "}

                  {t.performances}

                </p>

              </div>


              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">


                {/* YEAR */}

                <select
                  value={selectedYear}
                  onChange={(event) =>
                    setSelectedYear(
                      event.target.value
                    )
                  }
                  className="min-w-[165px] rounded-xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-sm text-white outline-none transition hover:border-[#D4AF37]/45 focus:border-[#D4AF37]"
                >

                  <option value="all">
                    {t.allYears}
                  </option>


                  {availableYears.map(
                    (year) => (

                      <option
                        key={year}
                        value={year}
                      >
                        {year}
                      </option>

                    )
                  )}

                </select>


                {/* COUNTRY */}

                <select
                  value={selectedCountry}
                  onChange={(event) =>
                    setSelectedCountry(
                      event.target.value
                    )
                  }
                  className="min-w-[190px] rounded-xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-sm text-white outline-none transition hover:border-[#D4AF37]/45 focus:border-[#D4AF37]"
                >

                  <option value="all">
                    {t.allCountries}
                  </option>


                  {availableCountries.map(
                    (country) => (

                      <option
                        key={country.slug}
                        value={country.slug}
                      >
                        {country.name}
                      </option>

                    )
                  )}

                </select>


                {/* EVENT TYPE */}

                <select
                  value={selectedType}
                  onChange={(event) =>
                    setSelectedType(
                      event.target.value
                    )
                  }
                  className="min-w-[200px] rounded-xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-sm text-white outline-none transition hover:border-[#D4AF37]/45 focus:border-[#D4AF37]"
                >

                  <option value="all">
                    {t.allTypes}
                  </option>


                  {availableTypes.map(
                    (type) => (

                      <option
                        key={type}
                        value={type}
                      >
                        {formatEventType(
                          type,
                          t.types
                        )}
                      </option>

                    )
                  )}

                </select>


                {/* RESET */}

                {hasActiveFilters && (

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-xl border border-[#D51C24]/35 bg-[#D51C24]/5 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 transition hover:border-[#D51C24] hover:bg-[#D51C24]/10 hover:text-white"
                  >
                    {t.reset}
                  </button>

                )}

              </div>

            </div>


            {/* ===============================================
                ACTIVE FILTER INDICATORS
            ================================================ */}

            {hasActiveFilters && (

              <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">


                {selectedYear !== "all" && (

                  <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#D4AF37]">
                    {t.year} · {selectedYear}
                  </span>

                )}


                {selectedCountry !== "all" && (

                  <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#D4AF37]">

                    {t.country} ·{" "}

                    {
                      availableCountries.find(
                        (country) =>
                          country.slug ===
                          selectedCountry
                      )?.name
                    }

                  </span>

                )}


                {selectedType !== "all" && (

                  <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#D4AF37]">

                    {t.type} ·{" "}

                    {formatEventType(
                      selectedType,
                      t.types
                    )}

                  </span>

                )}

              </div>

            )}

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {errorMessage && (

            <div className="mb-5 rounded-2xl border border-[#D51C24]/30 bg-[#D51C24]/5 p-5">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D51C24]">
                {t.error}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                {errorMessage}
              </p>

            </div>

          )}


          {/* =================================================
              NO RESULTS
          ================================================= */}

          {!loading &&
            !errorMessage &&
            concerts.length > 0 &&
            filteredConcerts.length === 0 && (

              <div className="mb-5 rounded-2xl border border-[#D4AF37]/15 bg-[#08090A]/90 px-6 py-8 text-center">

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  {t.none}
                </p>


                <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-white/45">

                  {t.noneText}

                </p>


                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl border border-[#D51C24]/40 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 transition hover:border-[#D51C24] hover:text-white"
                >
                  {t.reset}
                </button>

              </div>

            )}


          {/* =================================================
              MAP
          ================================================= */}

          {loading ? (

            <div className="flex min-h-[620px] items-center justify-center rounded-[24px] border border-[#D4AF37]/15 bg-[#08090A]">

              <p className="text-sm uppercase tracking-[0.18em] text-white/35">
                {t.load}
              </p>

            </div>

          ) : (

            <ConcertMapClient
              concerts={filteredConcerts}
              language={language}
            />

          )}

        </div>

      </section>

    </main>
  );
}