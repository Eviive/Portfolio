"use client";

import { Button } from "@/components/common/client";
import type { FC } from "react";
import { useEffect } from "react";

import styles from "./error.module.scss";

type Props = {
    error: Error;
    reset: () => void;
};

const ErrorPage: FC<Props> = props => {

    useEffect(() => {
        console.error(props.error);
    }, [ props.error ]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Something went wrong!</h1>
            <Button handleClick={props.reset}>
                Try again
            </Button>
        </div>
    );
};

export default ErrorPage;
