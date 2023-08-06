"use client";

import NextImage from "next/image";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import styles from "./image.module.scss";

type Props = {
    src: string;
    alt: string;
    title?: string;
    width?: number;
    height?: number;
};

const DEFAULT_WIDTH = 500;

export const Image: FC<Props> = props => {

    const [ loading, setLoading ] = useState<boolean | null>(null);

    useEffect(() => {
        setLoading(prevState => prevState ?? true);
    }, []);

    return (
        <div className={styles.wrapper}>
            {loading && (
                <div className={styles.loader}>
                    {/* trouver un loader en css only car celui-ci tourne pas tant que la page est pas hydraté */}
                    <ClipLoader
                        size={Math.min((props.width ?? props.height ?? DEFAULT_WIDTH) / 2, 50)}
                        speedMultiplier={0.75}
                        color="currentColor"
                    />
                </div>
            )}
            <NextImage
                className={styles.image}
                src={props.src}
                alt={props.alt}
                width={props.width ?? DEFAULT_WIDTH}
                height={props.height ?? props.width ?? DEFAULT_WIDTH}
                title={props.title}
                onLoad={() => setLoading(false)}
                priority
            />
        </div>
    );
};
