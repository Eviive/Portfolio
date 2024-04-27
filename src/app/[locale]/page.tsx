import type { LocaleParams } from "@/app/[locale]/layout";
import { About } from "@/components/about/about";
import { Home } from "@/components/home/home";
import { Projects } from "@/components/projects/projects";
import { getI18nServerContext } from "@/contexts/i18n-server-context";

import { getDictionary } from "@/libs/utils/i18n";
import type { PropsWithParams } from "@/types/app";
import type { EmptyRecord } from "@/types/utils";
import type { NextPage } from "next";

type Props = PropsWithParams<EmptyRecord, LocaleParams>;

const Index: NextPage<Props> = ({ params }) => {
    const i18n = getI18nServerContext();

    i18n.locale = params.locale;

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
