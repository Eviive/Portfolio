import type { Locale } from "@/libs/i18n";
import { defaultLocale } from "@/libs/i18n";
import { cache } from "react";

export type II18nContext = {
    locale: Locale;
};

export const getI18nServerContext = cache((): II18nContext => ({
    locale: defaultLocale
}));
