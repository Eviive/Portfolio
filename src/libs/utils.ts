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

export const getOptimizedImageUrl = (url: string, width: number, height?: number): string => {
    const nextUrl = new URL("/_next/image", window.location.origin);

    nextUrl.searchParams.set("url", encodeURI(url));
    nextUrl.searchParams.set("w", width.toString());
    height && nextUrl.searchParams.set("h", height.toString());
    nextUrl.searchParams.set("q", "75");

    return nextUrl.toString();
};

export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffledArray = [ ...array ];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [ shuffledArray[i], shuffledArray[j] ] = [ shuffledArray[j], shuffledArray[i] ];
    }

    return shuffledArray;
};
