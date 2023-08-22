"use client";

import { Canvas } from "@/components/common/client";
import { useDictionary } from "@/hooks/useDictionary";
import { Particle } from "@/libs/Particle";
import { useRef } from "react";
import type { FC } from "react";

import styles from "./home.module.scss";

export type HomeDictionary = {
    hi: string;
    occupation: string;
};

export const Home: FC = () => {

    const dico = useDictionary("home");

    const ref = useRef<HTMLElement>(null);

    const init = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const isInCanvas = (x: number, y: number) => x > canvas.offsetLeft && x < canvas.offsetWidth + canvas.offsetLeft && y > canvas.offsetTop && y < canvas.offsetHeight + canvas.offsetTop;
        const isButton = (path: EventTarget[]) => path.some(el => el instanceof HTMLButtonElement || el instanceof HTMLAnchorElement);
        const newParticle = (e: MouseEvent) => {
            if (!isButton(e.composedPath()) && isInCanvas(e.pageX, e.pageY)) {
                const n = e.type === "click" ? 20 : 2;
                for (let i = 0; i < n; i++) {
                    new Particle(ctx, e.pageX, e.pageY);
                }
            }
        };
        window.addEventListener("mousemove", newParticle);
        window.addEventListener("click", newParticle);

        return () => {
            window.removeEventListener("mousemove", newParticle);
            window.removeEventListener("click", newParticle);
        };
    };

    const resize = (canvas: HTMLCanvasElement) => {
        canvas.width = ref.current?.clientWidth ?? 0;
        canvas.height = ref.current?.clientHeight ?? 0;

        // const homeWidth = ref.current?.clientWidth || 0;
        // canvas.width = homeWidth;

        // const homeHeight = ref.current?.clientHeight || 0;
        // const top = ref.current?.clientHeight || 0;
        // const middle = homeHeight;
        // const hypothenuse = homeWidth / 2;
        // const bottom = 100 + Math.tan(2 * (Math.PI / 180)) * hypothenuse;
        // canvas.height = Math.ceil(top + middle + bottom);
    };

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < Particle.particles.length; i++) {
            if (!Particle.particles[i].update()) {
                Particle.particles.splice(i, 1);
            } else {
                for (let j = i+1; j < Particle.particles.length; j++) {
                    const dx = Particle.particles[i].x - Particle.particles[j].x;
                    const dy = Particle.particles[i].y - Particle.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 40 && distance < 100 && Particle.particles[i].size > 1 && Particle.particles[j].size > 1) {
                        ctx.beginPath();
                        ctx.strokeStyle = Particle.particles[i].color;
                        ctx.lineWidth = .2;
                        ctx.moveTo(Particle.particles[i].x, Particle.particles[i].y);
                        ctx.lineTo(Particle.particles[j].x, Particle.particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
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
