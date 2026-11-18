import type { Metadata } from "next";
import { Anton, Barlow_Condensed, DM_Sans, Space_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import { AuthSessionInit } from "@/components/AuthSessionInit";
import { HeaderNav, Footer } from "@/components/HeaderNav";

const anton = Anton({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-anton",
    display: "swap",
});

const barlowCondensed = Barlow_Condensed({
    weight: ["400", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-barlow-condensed",
    display: "swap",
});

const dmSans = DM_Sans({
    weight: ["300", "400", "500"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-dm-sans",
    display: "swap",
});

const spaceMono = Space_Mono({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-space-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "RELIK",
    description: "Seperti menemukan kaset lama di lemari — RELIK membawa kembali energi jalanan yang tak pernah mati.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="id"
            className={`${anton.variable} ${barlowCondensed.variable} ${dmSans.variable} ${spaceMono.variable}`}
        >
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
                />
            </head>
            <body>
                <AuthSessionInit />
                <div className="grain min-h-screen" style={{ background: "var(--background)" }}>
                    <HeaderNav />
                    <main>{children}</main>
                    <Footer />
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </body>
        </html>
    );
}
