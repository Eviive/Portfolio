"use client";

import type { FC } from "react";
import { useState } from "react";

type DropdownItem = {
    text: string;
    href: string;
    isSelected: boolean;
};

type Props = {
    items: DropdownItem[];
};

export const Dropdown: FC<Props> = props => {

    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <>
            {props.items.map(i => (
                <a key={i.text} href={i.href}>
                    {i.text}
                </a>
            ))}
        </>
    );
};
