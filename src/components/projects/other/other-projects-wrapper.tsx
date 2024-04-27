"use client";

import { OtherProjectCard } from "@/components/projects/other/other-project-card";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Grid } from "@/layouts/grid";
import { ProjectService } from "@/services/project";
import type { Page, Project } from "@/types/entities";
import type { FC } from "react";
import { useState } from "react";

import styles from "./other-projects-wrapper.module.scss";

export type OtherProjectsWrapperDictionary = {
    loadMoreButton: string;
};

type Props = {
    initialPage: Page<Project>;
    dict: OtherProjectsWrapperDictionary;
};

type PaginationState<E> = {
    data: E[];
    page: number;
    isLastPage: boolean;
    isLoadingMore: boolean;
};

export const OtherProjectsWrapper: FC<Props> = ({ initialPage, dict }) => {
    const [pagination, setPagination] = useState<PaginationState<Project>>({
        data: initialPage.content,
        page: initialPage.number,
        isLastPage: initialPage.last,
        isLoadingMore: false
    });

    const handleClick = async () => {
        setPagination({ ...pagination, isLoadingMore: true });

        const nextPage = await ProjectService.findAllNotFeaturedFromNext(pagination.page + 1);

        setPagination(prevState => ({
            data: [...prevState.data, ...nextPage.content],
            page: nextPage.number,
            isLastPage: nextPage.last,
            isLoadingMore: false
        }));
    };

    pagination.data.sort((a, b) => a.sort - b.sort);

    const refs = useScrollReveal({
        multiple: true,
        intervalDelay: 50
    });

    return (
        <>
            <Grid className={styles.projects} minWidth="325px" columnCount={3}>
                {pagination.data.map((project, i) => (
                    <OtherProjectCard
                        key={project.id}
                        ref={el => {
                            refs.current[i] = el;
                        }}
                        project={project}
                    />
                ))}
            </Grid>
            {!pagination.isLastPage && (
                <Button
                    className={styles.button}
                    loading={pagination.isLoadingMore}
                    handleClick={handleClick}
                >
                    {dict.loadMoreButton}
                </Button>
            )}
        </>
    );
};
