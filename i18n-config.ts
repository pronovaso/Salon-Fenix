export const i18n = {
  locales: ["cs", "en", "de"],
  defaultLocale: "cs",
};

export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];