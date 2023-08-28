import type { Locale } from "@/libs/i18n";
import { defaultLocale, isLocale } from "@/libs/i18n";
import type { NextRequest } from "next/server";

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

export const getNextImageUrl = (url: string, width: number, height?: number): string => {
    const nextUrl = new URL("/_next/image", window.location.origin);

    nextUrl.searchParams.set("url", encodeURI(url));
    nextUrl.searchParams.set("w", width.toString());
    height && nextUrl.searchParams.set("h", height.toString());
    nextUrl.searchParams.set("q", "75");

    return nextUrl.toString();
};

export const removePrefixSlash = (pathname: string): string => pathname.startsWith("/") ? pathname.substring(1) : pathname;

export const removeTrailingSlash = (pathname: string): string => pathname.endsWith("/") ? pathname.substring(0, pathname.length - 1) : pathname;

export const createUrl = (pathname: string, base?: NextRequest | string): URL => new URL(removeTrailingSlash(pathname), typeof base === "object" ? base.nextUrl : base);
