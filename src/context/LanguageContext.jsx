import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { t: i18n_t, i18n } = useTranslation();

  const language = i18n.language || "en";

  const setLanguage = useCallback(
    (newLang) => {
      if (newLang === "en" || newLang === "bn" || newLang === "hi") {
        i18n.changeLanguage(newLang);
      }
    },
    [i18n]
  );

  const t = useCallback(
    (keyPath, fallback = "") => {
      if (!keyPath) return fallback;
      const translated = i18n_t(keyPath, { defaultValue: fallback });
      return translated !== undefined && translated !== null && translated !== keyPath
        ? translated
        : (fallback || keyPath);
    },
    [i18n_t]
  );

  const currentLanguage = useMemo(() => {
    return (
      supportedLanguages.find((l) => l.code === language) ||
      supportedLanguages[0]
    );
  }, [language]);

  const resourceBundle = useMemo(() => {
    return i18n.getResourceBundle(language, "translation") || {};
  }, [i18n, language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      i18n,
      currentLanguage,
      supportedLanguages,
      translations: resourceBundle,
      isBengali: language === "bn",
      isHindi: language === "hi",
      isEnglish: language === "en",
    }),
    [language, setLanguage, t, i18n, currentLanguage, resourceBundle]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
