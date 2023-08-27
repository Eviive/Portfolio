"use client";

import { Button, ScrollReveal } from "@/components/common/client";
import { OtherProjectCard } from "@/components/projects/other/server";
import { useDictionary } from "@/hooks/useDictionary";
import { GridLayout } from "@/layouts";
import { ProjectService } from "@/services";
import type { Page, Project } from "@/types/entities";
import type { FC } from "react";
import { useState } from "react";

import styles from "./other-projects-wrapper.module.scss";

export type OtherProjectsWrapperDictionary = {
    loadMoreButton: string;
};

type Props = {
    initialPage: Page<Project>
};

type PaginationState<E> = {
    data: E[];
    page: number;
    isLastPage: boolean;
    isLoadingMore: boolean;
};

export const OtherProjectsWrapper: FC<Props> = props => {

    const dico = useDictionary("otherProjectsWrapper");

    const [ pagination, setPagination ] = useState<PaginationState<Project>>({
        data: props.initialPage.content,
        page: props.initialPage.number + 1,
        isLastPage: props.initialPage.last,
        isLoadingMore: false
    });

    const handleClick = async () => {
        setPagination({ ...pagination, isLoadingMore: true });

        const nextPage = await ProjectService.findAllNotFeaturedPaginatedFromNext(pagination.page + 1);

        setPagination(prevState => ({
            data: [ ...prevState.data, ...nextPage.content ],
            page: nextPage.number + 1,
            isLastPage: nextPage.last,
            isLoadingMore: false
        }));
    };

    pagination.data.sort((a, b) => a.sort - b.sort);

    return (
        <>
            <GridLayout className={styles.projects} minWidth="300px" columnCount={4}>
                <ScrollReveal
                    multiple
                    content={
                        pagination.data.map(project => (
                            <OtherProjectCard key={project.id} project={project} />
                        ))
                    }
                    options={{
                        intervalDelay: 50
                    }}
                />
            </GridLayout>
            {!pagination.isLastPage && (
                <Button
                    className={styles.button}
                    loading={pagination.isLoadingMore}
                    handleClick={handleClick}
                >
                    {dico.loadMoreButton}
                </Button>
            )}
        </>
    );
};
