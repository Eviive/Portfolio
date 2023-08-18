import type { Locale } from "@/libs/i18n";
import { defaultLocale, isLocale } from "@/libs/i18n";
import type { Falsy } from "@/types/app";

const isNotFalsy = <V>(value: V | Falsy): value is V => Number.isNaN(value) ? false : !!value;

export const formatClassNames = (...classNames: (string | Falsy)[]) => classNames.filter(isNotFalsy).join(" ");

export const isNotNullOrUndefined = <V>(value: V | null | undefined): value is V => value !== null && value !== undefined;

export const extractLocaleFromPathname = (pathname: string): Locale | "" => {
    const firstSegment = pathname.split("/").at(1);

    if (firstSegment && isLocale(firstSegment)) {
        return firstSegment;
    }

    return "";
};

export const formatUriWithLocale = (pathname: string, targetLocale: Locale): string => {
    const currentLocale = extractLocaleFromPathname(pathname);

    if (currentLocale === targetLocale) {
        return pathname;
    }

    const segments = pathname.split("/");

    if (currentLocale) {
        if (currentLocale !== defaultLocale && targetLocale === defaultLocale) {
            segments.splice(1, 1);
        } else {
            segments.splice(1, 1, targetLocale);
        }
    } else if (targetLocale !== defaultLocale) {
        if (segments.at(1) === "") {
            segments.splice(1, 1, targetLocale);
        } else {
            segments.splice(1, 0, targetLocale);
        }
    }

    return segments.join("/") || "/";
};
