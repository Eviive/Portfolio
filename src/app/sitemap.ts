import { locales } from "@/libs/i18n";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
    const availableLocales = [ "", ...locales ] as const;

    return availableLocales.map(locale => ({
        url: `/${locale}`,
        lastModified: new Date()
    }));
};

export default sitemap;
