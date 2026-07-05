import { useLanguage } from "./LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <span className={language === "pt" ? "lang-active" : ""}>PT</span>
      <span className="lang-divider" aria-hidden="true">/</span>
      <span className={language === "en" ? "lang-active" : ""}>EN</span>
    </button>
  );
}
