import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";
import { createServerContext, useContext } from "react";

const I18nContext = createServerContext<Locale>("I18nContext", defaultLocale);

export const I18nContextProvider = I18nContext.Provider;

export const useI18nContext = () => useContext(I18nContext);
