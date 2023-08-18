import type { Locale } from "@/libs/i18n";
import { defaultLocale, isLocale } from "@/libs/i18n";
import type { Falsy } from "@/types/app";

const isNotFalsy = <V>(value: V | Falsy): value is V => Number.isNaN(value) ? false : !!value;

export const formatClassNames = (...classNames: (string | Falsy)[]) => classNames.filter(isNotFalsy).join(" ");

export const isNotNullOrUndefined = <V>(value: V | null | undefined): value is V => value !== null && value !== undefined;

export const formatAnchorWithLocale = (linkLocale: Locale, pathname: string, anchor?: `#${string}`): string => {
    const segments = pathname.split("/"),
          firstSegment = segments[1];

    segments[1] = linkLocale;

    if (linkLocale === defaultLocale) {
        if (isLocale(firstSegment)) {
            if (firstSegment !== defaultLocale) {
                segments[1] = "";
            }
        } else if (anchor !== undefined) {
            segments[1] = "";
        } else {
            segments[1] = firstSegment;
        }
    }

    const joinedSegments = segments.join("/");

    if (anchor === undefined) {
        return joinedSegments;
    }

    return `/${isLocale(firstSegment) ? firstSegment : ""}${anchor}`;
};

export const formatUriWithLocale = (linkLocale: Locale, pathname: string): string => formatAnchorWithLocale(linkLocale, pathname);
