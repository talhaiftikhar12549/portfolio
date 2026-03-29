"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";

export default function ContactPage() {
    // State for mock form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate a network request
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#0e0e1a] flex flex-col">
            <NavBar />
            
            <section className="relative w-full flex-grow text-[#d9d7d7] py-20 overflow-hidden flex flex-col justify-center items-center mt-10">
                {/* Background glowing orbs for glassmorphism effect */}
                <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-[#2c2ebf] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
                <div className="absolute top-[40%] right-[5%] w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 w-[90%] xl:w-[85%] 2xl:w-[70%] mx-auto">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block text-white">
                            CONTACT ME.
                            <span className="absolute bg-[#2c2ebf] bottom-[-8px] left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 h-[3px] w-[100px] rounded-full"></span>
                        </h2>
                        <p className="text-gray-400 mt-6 max-w-xl text-lg mx-auto md:mx-0">
                            Have a project in mind or just want to chat? Send me a message and I'll get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Left Column: Contact Info & Socials */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Glassmorphic Card */}
                            <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-white/20">
                                <h3 className="text-3xl font-semibold text-white mb-8">Let's connect.</h3>
                                
                                <div className="space-y-8 mb-12">
                                    <div className="flex items-center group cursor-default">
                                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mr-5 group-hover:bg-[#2c2ebf]/20 transition-colors duration-300">
                                            <img className="w-6 h-6 object-contain" src="/assets/placeholder.webp" alt="Location Icon" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Based in</p>
                                            <p className="font-medium text-lg text-white">Pakistan</p>
                                        </div>
                                    </div>

                                    <a href="mailto:talhaiftikhar12549@gmail.com" className="flex items-center group hover:opacity-80 transition-opacity">
                                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mr-5 group-hover:bg-[#2c2ebf]/20 transition-colors duration-300">
                                            <img className="w-6 h-6 object-contain" src="/assets/mailcolor.webp" alt="Email Icon" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Email</p>
                                            <p className="font-medium text-[15px] sm:text-base md:text-lg text-white break-all">talhaiftikhar12549@gmail.com</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="border-t border-white/10 pt-8">
                                    <p className="text-sm text-gray-400 mb-6 font-medium tracking-wide uppercase">Follow my work</p>
                                    <div className="flex gap-4">
                                        <SocialLink href="https://github.com/talhaiftikhar12549" iconWhite="/assets/githubwhite.webp" iconColor="/assets/githubcolor.webp" alt="GitHub" />
                                        <SocialLink href="https://www.linkedin.com/in/muhammadtalha12549/" iconWhite="/assets/linkedinwhite.webp" iconColor="/assets/linkedincolor.webp" alt="LinkedIn" />
                                        <SocialLink href="https://www.instagram.com/talhaiftikhar12549/" iconWhite="/assets/instagramwhite.webp" iconColor="/assets/instagramcolor.webp" alt="Instagram" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-[#060614]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
                                {/* Subtle inner top highlight */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                
                                <h3 className="text-3xl font-semibold text-white mb-8">Send a Message</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field */}
                                        <div className="space-y-2 group">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-400 group-focus-within:text-[#2c2ebf] transition-colors">Your Name</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                required
                                                className="w-full bg-[#0e0e1a]/80 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2c2ebf]/80 focus:border-transparent transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        
                                        {/* Email Field */}
                                        <div className="space-y-2 group">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-400 group-focus-within:text-[#2c2ebf] transition-colors">Your Email</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                required
                                                className="w-full bg-[#0e0e1a]/80 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2c2ebf]/80 focus:border-transparent transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject Field */}
                                    <div className="space-y-2 group">
                                        <label htmlFor="subject" className="text-sm font-medium text-gray-400 group-focus-within:text-[#2c2ebf] transition-colors">Subject</label>
                                        <input 
                                            type="text" 
                                            id="subject" 
                                            required
                                            className="w-full bg-[#0e0e1a]/80 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2c2ebf]/80 focus:border-transparent transition-all"
                                            placeholder="How can I help you?"
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div className="space-y-2 group">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-400 group-focus-within:text-[#2c2ebf] transition-colors">Message</label>
                                        <textarea 
                                            id="message" 
                                            rows={5}
                                            required
                                            className="w-full bg-[#0e0e1a]/80 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2c2ebf]/80 focus:border-transparent transition-all resize-none"
                                            placeholder="Write your message here..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting || isSubmitted}
                                            className={`w-full py-4 rounded-xl font-bold text-white text-lg tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(44,46,191,0.3)] hover:shadow-[0_0_30px_rgba(44,46,191,0.5)]
                                                ${isSubmitted 
                                                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                                                    : 'bg-[#2c2ebf] hover:bg-indigo-600 focus:ring-4 focus:ring-[#2c2ebf]/50'
                                                } disabled:opacity-70 disabled:cursor-not-allowed`}
                                        >
                                            <span>
                                                {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterBar />
        </main>
    );
}

// Helper component for smooth social link hover effect
function SocialLink({ href, iconWhite, iconColor, alt }: { href: string; iconWhite: string; iconColor: string; alt: string }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-300 border border-white/5 hover:border-white/20 shadow-lg"
        >
            <img src={iconWhite} alt={alt} className="absolute w-6 h-6 object-contain transition-opacity duration-300 group-hover:opacity-0" />
            <img src={iconColor} alt={`${alt} Color`} className="absolute w-6 h-6 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
    );
}
