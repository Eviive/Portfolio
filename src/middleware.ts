import { defaultLocale, locales } from "@/libs/i18n";
import { createUrl, removePrefixSlash } from "@/libs/utils/url";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const getLocale = (req: NextRequest): string => {
    const headers: Negotiator.Headers = {};
    req.headers.forEach((value, key) => (headers[key] = value));

    const languages = new Negotiator({ headers }).languages([...locales]);

    return match(languages, locales, defaultLocale);
};

export const middleware: NextMiddleware = req => {
    const { pathname } = req.nextUrl;

    const isLocalePresent = locales.some(locale => pathname.startsWith(`/${locale}`));

    if (isLocalePresent) {
        return NextResponse.next();
    }

    const locale = getLocale(req);

    const newPathname = removePrefixSlash(pathname);

    return NextResponse.redirect(
        createUrl(`/${locale}/${newPathname}`, process.env.NEXT_PUBLIC_BASE_URL)
    );
};

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|robots.txt|manifest.json|sitemap.xml|browserconfig.xml|.*\\.ico$|.*\\.png$|.*\\.svg$).*)"
    ]
};
