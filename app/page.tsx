"use client";

import { useEffect, useMemo, useState } from "react";

import {
  useLanguage,
  type Language,
} from "./context/LanguageContext";

import SiteHeader from "./components/SiteHeader";

import {
  activeCountryDestinations,
} from "./data/countries";

import { supabase } from "./lib/supabase";

const translations = {
  EN: {
    home: "HOME",
    countries: "COUNTRIES",
    messages: "MESSAGES",
    neyo: "Ne-Yo",
    about: "ABOUT",
    join: "JOIN THE PROJECT",
    heroWorld: "ONE WORLD",
    heroMusic: "ONE MUSIC",
    heroLovePrefix: "ONE",
    heroLove: "LOVE",
    heroText1: "A global fan project celebrating Ne-Yo,",
    heroText2: "his music and fans around the world.",
    beginJourney: "BEGIN THE JOURNEY",
    exploreWorld: "Global Community",
    exploreWorldText: "Discover the countries and fan pages connected to the Ne-Yo World community.",
    countriesButton: "GLOBAL COMMUNITY",
    worldMessages: "World Messages",
    worldMessagesText: "Leave a message for Ne-Yo and read messages from fans around the world.",
    openMessages: "OPEN MESSAGES",
    discoverNeyo: "Discover Ne-Yo",
    discoverNeyoText: "Explore the artist, the music, the albums and official ways to connect with Ne-Yo.",
    discover: "DISCOVER",
    aboutProject: "About the Project",
    aboutProjectText: "Discover what Ne-Yo World is, how it works and the idea behind the project.",
    learnMore: "LEARN MORE",
    explore: "Global Community",
    exploreCountries: "Explore the Community",
    exploreCountriesText: "Discover the countries and fan pages already connected to Ne-Yo World.",
    viewAll: "View all",
    fanPagesAroundWorld: "Fan Pages Around the World",
    fanPageCount: "Fan Page",
    fanPagesCount: "Fan Pages",
    fanPageTitle: "Is your fan page ready to join Ne-Yo World?",
    fanPageText: "Fan pages from any country can apply to become part of the project. Every application is reviewed before being added.",
    motto: "One World - One Music - One Love",
  },

  PT: {
    home: "INÍCIO",
    countries: "PAÍSES",
    messages: "MENSAGENS",
    neyo: "Ne-Yo",
    about: "SOBRE",
    join: "JUNTAR-SE AO PROJETO",
    heroWorld: "UM MUNDO",
    heroMusic: "UMA MÚSICA",
    heroLovePrefix: "UM",
    heroLove: "AMOR",
    heroText1: "Um projeto global de fãs que celebra Ne-Yo,",
    heroText2: "a sua música e fãs de todo o mundo.",
    beginJourney: "COMEÇAR A VIAGEM",
    exploreWorld: "Comunidade Global",
    exploreWorldText: "Descobre os países e páginas de fãs ligados à comunidade Ne-Yo World.",
    countriesButton: "COMUNIDADE GLOBAL",
    worldMessages: "Mensagens do Mundo",
    worldMessagesText: "Deixa uma mensagem para o Ne-Yo e lê mensagens de fãs de todo o mundo.",
    openMessages: "ABRIR MENSAGENS",
    discoverNeyo: "Descobrir Ne-Yo",
    discoverNeyoText: "Explora o artista, a música, os álbuns e as formas oficiais de acompanhar o Ne-Yo.",
    discover: "DESCOBRIR",
    aboutProject: "Sobre o Projeto",
    aboutProjectText: "Descobre o que é o Ne-Yo World, como funciona e a ideia por detrás do projeto.",
    learnMore: "SABER MAIS",
    explore: "Comunidade Global",
    exploreCountries: "Explorar a Comunidade",
    exploreCountriesText: "Descobre os países e páginas de fãs que já fazem parte do Ne-Yo World.",
    viewAll: "Ver todos",
    fanPagesAroundWorld: "Páginas de Fãs pelo Mundo",
    fanPageCount: "Página de Fãs",
    fanPagesCount: "Páginas de Fãs",
    fanPageTitle: "A tua página de fãs está pronta para se juntar ao Ne-Yo World?",
    fanPageText: "Páginas de fãs de qualquer país podem candidatar-se a fazer parte do projeto. Todas as candidaturas são analisadas antes de serem adicionadas.",
    motto: "One World - One Music - One Love",
  },

  ES: {
    home: "INICIO",
    countries: "PAÍSES",
    messages: "MENSAJES",
    neyo: "Ne-Yo",
    about: "ACERCA DE",
    join: "ÚNETE AL PROYECTO",
    heroWorld: "UN MUNDO",
    heroMusic: "UNA MÚSICA",
    heroLovePrefix: "UN",
    heroLove: "AMOR",
    heroText1: "Un proyecto global de fans que celebra a Ne-Yo,",
    heroText2: "su música y fans de todo el mundo.",
    beginJourney: "COMENZAR EL VIAJE",
    exploreWorld: "Comunidad Global",
    exploreWorldText: "Descubre los países y páginas de fans conectados con la comunidad de Ne-Yo World.",
    countriesButton: "COMUNIDAD GLOBAL",
    worldMessages: "Mensajes del Mundo",
    worldMessagesText: "Deja un mensaje para Ne-Yo y lee mensajes de fans de todo el mundo.",
    openMessages: "ABRIR MENSAJES",
    discoverNeyo: "Descubre a Ne-Yo",
    discoverNeyoText: "Explora al artista, la música, los álbumes y las formas oficiales de seguir a Ne-Yo.",
    discover: "DESCUBRIR",
    aboutProject: "Sobre el Proyecto",
    aboutProjectText: "Descubre qué es Ne-Yo World, cómo funciona y la idea que hay detrás del proyecto.",
    learnMore: "SABER MÁS",
    explore: "Comunidad Global",
    exploreCountries: "Explorar la Comunidad",
    exploreCountriesText: "Descubre los países y páginas de fans que ya forman parte de Ne-Yo World.",
    viewAll: "Ver todos",
    fanPagesAroundWorld: "Páginas de Fans por el Mundo",
    fanPageCount: "Página de Fans",
    fanPagesCount: "Páginas de Fans",
    fanPageTitle: "¿Tu página de fans está lista para unirse a Ne-Yo World?",
    fanPageText: "Las páginas de fans de cualquier país pueden solicitar formar parte del proyecto. Cada solicitud se revisa antes de ser añadida.",
    motto: "One World - One Music - One Love",
  },

  FR: {
    home: "ACCUEIL",
    countries: "PAYS",
    messages: "MESSAGES",
    neyo: "Ne-Yo",
    about: "À PROPOS",
    join: "REJOINDRE LE PROJET",
    heroWorld: "UN MONDE",
    heroMusic: "UNE MUSIQUE",
    heroLovePrefix: "UN",
    heroLove: "AMOUR",
    heroText1: "Un projet mondial de fans qui célèbre Ne-Yo,",
    heroText2: "sa musique et ses fans du monde entier.",
    beginJourney: "COMMENCER LE VOYAGE",
    exploreWorld: "Communauté Mondiale",
    exploreWorldText: "Découvrez les pays et les pages de fans liés à la communauté Ne-Yo World.",
    countriesButton: "COMMUNAUTÉ MONDIALE",
    worldMessages: "Messages du Monde",
    worldMessagesText: "Laissez un message à Ne-Yo et découvrez les messages de fans du monde entier.",
    openMessages: "OUVRIR LES MESSAGES",
    discoverNeyo: "Découvrir Ne-Yo",
    discoverNeyoText: "Découvrez l'artiste, sa musique, ses albums et les moyens officiels de suivre Ne-Yo.",
    discover: "DÉCOUVRIR",
    aboutProject: "À Propos du Projet",
    aboutProjectText: "Découvrez ce qu'est Ne-Yo World, son fonctionnement et l'idée à l'origine du projet.",
    learnMore: "EN SAVOIR PLUS",
    explore: "Communauté Mondiale",
    exploreCountries: "Explorer la Communauté",
    exploreCountriesText: "Découvrez les pays et les pages de fans déjà connectés à Ne-Yo World.",
    viewAll: "Voir tout",
    fanPagesAroundWorld: "Pages de Fans dans le Monde",
    fanPageCount: "Page de Fans",
    fanPagesCount: "Pages de Fans",
    fanPageTitle: "Votre page de fans est-elle prête à rejoindre Ne-Yo World ?",
    fanPageText: "Les pages de fans de tous les pays peuvent demander à rejoindre le projet. Chaque candidature est examinée avant d'être ajoutée.",
    motto: "One World - One Music - One Love",
  },

  DE: {
    home: "STARTSEITE",
    countries: "LÄNDER",
    messages: "NACHRICHTEN",
    neyo: "Ne-Yo",
    about: "ÜBER UNS",
    join: "PROJEKT BEITRETEN",
    heroWorld: "EINE WELT",
    heroMusic: "EINE MUSIK",
    heroLovePrefix: "EINE",
    heroLove: "LIEBE",
    heroText1: "Ein globales Fanprojekt, das Ne-Yo, seine Musik",
    heroText2: "und Fans auf der ganzen Welt feiert.",
    beginJourney: "DIE REISE BEGINNEN",
    exploreWorld: "Globale Gemeinschaft",
    exploreWorldText: "Entdecke die Länder und Fanseiten, die mit der globalen Ne-Yo World Gemeinschaft verbunden sind.",
    countriesButton: "GLOBALE GEMEINSCHAFT",
    worldMessages: "Nachrichten aus der Welt",
    worldMessagesText: "Hinterlasse Ne-Yo eine Nachricht und lies Nachrichten von Fans aus aller Welt.",
    openMessages: "NACHRICHTEN ÖFFNEN",
    discoverNeyo: "Ne-Yo Entdecken",
    discoverNeyoText: "Entdecke den Künstler, die Musik, die Alben und offizielle Möglichkeiten, Ne-Yo zu folgen.",
    discover: "ENTDECKEN",
    aboutProject: "Über das Projekt",
    aboutProjectText: "Erfahre, was Ne-Yo World ist, wie es funktioniert und welche Idee hinter dem Projekt steht.",
    learnMore: "MEHR ERFAHREN",
    explore: "Globale Gemeinschaft",
    exploreCountries: "Die Gemeinschaft Entdecken",
    exploreCountriesText: "Entdecke die Länder und Fanseiten, die bereits mit Ne-Yo World verbunden sind.",
    viewAll: "Alle ansehen",
    fanPagesAroundWorld: "Fanseiten aus aller Welt",
    fanPageCount: "Fanseite",
    fanPagesCount: "Fanseiten",
    fanPageTitle: "Ist deine Fanseite bereit, Teil von Ne-Yo World zu werden?",
    fanPageText: "Fanseiten aus jedem Land können sich für das Projekt bewerben. Jede Bewerbung wird vor der Aufnahme geprüft.",
    motto: "One World - One Music - One Love",
  },

  IT: {
    home: "HOME",
    countries: "PAESI",
    messages: "MESSAGGI",
    neyo: "Ne-Yo",
    about: "CHI SIAMO",
    join: "UNISCITI AL PROGETTO",
    heroWorld: "UN MONDO",
    heroMusic: "UNA MUSICA",
    heroLovePrefix: "UN",
    heroLove: "AMORE",
    heroText1: "Un progetto globale di fan che celebra Ne-Yo,",
    heroText2: "la sua musica e i fan di tutto il mondo.",
    beginJourney: "INIZIA IL VIAGGIO",
    exploreWorld: "Comunità Globale",
    exploreWorldText: "Scopri i paesi e le fan page collegati alla comunità di Ne-Yo World.",
    countriesButton: "COMUNITÀ GLOBALE",
    worldMessages: "Messaggi dal Mondo",
    worldMessagesText: "Lascia un messaggio per Ne-Yo e leggi i messaggi dei fan di tutto il mondo.",
    openMessages: "APRI I MESSAGGI",
    discoverNeyo: "Scopri Ne-Yo",
    discoverNeyoText: "Esplora l'artista, la musica, gli album e i canali ufficiali per seguire Ne-Yo.",
    discover: "SCOPRI",
    aboutProject: "Il Progetto",
    aboutProjectText: "Scopri cos'è Ne-Yo World, come funziona e l'idea alla base del progetto.",
    learnMore: "SCOPRI DI PIÙ",
    explore: "Comunità Globale",
    exploreCountries: "Esplora la Comunità",
    exploreCountriesText: "Scopri i paesi e le fan page già collegati a Ne-Yo World.",
    viewAll: "Vedi tutti",
    fanPagesAroundWorld: "Fan Page nel Mondo",
    fanPageCount: "Pagina Fan",
    fanPagesCount: "Pagine Fan",
    fanPageTitle: "La tua fan page è pronta a unirsi a Ne-Yo World?",
    fanPageText: "Le fan page di qualsiasi paese possono candidarsi per entrare nel progetto. Ogni candidatura viene esaminata prima dell'aggiunta.",
    motto: "One World - One Music - One Love",
  },

  JA: {
    home: "ホーム",
    countries: "国",
    messages: "メッセージ",
    neyo: "Ne-Yo",
    about: "概要",
    join: "プロジェクトに参加",
    heroWorld: "ひとつの世界",
    heroMusic: "ひとつの音楽",
    heroLovePrefix: "ひとつの",
    heroLove: "愛",
    heroText1: "Ne-Yo、彼の音楽、そして世界中のファンを称える",
    heroText2: "グローバルファンプロジェクト。",
    beginJourney: "旅を始める",
    exploreWorld: "グローバルコミュニティ",
    exploreWorldText: "Ne-Yo Worldのコミュニティにつながる国々とファンページを見つけよう。",
    countriesButton: "グローバルコミュニティ",
    worldMessages: "世界からのメッセージ",
    worldMessagesText: "Ne-Yoへのメッセージを残し、世界中のファンからのメッセージを読もう。",
    openMessages: "メッセージを見る",
    discoverNeyo: "Ne-Yoを知る",
    discoverNeyoText: "アーティスト、音楽、アルバム、Ne-Yoの公式チャンネルを紹介します。",
    discover: "見る",
    aboutProject: "プロジェクトについて",
    aboutProjectText: "Ne-Yo Worldとは何か、どのように機能するのか、プロジェクトの背景にある想いを紹介します。",
    learnMore: "詳しく見る",
    explore: "グローバルコミュニティ",
    exploreCountries: "コミュニティを探索",
    exploreCountriesText: "すでにNe-Yo Worldにつながっている国々とファンページを見つけよう。",
    viewAll: "すべて見る",
    fanPagesAroundWorld: "世界のファンページ",
    fanPageCount: "ファンページ",
    fanPagesCount: "ファンページ",
    fanPageTitle: "あなたのファンページもNe-Yo Worldに参加しませんか？",
    fanPageText: "どの国のファンページでもプロジェクトへの参加を申請できます。追加前にすべての申請を確認します。",
    motto: "One World - One Music - One Love",
  },
};


