"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SparkleItem {
    id: number;
    left: number;
    top: number;
    delay: number;
}

interface FloatingHeart {
    id: number;
    left: number;
    delay: number;
    duration: number;
}

export default function ValentineSurprise() {
    const [isPressed, setIsPressed] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showSurprise, setShowSurprise] = useState(false);
    const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number }>>([]);
    const [sparkles, setSparkles] = useState<SparkleItem[]>([]);
    const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Initialize client-side only elements
    useEffect(() => {
        setIsMounted(true);

        // Generate sparkles
        const newSparkles: SparkleItem[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 3,
        }));
        setSparkles(newSparkles);

        // Generate floating hearts for surprise page
        const newFloatingHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 4,
        }));
        setFloatingHearts(newFloatingHearts);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPressed && progress < 100) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev + (100 / 30); // 3 seconds = 30 intervals of 100ms
                    if (newProgress >= 100) {
                        setShowSurprise(true);
                        return 100;
                    }
                    return newProgress;
                });
            }, 100);
        } else if (!isPressed && progress > 0 && progress < 100) {
            // Reset if released before completion
            setProgress(0);
        }

        return () => clearInterval(interval);
    }, [isPressed, progress]);

    useEffect(() => {
        // Generate floating hearts animation
        const heartInterval = setInterval(() => {
            if (!showSurprise) {
                setHearts((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        left: Math.random() * 100,
                        delay: Math.random() * 2,
                    },
                ]);
            }
        }, 300);

        return () => clearInterval(heartInterval);
    }, [showSurprise]);

    // Clean up old hearts
    useEffect(() => {
        const cleanup = setInterval(() => {
            setHearts((prev) => prev.slice(-20));
        }, 3000);

        return () => clearInterval(cleanup);
    }, []);

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsPressed(false);

    if (showSurprise) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 overflow-hidden">
                {/* Floating hearts background */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {isMounted && floatingHearts.map((heart) => (
                        <div
                            key={heart.id}
                            className="absolute text-4xl animate-float-heart opacity-30"
                            style={{
                                left: `${heart.left}%`,
                                animationDelay: `${heart.delay}s`,
                                animationDuration: `${heart.duration}s`,
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                        Happy Valentine's Day! 💕
                    </h1>

                    {/* Image Gallery */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-slide-in-left">
                            <Image
                                src="/image.png"
                                alt="Valentine Photo"
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.parentElement) {
                                        target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-white text-6xl">💑</div>';
                                    }
                                }}
                            />
                        </div>

                        <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-slide-in-right">
                            <Image
                                src="/image.png"
                                alt="Valentine Photo 2"
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.parentElement) {
                                        target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white text-6xl">💖</div>';
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="mb-12 animate-fade-in-up">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 h-96 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-8xl mb-4">🎬</div>
                                <p className="text-white text-2xl font-semibold">Your Special Video Here</p>
                                <p className="text-white/80 text-sm mt-2">Add your video to /public/valentine-video.mp4</p>
                            </div>
                        </div>
                    </div>

                    {/* Message Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-12 animate-pulse">
                        <p className="text-2xl font-semibold text-pink-600">
                            With all my love ❤️
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-purple-200 flex items-center justify-center overflow-hidden relative">
            {/* Floating hearts */}
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="absolute text-2xl animate-float-up pointer-events-none"
                    style={{
                        left: `${heart.left}%`,
                        bottom: "-50px",
                        animationDelay: `${heart.delay}s`,
                    }}
                >
                    ❤️
                </div>
            ))}

            {/* Main content */}
            <div className="text-center z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-pink-600 mb-8 animate-pulse">
                    Press and Hold ❤️
                </h2>

                {/* Heart button */}
                <div className="relative inline-block">
                    <button
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}
                        className={`text-9xl md:text-[12rem] transition-all duration-200 cursor-pointer select-none ${isPressed ? "scale-90" : "scale-100 hover:scale-110"
                            }`}
                        style={{
                            filter: `brightness(${1 + progress / 100}) saturate(${1 + progress / 50})`,
                        }}
                    >
                        ❤️
                    </button>

                    {/* Progress ring */}
                    {progress > 0 && (
                        <svg
                            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                            viewBox="0 0 200 200"
                        >
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="#ec4899"
                                strokeWidth="8"
                                strokeDasharray={`${progress * 5.65} 565`}
                                className="transition-all duration-100"
                            />
                        </svg>
                    )}
                </div>

                {/* Progress text */}
                {progress > 0 && progress < 100 && (
                    <p className="mt-6 text-2xl font-semibold text-pink-600 animate-bounce">
                        {Math.round(progress)}%
                    </p>
                )}
            </div>

            {/* Sparkles effect */}
            <div className="absolute inset-0 pointer-events-none">
                {isMounted && sparkles.map((sparkle) => (
                    <div
                        key={sparkle.id}
                        className="absolute text-yellow-300 text-2xl animate-twinkle"
                        style={{
                            left: `${sparkle.left}%`,
                            top: `${sparkle.top}%`,
                            animationDelay: `${sparkle.delay}s`,
                        }}
                    >
                        ✨
                    </div>
                ))}
            </div>
        </div>
    );
}
