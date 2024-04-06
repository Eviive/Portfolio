"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/use-dictionary";
import { defaultLocale } from "@/libs/i18n";
import { extractLocaleFromPathname } from "@/libs/utils/url";
import type { DictionaryWithTitle } from "@/types/i18n";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useEffect } from "react";

import styles from "./error.module.scss";

export type ErrorDictionary = DictionaryWithTitle & {
    tryAgain: string;
};

type Props = {
    error: Error;
    reset: () => void;
};

const ErrorPage: FC<Props> = props => {

    const pathname = usePathname();

    const locale = extractLocaleFromPathname(pathname) || defaultLocale;

    const dico = useDictionary("error", locale);

    useEffect(() => {
        console.error(props.error);
    }, [ props.error ]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{dico.title}</h1>
            <Button handleClick={props.reset}>
                {dico.tryAgain}
            </Button>
        </div>
    );
};

export default ErrorPage;
