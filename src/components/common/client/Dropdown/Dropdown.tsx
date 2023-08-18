"use client";

import { useCloseEvents } from "@/hooks/useCloseEvents";
import { formatClassNames } from "@/libs/utils";
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
                {props.items.find(i => i.isSelected)?.text ?? props.items[0].text}
                <FaChevronDown size={15} />
            </button>
            <ul ref={ref} className={styles.menu}>
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
