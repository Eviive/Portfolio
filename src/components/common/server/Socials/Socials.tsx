import { Link } from "@/components/common/server";
import type { FC } from "react";
import { FaDiscord } from "react-icons/fa6";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import styles from "./socials.module.scss";

const links = [
    {
        href: "https://github.com/Eviive",
        icon: <FiGithub size={22} />
    },
    {
        href: "https://www.linkedin.com/in/albert-vaillon",
        icon: <FiLinkedin size={22} strokeWidth={1.5} />
    },
    {
        href: "mailto:albert.vaillon21@gmail.com",
        icon: <FiMail size={22} />
    },
    {
        href: "https://discord.com/users/312690752884834314",
        icon: <FaDiscord size={22} className={styles.discord} />
    }
];

export const Socials: FC = () => {
    return (
        <div className={styles.socials}>
            {links.map(s => (
                <Link
                    key={s.href}
                    className={styles.link}
                    href={s.href}
                    blank
                >
                    {s.icon}
                </Link>
            ))}
        </div>
    );
};
