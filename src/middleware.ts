import { defaultLocale, locales } from "@/libs/i18n";
import { createUrl, extractLocaleFromPathname, removePrefixSlash } from "@/libs/utils/url";
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

    const isLocalePresent = locales.some(locale => pathname.startsWith(`/${locale}`));

    if (isLocalePresent) {
        if (extractLocaleFromPathname(pathname) !== defaultLocale) {
            return NextResponse.next();
        }

        const newPathname = pathname.replace(`/${defaultLocale}`, "");

        return NextResponse.redirect(createUrl(`/${removePrefixSlash(newPathname)}`, req));
    }

    const preferredLocale = getLocale(req),
          pathnameLocale = preferredLocale === defaultLocale ? "" : preferredLocale;

    const newPathname = removePrefixSlash(pathname);

    if (pathnameLocale !== "") {
        return NextResponse.redirect(createUrl(`/${pathnameLocale}/${newPathname}`, req));
    }

    // rewrite to 172.
    // Failed to proxy blablabla

    const rewriteUrl = createUrl(`/${defaultLocale}/${newPathname}`, req);

    console.log(rewriteUrl.origin, rewriteUrl.toString());

    rewriteUrl.protocol = "http";

    console.log(rewriteUrl.origin, rewriteUrl.toString());

    console.log({ rewriteUrl: rewriteUrl.toString(), origin: rewriteUrl.origin, url: createUrl(`/${defaultLocale}/${newPathname}`, req).toString() });

    return NextResponse.rewrite(rewriteUrl);
};

export const config = {
    matcher: [ "/((?!api|_next/static|_next/image|robots.txt|manifest.json|sitemap.xml|browserconfig.xml|.*\\.ico$|.*\\.png$|.*\\.svg$).*)" ]
};
