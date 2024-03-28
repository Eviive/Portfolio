import type { Image } from "@/types/entities";

const getImageUrl = (image: Image, type: "skills" | "projects") => {
    if (!image.uuid) return null;

    return `${process.env.NEXT_PUBLIC_AZURE_ASSETS_BASE_URL}/${type}/${image.uuid}`;
};

export const ImageService = {
    getImageUrl
};
