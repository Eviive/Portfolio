import { useEffect, useRef } from "react";

type CloseEventsConfig = {
    onOutsideClick: boolean;
    onEscapePressed: boolean;
    isOpen: boolean;
};

const defaultConfig: CloseEventsConfig = {
    onOutsideClick: true,
    onEscapePressed: true,
    isOpen: true
};

export const useCloseEvents = <E extends HTMLElement>(handleClose: () => void, config: Partial<CloseEventsConfig> = defaultConfig) => {

    const ref = useRef<E | null>(null);

    const {
        onOutsideClick = defaultConfig.onOutsideClick,
        onEscapePressed = defaultConfig.onEscapePressed,
        isOpen = defaultConfig.isOpen
    } = config;

    useEffect(() => {
        const element = ref.current;

        const controller = new AbortController();

        const close = () => isOpen && handleClose();

        const handleOutsideClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                close();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && close();

        if (element) {
            element.focus();

            onOutsideClick && window.addEventListener("click", handleOutsideClick, { signal: controller.signal });
            onEscapePressed && window.addEventListener("keydown", handleKeyDown, { signal: controller.signal });
        }

        return () => controller.abort();
    }, [ handleClose, onOutsideClick, onEscapePressed, isOpen ]);

    return ref;
};
