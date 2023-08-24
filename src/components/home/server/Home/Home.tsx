import { HomeCanvas } from "@/components/home/client";
import { HomeTitle } from "@/components/home/server";
import { shuffleArray } from "@/libs/utils";
import { SkillService } from "@/services";
import type { FC } from "react";

import styles from "./home.module.scss";

export type HomeDictionary = {
    hi: string;
    occupation: string;
};

export const Home: FC = async () => {

    const skills = shuffleArray(await SkillService.findAll());

    return (
        <section id="home" className={styles.home}>
            <HomeTitle />
            <HomeCanvas skills={skills} />
        </section>
    );
};
