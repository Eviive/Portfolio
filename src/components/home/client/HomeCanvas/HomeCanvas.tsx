"use client";

import { Canvas } from "@/components/common/client";
import { getNextImageUrl, isNotNullOrUndefined } from "@/libs/utils";
import { ImageService } from "@/services";
import type { Skill } from "@/types/entities";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

import styles from "./home-canvas.module.scss";

type Props = {
    skills: Skill[];
};

export const HomeCanvas: FC<Props> = props => {

    const skillsImages = useMemo<HTMLImageElement[]>(
        () => {
            if (typeof window === "undefined") return [];

            return props.skills
                .map(skill => {
                    const imageUrl = ImageService.getImageUrl(skill.image);
                    if (!imageUrl) return null;

                    const image = new Image();
                    image.src = getNextImageUrl(imageUrl, 64);
                    return image;
                })
                .filter(isNotNullOrUndefined);
        },
        [ props.skills ]
    );

    const [ selectedSkillIndex, setSelectedSkillIndex ] = useState<number | null>(skillsImages.length > 0 ? 0 : null);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedSkillIndex(prevIndex => {
                if (prevIndex === null) return null;
                if (prevIndex + 1 >= skillsImages.length) return 0;
                return prevIndex + 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [ skillsImages.length ]);
    const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        // Nothing to do
    };

    const resize = (canvas: HTMLCanvasElement) => {
        canvas.width = canvas.parentElement?.clientWidth ?? 0;
        canvas.height = canvas.parentElement?.clientHeight ?? 0;
    };

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (selectedSkillIndex === null) return;

        const image = skillsImages[selectedSkillIndex];

        if (image.width && image.height) {
            ctx.drawImage(image, 0, 0, 500, 500);
            const pixels = ctx.getImageData(0, 0, image.width, image.height);
        }
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
