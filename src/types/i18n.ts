import type { ErrorDictionary } from "@/app/[locale]/error";
import type { MetadataDictionary } from "@/app/[locale]/layout";
import type { AboutDictionary } from "@/components/about/about";
import type { FooterDictionary } from "@/components/common/footer";
import type { HeaderDictionary } from "@/components/common/header";
import type { HomeDictionary } from "@/components/home/home-title";
import type { FeaturedProjectCardDictionary } from "@/components/projects/featured/featured-project-card";
import type { FeaturedProjectsDictionary } from "@/components/projects/featured/featured-projects";
import type { OtherProjectsDictionary } from "@/components/projects/other/other-projects";
import type { OtherProjectsWrapperDictionary } from "@/components/projects/other/other-projects-wrapper";
import type { ButtonDictionary } from "@/components/ui/button";

export type DictionaryWithTitle<D = unknown> = D & {
    title: string;
};

export type Dictionary = {
    metadata: MetadataDictionary;
    error: ErrorDictionary;

    home: HomeDictionary;
    about: AboutDictionary;

    featuredProjects: FeaturedProjectsDictionary;
    featuredProjectCard: FeaturedProjectCardDictionary;
    otherProjects: OtherProjectsDictionary;
    otherProjectsWrapper: OtherProjectsWrapperDictionary;

    header: HeaderDictionary;
    footer: FooterDictionary;

    button: ButtonDictionary;
};
