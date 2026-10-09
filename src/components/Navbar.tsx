"use client"

import { useEffect } from "react"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { Calendar, User } from "lucide-react"
import ShoppingCartIcon from "./ShoppingCartIcon"
import { Button } from "./ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const { isAuthenticated, logout, checkSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  let loginLabel = "Sign In"
  if (isAuthenticated) {
    loginLabel = "Sign Out"
  }

  const handleSignInOut = async () => {
    if (isAuthenticated) {
      await logout();
      router.refresh();
    } else {
      router.push("/signin")
    }
  };

  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/last-legends-logo.png" alt="Relik" width={200} height={200} className="h-10 w-auto" />
            </Link>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
              onClick={() => router.push("/events")}
            >
              <Calendar className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-zinc-900"
            >
              <User className="h-5 w-5" />
            </Button>

            <ShoppingCartIcon />

            <Button
              variant="outline"
              className="border border-zinc-700 text-gray-800 hover:bg-red-600 hover:text-white hover:border-red-600 uppercase tracking-wider text-sm hidden md:block cursor-pointer"
              onClick={handleSignInOut}
            >
              {loginLabel}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar