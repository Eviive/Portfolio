import type { Locale } from "@/libs/i18n";
import { defaultLocale } from "@/libs/i18n";
import { cache } from "react";

type II18nServerContext = {
    locale: Locale;
};

export const getI18nServerContext = cache((): II18nServerContext => ({
    locale: defaultLocale
}));
