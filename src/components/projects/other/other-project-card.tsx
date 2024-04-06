import { Link } from "@/components/ui/link";
import { defaultLocale } from "@/libs/i18n";
import { extractLocaleFromPathname } from "@/libs/utils/url";
import type { Project } from "@/types/entities";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { FiExternalLink, FiFolder, FiGithub } from "react-icons/fi";

import styles from "./other-project-card.module.scss";

type Props = {
    project: Project;
};

const OtherProjectCard = forwardRef<
    HTMLLIElement,
    Props
>(({ project }, ref) => {

    const pathname = usePathname();

    const locale = extractLocaleFromPathname(pathname) || defaultLocale;

    project.skills.sort((a, b) => a.sort - b.sort);

    return (
        <li ref={ref} className={styles.card}>
            <div>
                <div className={styles.icons}>
                    <FiFolder size={40} strokeWidth={1} className={styles.folder} />
                    <div className={styles.links}>
                        <Link href={project.repoUrl} blank>
                            <FiGithub size={22} />
                        </Link>
                        <Link href={project.demoUrl} blank>
                            <FiExternalLink size={22} />
                        </Link>
                    </div>
                </div>
                <Link className={styles.title} href={project.demoUrl}>
                    <h3>{project.title}</h3>
                </Link>
                <p>{locale === "en" ? project.descriptionEn : project.descriptionFr}</p>
            </div>
            <ul className={styles.skills}>
                {project.skills.map(s => (
                    <li key={s.id}>{s.name}</li>
                ))}
            </ul>
        </li>
    );
});

OtherProjectCard.displayName = "OtherProjectCard";

export { OtherProjectCard };
