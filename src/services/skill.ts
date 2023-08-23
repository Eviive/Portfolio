import { request } from "@/services/client";
import type { Skill } from "@/types/entities";

const URL = "skill";

const findAll = () => request<Skill[]>(`/${URL}`);

export const SkillService = {
    findAll
};
