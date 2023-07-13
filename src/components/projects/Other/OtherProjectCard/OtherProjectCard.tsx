import { Link } from "@/components/common/server";
import type { Project } from "@/types/entities";
import type { FC } from "react";
import { FiExternalLink, FiFolder, FiGithub } from "react-icons/fi";

import styles from "./other-project-card.module.scss";

type Props = {
    project: Project;
};

export const OtherProjectCard: FC<Props> = ({ project }) => {

    const skills = project.skills
        .sort((a, b) => a.sort - b.sort)
        .map((skill, i) => (
            <li key={i}>{skill.name}</li>
        ));

    return (
        <div className={styles.card}>
            <div>
                <div className={styles.icons}>
                    <FiFolder size={40} strokeWidth={1} className={styles.folder} />
                    <div className={styles.links}>
                        <Link className={styles.link} href={project.repoUrl}>
                            <FiGithub size={22} />
                        </Link>
                        <Link className={styles.link} href={project.demoUrl}>
                            <FiExternalLink size={22} />
                        </Link>
                    </div>
                </div>
                <Link className={styles.title} href={project.demoUrl}>
                    <h3>{project.title}</h3>
                </Link>
                <p>{project.description}</p>
            </div>
            <ul className={styles.skills}>
                {skills}
            </ul>
        </div>
    );
};
