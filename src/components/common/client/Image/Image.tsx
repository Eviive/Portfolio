"use client";

import { Loader } from "@/components/common/server";
import NextImage from "next/image";
import type { FC } from "react";
import { useEffect, useState } from "react";

import styles from "./image.module.scss";

type Props = {
    src: string;
    alt: string;
    width: number;
    height?: number;
    title?: string;
};

export const Image: FC<Props> = props => {

    const [ loading, setLoading ] = useState<boolean | null>(null);

    useEffect(() => {
        setLoading(prevState => prevState ?? true);
    }, []);

    return (
        <div className={styles.wrapper}>
            {loading && <Loader size={Math.min(props.width / 2, 50)} absolute />}
            <NextImage
                className={styles.image}
                src={props.src}
                alt={props.alt}
                width={props.width}
                height={props.height ?? props.width}
                title={props.title}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                priority
            />
        </div>
    );
};
