"use client";

import React, { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { skipOAuthIfSessionActive } from "@/hooks/useRedirectIfAuthenticated";

declare global {
  var google: any;
}

export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" fill="#FFC107"/>
      <path d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.7 35.5 16.3 44 24 44z" fill="#4CAF50"/>
      <path d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C36.9 40 44 35 44 24c0-1.3-.1-2.7-.4-3.9z" fill="#1976D2"/>
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2"/>
    </svg>
  );
}

export function TikTokIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.24 8.24 0 004.84 1.55V6.84a4.85 4.85 0 01-1.07-.15z" fill="var(--foreground)"/>
    </svg>
  );
}

interface SocialAuthProps {
  layout?: "vertical" | "horizontal";
  onSuccess?: () => void;
}

export function GoogleAuthButton({ layout = "vertical", onSuccess }: SocialAuthProps) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const tokenClientRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let script = document.getElementById("google-gsi-script") as HTMLScriptElement | null;
    const initClient = () => {
      if (!globalThis.google?.accounts?.oauth2) return;
      tokenClientRef.current = globalThis.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error) {
            setLoading(false);
            console.error("Google OAuth error:", tokenResponse);
            toast.error("Google authentication failed.");
            return;
          }

          if (tokenResponse.access_token) {
            try {
              const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              });

              if (!userInfoResponse.ok) {
                throw new Error("Failed to fetch Google profile");
              }

              const googleUser = await userInfoResponse.json();

              const res = await api.post<{ success: boolean; user: any }>("/api/auth/google", {
                access_token: tokenResponse.access_token,
                user_info: googleUser,
              });

              if (res.user) {
                setUser(res.user);
              }

              toast.success("Login Google berhasil!");
              if (onSuccess) {
                onSuccess();
              } else {
                router.push("/");
              }
            } catch (err: any) {
              console.error("Google login failed:", err);
              toast.error(err?.message || "Google authentication failed. Please try again.");
            } finally {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        },
      });
    };

    if (!script) {
      script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initClient;
      document.body.appendChild(script);
    } else if (globalThis.google?.accounts?.oauth2) {
      initClient();
    }

    return () => {
      // Keep script cached in DOM
    };
  }, [router, setUser, onSuccess]);

  const handleLogin = async () => {
    if (loading) return;
    if (!tokenClientRef.current) {
      toast.info("Memuat Google client, silakan coba lagi...");
      return;
    }

    const skipped = await skipOAuthIfSessionActive(() => {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
      }
    });
    if (skipped) {
      return;
    }

    setLoading(true);
    try {
      tokenClientRef.current.requestAccessToken();
    } catch (e: any) {
      setLoading(false);
      console.error(e);
      toast.error("Gagal membuka popup Google.");
    }
  };

  if (layout === "horizontal") {
    return (
      <button
        type="button"
        disabled={loading}
        onClick={handleLogin}
        className="flex items-center justify-center gap-2 py-2.5 px-4 border transition-all duration-150 font-condensed font-700 uppercase text-xs hover:opacity-80 disabled:opacity-50 cursor-pointer"
        style={{
          background: "var(--card)",
          color: "var(--foreground)",
          border: "1.5px solid var(--border)",
          letterSpacing: "0.1em",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <GoogleIcon />
        <span>{loading ? "..." : "Google"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleLogin}
      className="flex flex-col items-center gap-1.5 py-2.5 border transition-all hover:opacity-80 font-mono text-xs disabled:opacity-50 cursor-pointer"
      style={{
        background: "var(--card)",
        border: "1.5px solid var(--border)",
        color: "var(--muted-foreground)",
        letterSpacing: "0.08em",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <GoogleIcon />
      <span>{loading ? "..." : "Google"}</span>
    </button>
  );
}

export function FacebookAuthButton({ layout = "vertical", onSuccess }: SocialAuthProps) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== globalThis.location.origin) return;
      if (event.data?.source === "facebook-auth") {
        setLoading(false);
        const { user, error } = event.data;
        if (error) {
          toast.error(error || "Facebook authentication failed.");
          return;
        }

        if (user) {
          setUser(user);
        }

        toast.success("Login Facebook berhasil!");
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/");
        }
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [router, setUser, onSuccess]);

  const handleLogin = async () => {
    if (loading) return;

    const skipped = await skipOAuthIfSessionActive(() => {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
      }
    });
    if (skipped) {
      return;
    }

    setLoading(true);

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      "/api/auth/facebook",
      "facebookLogin",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Monitor popup close
    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        setLoading(false);
      }
    }, 1000);
  };

  if (layout === "horizontal") {
    return (
      <button
        type="button"
        disabled={loading}
        onClick={handleLogin}
        className="flex items-center justify-center gap-2 py-2.5 px-4 border transition-all duration-150 font-condensed font-700 uppercase text-xs hover:opacity-80 disabled:opacity-50 cursor-pointer"
        style={{
          background: "var(--card)",
          color: "var(--foreground)",
          border: "1.5px solid var(--border)",
          letterSpacing: "0.1em",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <FacebookIcon />
        <span>{loading ? "..." : "Facebook"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleLogin}
      className="flex flex-col items-center gap-1.5 py-2.5 border transition-all hover:opacity-80 font-mono text-xs disabled:opacity-50 cursor-pointer"
      style={{
        background: "var(--card)",
        border: "1.5px solid var(--border)",
        color: "var(--muted-foreground)",
        letterSpacing: "0.08em",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <FacebookIcon />
      <span>{loading ? "..." : "Facebook"}</span>
    </button>
  );
}

export function TikTokPlaceholderButton({ layout = "vertical" }: { layout?: "vertical" | "horizontal" }) {
  const handleClick = () => {
    toast.info("Autentikasi TikTok akan segera hadir.");
  };

  if (layout === "horizontal") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center gap-2 py-2.5 px-4 border transition-all duration-150 font-condensed font-700 uppercase text-xs hover:opacity-80 cursor-pointer"
        style={{
          background: "var(--card)",
          color: "var(--foreground)",
          border: "1.5px solid var(--border)",
          letterSpacing: "0.1em",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <TikTokIcon />
        <span>TikTok</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-col items-center gap-1.5 py-2.5 border transition-all hover:opacity-80 font-mono text-xs cursor-pointer"
      style={{
        background: "var(--card)",
        border: "1.5px solid var(--border)",
        color: "var(--muted-foreground)",
        letterSpacing: "0.08em",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <TikTokIcon />
      <span>TikTok</span>
    </button>
  );
}
