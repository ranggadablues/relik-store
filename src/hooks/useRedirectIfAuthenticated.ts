"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type RedirectOptions = {
  redirectTo?: string;
  /** When set, used instead of Next.js router (e.g. in-app navigate). */
  onRedirect?: () => void;
};

/** If Relik session cookies are valid, run onLoggedIn and return true (skip OAuth). */
export async function skipOAuthIfSessionActive(onLoggedIn?: () => void): Promise<boolean> {
  const store = useAuthStore.getState();
  if (!store.isInitialized) {
    await store.checkSession();
  }
  if (!useAuthStore.getState().isAuthenticated) {
    return false;
  }
  onLoggedIn?.();
  return true;
}

export function useRedirectIfAuthenticated(options: RedirectOptions = {}) {
  const { redirectTo = "/", onRedirect } = options;
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    if (!isInitialized || !isAuthenticated) {
      return;
    }
    if (onRedirect) {
      onRedirect();
    } else {
      router.replace(redirectTo);
    }
  }, [isInitialized, isAuthenticated, onRedirect, redirectTo, router]);

  return { isCheckingSession: !isInitialized };
}
