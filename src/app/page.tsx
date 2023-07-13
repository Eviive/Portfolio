import { About } from "@/components/about";
import { Home } from "@/components/home";
import { Projects as Projects } from "@/components/projects";
import type { NextPage } from "next";

export const revalidate = 0;

const Index: NextPage = () => {
    return (
        <>
            <Home />
            <About />
            <Projects />
            {/*<Contact />*/}
        </>
    );
};

export default Index;
