"use client";

import { Loader } from "@/components/ui/loader";
import { useI18nContext } from "@/contexts/i18n-context";
import { formatClassNames } from "@/libs/utils/react";
import type { FC, PropsWithChildren } from "react";

import styles from "./button.module.scss";

export type ButtonDictionary = {
    loading: string;
};

type Props = {
    className?: string;
    loading?: boolean;
    handleClick?: () => void;
};

export const Button: FC<PropsWithChildren<Props>> = props => {
    const i18n = useI18nContext();

    const dict = i18n.dictionaries.button;

    return (
        <button
            className={formatClassNames(styles.button, props.className)}
            onClick={props.loading ? undefined : props.handleClick}
        >
            {props.loading ? (
                <>
                    <Loader size={20} color="hsl(var(--secondary-1))" />
                    {dict.loading}
                </>
            ) : (
                props.children
            )}
        </button>
    );
};
