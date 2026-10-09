"use client"

import { api, ApiResponse } from "@/lib/api/client";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from "react";

type verifyResponse = {
    success: boolean;
}

export function SignUpSuccess() {
    const router = useRouter();
    const params = useParams()
    const id = params.id;
    const handleGoHome = () => {
        router.push('/');
    };

    const handleResendEmail = () => {
        console.log('Resend Email');
    };

    useEffect(() => {
        if (!id) {
            router.push('/');
            return
        }

        const verify = async () => {
            try {
                const response = await api.get<ApiResponse<verifyResponse>>(`/api/auth/signup/createaccount?token=${id}`);
                if (!response.data.success) {
                    // redirect to root page
                    router.push('/');
                    return
                }
            } catch (error) {
                console.log(error);
            }
        }
        verify();
    }, [id]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-[150px]" />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image
                        src="/last-legends-logo.png"
                        alt="Last Legends Logo"
                        width={500}
                        height={500}
                        className="h-20 w-auto object-contain mb-2"
                    />
                </div>

                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <CheckCircle2 className="w-24 h-24 text-red-600" strokeWidth={1.5} />
                </div>

                {/* Success Heading */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl md:text-5xl text-white uppercase tracking-widest mb-4">
                        Welcome Aboard!
                    </h1>
                    <div className="flex justify-center mb-6">
                        <div className="h-1 bg-red-600 w-20" />
                    </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                    <h2 className="text-xl md:text-2xl text-white uppercase tracking-wider mb-4">
                        Registration Successful
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                        Your account has been created successfully! Please check your email for the activation link to complete the registration process.
                    </p>
                </div>

                {/* Email Notice Card */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 mb-10 max-w-lg mx-auto">
                    <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-white uppercase tracking-wider mb-2">
                                Check Your Inbox
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We've sent a verification email to your inbox. Click the activation link to unlock exclusive access to limited edition merch and VIP events.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleGoHome}
                        className="group relative bg-red-600 text-white px-10 py-4 uppercase tracking-widest hover:bg-red-700 transition-colors"
                    >
                        <span className="relative flex items-center gap-2">
                            Go to Main Page
                            <ArrowRight className="w-5 h-5" />
                        </span>
                    </button>

                    <button
                        onClick={handleResendEmail}
                        className="group bg-transparent border-2 border-zinc-700 text-gray-300 px-10 py-4 uppercase tracking-widest hover:border-red-600 hover:text-white transition-all duration-300"
                    >
                        Resend Email
                    </button>
                </div>

                {/* Bottom Text */}
                <p className="text-center text-gray-500 text-sm mt-10 uppercase tracking-wide">
                    Didn't receive the email? Check your spam folder
                </p>
            </div>
        </div>
    );
}