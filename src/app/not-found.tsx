import type { FC } from "react";

import styles from "./not-found.module.scss";

const NotFound: FC = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Error 404</h1>
        </div>
    );
};

export default NotFound;
