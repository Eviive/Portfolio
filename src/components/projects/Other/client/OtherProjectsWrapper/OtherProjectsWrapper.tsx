"use client";

import { Button } from "@/components/common/client";
import { OtherProjectCard } from "@/components/projects/other/server";
import { GridLayout } from "@/layouts";
import { ProjectService } from "@/services";
import type { PaginationState } from "@/types/app";
import type { Page, Project } from "@/types/entities";
import type { FC } from "react";
import { useState } from "react";

import styles from "./other-projects-wrapper.module.scss";

type Props = {
    initialPage: Page<Project>
};

export const OtherProjectsWrapper: FC<Props> = props => {

    const [ pagination, setPagination ] = useState<PaginationState<Project>>({
        data: props.initialPage.content,
        page: props.initialPage.number,
        isLastPage: props.initialPage.last,
        isLoadingMore: false
    });

    const handleClick = async () => {
        setPagination({ ...pagination, isLoadingMore: true });

        const nextPage = await ProjectService.findAllNotFeaturedPaginated(pagination.page + 1);

        setPagination(prevState => ({
            data: [ ...prevState.data, ...nextPage.content ],
            page: nextPage.number,
            isLastPage: nextPage.last,
            isLoadingMore: false
        }));
    };

    return (
        <>
            <GridLayout className={styles.projects} size="300px">
                {pagination.data
                    .sort((a, b) => a.sort - b.sort)
                    .map((project, i) => (
                        <OtherProjectCard key={i} project={project} />
                    ))
                }
            </GridLayout>
            {!pagination.isLastPage && (
                <Button
                    className={styles.button}
                    loading={pagination.isLoadingMore}
                    handleClick={handleClick}
                >
                    Load more
                </Button>
            )}
        </>
    );
};
