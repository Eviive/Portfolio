import { useEffect, useRef } from "react";
import type  { RefObject } from "react";

export type useCanvasParams = Parameters<typeof useCanvas>;

export const useCanvas = (
    canvasInit: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => () => void,
    canvasResize: (canvas: HTMLCanvasElement) => void,
    canvasDraw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
): RefObject<HTMLCanvasElement> => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            const resize = () => canvasResize(canvas);
            resize();
            window.addEventListener("resize", resize);

            const clean = canvasInit(canvas, ctx);

            let animationFrameId: number;
            const render = () => {
                canvasDraw(canvas, ctx);
                animationFrameId = window.requestAnimationFrame(render);
            };
            animationFrameId = window.requestAnimationFrame(render);

            return () => {
                window.removeEventListener("resize", resize);
                clean();
                window.cancelAnimationFrame(animationFrameId);
            };
        }
    }, [ canvasDraw, canvasInit, canvasResize ]);

    return canvasRef;
};
