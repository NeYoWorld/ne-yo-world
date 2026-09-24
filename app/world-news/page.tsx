"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteHeader from "../components/SiteHeader";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";

type Lang = "EN" | "PT" | "ES" | "FR" | "DE" | "IT" | "JA";
type Category = "all" | "music" | "live" | "interview" | "announcement";

const FEATURED_YOUTUBE_VIDEO_ID = "xRkGjTsABj4";

type Translation = {
  language: Lang;
  title: string;
  summary: string;
};

type NewsRow = {
  id: string;
  category: Exclude<Category, "all">;
  source_name: string;
  source_url: string;
  published_at: string;
  event_date: string | null;
  world_news_translations: Translation[] | null;
};

const copy: Record<
  Lang,
  {
    eyebrow: string;
    title1: string;
    title2: string;
    intro: string;
    latest: string;
    recent: string;
    all: string;
    music: string;
    live: string;
    interview: string;
    announcement: string;
    readSource: string;
    source: string;
    loading: string;
    empty: string;
    error: string;
    missingTranslation: string;
    exploreLabel: string;
    exploreTitle: string;
    exploreText: string;
    musicCard: string;
    musicCardText: string;
    concertCard: string;
    concertCardText: string;
    neyoCard: string;
    neyoCardText: string;
  }
