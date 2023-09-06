import type { Locale } from "@/libs/i18n";
import { defaultLocale, isLocale } from "@/libs/i18n";

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

export const removePrefixSlash = (pathname: string): string => pathname.startsWith("/") ? pathname.substring(1) : pathname;

export const removeTrailingSlash = (pathname: string): string => pathname.endsWith("/") ? pathname.substring(0, pathname.length - 1) : pathname;

export const createUrl = (pathname: string, base?: string): URL => new URL(removeTrailingSlash(pathname), base);
