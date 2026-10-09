import type { Metadata } from "next";
import "@/styles/globals.css";
import { HeaderNav, Footer } from "@/components/HeaderNav";

export const metadata: Metadata = {
  title: "RELIK",
  description: "Seperti menemukan kaset lama di lemari — RELIK membawa kembali energi jalanan yang tak pernah mati.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grain min-h-screen" style={{ background: "var(--background)" }}>
      <HeaderNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
