"use client";

import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";


type MessageTranslation = {
  language_code: string;
  translated_text: string;
};

type Message = {
  id: string;
  name: string;
  country: string;
  original_language: string;
  original_text: string;
  created_at: string;
  world_message_translations?: MessageTranslation[];
};


const translations = {
  EN: {
    backToWorld: "Back to the World",
    fromWorld: "From the World to Ne-Yo",
    world: "World",
    messages: "Messages",
    heroText:
      "One place for fans from every country to share their messages, memories and personal stories with Ne-Yo.",
    motto: "One World - One Music - One Love",
    yourMessage: "Your message",
    leaveMessage: "Leave a message, memory or story for Ne-Yo",
    nameLabel: "Name or nickname",
    namePlaceholder: "Your name",
    countryLabel: "Country",
    countryPlaceholder: "Select your country",
    messageLabel: "Message, memory or story",
    messagePlaceholder:
      "Write your message, memory or personal story for Ne-Yo...",
    sendMessage: "Send message",
    aroundWorld: "Around the World",
    messagesFromFans: "Messages from the fans",
    messageSingular: "message",
    messagePlural: "messages",
    everyMessage: "Every message becomes part of the world",
    fromEveryCorner: "From every corner of the world,",
    oneAtTime: "one message at a time",
    exploreWorld: "Explore the World",
    countries: "Countries",
    neyo: "Ne-Yo",
    about: "About",
    jumpMessages: "Messages",
    jumpLeaveMessage: "Leave a message",
    loadMore: "Load more",
    consent: "I authorize Ne-Yo World to receive, review and, if approved, publish this message.",
  },

  PT: {
    backToWorld: "Voltar ao Mundo",
    fromWorld: "Do Mundo para Ne-Yo",
    world: "Mensagens",
    messages: "do Mundo",
    heroText:
      "Um lugar onde fãs de todos os países podem partilhar mensagens, memórias e histórias pessoais com Ne-Yo.",
    motto: "One World - One Music - One Love",
    yourMessage: "A tua mensagem",
    leaveMessage: "Deixa uma mensagem, memória ou história para Ne-Yo",
    nameLabel: "Nome ou alcunha",
    namePlaceholder: "O teu nome",
    countryLabel: "País",
    countryPlaceholder: "Seleciona o teu país",
    messageLabel: "Mensagem, memória ou história",
    messagePlaceholder:
      "Escreve a tua mensagem, memória ou história pessoal para Ne-Yo...",
    sendMessage: "Enviar mensagem",
    aroundWorld: "À volta do mundo",
    messagesFromFans: "Mensagens dos fãs",
    messageSingular: "mensagem",
    messagePlural: "mensagens",
    everyMessage: "Cada mensagem torna-se parte deste mundo",
    fromEveryCorner: "De todos os cantos do mundo,",
    oneAtTime: "uma mensagem de cada vez",
    exploreWorld: "Explorar o mundo",
    countries: "Países",
    neyo: "Ne-Yo",
    about: "Sobre",
    jumpMessages: "Mensagens",
    jumpLeaveMessage: "Deixar uma mensagem",
    loadMore: "Ver mais",
    consent: "Autorizo o Ne-Yo World a receber, analisar e, caso seja aprovada, publicar esta mensagem.",
  },

  ES: {
    backToWorld: "Volver al mundo",
    fromWorld: "Del mundo para Ne-Yo",
    world: "Mensajes",
    messages: "del Mundo",
    heroText:
      "Un lugar donde fans de todos los países pueden compartir mensajes, recuerdos e historias personales con Ne-Yo.",
    motto: "One World - One Music - One Love",
    yourMessage: "Tu mensaje",
    leaveMessage: "Deja un mensaje, recuerdo o historia para Ne-Yo",
    nameLabel: "Nombre o apodo",
    namePlaceholder: "Tu nombre",
    countryLabel: "País",
    countryPlaceholder: "Selecciona tu país",
    messageLabel: "Mensaje, recuerdo o historia",
    messagePlaceholder:
      "Escribe tu mensaje, recuerdo o historia personal para Ne-Yo...",
    sendMessage: "Enviar mensaje",
    aroundWorld: "Alrededor del mundo",
    messagesFromFans: "Mensajes de los fans",
    messageSingular: "mensaje",
    messagePlural: "mensajes",
    everyMessage: "Cada mensaje pasa a formar parte de este mundo",
    fromEveryCorner: "Desde todos los rincones del mundo,",
    oneAtTime: "un mensaje a la vez",
    exploreWorld: "Explorar el mundo",
    countries: "Países",
    neyo: "Ne-Yo",
    about: "Acerca de",
    jumpMessages: "Mensajes",
    jumpLeaveMessage: "Dejar un mensaje",
    loadMore: "Ver más",
    consent: "Autorizo a Ne-Yo World a recibir, revisar y, si se aprueba, publicar este mensaje.",
  },

  FR: {
    backToWorld: "Retour au monde",
    fromWorld: "Du monde à Ne-Yo",
    world: "Messages",
    messages: "du monde",
    heroText:
      "Un espace où les fans de tous les pays peuvent partager leurs messages, souvenirs et histoires personnelles avec Ne-Yo.",
    motto: "One World - One Music - One Love",
    yourMessage: "Votre message",
    leaveMessage: "Laissez un message, un souvenir ou une histoire à Ne-Yo",
    nameLabel: "Nom ou pseudo",
    namePlaceholder: "Votre nom",
    countryLabel: "Pays",
    countryPlaceholder: "Sélectionnez votre pays",
    messageLabel: "Message, souvenir ou histoire",
    messagePlaceholder:
      "Écrivez votre message, votre souvenir ou votre histoire personnelle pour Ne-Yo...",
    sendMessage: "Envoyer le message",
    aroundWorld: "Autour du monde",
    messagesFromFans: "Messages des fans",
    messageSingular: "message",
    messagePlural: "messages",
    everyMessage: "Chaque message devient une partie de ce monde",
    fromEveryCorner: "Depuis tous les coins du monde,",
    oneAtTime: "un message à la fois",
    exploreWorld: "Explorer le monde",
    countries: "Pays",
    neyo: "Ne-Yo",
    about: "À propos",
    jumpMessages: "Messages",
    jumpLeaveMessage: "Laisser un message",
    loadMore: "Voir plus",
    consent: "J’autorise Ne-Yo World à recevoir, examiner et, si ce message est approuvé, à le publier.",
  },

  DE: {
    backToWorld: "Zurück zur Welt",
    fromWorld: "Aus der Welt für Ne-Yo",
    world: "Nachrichten",
    messages: "aus aller Welt",
    heroText:
      "Ein Ort, an dem Fans aus allen Ländern Nachrichten, Erinnerungen und persönliche Geschichten mit Ne-Yo teilen können.",
    motto: "One World - One Music - One Love",
    yourMessage: "Deine Nachricht",
    leaveMessage: "Hinterlasse Ne-Yo eine Nachricht, Erinnerung oder Geschichte",
    nameLabel: "Name oder Spitzname",
    namePlaceholder: "Dein Name",
    countryLabel: "Land",
    countryPlaceholder: "Wähle dein Land",
    messageLabel: "Nachricht, Erinnerung oder Geschichte",
    messagePlaceholder:
      "Schreibe deine Nachricht, Erinnerung oder persönliche Geschichte für Ne-Yo...",
    sendMessage: "Nachricht senden",
    aroundWorld: "Rund um die Welt",
    messagesFromFans: "Nachrichten der Fans",
    messageSingular: "Nachricht",
    messagePlural: "Nachrichten",
    everyMessage: "Jede Nachricht wird Teil dieser Welt",
    fromEveryCorner: "Aus allen Ecken der Welt,",
    oneAtTime: "eine Nachricht nach der anderen",
    exploreWorld: "Die Welt entdecken",
    countries: "Länder",
    neyo: "Ne-Yo",
    about: "Über",
    jumpMessages: "Nachrichten",
    jumpLeaveMessage: "Nachricht hinterlassen",
    loadMore: "Mehr anzeigen",
    consent: "Ich erlaube Ne-Yo World, diese Nachricht zu erhalten, zu prüfen und, falls sie genehmigt wird, zu veröffentlichen.",
  },

  IT: {
    backToWorld: "Torna al mondo",
    fromWorld: "Dal mondo a Ne-Yo",
    world: "Messaggi",
    messages: "dal mondo",
    heroText:
      "Uno spazio in cui i fan di ogni paese possono condividere messaggi, ricordi e storie personali con Ne-Yo.",
    motto: "One World - One Music - One Love",
    yourMessage: "Il tuo messaggio",
    leaveMessage: "Lascia un messaggio, un ricordo o una storia per Ne-Yo",
    nameLabel: "Nome o nickname",
    namePlaceholder: "Il tuo nome",
    countryLabel: "Paese",
    countryPlaceholder: "Seleziona il tuo paese",
    messageLabel: "Messaggio, ricordo o storia",
    messagePlaceholder:
      "Scrivi il tuo messaggio, ricordo o storia personale per Ne-Yo...",
    sendMessage: "Invia messaggio",
    aroundWorld: "Intorno al mondo",
    messagesFromFans: "Messaggi dei fan",
    messageSingular: "messaggio",
    messagePlural: "messaggi",
    everyMessage: "Ogni messaggio diventa parte di questo mondo",
    fromEveryCorner: "Da ogni angolo del mondo,",
    oneAtTime: "un messaggio alla volta",
    exploreWorld: "Esplora il mondo",
    countries: "Paesi",
    neyo: "Ne-Yo",
    about: "Informazioni",
    jumpMessages: "Messaggi",
    jumpLeaveMessage: "Lascia un messaggio",
    loadMore: "Mostra altro",
    consent: "Autorizzo Ne-Yo World a ricevere, esaminare e, se approvato, pubblicare questo messaggio.",
  },

  JA: {
    backToWorld: "ワールドに戻る",
    fromWorld: "世界からNe-Yoへ",
    world: "世界からの",
    messages: "メッセージ",
    heroText:
      "世界中のファンがNe-Yoへのメッセージ、思い出、自分自身のストーリーを共有できる場所です。",
    motto: "One World - One Music - One Love",
    yourMessage: "あなたのメッセージ",
    leaveMessage: "Ne-Yoへメッセージ、思い出、ストーリーを届けよう",
    nameLabel: "名前またはニックネーム",
    namePlaceholder: "あなたの名前",
    countryLabel: "国",
    countryPlaceholder: "国を選択",
    messageLabel: "メッセージ、思い出、ストーリー",
    messagePlaceholder:
      "Ne-Yoへのメッセージ、思い出、あなた自身のストーリーを書いてください...",
    sendMessage: "メッセージを送る",
    aroundWorld: "世界中から",
    messagesFromFans: "ファンからのメッセージ",
    messageSingular: "件のメッセージ",
    messagePlural: "件のメッセージ",
    everyMessage: "すべてのメッセージがこの世界の一部になる",
    fromEveryCorner: "世界のあらゆる場所から、",
    oneAtTime: "ひとつずつメッセージを",
    exploreWorld: "世界を探索する",
    countries: "国々",
    neyo: "Ne-Yo",
    about: "このプロジェクトについて",
    jumpMessages: "メッセージを見る",
    jumpLeaveMessage: "メッセージを送る",
    loadMore: "もっと見る",
    consent: "Ne-Yo Worldがこのメッセージを受け取り、確認し、承認された場合に公開することを許可します。",
  },
};