const homeCountryCardData: Record<
  string,
  {
    code: string;
    manualUsernames: string[];
  }
> = {
  portugal: {
    code: "PT",
    manualUsernames: [
      "@bestofneyo_",
    ],
  },
  brazil: {
    code: "BR",
    manualUsernames: [
      "@neyodivooficial",
    ],
  },
  usa: {
    code: "US",
    manualUsernames: [],
  },
};


export default function Home() {
  const { language } = useLanguage();

  const t =
    translations[language];

  const [
    databaseFanPages,
    setDatabaseFanPages,
  ] = useState<
    {
      country: string;
      username: string;
    }[]
  >([]);

  useEffect(() => {
    let active = true;

    async function loadFanPageCounts() {
      const {
        data,
        error,
      } = await supabase
        .from("fan_pages")
        .select(
          "country, username"
        )
        .eq(
          "is_active",
          true
        );

      if (!active) {
        return;
      }

      if (error) {
        return;
      }

      setDatabaseFanPages(
        data ?? []
      );
    }

    loadFanPageCounts();

    return () => {
      active = false;
    };
  }, []);

  const homeCountries =
    useMemo(
      () => {
        const communityCountries = [
          ...activeCountryDestinations,
        ];

        if (
          !communityCountries.some(
            (country) =>
              country.slug === "usa"
          )
        ) {
          communityCountries.push({
            name: "USA",
            slug: "usa",
            href: "/usa",
          } as (typeof activeCountryDestinations)[number]);
        }

        return communityCountries.map(
          (country) => {
            const manualUsernames =
              homeCountryCardData[
                country.slug
              ]?.manualUsernames ??
              [];

            const normalizeUsername = (
              username: string
            ) =>
              username
                .trim()
                .toLowerCase()
                .replace(/^@/, "");

            const manualSet =
              new Set(
                manualUsernames.map(
                  normalizeUsername
                )
              );

            const dynamicCount =
              databaseFanPages.filter(
                (page) =>
                  page.country
                    ?.trim()
                    .toLowerCase() ===
                    country.name
                      .trim()
                      .toLowerCase() &&
                  !manualSet.has(
                    normalizeUsername(
                      page.username ?? ""
                    )
                  )
              ).length;

            return {
              ...country,
              code:
                homeCountryCardData[
                  country.slug
                ]?.code ??
                "•",
              fanPages:
                manualUsernames.length +
                dynamicCount,
            };
          }
        );
      },
      [
        databaseFanPages,
      ]
    );

  function beginJourney() {
    const section =
      document.getElementById(
        "countries-preview"
      );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }


  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">

      {/* FUNDO */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute right-[-10%] top-[-5%] h-[800px] w-[800px] rounded-full bg-[#D4AF37]/4 blur-[190px]" />

        <div className="absolute left-[-15%] top-[40%] h-[500px] w-[500px] rounded-full bg-[#C1121F]/5 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.85)_100%)]" />

      </div>


      {/* HEADER */}

      <SiteHeader />


      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-4 lg:px-10"
      >

        <div className="grid min-h-[610px] items-center gap-5 lg:grid-cols-[0.82fr_1.18fr]">

          {/* ESQUERDA */}

          <div className="relative z-30 flex flex-col justify-center lg:-translate-y-4">

            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
              Ne-Yo World
            </p>

            <h1 className="text-[42px] font-black uppercase leading-[1.02] tracking-[-0.035em] sm:text-[48px] md:text-[54px] lg:text-[52px] xl:text-[58px]">

              <span className="block whitespace-nowrap text-white">
                {t.heroWorld}
              </span>

              <span className="mt-2 block whitespace-nowrap text-white">
                {t.heroMusic}
              </span>

              <span className="mt-2 block whitespace-nowrap">

                <span className="text-white">
                  {t.heroLovePrefix}{" "}
                </span>

                <span className="text-[#D51C24]">
                  {t.heroLove}
                </span>

              </span>

            </h1>


            <div className="mt-6 max-w-[430px]">

              <p className="text-[15px] leading-7 text-white/70 md:text-[16px]">
                {t.heroText1}
                <br />
                {t.heroText2}
              </p>

            </div>


            <div className="mt-6">

              <button
                type="button"
                onClick={beginJourney}
                className="
                  group
                  flex
                  items-center
                  gap-8
                  rounded-xl
                  border
                  border-[#D4AF37]/70
                  bg-black/30
                  px-7
                  py-4
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  transition
                  duration-300
                  hover:border-[#D51C24]
                  hover:bg-[#D51C24]/5
                "
              >
                <span>
                  {t.beginJourney}
                </span>

                <span className="text-lg text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#D51C24]">
                  →
                </span>
              </button>

            </div>

          </div>


          {/* DIREITA */}

          <div className="relative hidden min-h-[580px] items-center justify-center overflow-visible lg:flex lg:-translate-y-10">

            {/* SILHUETA */}

            <div
              className="
                pointer-events-none
                absolute
                left-[-18%]
                bottom-[35px]
                z-20
                hidden
                lg:block
              "
            >

              <div className="absolute left-[28%] top-[25%] h-[280px] w-[180px] rounded-full bg-[#D4AF37]/[0.025] blur-[100px]" />

              <div className="absolute right-[5px] top-[30%] h-[250px] w-[150px] rounded-full bg-[#D51C24]/[0.025] blur-[100px]" />


              <img
                src="/neyo-silhouette.png.png"
                alt=""
                aria-hidden="true"
                className="
                  relative
                  z-10
                  h-[455px]
                  w-auto
                  object-contain
                  opacity-[0.48]
                  brightness-[0.52]
                  contrast-[1.22]
                  [filter:drop-shadow(-1px_0_2px_rgba(212,175,55,0.18))_drop-shadow(2px_0_3px_rgba(213,28,36,0.16))]
                "
              />


              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-[-30px]
                  bottom-[-10px]
                  z-20
                  h-[150px]
                  bg-gradient-to-t
                  from-[#050607]
                  via-[#050607]/80
                  to-transparent
                "
              />

            </div>


            {/* NE-YO */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-[8px]
                left-[-17%]
                z-[28]
                hidden
                select-none
                whitespace-nowrap
                text-[96px]
                font-black
                uppercase
                leading-none
                tracking-[-0.055em]
                text-[#D4AF37]/[0.13]
                lg:block
                xl:bottom-[6px]
                xl:left-[-14%]
                xl:text-[108px]
                2xl:left-[-12%]
                2xl:text-[115px]
              "
            >
              Ne-Yo
            </div>


            {/* GLOBO */}

            <div className="pointer-events-none absolute left-[58%] top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,168,48,0.035)_0%,rgba(216,168,48,0.015)_42%,rgba(216,168,48,0.005)_58%,transparent_72%)] blur-[20px]" />


            <div
              className="
                relative
                z-10
                w-full
                max-w-[760px]
                lg:translate-x-20
                lg:scale-[1.03]
                xl:translate-x-24
                xl:scale-[1.07]
              "
            >
              <div className="relative min-h-[560px] w-full" />
            </div>


            <div
              className="
                pointer-events-none
                absolute
                bottom-[12px]
                left-[64%]
                z-30
                flex
                h-10
                w-10
                -translate-x-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#D4AF37]/35
                bg-black/70
                text-lg
                text-[#D4AF37]
                backdrop-blur
              "
            >
              ↓
            </div>

          </div>

        </div>

      </section>


      {/* 4 CARDS */}

      <section className="relative z-20 border-y border-[#D4AF37]/15 bg-[#08090A]/95">

        <div className="mx-auto grid w-full max-w-[1600px] md:grid-cols-2 xl:grid-cols-4">

          <a
            href="/countries"
            className="group min-h-[205px] border-b border-[#D4AF37]/15 p-7 transition duration-300 hover:bg-[#D4AF37]/5 md:border-r xl:border-b-0"
          >

            <div className="mb-6 flex h-12 w-12 items-center justify-center text-[38px] text-[#D51C24]">
              ◎
            </div>

            <h2 className="text-[14px] font-semibold uppercase tracking-[0.03em]">
              {t.exploreWorld}
            </h2>

            <p className="mt-3 max-w-[250px] text-[12px] leading-5 text-white/50">
              {t.exploreWorldText}
            </p>

            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D51C24]">
              {t.countriesButton} →
            </div>

          </a>


          <a
            href="/messages"
            className="group min-h-[205px] border-b border-[#D4AF37]/15 p-7 transition duration-300 hover:bg-[#D4AF37]/5 xl:border-b-0 xl:border-r"
          >

            <div className="mb-6 text-[37px] leading-none text-[#D51C24]">
              ♡
            </div>

            <h2 className="text-[14px] font-semibold uppercase tracking-[0.03em]">
              {t.worldMessages}
            </h2>

            <p className="mt-3 max-w-[250px] text-[12px] leading-5 text-white/50">
              {t.worldMessagesText}
            </p>

            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D51C24]">
              {t.openMessages} →
            </div>

          </a>


          <a
            href="/ne-yo"
            className="group min-h-[205px] border-b border-[#D4AF37]/15 p-7 transition duration-300 hover:bg-[#D4AF37]/5 md:border-r xl:border-b-0"
          >

            <div className="mb-6 text-[34px] leading-none text-[#D51C24]">
              ♪
            </div>

            <h2 className="text-[14px] font-semibold uppercase tracking-[0.03em]">
              {t.discoverNeyo}
            </h2>

            <p className="mt-3 max-w-[250px] text-[12px] leading-5 text-white/50">
              {t.discoverNeyoText}
            </p>

            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D51C24]">
              {t.discover} →
            </div>

          </a>


          <a
            href="/about"
            className="group min-h-[205px] p-7 transition duration-300 hover:bg-[#D4AF37]/5"
          >

            <div className="mb-6 text-[40px] leading-none text-[#D51C24]">
              ◌
            </div>

            <h2 className="text-[14px] font-semibold uppercase tracking-[0.03em]">
              {t.aboutProject}
            </h2>

            <p className="mt-3 max-w-[250px] text-[12px] leading-5 text-white/50">
              {t.aboutProjectText}
            </p>

            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D51C24]">
              {t.learnMore} →
            </div>

          </a>

        </div>

      </section>


      {/* COUNTRIES */}

      <section
        id="countries-preview"
        className="relative z-10 bg-[#050607] px-6 py-16 lg:px-10"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="mb-8 flex items-end justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.4em] text-[#D51C24]">
                {t.explore}
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                {t.exploreCountries}
              </h2>

              <p className="mt-4 max-w-[540px] text-sm leading-7 text-white/40">
                {t.exploreCountriesText}
              </p>

            </div>


            <a
              href="/countries"
              className="text-[11px] uppercase tracking-[0.1em] text-[#D4AF37] transition hover:text-white"
            >
              {t.viewAll} →
            </a>

          </div>


          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {homeCountries.map(
              (country, index) => {
                const isLastOddMobileCard =
                  homeCountries.length % 2 === 1 &&
                  index === homeCountries.length - 1;

                return (
                  <a
                    key={country.slug}
                    href={country.href}
                    className={`group rounded-xl border border-[#D4AF37]/35 bg-[#0A0B0C] px-4 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#D51C24]/60 ${
                      isLastOddMobileCard
                        ? "col-span-2 mx-auto w-[calc(50%-0.375rem)] sm:col-span-1 sm:mx-0 sm:w-auto"
                        : ""
                    }`}
                  >

                  <div className="text-4xl font-black tracking-[-0.04em] text-white">
                    {country.code}
                  </div>

                  <p className="mt-3 text-[11px] text-white/70 transition group-hover:text-white">
                    {country.name}
                  </p>

                  <p className="mt-2 text-[8px] uppercase tracking-[0.14em] text-white/30">
                    {country.fanPages}{" "}
                    {country.fanPages === 1
                      ? t.fanPageCount
                      : t.fanPagesCount}
                  </p>

                  <p className="mt-2 text-[8px] uppercase tracking-[0.18em] text-[#D51C24]">
                    {t.explore}
                  </p>

                  </a>
                );
              }
            )}

          </div>

        </div>

      </section>


      {/* JOIN */}

      <section className="relative z-10 border-t border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-[1500px]">

          <div className="relative overflow-hidden rounded-[28px] border border-[#D4AF37]/20 bg-[#050607] p-8 md:p-12">

            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-[#D51C24]/5 blur-[100px]" />

            <div className="pointer-events-none absolute bottom-[-160px] left-[15%] h-[350px] w-[350px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />


            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
                  {t.fanPagesAroundWorld}
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                  {t.fanPageTitle}
                </h2>

                <p className="mt-5 max-w-[650px] text-sm leading-7 text-white/45">
                  {t.fanPageText}
                </p>

              </div>


              <a
                href="/join"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-6
                  rounded-xl
                  border
                  border-[#D51C24]/60
                  bg-[#D51C24]/5
                  px-8
                  py-4
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  transition
                  hover:border-[#D4AF37]
                  hover:bg-[#D4AF37]/5
                "
              >
                {t.join}

                <span className="text-[#D51C24] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]">
                  →
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="relative z-10 border-t border-[#D4AF37]/10 bg-black px-6 py-10 lg:px-10">

        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-6 lg:flex-row">

          <img
            src="/ne-yo-world-logo.png.png"
            alt="Ne-Yo World"
            className="h-[65px] w-auto object-contain"
          />


          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[9px] uppercase tracking-[0.18em] text-white/30">

            <a href="/countries">
              {t.countries}
            </a>

            <a href="/messages">
              {t.messages}
            </a>

            <a href="/ne-yo">
              Ne-Yo
            </a>

            <a href="/about">
              {t.about}
            </a>

            <a
              href="/join"
              className="text-[#D51C24]/70"
            >
              {t.join}
            </a>

          </div>


          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
            {t.motto}
          </p>

        </div>

      </footer>

    </main>
  );
}