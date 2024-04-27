import type { CSSProperties, FC } from "react";

import styles from "./loader.module.scss";

type Props = {
    size?: number;
    color?: string;
    absolute?: boolean;
};

export const Loader: FC<Props> = ({ size, color, absolute }) => {
    const loaderStyle = {
        ...(size && { "--loader-size": `${size}px` }),
        ...(color && { "--loader-color": color }),
        ...(absolute && { position: "absolute" })
    } as CSSProperties;

    return <span className={styles.loader} style={loaderStyle}></span>;
};
