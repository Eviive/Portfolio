import { FeaturedProjects } from "@/components/projects/featured";
import { OtherProjects } from "@/components/projects/other/server";
import type { FC } from "react";

import styles from "./projects.module.scss";

export const Projects: FC = () => {
    return (
        <section id="projects" className={styles.projects}>
            <FeaturedProjects />
            <OtherProjects />
        </section>
    );
};
