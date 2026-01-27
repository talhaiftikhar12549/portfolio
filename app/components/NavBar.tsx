"use client";
import React, { useState } from 'react';

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

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

    const options = [
        { value: () => scrollToSection('Home'), label: "HOME" },
        { value: () => scrollToSection('aboutMe'), label: "ABOUT ME" },
        { value: () => scrollToSection('experience'), label: "EXPERIENCE" },
        { value: () => scrollToSection('projectsSection'), label: "PROJECTS" },
        { value: () => scrollToSection('Education&Skills'), label: "EDUCATION" },
        { value: () => scrollToSection('contactUs'), label: "CONTACT" },
    ];

    return (
        <>
            <div className='h-[10vh] md:h-[15vh] bg-[#060614] w-full px-5 xl:px-20 text-[#d9d7d7]'>
                <div className='md:flex hidden md:flex-row relative z-10 h-full w-full justify-between lg:justify-around items-center'>
                    {options.map((option, index) => (
                        <p key={index} onClick={option.value} className="font-bold cursor-pointer hover:text-[#ffffff]">{option.label}</p>
                    ))}
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
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100/10 cursor-pointer"
                                    onClick={option.value}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>
        </>
    )
}
