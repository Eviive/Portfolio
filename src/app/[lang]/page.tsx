import { About } from "@/components/about/About/About";
import { Home } from "@/components/home";
import { Projects } from "@/components/projects";
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
