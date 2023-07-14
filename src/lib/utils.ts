import type { Falsy } from "@/types/app";

// Components

export const formatClassNames = (...classNames: (string | Falsy)[]) => classNames.filter(Boolean).join(" ");
