import { FeaturedProjects } from "@/components/projects/featured/featured-projects";
import { OtherProjects } from "@/components/projects/other/other-projects";
import { useDictionary } from "@/hooks/use-dictionary";
import type { FC } from "react";

import styles from "./projects.module.scss";

export const Projects: FC = () => {

    // Can't call it in their dedicated component yet because of this https://github.com/vercel/next.js/issues/52566
    const featuredProjectsDico = useDictionary("featuredProjects");
    const otherProjectsDico = useDictionary("otherProjects");

    return (
        <section id="projects" className={styles.projects}>
            <FeaturedProjects dico={featuredProjectsDico} />
            <OtherProjects dico={otherProjectsDico} />
        </section>
    );
};
