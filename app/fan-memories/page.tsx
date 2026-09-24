"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { useLanguage } from "../context/LanguageContext";

type PublicMedia = {
  id: string;
  media_type: "image" | "video";
  mime_type: string;
  file_size_bytes: number;
  duration_seconds: number | null;
  display_order: number;
  url: string;
};

type PublicMemory = {
  id: string;
  display_name: string;
  country_code: string;
  original_language: string;
  story: string;
  memory_date: string | null;
  created_at: string;
  media: PublicMedia[];
};

const COPY: Record<string, any> = {
  EN: {
    eyebrow: "FAN MEMORIES",
    title: "Memories From Around the World",
    intro: "Stories, photos and moments shared by Ne-Yo fans from different countries.",
    shareTitle: "Share Your Ne-Yo Memory",
    shareIntro: "A concert, a song, a meeting or a moment you will never forget. Share your story with fans around the world.",
    approvedTitle: "Fan memories",
    approvedIntro: "Memories shared by fans around the world.",
    empty: "No fan memories yet.",
    name: "Name or nickname",
    country: "Country",
    date: "Date of the memory (optional)",
    story: "Your memory",
    media: "Photos or video (optional)",
    mediaHelp: "Up to 5 photos (10 MB each) or 1 video up to 60 seconds / 25 MB.",
    submit: "Send Memory",
    sending: "Sending…",
    successTitle: "Memory received",
    success: "Thank you. Your memory was sent for moderation and will only appear publicly after approval.",
    moderation: "All submissions are reviewed before appearing on Ne-Yo World.",
    consent: "I authorize Ne-Yo World to receive, review and, if approved, publish this memory and any files I submit.",
    choose: "Choose a country",
    error: "We couldn't send your memory. Please check the fields and try again.",
    loading: "Loading memories…",
    memoryDate: "Memory date",
    translate: "Translate",
    translationLabel: "Translation",
    translating: "Translating…",
    original: "Original",
    translationError: "Translation is temporarily unavailable.",
    jumpMemories: "Explore memories",
    jumpShare: "Share your memory",
    loadMore: "Load more",
  },
  PT: {
    eyebrow: "MEMÓRIAS DOS FÃS",
    title: "Memórias de todo o mundo",
    intro: "Histórias, fotografias e momentos partilhados por fãs de Ne-Yo de diferentes países.",
    shareTitle: "Partilha a tua memória de Ne-Yo",
    shareIntro: "Um concerto, uma música, um encontro ou um momento que nunca vais esquecer. Partilha a tua história com fãs de todo o mundo.",
    approvedTitle: "Memórias dos fãs",
    approvedIntro: "Memórias partilhadas por fãs de todo o mundo.",
    empty: "Ainda não existem memórias de fãs.",
    name: "Nome ou nickname",
    country: "País",
    date: "Data da memória (opcional)",
    story: "A tua memória",
    media: "Fotos ou vídeo (opcional)",
    mediaHelp: "Até 5 fotos (10 MB cada) ou 1 vídeo até 60 segundos / 25 MB.",
    submit: "Enviar memória",
    sending: "A enviar…",
    successTitle: "Memória recebida",
    success: "Obrigado. A tua memória foi enviada para moderação e só ficará pública depois de aprovada.",
    moderation: "Todas as submissões são revistas antes de aparecerem no Ne-Yo World.",
    consent: "Autorizo o Ne-Yo World a receber, analisar e, caso seja aprovada, publicar esta memória e os ficheiros que enviar.",
    choose: "Escolhe um país",
    error: "Não foi possível enviar a memória. Verifica os campos e tenta novamente.",
    loading: "A carregar memórias…",
    memoryDate: "Data da memória",
    translate: "Traduzir",
    translationLabel: "Tradução",
    translating: "A traduzir…",
    original: "Original",
    translationError: "A tradução está temporariamente indisponível.",
    jumpMemories: "Explorar memórias",
    jumpShare: "Partilha a tua memória",
    loadMore: "Ver mais",
  },
  ES: {
    eyebrow: "RECUERDOS DE FANS",
    title: "Recuerdos de todo el mundo",
    intro: "Historias, fotos y momentos compartidos por fans de Ne-Yo de distintos países.",
    shareTitle: "Comparte tu recuerdo de Ne-Yo",
    shareIntro: "Un concierto, una canción, un encuentro o un momento que nunca olvidarás. Comparte tu historia con fans de todo el mundo.",
    approvedTitle: "Recuerdos de fans",
    approvedIntro: "Recuerdos compartidos por fans de todo el mundo.",
    empty: "Todavía no hay recuerdos de fans.",
    name: "Nombre o apodo",
    country: "País",
    date: "Fecha del recuerdo (opcional)",
    story: "Tu recuerdo",
    media: "Fotos o vídeo (opcional)",
    mediaHelp: "Hasta 5 fotos (10 MB cada una) o 1 vídeo de hasta 60 segundos / 25 MB.",
    submit: "Enviar recuerdo",
    sending: "Enviando…",
    successTitle: "Recuerdo recibido",
    success: "Gracias. Tu recuerdo fue enviado para moderación y solo aparecerá públicamente después de ser aprobado.",
    moderation: "Todas las contribuciones se revisan antes de aparecer en Ne-Yo World.",
    consent: "Autorizo a Ne-Yo World a recibir, revisar y, si se aprueba, publicar este recuerdo y los archivos que envíe.",
    choose: "Elige un país",
    error: "No se pudo enviar el recuerdo. Revisa los campos e inténtalo de nuevo.",
    loading: "Cargando recuerdos…",
    memoryDate: "Fecha del recuerdo",
    translate: "Traducir",
    translationLabel: "Traducción",
    translating: "Traduciendo…",
    original: "Original",
    translationError: "La traducción no está disponible temporalmente.",
    jumpMemories: "Explorar recuerdos",
    jumpShare: "Comparte tu recuerdo",
    loadMore: "Ver más",
  },
  FR: {
    eyebrow: "SOUVENIRS DES FANS",
    title: "Souvenirs du monde entier",
    intro: "Histoires, photos et moments partagés par des fans de Ne-Yo de différents pays.",
    shareTitle: "Partagez votre souvenir de Ne-Yo",
    shareIntro: "Un concert, une chanson, une rencontre ou un moment inoubliable. Partagez votre histoire avec les fans du monde entier.",
    approvedTitle: "Souvenirs des fans",
    approvedIntro: "Souvenirs partagés par des fans du monde entier.",
    empty: "Aucun souvenir de fan pour le moment.",
    name: "Nom ou pseudo",
    country: "Pays",
    date: "Date du souvenir (facultatif)",
    story: "Votre souvenir",
    media: "Photos ou vidéo (facultatif)",
    mediaHelp: "Jusqu’à 5 photos (10 Mo chacune) ou 1 vidéo de 60 secondes / 25 Mo maximum.",
    submit: "Envoyer le souvenir",
    sending: "Envoi…",
    successTitle: "Souvenir reçu",
    success: "Merci. Votre souvenir a été envoyé pour modération et ne sera public qu’après approbation.",
    moderation: "Toutes les contributions sont vérifiées avant d’apparaître sur Ne-Yo World.",
    consent: "J’autorise Ne-Yo World à recevoir, examiner et, en cas d’approbation, publier ce souvenir ainsi que les fichiers que j’envoie.",
    choose: "Choisissez un pays",
    error: "Impossible d’envoyer le souvenir. Vérifiez les champs et réessayez.",
    loading: "Chargement des souvenirs…",
    memoryDate: "Date du souvenir",
    translate: "Traduire",
    translationLabel: "Traduction",
    translating: "Traduction…",
    original: "Original",
    translationError: "La traduction est temporairement indisponible.",
    jumpMemories: "Explorer les souvenirs",
    jumpShare: "Partagez votre souvenir",
    loadMore: "Voir plus",
  },
  DE: {
    eyebrow: "FAN-ERINNERUNGEN",
    title: "Erinnerungen aus aller Welt",
    intro: "Geschichten, Fotos und Momente von Ne-Yo-Fans aus verschiedenen Ländern.",
    shareTitle: "Teile deine Ne-Yo-Erinnerung",
    shareIntro: "Ein Konzert, ein Song, eine Begegnung oder ein Moment, den du nie vergessen wirst. Teile deine Geschichte mit Fans auf der ganzen Welt.",
    approvedTitle: "Fan-Erinnerungen",
    approvedIntro: "Erinnerungen von Fans aus aller Welt.",
    empty: "Noch keine Fan-Erinnerungen.",
    name: "Name oder Nickname",
    country: "Land",
    date: "Datum der Erinnerung (optional)",
    story: "Deine Erinnerung",
    media: "Fotos oder Video (optional)",
    mediaHelp: "Bis zu 5 Fotos (je 10 MB) oder 1 Video bis 60 Sekunden / 25 MB.",
    submit: "Erinnerung senden",
    sending: "Wird gesendet…",
    successTitle: "Erinnerung erhalten",
    success: "Danke. Deine Erinnerung wurde zur Moderation gesendet und erscheint erst nach Freigabe öffentlich.",
    moderation: "Alle Einsendungen werden geprüft, bevor sie auf Ne-Yo World erscheinen.",
    consent: "Ich erlaube Ne-Yo World, diese Erinnerung und die von mir eingereichten Dateien zu empfangen, zu prüfen und nach Freigabe zu veröffentlichen.",
    choose: "Land auswählen",
    error: "Die Erinnerung konnte nicht gesendet werden. Prüfe die Felder und versuche es erneut.",
    loading: "Erinnerungen werden geladen…",
    memoryDate: "Datum der Erinnerung",
    translate: "Übersetzen",
    translationLabel: "Übersetzung",
    translating: "Wird übersetzt…",
    original: "Original",
    translationError: "Die Übersetzung ist vorübergehend nicht verfügbar.",
    jumpMemories: "Erinnerungen entdecken",
    jumpShare: "Teile deine Erinnerung",
    loadMore: "Mehr anzeigen",
  },
  IT: {
    eyebrow: "RICORDI DEI FAN",
    title: "Ricordi da tutto il mondo",
    intro: "Storie, foto e momenti condivisi dai fan di Ne-Yo di diversi paesi.",
    shareTitle: "Condividi il tuo ricordo di Ne-Yo",
    shareIntro: "Un concerto, una canzone, un incontro o un momento che non dimenticherai mai. Condividi la tua storia con i fan di tutto il mondo.",
    approvedTitle: "Ricordi dei fan",
    approvedIntro: "Ricordi condivisi dai fan di tutto il mondo.",
    empty: "Non ci sono ancora ricordi dei fan.",
    name: "Nome o nickname",
    country: "Paese",
    date: "Data del ricordo (opzionale)",
    story: "Il tuo ricordo",
    media: "Foto o video (opzionale)",
    mediaHelp: "Fino a 5 foto (10 MB ciascuna) oppure 1 video fino a 60 secondi / 25 MB.",
    submit: "Invia ricordo",
    sending: "Invio…",
    successTitle: "Ricordo ricevuto",
    success: "Grazie. Il tuo ricordo è stato inviato alla moderazione e sarà pubblico solo dopo l’approvazione.",
    moderation: "Tutti gli invii vengono controllati prima di apparire su Ne-Yo World.",
    consent: "Autorizzo Ne-Yo World a ricevere, esaminare e, se approvato, pubblicare questo ricordo e i file che invio.",
    choose: "Scegli un paese",
    error: "Impossibile inviare il ricordo. Controlla i campi e riprova.",
    loading: "Caricamento dei ricordi…",
    memoryDate: "Data del ricordo",
    translate: "Traduci",
    translationLabel: "Traduzione",
    translating: "Traduzione…",
    original: "Originale",
    translationError: "La traduzione è temporaneamente non disponibile.",
    jumpMemories: "Esplora i ricordi",
    jumpShare: "Condividi il tuo ricordo",
    loadMore: "Mostra altro",
  },
  JA: {
    eyebrow: "ファンメモリーズ",
    title: "世界中から届いた思い出",
    intro: "さまざまな国のNe-Yoファンが共有したストーリー、写真、思い出の瞬間。",
    shareTitle: "Ne-Yoとの思い出をシェア",
    shareIntro: "コンサート、曲、出会い、忘れられない瞬間。あなたのストーリーを世界中のファンと共有してください。",
    approvedTitle: "ファンメモリーズ",
    approvedIntro: "世界中のファンから寄せられた思い出です。",
    empty: "まだファンの思い出はありません。",
    name: "名前またはニックネーム",
    country: "国",
    date: "思い出の日付（任意）",
    story: "あなたの思い出",
    media: "写真または動画（任意）",
    mediaHelp: "写真は最大5枚（各10MB）、または60秒・25MBまでの動画1本。",
    submit: "思い出を送信",
    sending: "送信中…",
    successTitle: "受け付けました",
    success: "ありがとうございます。投稿はモデレーションに送られ、承認後にのみ公開されます。",
    moderation: "すべての投稿はNe-Yo Worldに掲載される前に確認されます。",
    consent: "Ne-Yo Worldがこの思い出と送信したファイルを受け取り、確認し、承認された場合に公開することに同意します。",
    choose: "国を選択",
    error: "送信できませんでした。入力内容を確認してもう一度お試しください。",
    loading: "思い出を読み込み中…",
    memoryDate: "思い出の日付",
    translate: "翻訳",
    translationLabel: "翻訳",
    translating: "翻訳中…",
    original: "原文",
    translationError: "翻訳は現在利用できません。",
    jumpMemories: "思い出を見る",
    jumpShare: "思い出をシェア",
    loadMore: "もっと見る",
  },
};

