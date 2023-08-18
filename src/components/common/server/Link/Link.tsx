import { formatClassNames } from "@/libs/utils";
import NextLink from "next/link";
import type { ComponentPropsWithRef, FC } from "react";

import styles from "./link.module.scss";

type LinkProps = ComponentPropsWithRef<typeof NextLink>;
type Props = {
    blank?: boolean;
} & LinkProps;

export const Link: FC<Props> = props => {

    const { blank, ...linkProps } = props;

    return (
        <NextLink
            {...linkProps}
            className={formatClassNames(linkProps.className, styles.link)}
            target={blank ? "_blank" : linkProps.target}
        >
            {linkProps.children}
        </NextLink>
    );
};
