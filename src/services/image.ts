import type { Image } from "@/types/entities";

const URL = "image";

const getImageUrl = (image: Image) => image.uuid ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${URL}/${image.uuid}` : null;

export const ImageService = {
    getImageUrl
};
