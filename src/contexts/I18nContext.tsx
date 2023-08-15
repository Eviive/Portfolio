import type { Locale } from "@/libs/i18n";
import { createServerContext, useContext } from "react";

const I18nContext = createServerContext<Locale | null>("I18nContext", null);

export const I18nContextProvider = I18nContext.Provider;

export const useI18nContext = () => {
    const i18nContext = useContext(I18nContext);
    if (i18nContext === null) {
        throw new Error("useI18nContext called without I18nContextProvider");
    }
    return i18nContext;
};
