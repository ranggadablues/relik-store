import "server-only";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

function getBaseUrl() {
    return process.env.API_INTERNAL_URL!;
}

async function request<TResponse, TBody = unknown>(
    method: HttpMethod,
    url: string,
    data?: TBody,
    options?: { headers?: HeadersInit }
): Promise<TResponse> {
    const res = await fetch(getBaseUrl() + url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Internal-Request": "true", // optional hardening
            ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        cache: "no-store",
    });
    console.log("res =>", res)

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
    }

    return res.json();
}

export const serverApi = {
    get<T>(url: string, options?: { headers?: HeadersInit }) {
        return request<T>("GET", url, undefined, options);
    },
    post<T, B = unknown>(url: string, body: B, options?: { headers?: HeadersInit }) {
        return request<T, B>("POST", url, body, options);
    },
    put<T, B = unknown>(url: string, body: B, options?: { headers?: HeadersInit }) {
        return request<T, B>("PUT", url, body, options);
    },
    del<T>(url: string, options?: { headers?: HeadersInit }) {
        return request<T>("DELETE", url, undefined, options);
    },
};
