"use client";
import { projects } from "./ProjectsData";
import { useState } from "react";
import Image from "next/image";

type Project = typeof projects[0];

export default function ProjectList() {

    const [activeProject, setActiveProject] = useState<Project | null>(null);

    const handleModalClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setActiveProject(null);
        }
    };

    const openModal = (project: Project) => {
        setActiveProject(project);
    };

    const rows: Project[][] = [];
    for (let i = 0; i < projects.length; i += 2) {
        rows.push(projects.slice(i, i + 2));
    }

    return (
        <>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between">
                    {row.map((project, index) => (
                        <div
                            key={index}
                            onClick={() => openModal(project)}
                            className="w-[100%] md:w-[48%] py-12 px-3 bg-[#060614] border-2 border-[#060614] group flex flex-col md:flex-row hover:border-[#2c2ebf] transition-colors duration-300 cursor-pointer"
                            title="Click to view more detail."
                        >
                            <div className="w-[100%] md:w-[35%] flex items-center justify-center">
                                {/* Ensure width/height ratio is preserved or cover is used */}
                                <img className="h-[150px] w-[150px] object-contain" src={project.image} alt={project.title} />
                            </div>
                            <div className="w-[100%] md:w-[65%] py-0 px-4">
                                <p className="text-lg text-center md:text-left font-bold">{project.title}</p>
                                <div className="flex justify-center md:justify-start flex-wrap gap-1 items-center py-3 w-[100%]">
                                    {project.technologies.map((tech, techIndex) => (
                                        <div
                                            key={techIndex}
                                            className="text-xs group-hover:bg-[#2c2ebf] transition-colors duration-300 rounded-sm px-2 py-1 bg-[#262626]"
                                        >
                                            <p>{tech}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-center md:text-left">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {activeProject && (
                <div
                    onClick={handleModalClick}
                    className="modal bg-[#000000] bg-opacity-30 backdrop-blur-sm inset-0 fixed z-50 text-[#ffffff]"
                >
                    <div className="modal-content bg-[#060614] w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mx-auto my-10 p-6 rounded-lg max-h-[85vh] overflow-y-auto scrollbar-thumb-[#2c2ebf] scrollbar scrollbar-thumb-rounded">
                        <div className="w-[100%] flex justify-end items-center">
                            <span
                                onClick={() => setActiveProject(null)}
                                className="close cursor-pointer text-4xl hover:brightness-50"
                            >
                                &times;
                            </span>
                        </div>
                        <div>
                            <p className="text-3xl py-2 relative">
                                {activeProject.title}
                                <span className="absolute bg-[#2c2ebf] bottom-0 left-0 h-[2px] w-[100px]"></span>
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start flex-wrap gap-1 items-center py-3 w-[100%]">
                            {activeProject.technologies.map((tech, techIndex) => (
                                <div
                                    key={techIndex}
                                    className="text-xs hover:bg-[#2c2ebf] transition-colors duration-300 rounded-sm px-2 py-1 bg-[#262626]"
                                >
                                    <p>{tech}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-around py-2">
                            <a href={activeProject.live} target="_blank" rel="noopener noreferrer"><button className="bg-[#2c2ebf] py-1 px-2 text-xs lg:text-sm hover:bg-[#ffffff] hover:text-[#2c2ebf] transition-colors duration-300">
                                View it Live
                            </button></a>
                            <a href={activeProject.github} target="_blank" rel="noopener noreferrer"><button className="bg-[#2c2ebf] py-1 px-2 text-xs lg:text-sm hover:bg-[#ffffff] hover:text-[#2c2ebf] transition-colors duration-300">
                                Github Pages
                            </button></a>
                        </div>
                        <div className="w-[100%] py-12 px-4 flex justify-center">
                            <img className="h-[150px] w-[150px] object-contain" src={activeProject.image} alt={activeProject.title} />
                        </div>
                        <div className="py-4">
                            <p className="text-3xl py-2 relative">
                                ABOUT
                                <span className="absolute bg-[#2c2ebf] bottom-0 left-0 h-[2px] w-[100px]"></span>
                            </p>
                            <p className="text-sm py-6 text-center md:text-left">{activeProject.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
