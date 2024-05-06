import { defaultLocale, locales } from "@/libs/i18n";
import { removePrefixSlash } from "@/libs/utils/url";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

const getPreferredLocale = (headers: Headers): string => {
    const negotiatorHeaders: Negotiator.Headers = {};
    headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages([...locales]);

    return match(languages, locales, defaultLocale);
};

export const middleware: NextMiddleware = req => {
    const url = req.nextUrl.clone();

    const { pathname } = url;

    const isLocalePresent = locales.some(locale => pathname.startsWith(`/${locale}`));

    if (isLocalePresent) {
        return NextResponse.next();
    }

    const locale = getPreferredLocale(req.headers);

    url.pathname = `${locale}/${removePrefixSlash(pathname)}`;

    return locale === defaultLocale ? NextResponse.rewrite(url) : NextResponse.redirect(url);
};

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|robots.txt|manifest.json|sitemap.xml|browserconfig.xml|.*\\.ico$|.*\\.png$|.*\\.svg$).*)"
    ]
};
