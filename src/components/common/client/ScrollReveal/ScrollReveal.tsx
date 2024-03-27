"use client";

import { isNotNullOrUndefined, isNullOrUndefined } from "@/libs/utils/assertion";
import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";

type SingleRevealProps = {
    multiple?: false;
    content: ReactNode;
};
type MultipleRevealProps = {
    multiple: true;
    content: ReactNode[];
};
type Props = {
    options?: scrollReveal.ScrollRevealObjectOptions & {
        intervalDelay?: number;
    };
} & (SingleRevealProps | MultipleRevealProps);

export const ScrollReveal: FC<Props> = props => {

    const refs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        let scrollRevealObject: scrollReveal.ScrollRevealObject;

        const setUpScrollReveal = (el: HTMLElement, i: number) => {
            const {
                intervalDelay,
                ...options
            } = props?.options ?? {};

            let delay = props.options?.delay ?? 100;

            if (props.multiple) {
                delay += i * (intervalDelay ?? 100);
            }

            scrollRevealObject.reveal(el, {
                origin: "bottom",
                duration: 500,
                easing: "ease",
                distance: "25%",
                opacity: 0,
                scale: 0.9,
                viewFactor: 0.75,
                cleanup: true,
                ...options,
                afterReveal: (el: HTMLElement) => {
                    options?.afterReveal?.(el);
                    scrollRevealObject.clean(el);
                    el.removeAttribute("style");
                    el.classList.remove("reveal-hidden");
                },
                delay: delay
            });

            el.dataset.revealed = "";
        };

        (async () => {
            scrollRevealObject = (await import("scrollreveal")).default();

            refs.current
                .filter(isNotNullOrUndefined)
                .filter(el => isNullOrUndefined(el.dataset.revealed))
                .forEach(setUpScrollReveal);
        })();
    }, [ props.content, props.multiple, props.options ]);

    const wrapComponent = (component: ReactNode, i: number = 0) => (
        <li
            key={i}
            ref={el => refs.current[i] = el}
            className="reveal-hidden"
        >
            {component}
        </li>
    );

    return Array.isArray(props.content)
        ? props.content.map(wrapComponent)
        : wrapComponent(props.content);
};
