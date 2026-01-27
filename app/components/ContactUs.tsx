"use client";
import React, { useState } from "react";

export default function ContactUs() {
    const [isHoveredInsta, setIsHoveredInsta] = useState(false);
    const [isHoveredGmail, setIsHoveredGmail] = useState(false);
    const [isHoveredLinkedin, setIsHoveredLinkedin] = useState(false);
    const [isHoveredGithub, setIsHoveredGithub] = useState(false);
    return (
        <>
            <div id="contactUs" className="h-[100%] bg-[#0e0e1a] text-[#d9d7d7] flex flex-col items-center py-10">

                <div className="w-[90%] xl:w-[85%] 2xl:w-[70%] ">

                    <div className="py-10 ">
                        <p className=" text-3xl py-2 [#2c2ebf] relative">CONTACT ME. <span className='absolute bg-[#2c2ebf] bottom-0 left-0 h-[2px] w-[100px]'></span></p>
                    </div>


                    <div className="flex flex-col lg:flex-row py-6 w-[100%] justify-between ">


                        <div className="w-[100%] lg:w-[38%] my-4 py-12 px-3 bg-[#060614] flex ">

                            <div className="w-[100%] px-8">
                                <p className="text-3xl font-semibold">Let's connect.</p>
                                <div className='py-4'>
                                    <div className="py-4 px-0 xl:px-4 w-[100%] flex item-center">
                                        <img className="px-2" src="/assets/placeholder.png" alt="" />

                                        <p className="text-xs md:text-sm lg:text-base px-2 font-semibold">Pakistan</p>

                                    </div>

                                    <div className="py-4 px-0 xl:px-4 w-[100%] flex item-center">
                                        <img className="px-2" src="/assets/mailcolor.png" alt="" />

                                        <p className="text-xs md:text-sm lg:text-base px-2 font-semibold">talhaiftikhar12549@gmail.com</p>

                                    </div>
                                </div>

                                <div className="py-4 px-6 w-[100%] flex justify-evenly item-center">
                                    <a href="https://github.com/talhaiftikhar12549" target="_blank" rel="noopener noreferrer">
                                        <img

                                            className="cursor-pointer"
                                            src={isHoveredGithub ? "/assets/githubcolor.png" : "/assets/githubwhite.png"}
                                            alt="GitHub Icon"
                                            onMouseEnter={() => setIsHoveredGithub(true)}
                                            onMouseLeave={() => setIsHoveredGithub(false)}
                                        />
                                    </a>
                                    <a href="https://www.linkedin.com/in/muhammadtalha12549/" target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="cursor-pointer"
                                            src={isHoveredLinkedin ? "/assets/linkedincolor.png" : "/assets/linkedinwhite.png"}
                                            alt="LinkedIn Icon"
                                            onMouseEnter={() => setIsHoveredLinkedin(true)}
                                            onMouseLeave={() => setIsHoveredLinkedin(false)}
                                        />
                                    </a>
                                    <a href="https://www.instagram.com/talhaiftikhar12549/" target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="cursor-pointer"
                                            src={isHoveredInsta ? "/assets/instagramcolor.png" : "/assets/instagramwhite.png"}
                                            alt="Insta Icon"
                                            onMouseEnter={() => setIsHoveredInsta(true)}
                                            onMouseLeave={() => setIsHoveredInsta(false)}
                                        />
                                    </a>
                                    <a href="mailto:talhaiftikhar12549@gmail.com?subject=Hello%20Talha&body=Hi%20there,%20I%20wanted%20to%20reach%20out." target="_blank" rel="noopener noreferrer">
                                        <img
                                            className="cursor-pointer"
                                            src={isHoveredGmail ? "/assets/gmailcolor.png" : "/assets/gmailwhite.png"}
                                            alt="Gmail Icon"
                                            onMouseEnter={() => setIsHoveredGmail(true)}
                                            onMouseLeave={() => setIsHoveredGmail(false)}
                                        />
                                    </a>
                                </div>

                            </div>



                        </div>


                        <div className="w-[100%] lg:w-[58%] my-4 py-12 px-3 bg-[#060614] flex ">

                            <div className="w-[100%] px-8">

                                <p className="text-3xl font-semibold">Reach out to me.</p>


                                <div className="py-12 2xl:px-10 w-[100%] h-[100%] flex flex-col md:flex-row items-center justify-between 2xl:justify-around">

                                    <div className="cursor-pointer group relative w-52 h-12 ">
                                        <a
                                            href="mailto:talhaiftikhar12549@gmail.com?subject=Hello%20Talha&body=Hi%20there,%20I%20wanted%20to%20reach%20out."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center z-30">
                                                <p className="font-bold group-hover:text-[#2c2ebf] transition-colors duration-300">
                                                    Send me an Email
                                                </p>

                                            </div>
                                            <div className="bg-[#fefefe] w-52 h-12 absolute mt-1 ml-1 group-hover:bg-[#2c2ebf] transition-colors duration-300"></div>
                                            <div className="bg-[#2c2ebf] w-52 h-12 absolute group-hover:bg-[#ffffff] transition-colors duration-300"></div>
                                        </a>
                                    </div>



                                    <div className="cursor-pointer group relative w-52 h-12 ">
                                        <a href="https://www.linkedin.com/in/muhammadtalha12549" target="_blank" rel="noopener noreferrer">
                                            <div className="absolute inset-0 flex items-center justify-center z-30">
                                                <p className="font-bold group-hover:text-[#2c2ebf] transition-colors duration-300">
                                                    Connect on LinkedIn
                                                </p>

                                            </div>
                                            <div className="bg-[#fefefe] w-52 h-12 absolute mt-1 ml-1 group-hover:bg-[#2c2ebf] transition-colors duration-300"></div>
                                            <div className="bg-[#2c2ebf] w-52 h-12 absolute group-hover:bg-[#ffffff] transition-colors duration-300"></div>
                                        </a>
                                    </div>


                                </div>

                            </div>



                        </div>

                    </div>

                </div>


            </div>
        </>
    )
}
