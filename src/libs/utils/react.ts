import { isNotFalsy } from "@/libs/utils/assertion";
import type { Falsy } from "@/types/utils";

export const formatClassNames = (...classNames: (string | Falsy)[]) =>
    classNames.filter(isNotFalsy).join(" ");