const countryCodes = [
  "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI",
  "CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE",
  "SZ","ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM",
  "JP","JO","KZ","KE","KI","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD",
  "MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","KP","MK","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PL","PT",
  "QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","KR","SS","ES","LK","SD","SR","SE",
  "CH","SY","TW","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV","UG","UA","AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
] as const;

const languageLocales = {
  EN: "en",
  PT: "pt-PT",
  ES: "es",
  FR: "fr",
  DE: "de",
  IT: "it",
  JA: "ja",
} as const;

const messageUi = {
  EN: {
    sending: "Sending...",
    sent: "Thank you. Your message was sent for approval.",
    error: "We couldn't send your message. Please try again.",
    loading: "Loading messages...",
    empty: "No messages yet.",
    translate: "Translate",
    hideTranslation: "Hide translation",
    translation: "Translation",
    noTranslation: "Translation not available yet.",
    translating: "Translating...",
    translationError: "Could not translate this message. Please try again.",
  },
  PT: {
    sending: "A enviar...",
    sent: "Obrigado. A tua mensagem foi enviada para aprovação.",
    error: "Não foi possível enviar a mensagem. Tenta novamente.",
    loading: "A carregar mensagens...",
    empty: "Ainda não existem mensagens.",
    translate: "Traduzir",
    hideTranslation: "Ocultar tradução",
    translation: "Tradução",
    noTranslation: "Tradução ainda não disponível.",
    translating: "A traduzir...",
    translationError: "Não foi possível traduzir esta mensagem. Tenta novamente.",
  },
  ES: {
    sending: "Enviando...",
    sent: "Gracias. Tu mensaje se ha enviado para su aprobación.",
    error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
    loading: "Cargando mensajes...",
    empty: "Todavía no hay mensajes.",
    translate: "Traducir",
    hideTranslation: "Ocultar traducción",
    translation: "Traducción",
    noTranslation: "La traducción aún no está disponible.",
    translating: "Traduciendo...",
    translationError: "No se pudo traducir este mensaje. Inténtalo de nuevo.",
  },
  FR: {
    sending: "Envoi...",
    sent: "Merci. Votre message a été envoyé pour approbation.",
    error: "Impossible d’envoyer votre message. Réessayez.",
    loading: "Chargement des messages...",
    empty: "Aucun message pour le moment.",
    translate: "Traduire",
    hideTranslation: "Masquer la traduction",
    translation: "Traduction",
    noTranslation: "La traduction n’est pas encore disponible.",
    translating: "Traduction...",
    translationError: "Impossible de traduire ce message. Réessayez.",
  },
  DE: {
    sending: "Wird gesendet...",
    sent: "Danke. Deine Nachricht wurde zur Freigabe gesendet.",
    error: "Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.",
    loading: "Nachrichten werden geladen...",
    empty: "Noch keine Nachrichten.",
    translate: "Übersetzen",
    hideTranslation: "Übersetzung ausblenden",
    translation: "Übersetzung",
    noTranslation: "Übersetzung noch nicht verfügbar.",
    translating: "Wird übersetzt...",
    translationError: "Diese Nachricht konnte nicht übersetzt werden. Bitte versuche es erneut.",
  },
  IT: {
    sending: "Invio...",
    sent: "Grazie. Il tuo messaggio è stato inviato per l’approvazione.",
    error: "Non è stato possibile inviare il messaggio. Riprova.",
    loading: "Caricamento messaggi...",
    empty: "Non ci sono ancora messaggi.",
    translate: "Traduci",
    hideTranslation: "Nascondi traduzione",
    translation: "Traduzione",
    noTranslation: "Traduzione non ancora disponibile.",
    translating: "Traduzione...",
    translationError: "Impossibile tradurre questo messaggio. Riprova.",
  },
  JA: {
    sending: "送信中...",
    sent: "ありがとうございます。メッセージは承認待ちとして送信されました。",
    error: "メッセージを送信できませんでした。もう一度お試しください。",
    loading: "メッセージを読み込み中...",
    empty: "メッセージはまだありません。",
    translate: "翻訳する",
    hideTranslation: "翻訳を隠す",
    translation: "翻訳",
    noTranslation: "翻訳はまだ利用できません。",
    translating: "翻訳中...",
    translationError: "このメッセージを翻訳できませんでした。もう一度お試しください。",
  },
} as const;