> = {
  EN: {
    eyebrow: "WORLD NEWS",
    title1: "The latest from",
    title2: "Ne-Yo's world",
    intro:
      "Latest news, music, performances, interviews and official updates from Ne-Yo around the world.",
    latest: "LATEST",
    recent: "RECENT NEWS",
    all: "All",
    music: "Music",
    live: "Live",
    interview: "Interviews",
    announcement: "Announcements",
    readSource: "Read original source",
    source: "Source",
    loading: "Loading World News...",
    empty: "No news yet.",
    error: "World News could not be loaded right now.",
    missingTranslation: "This story is not yet available in the selected language.",
    exploreLabel: "EXPLORE MORE",
    exploreTitle: "Continue through Ne-Yo World",
    exploreText:
      "Go deeper into the music, live history and the artist behind the headlines.",
    musicCard: "Music",
    musicCardText: "Explore the albums and the stories behind each era.",
    concertCard: "Concert Map",
    concertCardText: "Explore documented performances around the world.",
    neyoCard: "Ne-Yo",
    neyoCardText: "Explore the artist, songwriter and performer.",
  },
  PT: {
    eyebrow: "NOTÍCIAS DO MUNDO",
    title1: "As últimas do",
    title2: "mundo de Ne-Yo",
    intro:
      "As últimas notícias, música, atuações, entrevistas e atualizações oficiais de Ne-Yo em todo o mundo.",
    latest: "MAIS RECENTE",
    recent: "NOTÍCIAS RECENTES",
    all: "Todas",
    music: "Música",
    live: "Em Direto",
    interview: "Entrevistas",
    announcement: "Anúncios",
    readSource: "Abrir fonte original",
    source: "Fonte",
    loading: "A carregar Notícias do Mundo...",
    empty: "Ainda não existem notícias.",
    error: "Não foi possível carregar as Notícias do Mundo neste momento.",
    missingTranslation: "Esta notícia ainda não está disponível no idioma selecionado.",
    exploreLabel: "EXPLORAR MAIS",
    exploreTitle: "Continua por Ne-Yo World",
    exploreText:
      "Aprofunda a música, a história ao vivo e o artista por detrás das notícias.",
    musicCard: "Música",
    musicCardText: "Explora os álbuns e as histórias por detrás de cada era.",
    concertCard: "Mapa de Concertos",
    concertCardText: "Explora atuações documentadas em todo o mundo.",
    neyoCard: "Ne-Yo",
    neyoCardText: "Explora o artista, compositor e performer.",
  },
  ES: {
    eyebrow: "NOTICIAS DEL MUNDO",
    title1: "Lo último del",
    title2: "mundo de Ne-Yo",
    intro:
      "Las últimas noticias, música, actuaciones, entrevistas y actualizaciones oficiales de Ne-Yo alrededor del mundo.",
    latest: "MÁS RECIENTE",
    recent: "NOTICIAS RECIENTES",
    all: "Todas",
    music: "Música",
    live: "En Vivo",
    interview: "Entrevistas",
    announcement: "Anuncios",
    readSource: "Abrir fuente original",
    source: "Fuente",
    loading: "Cargando Noticias del Mundo...",
    empty: "Todavía no hay noticias.",
    error: "No se pudieron cargar las Noticias del Mundo en este momento.",
    missingTranslation: "Esta noticia todavía no está disponible en el idioma seleccionado.",
    exploreLabel: "EXPLORAR MÁS",
    exploreTitle: "Continúa por Ne-Yo World",
    exploreText:
      "Profundiza en la música, la historia en directo y el artista detrás de las noticias.",
    musicCard: "Música",
    musicCardText: "Explora los álbumes y las historias detrás de cada era.",
    concertCard: "Mapa de Conciertos",
    concertCardText: "Explora actuaciones documentadas alrededor del mundo.",
    neyoCard: "Ne-Yo",
    neyoCardText: "Explora al artista, compositor e intérprete.",
  },
  FR: {
    eyebrow: "ACTUALITÉS DU MONDE",
    title1: "Les dernières nouvelles de",
    title2: "l'univers de Ne-Yo",
    intro:
      "Les dernières actualités, musiques, performances, interviews et annonces officielles de Ne-Yo dans le monde.",
    latest: "LE PLUS RÉCENT",
    recent: "ACTUALITÉS RÉCENTES",
    all: "Tout",
    music: "Musique",
    live: "En direct",
    interview: "Interviews",
    announcement: "Annonces",
    readSource: "Ouvrir la source",
    source: "Source",
    loading: "Chargement des Actualités du Monde...",
    empty: "Aucune actualité pour le moment.",
    error: "Les Actualités du Monde ne peuvent pas être chargées pour le moment.",
    missingTranslation: "Cette actualité n'est pas encore disponible dans la langue sélectionnée.",
    exploreLabel: "EXPLORER PLUS",
    exploreTitle: "Continuez dans Ne-Yo World",
    exploreText:
      "Découvrez davantage la musique, l’histoire des performances en direct et l’artiste derrière les actualités.",
    musicCard: "Musique",
    musicCardText: "Explorez les albums et les histoires de chaque époque.",
    concertCard: "Carte des Concerts",
    concertCardText: "Explorez les performances documentées dans le monde.",
    neyoCard: "Ne-Yo",
    neyoCardText: "Découvrez l’artiste, l’auteur et l’interprète.",
  },
  DE: {
    eyebrow: "WELTNEWS",
    title1: "Das Neueste aus",
    title2: "Ne-Yos Welt",
    intro:
      "Aktuelle News, Musik, Auftritte, Interviews und offizielle Updates von Ne-Yo aus aller Welt.",
    latest: "AKTUELL",
    recent: "NEUESTE NEWS",
    all: "Alle",
    music: "Musik",
    live: "Live-Auftritte",
    interview: "Interviews",
    announcement: "Ankündigungen",
    readSource: "Originalquelle öffnen",
    source: "Quelle",
    loading: "Weltnews werden geladen...",
    empty: "Noch keine News.",
    error: "Weltnews konnten momentan nicht geladen werden.",
    missingTranslation: "Diese Meldung ist in der gewählten Sprache noch nicht verfügbar.",
    exploreLabel: "MEHR ENTDECKEN",
    exploreTitle: "Weiter durch Ne-Yo World",
    exploreText:
      "Entdecke mehr über die Musik, die Geschichte seiner Live-Auftritte und den Künstler hinter den Meldungen.",
    musicCard: "Musik",
    musicCardText: "Entdecke die Alben und die Geschichten hinter jeder Ära.",
    concertCard: "Konzertkarte",
    concertCardText: "Entdecke dokumentierte Auftritte auf der ganzen Welt.",
    neyoCard: "Ne-Yo",
    neyoCardText: "Entdecke den Künstler, Songwriter und Performer.",
  },
  IT: {
    eyebrow: "NOTIZIE DAL MONDO",
    title1: "Le ultime dal",
    title2: "mondo di Ne-Yo",
    intro:
      "Le ultime notizie, musica, performance, interviste e aggiornamenti ufficiali di Ne-Yo da tutto il mondo.",
    latest: "PIÙ RECENTE",
    recent: "NOTIZIE RECENTI",
    all: "Tutte",
    music: "Musica",
    live: "Dal vivo",
    interview: "Interviste",
    announcement: "Annunci",
    readSource: "Apri fonte originale",
    source: "Fonte",
    loading: "Caricamento delle Notizie dal Mondo...",
    empty: "Non ci sono ancora notizie.",
    error: "Le Notizie dal Mondo non possono essere caricate in questo momento.",
    missingTranslation: "Questa notizia non è ancora disponibile nella lingua selezionata.",
    exploreLabel: "ESPLORA ALTRO",
    exploreTitle: "Continua in Ne-Yo World",
    exploreText:
      "Approfondisci la musica, la storia delle esibizioni dal vivo e l’artista dietro le notizie.",
    musicCard: "Musica",
    musicCardText: "Esplora gli album e le storie dietro ogni era.",
    concertCard: "Mappa dei Concerti",
    concertCardText: "Esplora le performance documentate in tutto il mondo.",
    neyoCard: "Ne-Yo",
    neyoCardText: "Esplora l’artista, autore e interprete.",
  },
  JA: {
    eyebrow: "ワールドニュース",
    title1: "Ne-Yoの世界から",
    title2: "最新ニュース",
    intro:
      "Ne-Yoの最新ニュース、音楽、ライブ、インタビュー、公式アップデートを世界から紹介します。",
    latest: "最新",
    recent: "最近のニュース",
    all: "すべて",
    music: "音楽",
    live: "ライブ",
    interview: "インタビュー",
    announcement: "お知らせ",
    readSource: "元の情報源を開く",
    source: "情報源",
    loading: "ワールドニュースを読み込み中...",
    empty: "ニュースはまだありません。",
    error: "現在ワールドニュースを読み込めません。",
    missingTranslation: "このニュースは選択中の言語ではまだ利用できません。",
    exploreLabel: "さらに見る",
    exploreTitle: "Ne-Yo Worldをもっと見る",
    exploreText:
      "音楽、ライブの歴史、そしてニュースの先にいるアーティストをさらに深く紹介します。",
    musicCard: "音楽",
    musicCardText: "アルバムと各時代のストーリーを紹介します。",
    concertCard: "コンサートマップ",
    concertCardText: "世界各地で記録されたライブを探索します。",
    neyoCard: "Ne-Yo",
    neyoCardText: "アーティスト、ソングライター、パフォーマーとしてのNe-Yoを紹介します。",
  },
};

