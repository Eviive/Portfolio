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
};

type CanvasContextValues = {
    size: number | null;
    alpha: number | null;
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
        selectedSkillIndex: null
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCanvasState(prevState => {
                const prevIndex = prevState.selectedSkillIndex ?? -1;

                return { selectedSkillIndex: prevIndex + 1 < skillsImages.length ? prevIndex + 1 : 0 };
            });
        }, 1500);

        return () => {
            clearInterval(interval);
        };
    }, [ skillsImages.length ]);

    const init: InitCanvasCallback<CanvasContextValues> = () => ({
        contextValues: {
            size: null,
            alpha: null
        }
    });

    const resize: ResizeCanvasCallback = (canvas) => {
        canvas.width = canvas.parentElement?.clientWidth ?? 0;
        canvas.height = canvas.parentElement?.clientHeight ?? 0;
    };

    const draw: DrawCanvasCallback<CanvasContextValues> = (canvas, ctx, canvasContextValues) => {
        const { selectedSkillIndex } = canvasState;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (selectedSkillIndex === null) return;

        const image = skillsImages[selectedSkillIndex];

        if (!image.complete || !image.width || !image.height) return;

        canvasContextValues.size ??= getRandomInt(30, 350);
        canvasContextValues.alpha ??= 0;
        if (canvasContextValues.alpha < 255) {
            canvasContextValues.alpha += 3;
        }
        const { size, alpha } = canvasContextValues;

        ctx.drawImage(image, 0, 0, size, size);
        const imgData = ctx.getImageData(0, 0, size, size);

        for (let i = 0; i < imgData.data.length; i+=4) {
            const a = imgData.data[i + 3];

            if (a > alpha) {
                imgData.data[i + 3] = alpha;
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
