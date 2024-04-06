"use client";

import { OtherProjectCard } from "@/components/projects/other/other-project-card";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Grid } from "@/layouts/grid";
import { defaultLocale } from "@/libs/i18n";
import { extractLocaleFromPathname } from "@/libs/utils/url";
import { ProjectService } from "@/services/project";
import type { Page, Project } from "@/types/entities";
import { usePathname } from "next/navigation";
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

    const pathname = usePathname();

    const locale = extractLocaleFromPathname(pathname) || defaultLocale;

    const dico = useDictionary("otherProjectsWrapper", locale);

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
                    {dico.loadMoreButton}
                </Button>
            )}
        </>
    );
};
