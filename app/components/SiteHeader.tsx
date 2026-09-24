"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
  useLanguage,
  type Language,
} from "../context/LanguageContext";

const translations = {
  EN: {
    home: "HOME",
    countries: "COUNTRIES",
    explore: "EXPLORE",
    messages: "MESSAGES",
    neyo: "NE-YO",
    about: "ABOUT",
    join: "JOIN THE PROJECT",
    concertMap: "CONCERT MAP",
    music: "MUSIC",
    filmTvStage: "FILM, TV & STAGE",
    awards: "AWARDS & MILESTONES",
    worldNews: "WORLD NEWS",
    worldMessages: "WORLD MESSAGES",
    fanMemories: "FAN MEMORIES",
    openMenu: "OPEN NAVIGATION MENU",
  },
  PT: {
    home: "INÍCIO",
    countries: "PAÍSES",
    explore: "EXPLORAR",
    messages: "MENSAGENS",
    neyo: "NE-YO",
    about: "SOBRE",
    join: "JUNTAR-SE AO PROJETO",
    concertMap: "MAPA DE CONCERTOS",
    music: "MÚSICA",
    filmTvStage: "CINEMA, TV & PALCO",
    awards: "PRÉMIOS & MARCOS",
    worldNews: "NOTÍCIAS DO MUNDO",
    worldMessages: "MENSAGENS DO MUNDO",
    fanMemories: "MEMÓRIAS DOS FÃS",
    openMenu: "ABRIR MENU DE NAVEGAÇÃO",
  },
  ES: {
    home: "INICIO",
    countries: "PAÍSES",
    explore: "EXPLORAR",
    messages: "MENSAJES",
    neyo: "NE-YO",
    about: "ACERCA DE",
    join: "ÚNETE AL PROYECTO",
    concertMap: "MAPA DE CONCIERTOS",
    music: "MÚSICA",
    filmTvStage: "CINE, TV & ESCENARIO",
    awards: "PREMIOS & HITOS",
    worldNews: "NOTICIAS DEL MUNDO",
    worldMessages: "MENSAJES DEL MUNDO",
    fanMemories: "RECUERDOS DE FANS",
    openMenu: "ABRIR MENÚ DE NAVEGACIÓN",
  },
  FR: {
    home: "ACCUEIL",
    countries: "PAYS",
    explore: "EXPLORER",
    messages: "MESSAGES",
    neyo: "NE-YO",
    about: "À PROPOS",
    join: "REJOINDRE LE PROJET",
    concertMap: "CARTE DES CONCERTS",
    music: "MUSIQUE",
    filmTvStage: "CINÉMA, TV & SCÈNE",
    awards: "PRIX & ÉTAPES",
    worldNews: "ACTUALITÉS DU MONDE",
    worldMessages: "MESSAGES DU MONDE",
    fanMemories: "SOUVENIRS DES FANS",
    openMenu: "OUVRIR LE MENU DE NAVIGATION",
  },
  DE: {
    home: "STARTSEITE",
    countries: "LÄNDER",
    explore: "ENTDECKEN",
    messages: "NACHRICHTEN",
    neyo: "NE-YO",
    about: "ÜBER UNS",
    join: "PROJEKT BEITRETEN",
    concertMap: "KONZERTKARTE",
    music: "MUSIK",
    filmTvStage: "FILM, TV & BÜHNE",
    awards: "AUSZEICHNUNGEN & MEILENSTEINE",
    worldNews: "WELTNEWS",
    worldMessages: "WELTNACHRICHTEN",
    fanMemories: "FAN-ERINNERUNGEN",
    openMenu: "NAVIGATIONSMENÜ ÖFFNEN",
  },
  IT: {
    home: "HOME",
    countries: "PAESI",
    explore: "ESPLORA",
    messages: "MESSAGGI",
    neyo: "NE-YO",
    about: "CHI SIAMO",
    join: "UNISCITI AL PROGETTO",
    concertMap: "MAPPA DEI CONCERTI",
    music: "MUSICA",
    filmTvStage: "CINEMA, TV & PALCO",
    awards: "PREMI & TRAGUARDI",
    worldNews: "NOTIZIE DAL MONDO",
    worldMessages: "MESSAGGI DAL MONDO",
    fanMemories: "RICORDI DEI FAN",
    openMenu: "APRI IL MENU DI NAVIGAZIONE",
  },
  JA: {
    home: "ホーム",
    countries: "国",
    explore: "探索",
    messages: "メッセージ",
    neyo: "NE-YO",
    about: "概要",
    join: "プロジェクトに参加",
    concertMap: "コンサートマップ",
    music: "音楽",
    filmTvStage: "映画・TV・舞台",
    awards: "受賞歴 & マイルストーン",
    worldNews: "ワールドニュース",
    worldMessages: "世界からのメッセージ",
    fanMemories: "ファンの思い出",
    openMenu: "ナビゲーションメニューを開く",
  },
};

