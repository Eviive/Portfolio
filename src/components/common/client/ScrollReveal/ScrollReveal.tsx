"use client";

import { isNotNullOrUndefined } from "@/lib/utils";
import type { FC, ReactElement } from "react";
import { useEffect, useRef } from "react";

type SingleRevealProps = {
    multiple?: false;
    content: ReactElement;
};
type MultipleRevealProps = {
    multiple: true;
    content: ReactElement[];
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

        (async () => {
            scrollRevealObject = (await import("scrollreveal")).default();

            refs.current
                .filter(isNotNullOrUndefined)
                .forEach((el, i) => {
                    const {
                        intervalDelay,
                        ...options
                    } = props?.options ?? {};

                    let delay = props.options?.delay ?? 150;

                    if (props.multiple) {
                        delay += i * (intervalDelay ?? 100);
                    }

                    scrollRevealObject.reveal(el, {
                        origin: "bottom",
                        easing: "ease",
                        distance: "25%",
                        opacity: 0,
                        scale: 0.75,
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
                });
        })();

        return () => {
            scrollRevealObject?.destroy();
        };
    }, [ props ]);

    const wrapComponent = (component: ReactElement, i: number = 0) => (
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
