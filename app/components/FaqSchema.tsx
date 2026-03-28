import React from 'react';

export const generalFaqs = [
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

export default function FaqSchema({ faqs = generalFaqs }: { faqs?: { question: string, answer: string }[] }) {
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
    );
}
