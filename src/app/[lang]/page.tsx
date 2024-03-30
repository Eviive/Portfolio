import { About } from "@/components/about/about";
import { Home } from "@/components/home/home";
import { Projects } from "@/components/projects/projects";
import type { NextPage } from "next";

const Index: NextPage = () => {
    return (
        <>
            <Home />
            <About />
            <Projects />
        </>
    );
};

export default Index;
