import type { Falsy } from "@/types/utils";

export const isNotFalsy = <V>(value: V | Falsy): value is V =>
    Number.isNaN(value) ? false : !!value;

export const isNullOrUndefined = <V>(value: V | null | undefined): value is null | undefined =>
    value === null || value === undefined;

export const isNotNullOrUndefined = <V>(value: V | null | undefined): value is V =>
    !isNullOrUndefined(value);
