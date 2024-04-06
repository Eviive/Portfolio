"use client";

import { Loader } from "@/components/ui/loader";
import { useDictionary } from "@/hooks/use-dictionary";
import { defaultLocale } from "@/libs/i18n";
import { formatClassNames } from "@/libs/utils/react";
import { extractLocaleFromPathname } from "@/libs/utils/url";
import { usePathname } from "next/navigation";
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

    const pathname = usePathname();

    const locale = extractLocaleFromPathname(pathname) || defaultLocale;

    const dico = useDictionary("button", locale);

    return (
        <button
            className={formatClassNames(styles.button, props.className)}
            onClick={props.loading ? undefined : props.handleClick}
        >
            {props.loading
                ? (
                    <>
                        <Loader size={20} color="hsl(var(--secondary-1))" />
                        {dico.loading}
                    </>
                )
                : props.children
            }
        </button>
    );
};
