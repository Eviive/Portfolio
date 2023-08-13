import type { Locale } from "@/lib/i18n";
import type { IconType } from "react-icons";
import { FaLaptopCode, FaMicrochip, FaSquareJs } from "react-icons/fa6";

export type Thing = {
    name: Record<Locale, string>;
    text: Record<Locale, string>;
    icon: IconType;
};

export const thingsData: Thing[] = [
    {
        name: {
            en: "Web development",
            fr: "Développement web"
        },
        text: {
            en: "I love web development because it's a creative playground where I can bring ideas to life, solve problems, and make a positive impact through technology.",
            fr: "J'adore le développement web car c'est un terrain de jeu créatif où je peux donner vie à des idées, résoudre des problèmes et avoir un impact positif grâce à la technologie."
        },
        icon: FaLaptopCode
    },
    {
        name: {
            en: "Technology",
            fr: "Technologie"
        },
        text: {
            en: "Since I was a kid, computers and technology in general is something I've always been interested in. I love understanding how things around me work.",
            fr: "Depuis que je suis enfant, les ordinateurs et la technologie en général sont des sujets qui m'ont toujours intéressé. J'adore comprendre comment les choses autour de moi fonctionnent."
        },
        icon: FaMicrochip
    },
    {
        name: {
            en: "JavaScript",
            fr: "JavaScript"
        },
        text: {
            en: "I began coding in JS several years ago and everyday I uncover new possibilities like building entire UIs with Angular or full-stack apps with Next.js.",
            fr: "J'ai commencé à coder en JS il y a plusieurs années et chaque jour je découvre de nouvelles possibilités comme construire des interfaces entières avec Angular ou des applications full-stack avec Next.js."
        },
        icon: FaSquareJs
    }
];
