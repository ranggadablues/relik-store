"use client"

import { Home } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();
    const handleGoHome = () => {
        router.push('/');
    };
    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Vignette Effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
                }}
            />

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-4xl">
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

                {/* 404 Display */}
                <div className="text-center mb-8 relative">
                    <h1
                        className="text-[150px] md:text-[250px] leading-none text-white uppercase tracking-widest"
                        style={{
                            textShadow: '0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(220, 38, 38, 0.3)',
                        }}
                    >
                        404
                    </h1>

                    {/* Line effect */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-red-600" />
                </div>

                {/* Message */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-white uppercase tracking-widest mb-4">
                        Page Not Found
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="h-1 bg-red-600 w-[100px]" />
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => handleGoHome()}
                        className="group relative bg-red-600 text-white px-12 py-4 uppercase tracking-widest overflow-hidden hover:bg-red-700 transition-colors"
                    >
                        <span className="relative flex items-center gap-3">
                            <Home className="w-5 h-5" />
                            Back to Home
                        </span>
                    </button>

                    <button
                        onClick={() => handleGoBack()}
                        className="group bg-transparent border-2 border-zinc-700 text-gray-300 px-12 py-4 uppercase tracking-widest hover:border-red-600 hover:text-white transition-all duration-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
export default NotFound;