function formatDate(date: string, language: Lang) {
  const localeMap: Record<Lang, string> = {
    EN: "en-US",
    PT: "pt-PT",
    ES: "es-ES",
    FR: "fr-FR",
    DE: "de-DE",
    IT: "it-IT",
    JA: "ja-JP",
  };

  const dateOnlyMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const value = dateOnlyMatch
    ? new Date(
        Number(dateOnlyMatch[1]),
        Number(dateOnlyMatch[2]) - 1,
        Number(dateOnlyMatch[3])
      )
    : new Date(date);

  return new Intl.DateTimeFormat(localeMap[language], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function getTranslation(item: NewsRow, language: Lang) {
  const translations = item.world_news_translations || [];

  return (
    translations.find((entry) => entry.language === language) ||
    translations.find((entry) => entry.language === "EN") ||
    translations[0] ||
    null
  );
}

export default function WorldNewsPage() {
  const { language } = useLanguage();
  const lang = ((language as Lang) || "EN") as Lang;
  const t = copy[lang] || copy.EN;

  const [news, setNews] = useState<NewsRow[]>([]);
  const [filter, setFilter] = useState<Category>("all");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadNews() {
      setLoading(true);
      setLoadError(false);

      const { data, error } = await supabase
        .from("world_news")
        .select(
          `
            id,
            category,
            source_name,
            source_url,
            published_at,
            event_date,
            world_news_translations (
              language,
              title,
              summary
            )
          `
        )
        .eq("status", "approved")
        .order("published_at", { ascending: false });

      if (!active) return;

      if (error) {
        setNews([]);
        setLoadError(true);
        setLoading(false);
        return;
      }

      setNews((data || []) as NewsRow[]);
      setLoading(false);
    }

    loadNews();

    return () => {
      active = false;
    };
  }, []);

  const featured =
    news.find((item) => item.source_url.includes(FEATURED_YOUTUBE_VIDEO_ID)) ||
    news[0] ||
    null;

  const filteredNews = useMemo(() => {
    return news
      .filter((item) => item.id !== featured?.id)
      .filter((item) => filter === "all" || item.category === filter);
  }, [featured?.id, filter, news]);

  const featuredIsYouTube =
    !!featured && featured.source_url.includes(FEATURED_YOUTUBE_VIDEO_ID);

  const categoryLabel = (category: Exclude<Category, "all">) => {
    if (category === "music") return t.music;
    if (category === "live") return t.live;
    if (category === "announcement") return t.announcement;
    return t.interview;
  };

  const filters: { key: Category; label: string }[] = [
    { key: "all", label: t.all },
    { key: "music", label: t.music },
    { key: "live", label: t.live },
    { key: "interview", label: t.interview },
    { key: "announcement", label: t.announcement },
  ];

  const featuredTranslation = featured
    ? getTranslation(featured, lang)
    : null;

  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <SiteHeader />

      <section className="relative border-b border-[#D4AF37]/10 px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.035] blur-[110px]" />

        <div className="relative mx-auto max-w-[1180px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D51C24]">
            {t.eyebrow}
          </p>

          <h1 className="mt-5 max-w-[900px] text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-6xl">
            <span className="block text-white">{t.title1}</span>
            <span className="mt-2 block text-[#D4AF37]">{t.title2}</span>
          </h1>

          <p className="mt-7 max-w-[760px] text-[15px] leading-7 text-white/55 md:text-base">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          {loading ? (
            <div className="rounded-[22px] border border-white/[0.07] bg-[#08090A] p-10 text-center text-sm text-white/40">
              {t.loading}
            </div>
          ) : loadError ? (
            <div className="rounded-[22px] border border-[#D51C24]/20 bg-[#08090A] p-10 text-center text-sm text-white/48">
              {t.error}
            </div>
          ) : !featured || !featuredTranslation ? (
            <div className="rounded-[22px] border border-white/[0.07] bg-[#08090A] p-10 text-center">
              <p className="text-sm text-white/42">{t.empty}</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                  {t.latest}
                </p>
              </div>

              <article className="grid overflow-hidden rounded-[24px] border border-[#D4AF37]/18 bg-[#08090A] lg:grid-cols-[0.72fr_1.28fr]">
                <div className="relative min-h-[270px] overflow-hidden border-b border-[#D4AF37]/10 lg:min-h-[410px] lg:border-b-0 lg:border-r">
                  {featuredIsYouTube ? (
                    <div className="flex h-full min-h-[270px] flex-col bg-black lg:min-h-[410px]">
                      <div className="aspect-video w-full lg:flex-1">
                        <iframe
                          className="h-full min-h-[250px] w-full lg:min-h-[330px]"
                          src={`https://www.youtube-nocookie.com/embed/${FEATURED_YOUTUBE_VIDEO_ID}`}
                          title={featuredTranslation.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-6 py-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D51C24]">
                          {categoryLabel(featured.category)}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                          {featured.source_name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(212,175,55,0.14),transparent_43%),radial-gradient(circle_at_75%_72%,rgba(213,28,36,0.10),transparent_38%)]" />

                      <div className="relative flex h-full flex-col justify-between p-7 lg:p-9">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D51C24]">
                            {categoryLabel(featured.category)}
                          </p>
                          <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/35">
                            {formatDate(featured.event_date || featured.published_at, lang)}
                          </p>
                        </div>

                        <div className="mt-20">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                            {t.source}
                          </p>
                          <p className="mt-2 text-xl font-bold text-white">
                            {featured.source_name}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col justify-center p-7 md:p-9 lg:p-12">
                  <h2 className="max-w-[690px] text-3xl font-black leading-[1.08] tracking-[-0.035em] text-white md:text-4xl">
                    {featuredTranslation.title}
                  </h2>

                  <p className="mt-6 max-w-[690px] text-[15px] leading-7 text-white/58">
                    {featuredTranslation.summary}
                  </p>

                  <div className="mt-8">
                    <a
                      href={featured.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/25 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition hover:border-[#D4AF37]/55 hover:bg-[#D4AF37]/[0.05]"
                    >
                      {t.readSource}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            </>
          )}
        </div>
      </section>

      {!loading && !loadError && news.length > 1 && (
        <section className="border-y border-[#D4AF37]/10 bg-[#08090A]/55 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#D51C24]">
                {t.recent}
              </p>

              <div className="flex flex-wrap gap-2">
                {filters.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilter(item.key)}
                    className={`rounded-full border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                      filter === item.key
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                        : "border-white/10 text-white/45 hover:border-[#D4AF37]/30 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredNews.length > 0 ? (
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {filteredNews.map((item) => {
                  const translation = getTranslation(item, lang);

                  if (!translation) {
                    return (
                      <article
                        key={item.id}
                        className="rounded-[20px] border border-white/[0.07] bg-[#050606] p-6 md:p-7"
                      >
                        <p className="text-sm leading-6 text-white/35">
                          {t.missingTranslation}
                        </p>
                      </article>
                    );
                  }

                  return (
                    <article
                      key={item.id}
                      className="group flex min-h-[270px] flex-col rounded-[20px] border border-white/[0.07] bg-[#050606] p-6 transition hover:border-[#D4AF37]/25 md:p-7"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full border border-[#D51C24]/20 bg-[#D51C24]/[0.04] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#D51C24]">
                          {categoryLabel(item.category)}
                        </span>

                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                          {formatDate(item.event_date || item.published_at, lang)}
                        </span>
                      </div>

                      <h3 className="mt-6 text-xl font-bold leading-[1.25] tracking-[-0.025em] text-white">
                        {translation.title}
                      </h3>

                      <p className="mt-4 flex-1 text-[13px] leading-6 text-white/48">
                        {translation.summary}
                      </p>

                      <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/22">
                            {t.source}
                          </p>
                          <p className="mt-1 text-[11px] text-white/48">
                            {item.source_name}
                          </p>
                        </div>

                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${t.readSource}: ${translation.title}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-[#D4AF37] transition group-hover:border-[#D4AF37]/35"
                        >
                          ↗
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-10 rounded-[20px] border border-white/[0.07] bg-[#050606] p-10 text-center text-sm text-white/35">
                {t.empty}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[9px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            {t.exploreLabel}
          </p>

          <h2 className="mx-auto mt-4 max-w-[720px] text-center text-3xl font-black tracking-[-0.035em] text-white md:text-4xl">
            {t.exploreTitle}
          </h2>

          <p className="mx-auto mt-4 max-w-[640px] text-center text-sm leading-6 text-white/40">
            {t.exploreText}
          </p>

          <div className="mx-auto mt-10 grid max-w-[940px] gap-4 md:grid-cols-3">
            <Link
              href="/music"
              className="rounded-[20px] border border-white/[0.07] bg-[#08090A] p-6 transition hover:border-[#D4AF37]/30"
            >
              <p className="text-lg font-bold text-white">{t.musicCard}</p>
              <p className="mt-3 text-[12px] leading-5 text-white/38">
                {t.musicCardText}
              </p>
            </Link>

            <Link
              href="/concert-map"
              className="rounded-[20px] border border-white/[0.07] bg-[#08090A] p-6 transition hover:border-[#D4AF37]/30"
            >
              <p className="text-lg font-bold text-white">{t.concertCard}</p>
              <p className="mt-3 text-[12px] leading-5 text-white/38">
                {t.concertCardText}
              </p>
            </Link>

            <Link
              href="/ne-yo"
              className="rounded-[20px] border border-white/[0.07] bg-[#08090A] p-6 transition hover:border-[#D4AF37]/30"
            >
              <p className="text-lg font-bold text-white">{t.neyoCard}</p>
              <p className="mt-3 text-[12px] leading-5 text-white/38">
                {t.neyoCardText}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#D4AF37]/10 px-6 py-8 text-center">
        <p className="text-[9px] uppercase tracking-[0.28em] text-white/24">
          NE-YO WORLD · WORLD NEWS
        </p>
      </footer>
    </main>
  );
}
