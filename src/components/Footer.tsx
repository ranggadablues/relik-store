import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/Input"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="relative bg-black border-t border-zinc-800">
            {/* Top red accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl text-white uppercase tracking-wider">
                            90&apos;s Band Tees
                        </h3>
                        <div className="w-12 h-0.5 bg-red-600" />
                        <p className="text-gray-400 text-sm">
                            Authentic vintage band t-shirts from the golden era of rock, grunge, and alternative music.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link
                                href="https://www.instagram.com/relik/"
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://www.facebook.com/relik/"
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://www.twitter.com/relik/"
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://www.youtube.com/relik/"
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-4">
                        <h4 className="text-white uppercase tracking-wider">Shop</h4>
                        <div className="w-12 h-0.5 bg-red-600" />
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    Best Sellers
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    Sale
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    All T-Shirts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 className="text-white uppercase tracking-wider">Customer Service</h4>
                        <div className="w-12 h-0.5 bg-red-600" />
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    Size Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wide">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-white uppercase tracking-wider">Stay Connected</h4>
                        <div className="w-12 h-0.5 bg-red-600" />
                        <p className="text-gray-400 text-sm">
                            Get the latest drops and exclusive offers.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-500 focus:border-red-600"
                            />
                            <Button className="bg-red-600 hover:bg-red-700 text-white uppercase tracking-wider whitespace-nowrap">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-zinc-800 bg-zinc-950">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p className="uppercase tracking-wide">
                            © 2025 Relik. All Rights Reserved.
                        </p>
                        <div className="flex gap-6 uppercase tracking-wide">
                            <Link href="/" className="hover:text-red-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/" className="hover:text-red-600 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer