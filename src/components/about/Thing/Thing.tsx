import type { FC } from "react";
import type { IconType } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";

import styles from "./thing.module.scss";

type Props = {
    name: string;
    icon: IconType;
    text: string;
};

export const Thing: FC<Props> = props => {
    return (
        <div className={styles.card}>
            <div className={styles.circle}>
                <BsFillCircleFill size={70} />
                <props.icon size={35} className={styles.icon} />
            </div>
            <h3>{props.name}</h3>
            <p>{props.text}</p>
        </div>
    );
};
