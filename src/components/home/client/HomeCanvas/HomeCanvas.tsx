import { Canvas } from "@/components/common/client";
import type { FC } from "react";

import styles from "./home-canvas.module.scss";

export const HomeCanvas: FC = () => {



    return (
        <Canvas init={(canvas, ctx) => () => {}} resize={() => {}} draw={() => {}}></Canvas>
    );
};
