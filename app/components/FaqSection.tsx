"use client";
import { useState } from "react";

const faqs = [
    {
        question: "Who is Talha Iftikhar?",
        answer:
            "Talha Iftikhar is a Software Engineer and Full-Stack Web Developer specializing in the MERN Stack and Next.js. He builds fast, modern, and scalable web applications for startups and businesses.",
    },
    {
        question: "What services does Talha Iftikhar offer?",
        answer:
            "Talha offers full-stack web development, front-end development with React and Next.js, back-end development with Node.js and Express, database design with MongoDB and Firebase, and API integration services.",
    },
    {
        question: "Is Talha Iftikhar available for freelance work?",
        answer:
            "Yes! Talha is available for freelance projects. You can reach out via the contact form on his portfolio website or connect with him on LinkedIn.",
    },
    {
        question: "What tech stack does Talha Iftikhar use?",
        answer:
            "Talha primarily works with the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js for full-stack projects, along with TypeScript, Tailwind CSS, Firebase, and various third-party APIs.",
    },
    {
        question: "Where is Talha Iftikhar located?",
        answer:
            "Talha is based in Pakistan, but he works with clients globally and is open to remote opportunities worldwide.",
    },
    {
        question: "How can I hire Talha Iftikhar as a developer?",
        answer:
            "You can hire Talha by reaching out through the contact section on his portfolio at talhaiftikhar.com, or by messaging him directly on LinkedIn or GitHub.",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <>
            {/* FAQPage JSON-LD for Google People Also Ask */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="py-20 px-5 xl:px-20 bg-[#060614]" id="faq">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block text-[#6b6dff] text-sm font-semibold tracking-widest uppercase mb-3">
                            FAQ
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Frequently Asked{" "}
                            <span className="bg-gradient-to-r from-[#2c2ebf] to-[#6b6dff] bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h2>
                        <p className="text-[#9898b5] mt-4 text-base max-w-xl mx-auto">
                            Everything you might want to know about me and my work.
                        </p>
                    </div>

                    {/* Accordion */}
                    <div className="space-y-3">
                        {faqs.map((faq, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <div
                                    key={i}
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                            ? "border-[#2c2ebf] shadow-[0_0_25px_rgba(44,46,191,0.18)]"
                                            : "border-[#1e1e4a] hover:border-[#2c2ebf]/50"
                                        } bg-[#0d0d2b]`}
                                >
                                    {/* Question row */}
                                    <button
                                        onClick={() => toggle(i)}
                                        className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                        aria-expanded={isOpen}
                                    >
                                        <span
                                            className={`font-semibold text-base transition-colors duration-200 ${isOpen ? "text-[#6b6dff]" : "text-white group-hover:text-[#6b6dff]"
                                                }`}
                                        >
                                            {faq.question}
                                        </span>
                                        {/* Animated +/× icon */}
                                        <span
                                            className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                                    ? "bg-[#2c2ebf] text-white rotate-45"
                                                    : "bg-[#1e1e4a] text-[#6b6dff] rotate-0"
                                                }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            >
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </span>
                                    </button>

                                    {/* Answer — CSS-driven smooth expand */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-5 text-[#9898b5] text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
