"use client";

import { useEffect, useRef } from "react";
import { api } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

declare global {
    var google: any;
}

type GoogleAuthResponse = {
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

export default function GoogleSignIn() {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);
    const tokenClientRef = useRef<any>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (!globalThis.google) {
                console.error("Google SDK not loaded");
                return;
            }

            // Initialize OAuth 2.0 Token Client (this ALWAYS works with popups)
            tokenClientRef.current = google.accounts.oauth2.initTokenClient({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                callback: async (tokenResponse: any) => {

                    if (tokenResponse.access_token) {
                        try {
                            // Get user info from Google using the access token
                            const userInfoResponse = await fetch(
                                'https://www.googleapis.com/oauth2/v3/userinfo',
                                {
                                    headers: {
                                        Authorization: `Bearer ${tokenResponse.access_token}`,
                                    },
                                }
                            );

                            const googleUser = await userInfoResponse.json();

                            // Send to your backend
                            const res = await api.post<GoogleAuthResponse>("/api/auth/google", {
                                access_token: tokenResponse.access_token,
                                user_info: googleUser,
                            });

                            setUser(res.user);
                            router.push("/");
                        } catch (err) {
                            console.error("Google login failed", err);
                        }
                    }
                },
            });

            console.log("Token client initialized");
        };

        script.onerror = () => {
            console.error("Failed to load Google SDK script");
        };

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [router, setUser]);

    const login = () => {
        console.log("Custom button clicked");

        if (!tokenClientRef.current) {
            console.warn("Google OAuth client not initialized yet, please wait...");
            return;
        }

        console.log("Requesting access token - popup should open...");
        // This will ALWAYS open a popup (no FedCM)
        tokenClientRef.current.requestAccessToken();
    };

    return (
        <button
            id="google-signin"
            type="button"
            className="bg-zinc-900 border border-zinc-700 text-gray-300 py-3 uppercase tracking-wide hover:border-red-600 hover:text-white transition-all duration-300 cursor-pointer"
            onClick={login}
        >
            Google
        </button>
    );
}