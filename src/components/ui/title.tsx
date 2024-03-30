import type { FC } from "react";

import styles from "src/components/common/server/title.module.scss";

type Props = {
    title: string;
};

export const Title: FC<Props> = props => {
    return (
        <div className={styles.title}>
            <h2>{props.title}</h2>
            <span></span>
        </div>
    );
};