const COUNTRIES = [
  ["PT", "Portugal"], ["BR", "Brazil"], ["US", "United States"], ["GB", "United Kingdom"],
  ["ES", "Spain"], ["FR", "France"], ["DE", "Germany"], ["IT", "Italy"], ["JP", "Japan"],
  ["CA", "Canada"], ["MX", "Mexico"], ["NL", "Netherlands"], ["BE", "Belgium"], ["CH", "Switzerland"],
  ["AT", "Austria"], ["IE", "Ireland"], ["SE", "Sweden"], ["NO", "Norway"], ["DK", "Denmark"],
  ["FI", "Finland"], ["AU", "Australia"], ["NZ", "New Zealand"], ["ZA", "South Africa"],
  ["AE", "United Arab Emirates"],
];

const COUNTRY_NAMES = Object.fromEntries(COUNTRIES);

function getCountryName(code: string, language: string) {
  const localeMap: Record<string, string> = {
    EN: "en-US",
    PT: "pt-PT",
    ES: "es-ES",
    FR: "fr-FR",
    DE: "de-DE",
    IT: "it-IT",
    JA: "ja-JP",
  };

  try {
    const displayNames = new Intl.DisplayNames(
      [localeMap[language] || "en-US"],
      { type: "region" }
    );
    return displayNames.of(code) || COUNTRY_NAMES[code] || code;
  } catch {
    return COUNTRY_NAMES[code] || code;
  }
}

