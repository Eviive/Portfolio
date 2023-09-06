import { useI18nContext } from "@/contexts/I18nContext";
import { getDictionary } from "@/libs/i18n";
import type { Dictionary } from "@/types/i18n";

export const useDictionary = <K extends keyof Dictionary>(key: K): Dictionary[K] => {

    const locale = useI18nContext();

    return getDictionary(locale, key);
};
