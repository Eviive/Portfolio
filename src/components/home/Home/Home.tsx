"use client";

import { Canvas } from "@/components/common/client";
import { useDictionary } from "@/hooks/useDictionary";
import { getOptimizedImageSrc } from "@/libs/utils";
import { SkillService } from "@/services";
import type { FC } from "react";
import { useEffect, useMemo, useRef } from "react";

import styles from "./home.module.scss";

export type HomeDictionary = {
    hi: string;
    occupation: string;
};

export const Home: FC = async () => {

    const skills = await SkillService.findAll();

    const dico = useDictionary("home");

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("skills", skills);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [ skills ]);

    let imageSrc = "http://localhost:8080/image/0ae39343-d03b-41e0-8390-8e80dfc77c47";
    const image = useMemo(() => {
        const image = new Image();
        image.src = getOptimizedImageSrc(imageSrc, 1080);
        return image;
    }, [ imageSrc ]);

    const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {

    };

    const resize = (canvas: HTMLCanvasElement) => {
        canvas.width = ref.current?.clientWidth ?? 0;
        canvas.height = ref.current?.clientHeight ?? 0;
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
        <section id="home" ref={ref} className={styles.home}>
            <div className={styles.hello}>
                <span>{dico.hi}</span>
                <h1>Albert Vaillon</h1>
                <h2>{dico.occupation}</h2>
            </div>
            <Canvas
                className={styles.canvas}
                init={init}
                resize={resize}
                draw={draw}
            ></Canvas>
        </section>
    );
};
