import { useEffect, useRef } from "react";

interface CloseEventsConfig {
    onOutsideClick: boolean;
    onEscapePressed: boolean;
    isOpen: boolean;
}

const defaultConfig: CloseEventsConfig = {
    onOutsideClick: true,
    onEscapePressed: true,
    isOpen: true
};

export const useCloseEvents = <E extends HTMLElement>(
    handleClose: () => void,
    config: Partial<CloseEventsConfig> = defaultConfig
) => {
    const ref = useRef<E | null>(null);

    const {
        onOutsideClick = defaultConfig.onOutsideClick,
        onEscapePressed = defaultConfig.onEscapePressed,
        isOpen = defaultConfig.isOpen
    } = config;

    useEffect(() => {
        const element = ref.current;

        const controller = new AbortController();

        const close = () => {
            if (isOpen) {
                handleClose();
            }
        };

        const handleOutsideClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                close();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        };

        if (element) {
            element.focus();

            if (onOutsideClick) {
                window.addEventListener("click", handleOutsideClick, { signal: controller.signal });
            }
            if (onEscapePressed) {
                window.addEventListener("keydown", handleKeyDown, { signal: controller.signal });
            }
        }

        return () => {
            controller.abort();
        };
    }, [handleClose, onOutsideClick, onEscapePressed, isOpen]);

    return ref;
};
