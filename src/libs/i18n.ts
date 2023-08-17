import { en, fr } from "@/dictionaries";
import type { Dictionary } from "@/types/i18n";

export const locales = [ "en", "fr" ] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = "en";

export const isLocale = (locale: string): locale is Locale => locales.some(l => l === locale);

export const localeDictionary: Record<Locale, string> = {
    en: "English",
    fr: "Français"
};

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = <K extends keyof Dictionary>(locale: Locale, key: K): Dictionary[K] => {
    return dictionaries[locale][key];
};
