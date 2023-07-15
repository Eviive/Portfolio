import type { Falsy } from "@/types/app";

const isNotFalsy = <V>(value: V | Falsy): value is V => !!value;

export const formatClassNames = (...classNames: (string | Falsy)[]) => classNames.filter(isNotFalsy).join(" ");

export const isNullOrUndefined = <V>(value: V | null | undefined): value is null | undefined => value === null || value === undefined;

export const isNotNullOrUndefined = <V>(value: V | null | undefined): value is V => !isNullOrUndefined(value);
