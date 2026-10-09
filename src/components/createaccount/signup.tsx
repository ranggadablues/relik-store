"use client"

import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPasswordStrength } from '@/lib/helper/helper';
import { SignUpInput, signUpSchema, Response } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from '@/lib/api/client';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittedData, setSubmittedData] = useState<Response | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid, isSubmitting }
    } = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange" // 👈 live validation
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const passwordStrength = getPasswordStrength(password || "");
    const confirmPasswordStrength = getPasswordStrength(confirmPassword || "");

    const getStrengthColor = (score: number) => {
        if (score <= 1) return "#dc2626"; // red
        if (score === 2) return "#d97706"; // amber
        if (score === 3) return "#eab308"; // yellow
        return "#16a34a"; // green
    };

    useEffect(() => {
        if (!submittedData) return;

        router.push(`/createaccount/success/${submittedData.data.link}`)
    }, [submittedData])

    const onSubmit = async (data: SignUpInput) => {
        setError(null);
        try {
            const response = await api.post<Response>("/api/auth/signup", data)
            if (!response.success) {
                toast.error(`${response.message}`)
                return
            }
            setSubmittedData(response);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        }
    };



    return (
        <div className="min-h-screen bg-black flex">
            {/* Back to Home Button - Fixed Position */}
            <Link
                href="/"
                className="fixed top-8 left-8 z-50 flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors group"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="uppercase tracking-wider text-sm">Back to Home</span>
            </Link>

            {/* Left Side - Image & Branding */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/concert-black-white.jpeg"
                    alt="Rock Concert"
                    className="w-full h-full object-cover"
                    fill
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-16">
                    <h2 className="text-5xl text-white uppercase tracking-wider mb-6">
                        Become A<br />Legend
                    </h2>
                    <div className="w-20 h-1 bg-red-600 mb-6" />
                    <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
                        Join thousands of rock fans worldwide. Get exclusive access to limited edition merch, early ticket sales, and unforgettable experiences.
                    </p>

                    {/* Features */}
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 mt-2" />
                            <div>
                                <h4 className="text-white uppercase tracking-wider mb-1">Limited Edition Drops</h4>
                                <p className="text-gray-400 text-sm">Be first to know about exclusive 90's band merchandise</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 mt-2" />
                            <div>
                                <h4 className="text-white uppercase tracking-wider mb-1">VIP Access</h4>
                                <p className="text-gray-400 text-sm">Priority booking for concerts and special events</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 mt-2" />
                            <div>
                                <h4 className="text-white uppercase tracking-wider mb-1">Community</h4>
                                <p className="text-gray-400 text-sm">Connect with fellow rock enthusiasts and collectors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo & Brand */}
                    <div className="flex flex-col items-center mb-10">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/last-legends-logo.png"
                                alt="Last Legends Logo"
                                width={500}
                                height={500}
                                className="h-20 w-auto object-contain mb-2"
                            />
                        </Link>
                        <div className="w-16 h-1 bg-red-600" />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl text-white uppercase tracking-wider mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-400 tracking-wide">
                            Join the community and rock with legends
                        </p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="fullName" className="block text-gray-400 uppercase tracking-wider text-sm mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-12 pr-4 py-3 text-gray-300 placeholder-gray-600 capitalize tracking-wide focus:outline-none focus:border-red-600 transition-colors"
                                    {...register("name")}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-gray-400 uppercase tracking-wider text-sm mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-12 pr-4 py-3 text-gray-300 placeholder-gray-600 lowercase tracking-wide focus:outline-none focus:border-red-600 transition-colors"
                                    {...register("email")}
                                />
                            </div>
                        </div>

                        {/* Date of Birth Input */}
                        <div>
                            <label htmlFor="dateOfBirth" className="block text-gray-400 uppercase tracking-wider text-sm mb-2">
                                Date of Birth
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="dateOfBirth"
                                    type="date"
                                    {...register("dob")}
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-12 pr-4 py-3 text-gray-300 placeholder-gray-600 uppercase tracking-wide focus:outline-none focus:border-red-600 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-gray-400 uppercase tracking-wider text-sm mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password")}
                                    placeholder="CREATE PASSWORD"
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-12 pr-12 py-3 text-gray-300 placeholder-gray-600 tracking-wide focus:outline-none focus:border-red-600 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength UI */}
                            <div className="mt-2">
                                <div className="h-2 w-full bg-zinc-800 rounded">
                                    <div
                                        className="h-2 rounded transition-all"
                                        style={{
                                            width: `${(passwordStrength.score / 5) * 100}%`,
                                            backgroundColor: getStrengthColor(passwordStrength.score)
                                        }}
                                    />
                                </div>
                                <p className="text-xs mt-1 text-gray-400 uppercase tracking-wide">
                                    Strength: {passwordStrength.strength}
                                </p>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-400 uppercase tracking-wider text-sm mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register("confirmPassword")}
                                    placeholder="CONFIRM PASSWORD"
                                    className="w-full bg-zinc-900 border border-zinc-700 pl-12 pr-12 py-3 text-gray-300 placeholder-gray-600 tracking-wide focus:outline-none focus:border-red-600 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Confirm Password Strength UI */}
                            <div className="mt-2">
                                <div className="h-2 w-full bg-zinc-800 rounded">
                                    <div
                                        className="h-2 rounded transition-all"
                                        style={{
                                            width: `${(confirmPasswordStrength.score / 5) * 100}%`,
                                            backgroundColor: getStrengthColor(confirmPasswordStrength.score)
                                        }}
                                    />
                                </div>
                                <p className="text-xs mt-1 text-gray-400 uppercase tracking-wide">
                                    Strength: {confirmPasswordStrength.strength}
                                </p>
                            </div>
                        </div>

                        {/* Terms & Newsletter Checkboxes */}
                        <div className="space-y-3 pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...register("agreeToTerms")}
                                    className="w-4 h-4 mt-1 bg-zinc-900 border border-zinc-700 rounded-sm checked:bg-red-600 checked:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
                                />
                                <span className="text-gray-400 text-sm">
                                    I agree to the{' '}
                                    <Link href="#" className="text-red-600 hover:text-red-500 transition-colors">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="#" className="text-red-600 hover:text-red-500 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...register("subscribeNewsletter")}
                                    className="w-4 h-4 mt-1 bg-zinc-900 border border-zinc-700 rounded-sm checked:bg-red-600 checked:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
                                />
                                <span className="text-gray-400 text-sm">
                                    Subscribe to newsletter for exclusive drops and events
                                </span>
                            </label>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            // className="w-full bg-red-600 text-white py-4 uppercase tracking-widest hover:bg-red-700 transition-colors"
                            className={`
                                w-full py-4 uppercase tracking-widest transition-colors
                                ${!isSubmitting && isValid
                                    ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                    : "bg-zinc-700 cursor-not-allowed opacity-60 text-white"
                                }
                            `}

                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center pt-6 border-t border-zinc-800">
                            <p className="text-gray-400 mb-2">
                                Already have an account?
                            </p>
                            <Link href="/signin" className="text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
