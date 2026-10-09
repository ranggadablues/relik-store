"use client"

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    primaryCTA: string;
    secondaryCTA?: string;
    features: string[];
}

const slides: BannerSlide[] = [
    {
        id: 1,
        title: "90's Band T-Shirts",
        subtitle: "The Golden Era",
        description: "Authentic vintage band tees from the golden era of rock, grunge, and alternative",
        image: "/concert.jpeg",
        primaryCTA: "Shop Now",
        secondaryCTA: "View Collection",
        features: ["Authentic Vintage", "100% Cotton", "Free Shipping"]
    },
    {
        id: 2,
        title: "Limited Edition",
        subtitle: "Exclusive Drops",
        description: "Rare and limited edition designs from iconic 90's tours and concerts",
        image: "https://images.unsplash.com/photo-1575285113814-f770cb8c796e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncnVuZ2UlMjBjb25jZXJ0JTIwY3Jvd2R8ZW58MXx8fHwxNzY3NjUxODg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        primaryCTA: "Shop Limited",
        secondaryCTA: "Learn More",
        features: ["Limited Stock", "Collector's Item", "Premium Quality"]
    },
    {
        id: 3,
        title: "Grunge Legends",
        subtitle: "Classic Collection",
        description: "Celebrate the legends that defined a generation with premium vintage merch",
        image: "https://images.unsplash.com/photo-1561794166-02c446efb29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYmFuZCUyMG1lcmNoYW5kaXNlfGVufDF8fHx8MTc2NzY1MTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        primaryCTA: "Explore Grunge",
        features: ["Original Designs", "Vintage Wash", "Oversized Fit"]
    },
    {
        id: 4,
        title: "New Arrivals",
        subtitle: "Just Landed",
        description: "Fresh drops of authentic 90's band merchandise. Don't miss out on these classics",
        image: "https://images.unsplash.com/photo-1673109116896-607e7ccbe33b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwbXVzaWMlMjBzdGFnZSUyMGxpZ2h0c3xlbnwxfHx8fDE3Njc2NTE4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        primaryCTA: "Shop New",
        secondaryCTA: "See All",
        features: ["New This Week", "Best Sellers", "Trending Now"]
    }
];

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsTransitioning(false), 800);
        }
    }, [isTransitioning]);

    const prevSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setTimeout(() => setIsTransitioning(false), 800);
        }
    }, [isTransitioning]);

    const goToSlide = (index: number) => {
        if (!isTransitioning && index !== currentSlide) {
            setIsTransitioning(true);
            setCurrentSlide(index);
            setTimeout(() => setIsTransitioning(false), 800);
        }
    };

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className="relative w-full overflow-hidden bg-black">
            {/* Slides Container */}
            <div className="relative min-h-[600px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <div className="relative w-full min-h-[600px] flex items-center">
                            {/* Dark grunge texture overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-black/70 to-zinc-900/80 z-10" />

                            {/* Background image with dark overlay */}
                            <div className="absolute inset-0 opacity-40">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                    fill priority
                                />
                            </div>

                            <div className="container mx-auto px-4 py-20 relative z-20">
                                <div className="max-w-4xl mx-auto text-center space-y-8">

                                    <div className="space-y-4">
                                        {/* Subtitle */}
                                        <div className="text-red-600 uppercase tracking-widest text-sm md:text-base mb-4">
                                            {slide.subtitle}
                                        </div>

                                        {/* Main Title */}
                                        <h1 className="text-5xl md:text-7xl tracking-wider text-white uppercase">
                                            {slide.title}
                                        </h1>

                                        <div className="w-24 h-1 bg-red-600 mx-auto" />

                                        {/* Description */}
                                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                                            {slide.description}
                                        </p>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-wrap justify-center gap-4 pt-6">
                                        <Button
                                            size="lg"
                                            className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 uppercase tracking-wider transition-all duration-300"
                                        >
                                            {slide.primaryCTA}
                                        </Button>
                                        {slide.secondaryCTA && (
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="border-2 border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white px-10 py-6 uppercase tracking-wider transition-all duration-300"
                                            >
                                                {slide.secondaryCTA}
                                            </Button>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6 text-sm text-gray-400 uppercase tracking-wide">
                                        {slide.features.map((feature, idx) => (
                                            <span key={idx} className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-red-600" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Subtle red accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-red-600 text-white p-3 border border-zinc-700 hover:border-red-600 transition-all duration-300"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-red-600 text-white p-3 border border-zinc-700 hover:border-red-600 transition-all duration-300"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-20">
                <div className="flex justify-center gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 transition-all duration-300 ${index === currentSlide
                                ? 'w-8 bg-red-600'
                                : 'w-3 bg-zinc-600 hover:bg-red-600'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Banner;