export default function MessagesPage() {
  const { language } = useLanguage();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [openTranslations, setOpenTranslations] = useState<Record<string, boolean>>({});
  const [translationLoading, setTranslationLoading] = useState<Record<string, boolean>>({});
  const [translationErrors, setTranslationErrors] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const t = translations[language];
  const ui = messageUi[language];
  const currentLanguage = language.toLowerCase();

  const countryOptions = useMemo(() => {
    const displayNames = new Intl.DisplayNames(
      [languageLocales[language]],
      { type: "region" }
    );

    return countryCodes
      .map((code) => ({
        code,
        label: displayNames.of(code) ?? code,
      }))
      .sort((a, b) =>
        a.label.localeCompare(b.label, languageLocales[language])
      );
  }, [language]);

  const englishCountryNames = useMemo(
    () => new Intl.DisplayNames(["en"], { type: "region" }),
    []
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadMessages() {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("world_messages")
        .select(`
          id,
          name,
          country,
          original_language,
          original_text,
          created_at,
          world_message_translations (
            language_code,
            translated_text
          )
        `)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setMessages([]);
      } else {
        setMessages((data ?? []) as Message[]);
        setVisibleCount(12);
      }

      setIsLoading(false);
    }

    loadMessages();

    return () => {
      active = false;
    };
  }, []);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanCountryCode = country.trim();
    const cleanCountry = englishCountryNames.of(cleanCountryCode) ?? cleanCountryCode;
    const cleanMessage = message.trim();

    if (!cleanName || !cleanCountryCode || !cleanMessage || !consent || isSending) {
      return;
    }

    setIsSending(true);
    setSubmitState("idle");

    const { error } = await supabase
      .from("world_messages")
      .insert({
        name: cleanName,
        country: cleanCountry,
        original_language: currentLanguage,
        original_text: cleanMessage,
        status: "pending",
      });

    if (error) {
      setSubmitState("error");
      setIsSending(false);
      return;
    }

    setName("");
    setCountry("");
    setMessage("");
    setConsent(false);
    setSubmitState("success");
    setIsSending(false);
  }

  async function toggleTranslation(item: Message) {
    const isCurrentlyOpen = Boolean(openTranslations[item.id]);

    if (isCurrentlyOpen) {
      setOpenTranslations((current) => ({
        ...current,
        [item.id]: false,
      }));
      return;
    }

    setOpenTranslations((current) => ({
      ...current,
      [item.id]: true,
    }));

    const existingTranslation = item.world_message_translations?.find(
      (entry) => entry.language_code === currentLanguage
    );

    if (existingTranslation?.translated_text) {
      return;
    }

    if (translationLoading[item.id]) {
      return;
    }

    setTranslationLoading((current) => ({
      ...current,
      [item.id]: true,
    }));

    setTranslationErrors((current) => ({
      ...current,
      [item.id]: "",
    }));

    try {
      const response = await fetch("/api/world-messages/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: item.id,
          sourceLanguage: item.original_language,
          targetLanguage: currentLanguage,
          originalText: item.original_text,
        }),
      });

      const rawResponse = await response.text();

      let result: {
        translatedText?: string;
        error?: string;
        detail?: string;
      } = {};

      try {
        result = rawResponse ? JSON.parse(rawResponse) : {};
      } catch {
        throw new Error(
          `Translation route returned an invalid response (${response.status}).`
        );
      }

      if (!response.ok || !result?.translatedText) {
        const message = result?.detail
          ? `${result.error ?? "Translation failed"} — ${result.detail}`
          : result?.error ?? "Translation failed";

        throw new Error(message);
      }

      const translatedText = result.translatedText;

      setMessages((current) =>
        current.map((messageItem) => {
          if (messageItem.id !== item.id) {
            return messageItem;
          }

          const otherTranslations =
            messageItem.world_message_translations?.filter(
              (entry) => entry.language_code !== currentLanguage
            ) ?? [];

          return {
            ...messageItem,
            world_message_translations: [
              ...otherTranslations,
              {
                language_code: currentLanguage,
                translated_text: translatedText,
              },
            ],
          };
        })
      );
    } catch (error) {
      setTranslationErrors((current) => ({
        ...current,
        [item.id]: ui.translationError,
      }));
    } finally {
      setTranslationLoading((current) => ({
        ...current,
        [item.id]: false,
      }));
    }
  }


  return (
    <main className="min-h-screen scroll-smooth overflow-x-hidden bg-[#050607] text-white">

      {/* =====================================================
          FUNDO
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute left-[-10%] top-[10%] h-[600px] w-[600px] rounded-full bg-[#D51C24]/5 blur-[200px]" />

        <div className="absolute right-[-10%] top-[15%] h-[700px] w-[700px] rounded-full bg-[#D4AF37]/5 blur-[220px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.85)_100%)]" />

      </div>


{/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 px-6 pb-16 pt-16 text-center lg:px-10 lg:pt-20">

        <div className="mx-auto max-w-[900px]">

          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]">
            {t.fromWorld}
          </p>


          <h1 className="mt-5 text-5xl font-black uppercase tracking-[-0.05em] md:text-6xl">

            {t.world}

            <span className="text-[#D51C24]">
              {" "}
              {t.messages}
            </span>

          </h1>


          <p className="mx-auto mt-7 max-w-[650px] text-[15px] leading-7 text-white/55 md:text-[16px]">
            {t.heroText}
          </p>


          <div className="mx-auto mt-8 flex max-w-max items-center gap-3">

            <span className="h-[5px] w-[5px] rounded-full bg-[#D51C24]" />

            <p className="text-[9px] uppercase tracking-[0.28em] text-white/30">
              {t.motto}
            </p>

          </div>

        </div>

      </section>

      <div className="relative z-10 mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-3 px-6 pb-12 lg:px-10">
        <a
          href="#messages"
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
        >
          {t.jumpMessages} ↓
        </a>
        <a
          href="#leave-message"
          className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]/85 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.08]"
        >
          {t.jumpLeaveMessage} ↓
        </a>
      </div>


      {/* =====================================================
          FORMULÁRIO
      ====================================================== */}

      <section id="leave-message" className="relative z-10 scroll-mt-24 px-6 pb-20 lg:px-10">

        <div className="mx-auto max-w-[900px]">

          <form
            onSubmit={sendMessage}
            className="relative overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#090A0B]/95 p-6 md:p-8"
          >

            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-[#D51C24]/5 blur-[90px]" />


            <div className="relative z-10">

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                {t.yourMessage}
              </p>


              <h2 className="mt-3 text-2xl font-bold">
                {t.leaveMessage}
              </h2>


              <div className="mt-8 grid gap-5 md:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {t.nameLabel}
                  </label>


                  <input
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder={
                      t.namePlaceholder
                    }
                    required
                    disabled={isSending}
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/40 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                  />

                </div>


                {/* COUNTRY */}

                <div>

                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {t.countryLabel}
                  </label>


                  <select
                    value={country}
                    onChange={(event) =>
                      setCountry(event.target.value)
                    }
                    required
                    disabled={isSending}
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/40 px-4 py-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/55 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <option value="" className="bg-[#090A0B] text-white/50">
                      {t.countryPlaceholder}
                    </option>

                    {isMounted &&
                      countryOptions.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                          className="bg-[#090A0B] text-white"
                        >
                          {option.label}
                        </option>
                      ))}
                  </select>

                </div>

              </div>


              {/* MESSAGE */}

              <div className="mt-5">

                <label className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                  {t.messageLabel}
                </label>


                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  maxLength={500}
                  rows={6}
                  required
                  disabled={isSending}
                  placeholder={
                    t.messagePlaceholder
                  }
                  className="mt-3 w-full resize-none rounded-xl border border-[#D4AF37]/15 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                />


                <div className="mt-2 text-right text-[9px] text-white/20">
                  {message.length}/500
                </div>

              </div>


              <label className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  disabled={isSending}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#D4AF37]"
                />
                <span className="text-xs leading-5 text-white/55">
                  {t.consent}
                </span>
              </label>


              {/* BUTTON */}

              <button
                type="submit"
                disabled={isSending}
                className="group mt-6 flex items-center gap-6 rounded-xl border border-[#D51C24]/60 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {isSending ? ui.sending : t.sendMessage}

                <span className="text-[#D51C24] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]">
                  →
                </span>
              </button>

              {submitState === "success" && (
                <p className="mt-5 text-sm leading-6 text-[#D4AF37]">
                  {ui.sent}
                </p>
              )}

              {submitState === "error" && (
                <p className="mt-5 text-sm leading-6 text-[#D51C24]">
                  {ui.error}
                </p>
              )}

            </div>

          </form>

        </div>

      </section>


      {/* =====================================================
          MURAL
      ====================================================== */}

      <section id="messages" className="relative z-10 scroll-mt-24 border-t border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
                {t.aroundWorld}
              </p>


              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                {t.messagesFromFans}
              </h2>

            </div>


            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">

              {messages.length}{" "}

              {messages.length === 1
                ? t.messageSingular
                : t.messagePlural}

            </p>

          </div>


          {isLoading ? (
            <p className="mt-10 text-sm text-white/35">
              {ui.loading}
            </p>
          ) : messages.length === 0 ? (
            <p className="mt-10 text-sm text-white/35">
              {ui.empty}
            </p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {messages.slice(0, visibleCount).map((item) => {
                const translation = item.world_message_translations?.find(
                  (entry) => entry.language_code === currentLanguage
                );
                const canTranslate = item.original_language !== currentLanguage;
                const isOpen = Boolean(openTranslations[item.id]);

                return (
                  <article
                    key={item.id}
                    className="group rounded-2xl border border-[#D4AF37]/15 bg-[#050607] p-6 transition hover:border-[#D4AF37]/40"
                  >
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🌍</span>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#D4AF37]/60">
                            {item.country}
                          </p>
                        </div>
                      </div>

                      <span className="h-2 w-2 rounded-full bg-[#D51C24] shadow-[0_0_10px_rgba(213,28,36,0.5)]" />
                    </div>

                    <p className="mt-6 text-sm leading-7 text-white/55">
                      “{item.original_text}”
                    </p>

                    {canTranslate && (
                      <div className="mt-7 border-t border-white/5 pt-5">
                        <button
                          type="button"
                          onClick={() => toggleTranslation(item)}
                          className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]/75 transition hover:text-[#D4AF37]"
                        >
                          {isOpen ? ui.hideTranslation : ui.translate}
                        </button>

                        {isOpen && (
                          <div className="mt-4 rounded-xl border border-[#D4AF37]/10 bg-white/[0.025] p-4">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]/55">
                              {ui.translation}
                            </p>

                            <p className="mt-3 text-sm leading-7 text-white/45">
                              {translationLoading[item.id]
                                ? ui.translating
                                : translationErrors[item.id]
                                  ? translationErrors[item.id]
                                  : translation
                                    ? `“${translation.translated_text}”`
                                    : ui.noTranslation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {!isLoading && messages.length > visibleCount && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((current) => current + 12)}
                className="rounded-full border border-white/12 bg-white/[0.025] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                {t.loadMore}
              </button>
            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          FINAL
      ====================================================== */}

      <section className="relative z-10 px-6 py-20 text-center lg:px-10">

        <div className="mx-auto max-w-[750px]">

          <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]">
            {t.everyMessage}
          </p>


          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">

            {t.fromEveryCorner}

            <br />

            <span className="text-[#D51C24]">
              {t.oneAtTime}
            </span>

          </h2>


          <a
            href="/"
            className="mt-9 inline-flex items-center gap-4 rounded-xl border border-[#D4AF37]/45 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#D51C24]"
          >

            {t.exploreWorld}

            <span className="text-[#D4AF37]">
              →
            </span>

          </a>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-[#D4AF37]/10 bg-black px-6 py-8 lg:px-10">

        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 sm:flex-row">

          <a href="/">

            <img
              src="/ne-yo-world-logo.png.png"
              alt="Ne-Yo World"
              className="h-[60px] w-auto object-contain"
            />

          </a>


          <div className="flex items-center gap-6 text-[9px] uppercase tracking-[0.18em] text-white/30">

            <a
              href="/countries"
              className="transition hover:text-[#D4AF37]"
            >
              {t.countries}
            </a>


            <a
              href="/ne-yo"
              className="transition hover:text-[#D4AF37]"
            >
              {t.neyo}
            </a>


            <a
              href="/about"
              className="transition hover:text-[#D4AF37]"
            >
              {t.about}
            </a>

          </div>


          <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
            {t.motto}
          </p>

        </div>

      </footer>

    </main>
  );
}