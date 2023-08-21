import { About } from "@/components/about";
import { Home } from "@/components/home/server";
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
