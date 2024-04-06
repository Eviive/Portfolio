"use client";

import type { Locale } from "@/libs/i18n";
import type { Dictionary } from "@/types/i18n";
import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";

export type II18nContext = {
    locale: Locale;
    dictionaries: Pick<Dictionary, "error" | "button">;
};

const I18nContext = createContext<II18nContext | null>(null);

type Props = {
    value: II18nContext;
};

export const I18nContextProvider: FC<PropsWithChildren<Props>> = props => {
    return <I18nContext.Provider value={props.value}>{props.children}</I18nContext.Provider>;
};

export const useI18nContext = (): II18nContext => {
    const i18nContext = useContext(I18nContext);
    if (i18nContext === null) {
        throw new Error("useI18nContext called without I18nContextProvider");
    }
    return i18nContext;
};
