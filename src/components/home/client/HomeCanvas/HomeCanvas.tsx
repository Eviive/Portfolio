"use client";

import type { DrawCanvasCallback, InitCanvasCallback, ResizeCanvasCallback } from "@/components/common/client";
import { Canvas } from "@/components/common/client";
import { isNotNullOrUndefined } from "@/libs/utils/assertion";
import { getRandomInt } from "@/libs/utils/number";
import { getNextImageUrl } from "@/libs/utils/url";
import { ImageService } from "@/services";
import type { Skill } from "@/types/entities";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

import styles from "./home-canvas.module.scss";

type Props = {
    skills: Skill[];
};

type CanvasState = {
    selectedSkillIndex: number | null;
    currentSize?: number;
};

export const HomeCanvas: FC<Props> = props => {

    const skillsImages = useMemo<HTMLImageElement[]>(() => {
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
    }, [ props.skills ]);

    const [ canvasState, setCanvasState ] = useState<CanvasState>({
        selectedSkillIndex: skillsImages.length > 0 ? 0 : null
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCanvasState(prevState => {
                const { selectedSkillIndex: prevIndex } = prevState;

                if (prevIndex === null) return prevState;

                // Resets every other property
                return { selectedSkillIndex: prevIndex + 1 < skillsImages.length ? prevIndex + 1 : 0 };
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [ skillsImages.length ]);

    const init: InitCanvasCallback = (canvas, ctx) => {
        // Nothing to do
    };

    const resize: ResizeCanvasCallback = (canvas) => {
        canvas.width = canvas.parentElement?.clientWidth ?? 0;
        canvas.height = canvas.parentElement?.clientHeight ?? 0;
    };

    const draw: DrawCanvasCallback = (canvas, ctx) => {
        const { selectedSkillIndex, currentSize } = canvasState;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (selectedSkillIndex === null) return;

        const image = skillsImages[selectedSkillIndex];

        if (!image.complete || !image.width || !image.height) return;

        const size = currentSize ?? getRandomInt(50, 350);

        if (size !== currentSize) {
            setCanvasState(prevState => ({ ...prevState, currentSize: size }));
        }

        ctx.drawImage(image, 0, 0, size, size);
        const imgData = ctx.getImageData(0, 0, size, size);

        for (let i = 0; i < imgData.data.length; i+=4) {
            let [ r, g, b, a ] = [ imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3] ];

            if (a !== 0) {
                r = 32;
                g = 32;
                b = 32;
                a = 255;

                imgData.data[i] = r;
                imgData.data[i + 1] = g;
                imgData.data[i + 2] = b;
                imgData.data[i + 3] = a;
            }
        }

        ctx.putImageData(imgData, 0, 0);
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
