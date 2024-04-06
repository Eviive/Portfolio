import { Socials } from "@/components/common/socials";
import { Link } from "@/components/ui/link";
import { useDictionary } from "@/hooks/use-dictionary";
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
            <Link href="https://github.com/Eviive/Portfolio" blank>
                {dico.portfolioGitHubLink} Albert Vaillon
            </Link>
        </footer>
    );
};
