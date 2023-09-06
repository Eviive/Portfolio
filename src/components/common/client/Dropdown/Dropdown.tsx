"use client";

import { useCloseEvents } from "@/hooks/useCloseEvents";
import { formatClassNames } from "@/libs/utils/react";
import type { FC } from "react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import styles from "./dropdown.module.scss";

type DropdownItem = {
    text: string;
    href: string;
    isSelected: boolean;
};

type Props = {
    items: DropdownItem[];
    menuClassName?: string;
};

export const Dropdown: FC<Props> = props => {

    const [ isOpen, setIsOpen ] = useState(false);

    const ref = useCloseEvents<HTMLUListElement>(() => setIsOpen(false), { isOpen });

    return (
        <div className={formatClassNames(styles.dropdown, isOpen && styles.open)}>
            <button
                className={styles.button}
                onClick={e => {
                    e.stopPropagation();
                    setIsOpen(prevOpen => !prevOpen);
                }}
            >
                {props.items.find(i => i.isSelected)?.text}
                <FaChevronDown size={16} />
            </button>
            <ul ref={ref} className={formatClassNames(styles.menu, props.menuClassName)}>
                {props.items
                    .filter(i => !i.isSelected)
                    .map(i => (
                        <li key={i.text}>
                            <a href={i.href}>
                                {i.text}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
