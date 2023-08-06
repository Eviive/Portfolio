export const request = async <T>(requestUrl: string, searchParams?: Record<string, string>, config?: RequestInit): Promise<T> => {

    const url = new URL(requestUrl, process.env.NEXT_PUBLIC_API_BASE_URL);
    const urlSearchParams = new URLSearchParams(searchParams);

    const completeUrl = url + (urlSearchParams.size > 0 ? `?${urlSearchParams}` : "");

    const res = await fetch(completeUrl, {
        headers: {
            "Content-Type": "application/json"
        },
        ...config
    });
    return res.json();
};
