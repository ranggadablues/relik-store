import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api/client';

let sessionCheckInFlight: Promise<void> | null = null;

type CheckSessionOptions = {
    force?: boolean;
};

interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isInitialized: boolean;

    /** Called after successful login */
    setUser: (user: User) => void;

    /** Clear local state + tell backend */
    logout: () => Promise<void>;

    /** Ask server if session is still valid */
    checkSession: (options?: CheckSessionOptions) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,
            isInitialized: false,

            // ✅ cookies already exist, just store user
            setUser: (user) => {
                set({
                    isAuthenticated: true,
                    user,
                    isInitialized: true,
                });
            },

            // ✅ backend clears cookies
            logout: async () => {
                try {
                    await fetch("/api/auth/logout", {
                        method: "POST",
                    });
                } catch {
                    // ignore
                } finally {
                    set({
                        isAuthenticated: false,
                        user: null,
                    });
                }
            },

            checkSession: async (options?: CheckSessionOptions) => {
                const { force = false } = options ?? {};
                const state = get();

                if (!force && state.isInitialized) {
                    return;
                }

                if (sessionCheckInFlight) {
                    await sessionCheckInFlight;
                    return;
                }

                sessionCheckInFlight = (async () => {
                    try {
                        const res = await api.get<{ user?: User; data?: User; email?: string; name?: string }>("/api/auth/me");
                        const userProfile = (res as { user?: User; data?: User } & User);
                        const profile = userProfile?.user ?? userProfile?.data ?? userProfile;
                        if (profile && (profile.id || profile.email)) {
                            set({
                                isAuthenticated: true,
                                user: profile,
                                isInitialized: true,
                            });
                        } else {
                            set({
                                isAuthenticated: false,
                                user: null,
                                isInitialized: true,
                            });
                        }
                    } catch {
                        set({
                            isAuthenticated: false,
                            user: null,
                            isInitialized: true,
                        });
                    } finally {
                        sessionCheckInFlight = null;
                    }
                })();

                await sessionCheckInFlight;
            },
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)

            // ⚠️ VERY IMPORTANT
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);
