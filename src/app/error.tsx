"use client";

import type { FC } from "react";
import { useEffect } from "react";

type Props = {
    error: Error;
    reset: () => void;
};

export const Error: FC<Props> = props => {

    useEffect(() => {
        console.error(props.error);
    }, [ props.error ]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={props.reset}>
                Try again
            </button>
        </div>
    );
};

export default Error;
