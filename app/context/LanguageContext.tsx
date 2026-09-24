"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


export type Language =
  | "EN"
  | "PT"
  | "ES"
  | "FR"
  | "DE"
  | "IT"
  | "JA";


type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};


const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined
  );


const supportedLanguages: Language[] = [
  "EN",
  "PT",
  "ES",
  "FR",
  "DE",
  "IT",
  "JA",
];


function isSupportedLanguage(
  value: string | null
): value is Language {
  return (
    value !== null &&
    supportedLanguages.includes(
      value as Language
    )
  );
}


function detectBrowserLanguage(): Language {
  if (
    typeof navigator ===
    "undefined"
  ) {
    return "EN";
  }

  const browserLanguage =
    navigator.language
      .toLowerCase()
      .split("-")[0];

  switch (browserLanguage) {
    case "pt":
      return "PT";

    case "es":
      return "ES";

    case "fr":
      return "FR";

    case "de":
      return "DE";

    case "it":
      return "IT";

    case "ja":
      return "JA";

    default:
      return "EN";
  }
}


export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    language,
    setLanguageState,
  ] = useState<Language>("EN");

  const [
    ready,
    setReady,
  ] = useState(false);


  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "neyo-world-language"
      );

    if (
      isSupportedLanguage(
        savedLanguage
      )
    ) {
      setLanguageState(
        savedLanguage
      );
    } else {
      const detectedLanguage =
        detectBrowserLanguage();

      setLanguageState(
        detectedLanguage
      );

      localStorage.setItem(
        "neyo-world-language",
        detectedLanguage
      );
    }

    setReady(true);
  }, []);


  function setLanguage(
    newLanguage: Language
  ) {
    setLanguageState(
      newLanguage
    );

    localStorage.setItem(
      "neyo-world-language",
      newLanguage
    );

    document.documentElement.lang =
      newLanguage.toLowerCase();
  }


  useEffect(() => {
    if (!ready) {
      return;
    }

    document.documentElement.lang =
      language.toLowerCase();
  }, [language, ready]);


  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}