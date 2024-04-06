import { FeaturedProjects } from "@/components/projects/featured/featured-projects";
import { OtherProjects } from "@/components/projects/other/other-projects";
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
