type RequestConfig = RequestInit & {
    fetchFromNext?: boolean;
};

export const request = async <T>(requestUrl: string, searchParams?: Record<string, string>, config?: RequestConfig): Promise<T> => {
    const {
        fetchFromNext = false,
        ...restConfig
    } = config ?? {};

    const url = new URL(requestUrl, fetchFromNext ? process.env.NEXT_PUBLIC_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL);

    url.search = new URLSearchParams(searchParams).toString();

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        ...restConfig
    });
    return res.json();
};
