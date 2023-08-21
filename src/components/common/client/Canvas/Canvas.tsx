import type { useCanvasParams } from "@/hooks/useCanvas";
import { useCanvas } from "@/hooks/useCanvas";
import type { FC } from "react";

type Props = {
    init: useCanvasParams[0];
    resize: useCanvasParams[1];
    draw: useCanvasParams[2];
};

export const Canvas: FC<Props> = ({ init, resize, draw }) => {

    const canvasRef = useCanvas(init, resize, draw);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};
