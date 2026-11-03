import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./data/translations";

const savedLanguage =
  typeof window !== "undefined"
    ? localStorage.getItem("matabari_devotee_lang") || "en"
    : "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      bn: { translation: translations.bn },
      hi: { translation: translations.hi },
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already safeguards against XSS
    },
    react: {
      useSuspense: false,
    },
  });

// Keep <html> lang attribute & localStorage in sync
if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language || "en";
  i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng;
    try {
      localStorage.setItem("matabari_devotee_lang", lng);
    } catch (e) {
      console.warn("Could not save language to localStorage", e);
    }
  });
}

export default i18n;

