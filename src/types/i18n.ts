import type { ErrorDictionary } from "@/app/[lang]/error";
import type { MetadataDictionary } from "@/app/[lang]/layout";
import type { AboutDictionary } from "@/components/about";
import type { ButtonDictionary, HeaderDictionary } from "@/components/common/client";
import type { FooterDictionary } from "@/components/common/server";
import type { HomeDictionary } from "@/components/home/server";
import type { FeaturedProjectCardDictionary, FeaturedProjectsDictionary } from "@/components/projects/featured";
import type { OtherProjectsWrapperDictionary } from "@/components/projects/other/client";
import type { OtherProjectsDictionary } from "@/components/projects/other/server";

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
