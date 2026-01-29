"use client";

import React, { useEffect, useState } from "react";

const Preloader = () => {
    const [count, setCount] = useState(0);
    // 'loading' controls the counter visibility
    const [loading, setLoading] = useState(true);
    // 'reveal' triggers the slide-up animation
    const [reveal, setReveal] = useState(false);
    // 'complete' removes the component from DOM
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        // Counter animation (0 to 100 in approx 2.5s)
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // 20ms * 100 = 2000ms (2s) - slightly faster to allow pause at 100

        // Timeline
        const timeline = async () => {
            // Wait for counter to finish roughly
            await new Promise((resolve) => setTimeout(resolve, 2500));

            // Start revealing content (slide up)
            setLoading(false); // Fades out the text
            await new Promise((resolve) => setTimeout(resolve, 300)); // Small delay
            setReveal(true); // Triggers slide-up

            // Remove from DOM after transition
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setComplete(true);
        };

        timeline();

        return () => clearInterval(interval);
    }, []);

    if (complete) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center text-white transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${reveal ? "-translate-y-full" : "translate-y-0"
                }`}
        >
            {/* Percentage Counter */}
            <div
                className={`text-6xl md:text-8xl font-bold font-sans transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0"
                    }`}
            >
                <span>{count}%</span>
            </div>

            {/* Optional decorative loading text */}
            <div
                className={`absolute bottom-10 left-10 text-sm uppercase tracking-wider text-neutral-400 transition-opacity duration-500 ${loading ? "opacity-100" : "opacity-0"
                    }`}
            >
                Loading Experience
            </div>

            {/* Curved bottom edge effect using a pseudo-element logic or SVG if needed usually goes here, 
           for now keeping it clean as per afrokk example */}
        </div>
    );
};

export default Preloader;
