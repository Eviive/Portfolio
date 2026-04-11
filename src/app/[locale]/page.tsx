import type { LocaleParams } from "@/app/[locale]/layout";
import { About } from "@/components/about/about";
import { Home } from "@/components/home/home";
import { Projects } from "@/components/projects/projects";
import { getI18nServerContext } from "@/contexts/i18n-server-context";
import type { Locale } from "@/libs/i18n";
import { getDictionary } from "@/libs/utils/i18n";
import type { PropsWithParams } from "@/types/app";
import type { EmptyRecord } from "@/types/utils";
import type { NextPage } from "next";
import { use } from "react";

type Props = PropsWithParams<EmptyRecord, LocaleParams>;

const Index: NextPage<Props> = ({ params }: { params: Promise<LocaleParams> }) => {
    const i18n = getI18nServerContext();

    i18n.locale = use(params).locale as Locale;

    const aboutDict = getDictionary("about");

    return (
        <>
            <Home />
            <About dict={aboutDict} />
            <Projects />
        </>
    );
};

export default Index;
