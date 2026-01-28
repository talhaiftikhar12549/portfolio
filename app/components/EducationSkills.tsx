import React from 'react';

export default function EducationSkills() {
    return (
        <>
            <div id="Education&Skills" className="h-[100%] bg-[#0e0e1a] text-[#d9d7d7] flex flex-col items-center py-10">

                <div className="w-[90%] xl:w-[85%] 2xl:w-[70%] ">

                    <div className="py-10 ">
                        <h2 className=" text-3xl py-2 [#2c2ebf] relative">EDUCATION & SKILLS. <span className='absolute bg-[#2c2ebf] bottom-0 left-0 h-[2px] w-[100px]'></span></h2>
                    </div>

                    <div className="flex py-2 flex-col md:flex-row  w-[100%]">

                        {/* Education Section */}

                        <div className="w-[100%] md:w-[40%]">

                            <div className="w-[90%] border-1 border-b border-[#2a2a33] bg-[#060614]  py-8 px-4 relative">

                                <div className="absolute top-3 -left-2">
                                    <p className="bg-[#2c2ebf] py-1 px-2 text-xs">2019 - 2023</p>
                                    <img className='w-[8px] h-[8px]' src="/assets/right angle triangle.webp" alt="" />
                                </div>
                                <div className="pt-4 px-2">
                                    <p className="text-md font-semibold">Bachelor's in Computer Science</p>
                                    <p className="text-sm py-2">HITEC University</p>
                                </div>


                            </div>
                            {/* <div className="bg-[#2a2a33] w-[90%] h-[1px]"></div> */}
                            <div className="w-[90%] border-1 border-b border-[#2a2a33] bg-[#060614] py-8 px-4 relative">

                                <div className="absolute top-3 -left-2">
                                    <p className="bg-[#2c2ebf] py-1 px-2 text-xs">2017 - 2019</p>
                                    <img className='w-[8px] h-[8px]' src="/assets/right angle triangle.webp" alt="" />
                                    <div></div>
                                </div>
                                <div className="pt-6 px-2">
                                    <p className="text-md font-semibold">Pre-Engineering (College)</p>
                                    <p className="text-sm py-2">Sir Syed College</p>
                                </div>


                            </div>
                            <div className="w-[90%] bg-[#060614] py-8 px-4 relative">

                                <div className="absolute top-3 -left-2">
                                    <p className="bg-[#2c2ebf] py-1 px-2 text-xs">2015 - 2017</p>
                                    <img className='w-[8px] h-[8px]' src="/assets/right angle triangle.webp" alt="" />
                                </div>
                                <div className="pt-6 px-2">
                                    <p className="text-md font-semibold">Science (School)</p>
                                    <p className="text-sm py-2">Sir Syed College</p>
                                </div>


                            </div>

                        </div>

                        {/* Education Section */}


                        {/* My SKills Section */}

                        <div className="w-[100%] my-8 md:my-0 md:w-[60%] flex-col">
                            <h3 className="text-3xl font-bold">My skills</h3>
                            <p className="py-4">I am a language-agnostic developer, primarily focused on logic. However, I am fluent in working with different technologies and frameworks, including C++, JavaScript/TypeScript, Python, and more.</p>
                            <div className="flex flex-row py-4 justify-between w-[100%]">
                                <div className="w-[50%] h-[100%]">
                                    <p className="text-xl font-bold">Databases</p>
                                    <ul className="list-disc pl-8 pt-2">
                                        <li>MySQL</li>
                                        <li>MongoDB</li>
                                    </ul>
                                    <p className="text-xl py-2 font-bold">Design</p>
                                    <ul className="list-disc pl-8 pt-2">
                                        <li>Adobe Photoshop</li>
                                        <li>Figma</li>
                                    </ul>
                                </div>
                                <div className="w-[50%]">
                                    <p className="text-xl font-bold">Frameworks</p>
                                    <ul className="list-disc pl-8 pt-2">
                                        <li>React</li>
                                        <li>Vue.js</li>
                                        <li>Node/Express</li>
                                        <li>Tailwindcss</li>
                                        <li>Bootstrap</li>
                                        <li>SASS</li>
                                    </ul>
                                    <p className="text-xl py-2 font-bold">Tools</p>
                                    <ul className="list-disc pl-8 pt-2">
                                        <li>RESTful APIs</li>
                                        <li>Postman</li>
                                        <li>Git/GitHub</li>
                                        <li>Redmine</li>
                                        <li>Slack</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* My SKills Section */}

                    </div>


                </div>

            </div>

            <div className="bg-[#2a2a33] h-[5px]"></div>

        </>)
}