const languageOptions: {
  code: Language;
  label: string;
}[] = [
  { code: "EN", label: "English" },
  { code: "PT", label: "Português" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
  { code: "IT", label: "Italiano" },
  { code: "JA", label: "日本語" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const [exploreOpen, setExploreOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const exploreRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  const t = translations[language];

  const exploreItems = [
    {
      label: t.concertMap,
      href: "/concert-map",
    },
    {
      label: t.music,
      href: "/music",
    },
    {
      label: t.filmTvStage,
      href: "/film-tv-stage",
    },
    {
      label: t.awards,
      href: "/awards",
    },
    {
      label: t.worldNews,
      href: "/world-news",
    },
    {
      label: t.worldMessages,
      href: "/messages",
    },
    {
      label: t.fanMemories,
      href: "/fan-memories",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        exploreRef.current &&
        !exploreRef.current.contains(target)
      ) {
        setExploreOpen(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(target)
      ) {
        setLanguageOpen(false);
      }

      if (
        mobileRef.current &&
        !mobileRef.current.contains(target)
      ) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    setExploreOpen(false);
    setLanguageOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const exploreActive = exploreItems.some((item) =>
    isActive(item.href)
  );

  return (
    <header className="relative z-[9999] bg-[#050607]">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-3 lg:px-10">
        <a
          href="/"
          className="relative z-[10000] flex shrink-0 items-center"
          aria-label="Ne-Yo World"
        >
          <img
            src="/ne-yo-world-logo.png.png"
            alt="Ne-Yo World"
            className="h-[105px] w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="/"
            className={`relative py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
              isActive("/")
                ? "text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            {t.home}
            {isActive("/") && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D51C24]" />
            )}
          </a>

          <a
            href="/countries"
            className={`relative py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
              isActive("/countries")
                ? "text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            {t.countries}
            {isActive("/countries") && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D51C24]" />
            )}
          </a>

          <div
            ref={exploreRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setExploreOpen((current) => !current);
                setLanguageOpen(false);
              }}
              className={`relative flex items-center gap-2 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                exploreActive || exploreOpen
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <span>{t.explore}</span>

              <span
                className={`text-[9px] text-[#D4AF37] transition-transform ${
                  exploreOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>

              {exploreActive && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D51C24]" />
              )}
            </button>

            {exploreOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] w-[285px] overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-[#08090A]/98 p-2 shadow-2xl backdrop-blur-xl">
                {exploreItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-lg px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.08em] transition ${
                      isActive(item.href)
                        ? "bg-[#D4AF37]/8 text-[#D4AF37]"
                        : "text-white/55 hover:bg-white/[0.035] hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>

                    <span className="text-[#D51C24] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/ne-yo"
            className={`relative py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
              isActive("/ne-yo")
                ? "text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            {t.neyo}
            {isActive("/ne-yo") && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D51C24]" />
            )}
          </a>

          <a
            href="/about"
            className={`relative py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
              isActive("/about")
                ? "text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            {t.about}
            {isActive("/about") && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D51C24]" />
            )}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href="/join"
            className="hidden items-center gap-7 rounded-xl border border-[#D51C24]/55 bg-[#D51C24]/[0.035] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.09em] text-white transition hover:border-[#D4AF37] lg:flex"
          >
            <span>{t.join}</span>
            <span className="text-[#D51C24]">→</span>
          </a>

          <div
            ref={languageRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setLanguageOpen((current) => !current);
                setExploreOpen(false);
              }}
              className="flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-black/30 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/80 transition hover:border-[#D4AF37]/60 hover:text-white sm:px-5"
            >
              <span className="text-white/50">◉</span>
              <span>{language}</span>
              <span className="text-[#D4AF37]">⌄</span>
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[180px] overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-[#08090A]/98 p-1 shadow-2xl backdrop-blur-xl">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => {
                      setLanguage(option.code);
                      setLanguageOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-[10px] uppercase tracking-[0.1em] transition ${
                      language === option.code
                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "text-white/55 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span>{option.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={mobileRef} className="relative lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileOpen((current) => !current);
                setLanguageOpen(false);
                setExploreOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-black/30 text-white/80 transition hover:border-[#D4AF37]/60 hover:text-white"
              aria-label={t.openMenu}
              aria-expanded={mobileOpen}
            >
              <span className="flex w-[17px] flex-col gap-[4px]" aria-hidden="true">
                <span className={`h-px w-full bg-current transition ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`h-px w-full bg-current transition ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`h-px w-full bg-current transition ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>

            {mobileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-[10020] w-[min(330px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#08090A]/[0.99] p-2 shadow-2xl backdrop-blur-xl">
                <a
                  href="/"
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                    isActive("/") ? "bg-[#D4AF37]/8 text-[#D4AF37]" : "text-white/70 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  <span>{t.home}</span><span className="text-[#D51C24]">→</span>
                </a>

                <a
                  href="/countries"
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                    isActive("/countries") ? "bg-[#D4AF37]/8 text-[#D4AF37]" : "text-white/70 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  <span>{t.countries}</span><span className="text-[#D51C24]">→</span>
                </a>

                <div className="my-1 border-y border-[#D4AF37]/10 py-1">
                  <p className="px-4 pb-1 pt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]/75">
                    {t.explore}
                  </p>
                  {exploreItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.07em] transition ${
                        isActive(item.href) ? "bg-[#D4AF37]/8 text-[#D4AF37]" : "text-white/55 hover:bg-white/[0.035] hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span><span className="text-[#D51C24]">→</span>
                    </a>
                  ))}
                </div>

                <a
                  href="/ne-yo"
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                    isActive("/ne-yo") ? "bg-[#D4AF37]/8 text-[#D4AF37]" : "text-white/70 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  <span>{t.neyo}</span><span className="text-[#D51C24]">→</span>
                </a>

                <a
                  href="/about"
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                    isActive("/about") ? "bg-[#D4AF37]/8 text-[#D4AF37]" : "text-white/70 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  <span>{t.about}</span><span className="text-[#D51C24]">→</span>
                </a>

                <a
                  href="/join"
                  className="mt-1 flex items-center justify-between rounded-xl border border-[#D51C24]/35 bg-[#D51C24]/5 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.09em] text-white transition hover:border-[#D4AF37]/60"
                >
                  <span>{t.join}</span><span className="text-[#D51C24]">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
