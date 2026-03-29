"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const options: { href?: string; onClick?: () => void; label: string }[] = [
        { onClick: () => scrollToSection('Home'), label: "HOME" },
        { onClick: () => scrollToSection('aboutMe'), label: "ABOUT ME" },
        { onClick: () => scrollToSection('experience'), label: "EXPERIENCE" },
        { onClick: () => scrollToSection('projectsSection'), label: "PROJECTS" },
        { onClick: () => scrollToSection('Education&Skills'), label: "EDUCATION" },
        { href: "/contact", label: "CONTACT" },
        { href: "/blog", label: "BLOG" },
    ];

    return (
        <>
            <div className='h-[10vh] md:h-[15vh] bg-[#060614] w-full px-5 xl:px-20 text-[#d9d7d7]'>
                <div className='md:flex hidden md:flex-row relative z-10 h-full w-full justify-between lg:justify-around items-center'>
                    {options.map((option, index) =>
                        option.href ? (
                            <Link key={index} href={option.href} className="font-bold cursor-pointer hover:text-[#ffffff] hover:text-[#6b6dff] transition-colors">
                                {option.label}
                            </Link>
                        ) : (
                            <p key={index} onClick={option.onClick} className="font-bold cursor-pointer hover:text-[#ffffff]">{option.label}</p>
                        )
                    )}
                </div>
                <div className='md:hidden flex relative h-full z-10 w-full justify-between lg:justify-around items-center'>
                    <p className='text-lg font-bold'> &lt; Dev Talha / &gt; </p>

                    <div onClick={toggleMenu} className='bg-[#2c2ebf] h-[40px] w-[40px] flex flex-col justify-center items-center cursor-pointer rounded'>
                        <div className='px-3 my-0.5 py-[1px] bg-[#ffffff]'></div>
                        <div className='px-3 my-0.5 py-[1px] bg-[#ffffff]'></div>
                        <div className='px-3 my-0.5 py-[1px] bg-[#ffffff]'></div>
                    </div>

                    {isOpen && (
                        <ul className="absolute right-0 top-16 bg-[#060614] border border-[#2c2ebf] rounded-md shadow-lg mt-2 w-48 z-10">
                            {options.map((option, index) => (
                                option.href ? (
                                    <li key={index} className="px-4 py-2 hover:bg-gray-100/10 cursor-pointer">
                                        <Link href={option.href} onClick={() => setIsOpen(false)} className="block w-full">
                                            {option.label}
                                        </Link>
                                    </li>
                                ) : (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100/10 cursor-pointer"
                                        onClick={option.onClick}
                                    >
                                        {option.label}
                                    </li>
                                )
                            ))}
                        </ul>
                    )}

                </div>
            </div>
        </>
    )
}
