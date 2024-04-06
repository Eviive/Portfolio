import { getI18nServerContext } from "@/contexts/i18n-server-context";
import type { Locale } from "@/libs/i18n";
import { dictionaries } from "@/libs/i18n";
import type { Dictionary } from "@/types/i18n";

export const useDictionary = <K extends keyof Dictionary>(key: K, locale?: Locale): Dictionary[K] => {
    return dictionaries[locale ?? getI18nServerContext().locale][key];
};
