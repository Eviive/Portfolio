import { useEffect, useRef } from "react";

export type InitCanvasCallback<C extends Record<string, unknown>> = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    contextValues: C
    destructor?: () => void;
};
export type ResizeCanvasCallback = (canvas: HTMLCanvasElement) => void;
export type DrawCanvasCallback<C extends Record<string, unknown>> = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, contextValues: C) => void;

type Props<C extends Record<string, unknown>> = {
    init: InitCanvasCallback<C>;
    resize: ResizeCanvasCallback;
    draw: DrawCanvasCallback<C>;
    className?: string;
};

export const Canvas = <C extends Record<string, unknown>>(props: Props<C>) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current,
              ctx = canvas?.getContext("2d", { willReadFrequently: true });

        if (!canvas || !ctx) return;

        const resizeCanvas = () => props.resize(canvas);
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const {
            destructor,
            contextValues
        } = props.init(canvas, ctx);

        let animationFrameId: number;
        const render = () => {
            props.draw(canvas, ctx, contextValues);
            animationFrameId = window.requestAnimationFrame(render);
        };
        animationFrameId = window.requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            destructor?.();
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [ props ]);

    return (
        <canvas ref={canvasRef} className={props.className}></canvas>
    );
};
