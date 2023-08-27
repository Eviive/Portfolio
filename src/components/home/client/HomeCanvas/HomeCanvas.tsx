"use client";

import { Canvas } from "@/components/common/client";
import { getNextImageUrl } from "@/libs/utils";
import { ImageService } from "@/services";
import type { Skill } from "@/types/entities";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

import styles from "./home-canvas.module.scss";

type Props = {
    skills: Skill[];
};

export const HomeCanvas: FC<Props> = props => {

    const [ selectedSkillIndex, setSelectedSkillIndex ] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedSkillIndex(prevIndex => prevIndex + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [ props.skills ]);

    const image = useMemo(() => {
        if (typeof window === "undefined") return null;

        const selectedSkill = props.skills.at(selectedSkillIndex % props.skills.length);
        if (!selectedSkill) return null;

        const imageUrl = ImageService.getImageUrl(selectedSkill.image);
        if (!imageUrl) return null;

        const image = new Image();
        image.src = getNextImageUrl(imageUrl, 64);
        return image;
    }, [ props.skills, selectedSkillIndex ]);

    const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {

    };

    const resize = (canvas: HTMLCanvasElement) => {
        canvas.width = canvas.parentElement?.clientWidth ?? 0;
        canvas.height = canvas.parentElement?.clientHeight ?? 0;
    };

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (image?.width && image?.height) {
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
