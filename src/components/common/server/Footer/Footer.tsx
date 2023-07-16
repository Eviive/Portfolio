import { Link, Socials } from "@/components/common/server";
import type { FC } from "react";

import styles from "./footer.module.scss";

export const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <Socials />
            <Link
                className={styles.link}
                href="https://github.com/Eviive/Portfolio"
                blank
            >
                Designed &amp; built by Albert Vaillon
            </Link>
        </footer>
    );
};
