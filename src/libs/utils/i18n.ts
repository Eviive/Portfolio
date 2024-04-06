import { getI18nServerContext } from "@/contexts/i18n-server-context";
import { dictionaries } from "@/libs/i18n";
import type { Dictionary } from "@/types/i18n";

export const getDictionary = <K extends keyof Dictionary>(key: K): Dictionary[K] => {
    return dictionaries[getI18nServerContext().locale][key];
};
