import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)[Language];
};

const STORAGE_KEY = "mionga-lang";

function detectLanguage(): Language {
  if (typeof navigator === "undefined") return "pt";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "pt") return stored;
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "en" ? "en" : "pt";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "pt-PT";
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return context;
}
