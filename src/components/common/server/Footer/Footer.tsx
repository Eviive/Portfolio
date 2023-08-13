import { Link, Socials } from "@/components/common/server";
import { useDictionary } from "@/hooks/useDictionary";
import type { FC } from "react";

import styles from "./footer.module.scss";

export type FooterDictionary = {
    portfolioGitHubLink: string;
};

export const Footer: FC = () => {

    const dico = useDictionary("footer");

    return (
        <footer className={styles.footer}>
            <Socials />
            <Link
                className={styles.link}
                href="https://github.com/Eviive/Portfolio"
                blank
            >
                {dico.portfolioGitHubLink} Albert Vaillon
            </Link>
        </footer>
    );
};
