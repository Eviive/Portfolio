import { defaultLocale, locales } from "@/libs/i18n";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
    const availableLocales = [ "", ...locales ] as const;

    return availableLocales
        .filter(locale => locale !== defaultLocale)
        .map(locale => ({
            url: `/${locale}`,
            lastModified: new Date()
        }));
};

export default sitemap;
