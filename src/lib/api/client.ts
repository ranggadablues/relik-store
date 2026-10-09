"use client";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

/**
 * ⚠️ Client memory only
 * - Reset on refresh
 * - OK for SPA usage
 * - For persistence use cookie or localStorage
 */
let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setTokens(tokens: { accessToken: string; refresh: string }) {
    accessToken = tokens.accessToken;
    refreshToken = tokens.refresh;
}

function getBaseUrl() {
    // ✅ Client-only: browser → gateway
    const base = process.env.NEXT_PUBLIC_API_URL;

    if (!base) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    return base;
}

async function request<TResponse, TBody = unknown>(
    method: HttpMethod,
    url: string,
    data?: TBody,
    params?: Record<string, string>,
    retry = false
): Promise<TResponse> {
    const BASE_URL = getBaseUrl();

    const queryString = params
        ? `?${new URLSearchParams(params).toString()}`
        : "";

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const res = await fetch(BASE_URL + url + queryString, {
        method,
        headers,
        body: method === "GET" || data === undefined
            ? undefined
            : JSON.stringify(data),
        credentials: "include", // ✅ if refresh token is cookie-based
    });

    if (!res.ok) {
        let message = `API Error: ${res.status}`;

        try {
            const err = await res.json();
            message = err?.message ?? message;
        } catch {
            // ignore JSON parse error
        }

        throw new Error(message);
    }

    return res.json();
}

/* ------------------ Refresh token ------------------ */

function clearTokens() {
    accessToken = null;
    refreshToken = null;
}

/* ------------------ Public API ------------------ */

export const api = {
    get<TResponse>(url: string, params?: Record<string, string>) {
        return request<TResponse>("GET", url, undefined, params);
    },

    post<TResponse, TBody = unknown>(
        url: string,
        data?: TBody,
        params?: Record<string, string>
    ) {
        return request<TResponse, TBody>("POST", url, data, params);
    },

    put<TResponse, TBody = unknown>(
        url: string,
        data?: TBody,
        params?: Record<string, string>
    ) {
        return request<TResponse, TBody>("PUT", url, data, params);
    },

    del<TResponse>(url: string, params?: Record<string, string>) {
        return request<TResponse>("DELETE", url, undefined, params);
    },

    setTokens,
    clearTokens,
};