function formatDate(value: string, language: string) {
  try {
    const localeMap: Record<string, string> = {
      EN: "en-US", PT: "pt-PT", ES: "es-ES", FR: "fr-FR",
      DE: "de-DE", IT: "it-IT", JA: "ja-JP",
    };
    return new Intl.DateTimeFormat(localeMap[language] || "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`));
  } catch {
    return value;
  }
}

export default function FanMemoriesPage() {
  const { language } = useLanguage();
  const lang = String(language || "EN").toUpperCase();
  const t = COPY[lang] || COPY.EN;

  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const [memories, setMemories] = useState<PublicMemory[]>([]);
  const [loadingMemories, setLoadingMemories] = useState(true);
  const [memoriesError, setMemoriesError] = useState("");
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [translationTargets, setTranslationTargets] = useState<Record<string, string>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [translationErrors, setTranslationErrors] = useState<Record<string, string>>({});
  const [visibleCount, setVisibleCount] = useState(9);

  const fileLabel = useMemo(() => files.map((f) => f.name).join(", "), [files]);

  async function loadMemories() {
    setLoadingMemories(true);
    setMemoriesError("");

    try {
      const res = await fetch("/api/fan-memories/public", { cache: "no-store" });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(body.error || "Failed to load memories.");
      setMemories(Array.isArray(body.memories) ? body.memories : []);
      setVisibleCount(9);
    } catch (err) {
      setMemoriesError(err instanceof Error ? err.message : "Failed to load memories.");
    } finally {
      setLoadingMemories(false);
    }
  }

  useEffect(() => {
    loadMemories();
  }, []);

  useEffect(() => {
    setTranslations({});
    setTranslationTargets({});
    setTranslationErrors({});
    setTranslatingId(null);
  }, [lang]);

  async function translateMemory(memory: PublicMemory) {
    const target = String(lang || "EN").toLowerCase().slice(0, 2);

    setTranslationErrors((current) => ({ ...current, [memory.id]: "" }));
    setTranslatingId(memory.id);

    try {
      const res = await fetch("/api/fan-memories/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memory_id: memory.id,
          target_language: target,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok || typeof body?.translated_story !== "string") {
        throw new Error(body?.error || t.translationError);
      }

      setTranslations((current) => ({
        ...current,
        [memory.id]: body.translated_story,
      }));

      setTranslationTargets((current) => ({
        ...current,
        [memory.id]: target,
      }));
    } catch (err) {
      setTranslationErrors((current) => ({
        ...current,
        [memory.id]: err instanceof Error ? err.message : t.translationError,
      }));
    } finally {
      setTranslatingId(null);
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setDone(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.delete("media");
    files.forEach((file) => data.append("media", file));
    data.set("original_language", lang.toLowerCase());

    if (files.length > 5) {
      setError(t.mediaHelp);
      return;
    }

    const videoFiles = files.filter((f) => f.type === "video/mp4" || f.type === "video/webm");
    const imageFiles = files.filter((f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type));

    if (videoFiles.length > 1 || (videoFiles.length && imageFiles.length)) {
      setError(t.mediaHelp);
      return;
    }

    if (
      imageFiles.some((f) => f.size > 10 * 1024 * 1024) ||
      videoFiles.some((f) => f.size > 25 * 1024 * 1024)
    ) {
      setError(t.mediaHelp);
      return;
    }

    setBusy(true);

    try {
      const res = await fetch("/api/fan-memories/submit", {
        method: "POST",
        body: data,
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || t.error);

      form.reset();
      setFiles([]);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen scroll-smooth bg-black text-white">
      <SiteHeader />

      <section className="mx-auto max-w-[1180px] px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="text-[10px] font-semibold tracking-[0.28em] text-amber-400">
            {t.eyebrow}
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-[15px] leading-7 text-white/65 md:text-base">
            {t.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-3 px-5 pb-12 md:px-8">
        <a
          href="#memories"
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65 transition hover:border-amber-400/35 hover:text-amber-300"
        >
          {t.jumpMemories} ↓
        </a>
        <a
          href="#share-memory"
          className="rounded-full border border-amber-400/25 bg-amber-400/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300/85 transition hover:border-amber-400/50 hover:bg-amber-400/[0.08]"
        >
          {t.jumpShare} ↓
        </a>
      </div>

      <section id="memories" className="mx-auto max-w-[1180px] scroll-mt-24 px-5 pb-20 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            {t.approvedTitle}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-7 text-white/55">
            {t.approvedIntro}
          </p>
        </div>

        {loadingMemories ? (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.025] px-6 py-10 text-sm text-white/45">
            {t.loading}
          </div>
        ) : memoriesError ? (
          <div className="rounded-[22px] border border-red-500/20 bg-red-500/[0.06] px-6 py-5 text-sm text-red-200">
            {memoriesError}
          </div>
        ) : memories.length === 0 ? (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.025] px-6 py-10 text-sm text-white/45">
            {t.empty}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {memories.slice(0, visibleCount).map((memory) => (
              <article
                key={memory.id}
                className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03]"
              >
                {memory.media.length > 0 && (
                  <div className="border-b border-white/10 bg-black/60">
                    {memory.media[0].media_type === "video" ? (
                      <video
                        src={memory.media[0].url}
                        controls
                        preload="metadata"
                        playsInline
                        className="aspect-[4/3] w-full bg-black object-contain"
                      />
                    ) : memory.media.length === 1 ? (
                      <button
                        type="button"
                        onClick={() => setOpenImage(memory.media[0].url)}
                        className="block w-full cursor-zoom-in"
                        aria-label="Open full image"
                      >
                        <img
                          src={memory.media[0].url}
                          alt=""
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-px bg-white/10">
                        {memory.media.map((media) => (
                          <button
                            key={media.id}
                            type="button"
                            onClick={() => setOpenImage(media.url)}
                            className="block cursor-zoom-in"
                            aria-label="Open full image"
                          >
                            <img
                              src={media.url}
                              alt=""
                              loading="lazy"
                              className="aspect-[4/3] w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-lg font-semibold">{memory.display_name}</h3>
                    <span className="rounded-full border border-amber-400/25 bg-amber-400/[0.06] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-amber-300">
                      {getCountryName(memory.country_code, language)}
                    </span>
                  </div>

                  {memory.memory_date && (
                    <div className="mt-3 text-[11px] uppercase tracking-[0.12em] text-white/35">
                      {t.memoryDate}: {formatDate(memory.memory_date, lang)}
                    </div>
                  )}

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-white/70">
                    {memory.story}
                  </p>

                  {Object.prototype.hasOwnProperty.call(translations, memory.id) && (
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300/80">
                          {t.translationLabel}
                        </div>
                        {translationTargets[memory.id] && (
                          <div className="text-[10px] uppercase tracking-[0.12em] text-white/30">
                            {translationTargets[memory.id]}
                          </div>
                        )}
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/60">
                        {translations[memory.id]}
                      </p>
                    </div>
                  )}

                  {translationErrors[memory.id] && (
                    <div className="mt-3 text-xs text-red-300/80">
                      {translationErrors[memory.id]}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => translateMemory(memory)}
                      disabled={translatingId === memory.id}
                      className="rounded-full border border-white/12 px-3.5 py-2 text-xs text-white/70 transition hover:border-amber-400/40 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {translatingId === memory.id ? t.translating : t.translate}
                    </button>

                    {Object.prototype.hasOwnProperty.call(translations, memory.id) && (
                      <button
                        type="button"
                        onClick={() => {
                          setTranslations((current) => {
                            const next = { ...current };
                            delete next[memory.id];
                            return next;
                          });
                          setTranslationTargets((current) => {
                            const next = { ...current };
                            delete next[memory.id];
                            return next;
                          });
                        }}
                        className="text-xs text-white/35 hover:text-white/60"
                      >
                        {t.original}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loadingMemories && !memoriesError && memories.length > visibleCount && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + 9)}
              className="rounded-full border border-white/12 bg-white/[0.025] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65 transition hover:border-amber-400/40 hover:text-amber-300"
            >
              {t.loadMore}
            </button>
          </div>
        )}
      </section>

      <section id="share-memory" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-[820px] text-center">
            <div className="text-[10px] font-semibold tracking-[0.28em] text-amber-400">
              {t.eyebrow}
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
              {t.shareTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-7 text-white/60">
              {t.shareIntro}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-[820px] rounded-[24px] border border-white/10 bg-white/[0.035] p-6 md:p-8">
            {done ? (
              <div className="py-12 text-center">
                <div className="text-2xl font-semibold">{t.successTitle}</div>
                <p className="mx-auto mt-4 max-w-[580px] text-[15px] leading-7 text-white/65">
                  {t.success}
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm hover:bg-white/5"
                >
                  {t.submit}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/55">
                      {t.name}
                    </span>
                    <input
                      name="display_name"
                      required
                      maxLength={80}
                      className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm outline-none focus:border-amber-400/60"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/55">
                      {t.country}
                    </span>
                    <select
                      name="country_code"
                      required
                      defaultValue=""
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3.5 text-sm outline-none focus:border-amber-400/60"
                    >
                      <option value="" disabled>{t.choose}</option>
                      {COUNTRIES.map(([code]) => (
                        <option key={code} value={code}>
                          {getCountryName(code, language)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/55">
                    {t.date}
                  </span>
                  <input
                    type="date"
                    name="memory_date"
                    className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm outline-none focus:border-amber-400/60"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/55">
                    {t.story}
                  </span>
                  <textarea
                    name="story"
                    required
                    minLength={10}
                    maxLength={1500}
                    rows={7}
                    className="w-full resize-y rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm leading-6 outline-none focus:border-amber-400/60"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/55">
                    {t.media}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="block w-full rounded-2xl border border-dashed border-white/15 bg-black/35 px-4 py-5 text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white"
                  />
                  <div className="mt-2 text-xs leading-5 text-white/40">{t.mediaHelp}</div>
                  {fileLabel && (
                    <div className="mt-2 truncate text-xs text-amber-300/80">
                      {fileLabel}
                    </div>
                  )}
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                  <input
                    type="checkbox"
                    name="consent"
                    value="yes"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-amber-300"
                  />
                  <span className="text-xs leading-5 text-white/55">
                    {t.consent}
                  </span>
                </label>

                {error && (
                  <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <div className="flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[480px] text-xs leading-5 text-white/40">
                    {t.moderation}
                  </p>
                  <button
                    disabled={busy}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busy ? t.sending : t.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {openImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpenImage(null)}
            className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm text-white hover:bg-white/10"
            aria-label="Close image"
          >
            ✕
          </button>

          <img
            src={openImage}
            alt=""
            className="max-h-[90vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
