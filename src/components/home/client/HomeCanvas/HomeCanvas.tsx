"use client";

import { Canvas } from "@/components/common/client";
import { getOptimizedImageSrc } from "@/libs/utils";
import type { Skill } from "@/types/entities";
import type { FC } from "react";
import { useEffect, useMemo } from "react";

import styles from "./home-canvas.module.scss";

type Props = {
    skills: Skill[];
};

export const HomeCanvas: FC<Props> = props => {

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("skills", props.skills);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [ props.skills ]);

    let imageSrc = "http://localhost:8080/image/0ae39343-d03b-41e0-8390-8e80dfc77c47";
    const image = useMemo(() => {
        const image = new Image();
        image.src = getOptimizedImageSrc(imageSrc, 1080);
        return image;
    }, [ imageSrc ]);

    const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {

    };

    const resize = (canvas: HTMLCanvasElement) => {
        canvas.width = canvas.parentElement?.clientWidth ?? 0;
        canvas.height = canvas.parentElement?.clientHeight ?? 0;
    };

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (image.width && image.height) {
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const pixels = ctx.getImageData(0, 0, image.width, image.height);
        }

        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
    };

    return (
        <Canvas
            className={styles.canvas}
            init={init}
            resize={resize}
            draw={draw}
        ></Canvas>
    );
};
