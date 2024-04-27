import { Socials } from "@/components/common/socials";
import { Link } from "@/components/ui/link";

import { getDictionary } from "@/libs/utils/i18n";
import type { FC } from "react";

import styles from "./footer.module.scss";

export type FooterDictionary = {
    portfolioGitHubLink: string;
};

export const Footer: FC = () => {
    const dict = getDictionary("footer");

    return (
        <footer className={styles.footer}>
            <Socials />
            <Link href="https://github.com/Eviive/Portfolio" blank>
                {dict.portfolioGitHubLink} Albert Vaillon
            </Link>
        </footer>
    );
};
