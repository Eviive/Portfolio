"use client";

import { formatClassNames } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";
import { ClipLoader } from "react-spinners";

import styles from "./button.module.scss";

type Props = {
    className?: string;
    loading?: boolean;
    handleClick?: () => void;
};

export const Button: FC<PropsWithChildren<Props>> = props => {
    return (
        <button
            className={formatClassNames(props.className, styles.button)}
            onClick={!props.loading ? props.handleClick : undefined}
        >
            {   props.loading
                ? (
                    <>
                        <ClipLoader size={20} color="hsl(var(--secondary-1))" />
                        loading...
                    </>
                )
                : props.children
            }
        </button>
    );
};
