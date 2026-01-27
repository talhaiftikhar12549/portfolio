"use client";
import React, { useState } from "react";
import ProjectList from "./ProjectList";

export default function ProjectSection() {

    const [isVisible, setIsVisible] = useState(true);

    const handleDelete = () => {
        setIsVisible(false);
    };

    return (
        <>
            <div id="projectsSection" className="h-[100%] bg-[#0e0e1a] text-[#d9d7d7] flex flex-col items-center py-10">
                {/* {modalOpener && <ProjectModal  onClose={()=>setModalOpener(false)} />} */}

                <div className="w-[90%] xl:w-[85%] 2xl:w-[70%] ">
                    <div className="py-10 ">
                        <p className=" text-3xl py-2 [#2c2ebf] relative">PROJECTS. <span className='absolute bg-[#2c2ebf] bottom-0 left-0 h-[2px] w-[100px]'></span></p>
                    </div>

                    {/* Project detail information div */}

                    {isVisible && <div className="border-2 py-4 my-6 border-[#2c2ebf] w-[100%] bg-[#060614]">

                        <div className="flex justify-between items-center px-0 md:px-4">
                            <div className="flex items-center">
                                <img className="px-2 md:px-6" src="/assets/i.png" alt="I Icon" />
                                <p className="text-xs md:text-md lg:text-lg">Click on Project to view more details</p>
                            </div>
                            <div className="px-2">

                                <span
                                    onClick={handleDelete}
                                    className="close cursor-pointer lg:text-4xl hover:brightness-50"
                                >
                                    &times;
                                </span>
                            </div>

                        </div>

                    </div>}

                    {/* Project detail information div */}

                    <div className=" py-8">
                        <div className="flex flex-col gap-12 py-6 w-[100%]">
                            <ProjectList />
                        </div>
                    </div>

                </div>

            </div>

            <div className="bg-[#2a2a33] h-[5px]"></div>
        </>

    )
}
