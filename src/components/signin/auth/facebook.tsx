"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type FacebookAuthResponse = {
  tokens: {
    accessToken: string;
    refresh: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
};

export default function FacebookLoginButton() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const login = () => {
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      "/api/auth/facebook",
      "facebookLogin",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== globalThis.location.origin) return;
      if (event.data?.source === "facebook-auth") {
        const { user } = event.data;

        // Store to Zustand or cookies
        setUser(user);

        router.refresh();
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [router, setUser]);

  return (
    <button
      type="button"
      className="bg-zinc-900 border border-zinc-700 text-gray-300 py-3 uppercase tracking-wide hover:border-red-600 hover:text-white transition-all duration-300 cursor-pointer"
      onClick={login}
    >
      Facebook
    </button>
  )
}