/**
 * Reads environment variables from Node's runtime process.env so Next.js/Turbopack
 * does not inline `NEXT_PUBLIC_*` values as `undefined` during Docker builds.
 */
export function getRuntimeEnv(...keys: string[]): string {
    const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
    if (!env) return "";

    for (const key of keys) {
        const value = env[key]?.trim();
        if (value) return value;
    }

    return "";
}
