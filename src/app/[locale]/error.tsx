"use client";

import { Button } from "@/components/ui/button";
import { useI18nContext } from "@/contexts/i18n-context";
import type { DictionaryWithTitle } from "@/types/i18n";
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

    const i18n = useI18nContext();

    const dict = i18n.dictionaries.error;

    useEffect(() => {
        console.error(props.error);
    }, [ props.error ]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{dict.title}</h1>
            <Button handleClick={props.reset}>
                {dict.tryAgain}
            </Button>
        </div>
    );
};

export default ErrorPage;
