import { Inter, Montserrat, Source_Code_Pro as SourceCodePro } from "next/font/google";

const inter = Inter({
    variable: "--font-sans",
    weight: [ "400", "700" ],
    subsets: [ "latin" ]
});

const sourceCodePro = SourceCodePro({
    variable: "--font-mono",
    weight: [ "400", "700" ],
    subsets: [ "latin" ]
});

const montserrat = Montserrat({
    variable: "--font-title",
    weight: "900",
    subsets: [ "latin" ]
});

export { inter, sourceCodePro, montserrat };
