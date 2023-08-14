import { defaultLocale, locales } from "@/libs/i18n";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const getLocale = (req: NextRequest): string => {
    const headers: Negotiator.Headers = {};
    req.headers.forEach((value, key) => headers[key] = value);

    const languages = new Negotiator({ headers }).languages();

    return match(languages, [ ...locales ], defaultLocale);
};

export const middleware: NextMiddleware = req => {
    const { pathname } = req.nextUrl;

    const pathnameIsMissingLocale = locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (!pathnameIsMissingLocale) {
        return;
    }

    const locale = getLocale(req);
    const newUrl = new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, req.url);

    return NextResponse.redirect(newUrl);
};

export const config = {
    matcher: [ "/((?!api|_next/static|_next/image|robots.txt|manifest.json|sitemap.xml|browserconfig.xml|.*\\.ico$|.*\\.png$|.*\\.svg$).*)" ]
};
