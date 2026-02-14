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
                        Happy Valentine's Day Ananya 💕
                    </h1>

                    {/* Image Gallery */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-12">
                        {[
                            "/S__26353669.jpg",
                            "/S__26353671_0.jpg",
                            "/S__26353672_0.jpg",
                            "/S__26353673_0.jpg",
                            "/S__26353674_0.jpg",
                            "/S__26353675_0.jpg",
                            "/S__26353676_0.jpg",
                            "/S__26353677_0.jpg",
                            "/S__26353678_0.jpg",
                            "/S__26353679_0.jpg",
                            "/S__26353680_0.jpg",
                            "/S__26353682_0.jpg",
                            "/S__26353683_0.jpg",
                            "/S__26353684.jpg",
                        ].map((src, index) => (
                            <div
                                key={index}
                                className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl break-inside-avoid animate-fade-in-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
                                <Image
                                    src={src}
                                    alt={`Valentine Photo ${index + 1}`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Video Section */}
                    <div className="mb-12 animate-fade-in-up">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full aspect-video">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/_t0OKDaZLUw"
                                title="Valentine Song"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Message Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Happy Valentine's Day! สุขสันต์วันแห่งความรักนะครับอ้วงง
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                ขอบคุณที่มอบความสุข รอยยิ้ม และทุกๆอย่าง ขอบคุณที่อยู่ข้างๆกันในวันที่มีความสุข และวันที่ไม่มีความสุข
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                ถึงแม้จะยู่ห่างไกลกัน แต่ก็คอยประคองความรักของเราไปด้วยกันนะ อาจจะมีทะเลาะกันบ้าง ไม่เข้าใจกันบ้าง แต่ก็ไม่ปล่อยมือกันนะ ❤️
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
                {/* Enhanced Heart Button */}
                <div className="relative group cursor-pointer inline-flex items-center justify-center">
                    {/* Glowing background effect */}
                    <div
                        className={`absolute inset-0 bg-pink-500 rounded-full blur-3xl transition-opacity duration-500 ${isPressed ? 'opacity-50 scale-110' : 'opacity-20 scale-100 group-hover:opacity-40'
                            }`}
                    />

                    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                        <button
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={handleMouseDown}
                            onTouchEnd={handleMouseUp}
                            className={`relative z-10 text-9xl md:text-[8rem] transition-all duration-100 select-none 
                                ${isPressed ? 'scale-90' : 'scale-100 group-hover:scale-110 animate-pulse'}
                            `}
                            style={{
                                filter: `drop-shadow(0 0 ${progress * 0.5}px rgba(236, 72, 153, ${progress / 100})) brightness(${1 + progress / 50})`,
                            }}
                        >
                            <span className={`block ${progress > 80 && isPressed ? 'animate-wiggle' : ''}`}>
                                ❤️
                            </span>
                        </button>

                        {/* Progress Ring with Gradient */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-lg" viewBox="0 0 100 100">
                            {/* Gradient Definition */}
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="50%" stopColor="#ef4444" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>

                            {/* Track */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#fce7f3"
                                strokeWidth="4"
                                className="opacity-30"
                            />

                            {/* Progress */}
                            {progress > 0 && (
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={`${progress * 2.83} 283`}
                                    className="transition-all duration-75 ease-linear"
                                />
                            )}
                        </svg>
                    </div>
                </div>

                {/* Dynamic Text Feedback */}
                <div className="h-12 mt-8">
                    {progress > 0 && progress < 100 ? (
                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                            {progress < 30 ? "Keep holding..." :
                                progress < 60 ? "Sending love..." :
                                    progress < 90 ? "Almost there!" : "❤️ LOVING YOU ❤️"}
                            <span className="block text-sm text-pink-400 mt-1">{Math.round(progress)}%</span>
                        </p>
                    ) : (
                        <p className="text-xl text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            (Press and hold to unlock surprise)
                        </p>
                    )}
                </div>
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
