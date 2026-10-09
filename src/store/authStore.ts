import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api/client';


interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;

    /** Called after successful login */
    setUser: (user: User) => void;

    /** Clear local state + tell backend */
    logout: () => Promise<void>;

    /** Ask server if session is still valid */
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,

            // ✅ cookies already exist, just store user
            setUser: (user) => {
                set({
                    isAuthenticated: true,
                    user,
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

            // ✅ single source of truth
            checkSession: async () => {
                try {
                    const res = await api.get<{ user: User }>("/api/auth/me");
                    set({
                        isAuthenticated: true,
                        user: res.user,
                    });
                } catch {
                    set({
                        isAuthenticated: false,
                        user: null,
                    });
                }
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
