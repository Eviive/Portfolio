import { getRandomInt } from "@/libs/utils/number";

export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffledArray = [ ...array ];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);

        [ shuffledArray[i], shuffledArray[j] ] = [ shuffledArray[j], shuffledArray[i] ];
    }

    return shuffledArray;
};
