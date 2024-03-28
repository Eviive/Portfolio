import { isNotNullOrUndefined, isNullOrUndefined } from "@/libs/utils/assertion";
import { useEffect, useRef } from "react";

type ScrollRevealConfig = scrollReveal.ScrollRevealObjectOptions & {
    intervalDelay?: number;
    multiple?: boolean;
};

export const useScrollReveal = (config: ScrollRevealConfig) => {

    const refs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        let sr: scrollReveal.ScrollRevealObject;

        const setUpScrollReveal = (el: HTMLElement, i: number) => {
            const {
                intervalDelay,
                ...options
            } = config ?? {};

            let delay = config?.delay ?? 100;

            if (config.multiple) {
                delay += i * (intervalDelay ?? 100);
            }

            sr.reveal(el, {
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
                    sr.clean(el);
                    el.removeAttribute("style");
                    el.classList.remove("reveal-hidden");
                },
                delay: delay
            });

            el.dataset.revealed = "";
        };

        (async () => {
            sr = (await import("scrollreveal")).default();

            refs.current
                .filter(isNotNullOrUndefined)
                .filter(el => isNullOrUndefined(el.dataset.revealed))
                .forEach(setUpScrollReveal);
        })();
    }, [ config ]);

    if (typeof window === "undefined") {
        refs.current
            .filter(isNotNullOrUndefined)
            .filter(el => isNullOrUndefined(el.dataset.revealed))
            .forEach((el, i) => {
                el.classList.add("reveal-hidden");
            });
    }

    return refs;
};
