import type { EffectCallback, FC } from "react";
import { useEffect, useRef } from "react";

type Props = {
    className?: string;
    init: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => ReturnType<EffectCallback>;
    resize: (canvas: HTMLCanvasElement) => void;
    draw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
};

export const Canvas: FC<Props> = props => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", { willReadFrequently: true });

        if (!canvas || !ctx) return;

        const resizeCanvas = () => props.resize(canvas);
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const clean = props.init(canvas, ctx);

        let animationFrameId: number;
        const render = () => {
            props.draw(canvas, ctx);
            animationFrameId = window.requestAnimationFrame(render);
        };
        animationFrameId = window.requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            clean?.();
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [ props ]);

    return (
        <canvas ref={canvasRef} className={props.className}></canvas>
    );
};
