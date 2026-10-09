import { cookies } from 'next/headers';

type CookieOptions = {
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    maxAge?: number;
    expires?: Date;
};

const DEFAULT_OPTIONS: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
};

export async function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
) {
    (await cookies()).set({
        name,
        value,
        ...DEFAULT_OPTIONS,
        ...options,
    });
}

export async function getCookie(name: string) {
    return (await cookies()).get(name)?.value ?? null;
}

export async function deleteCookie(name: string, options: CookieOptions = {}) {
    (await cookies()).delete({
        name,
        path: options.path ?? '/',
    });
}

export const cookiesHelper = {
    setCookie,
    getCookie,
    deleteCookie,
}