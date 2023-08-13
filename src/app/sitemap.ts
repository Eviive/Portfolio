import { locales } from "@/lib/i18n";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
    return locales.map(locale => ({
        url: `/${locale}`,
        lastModified: new Date()
    }));
};

export default sitemap;
