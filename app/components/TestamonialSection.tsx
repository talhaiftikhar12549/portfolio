"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Carousel = () => {
    return (
        <>
            <div className="h-[100vh] sm:h-[80vh] lg:h-[60vh] w-full bg-[#0e0e1a] flex items-center justify-center">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    slidesPerView={1}
                    className="lg:w-[85%] xl:w-[90%] 2xl:w-[50%] h-[80%]"
                    pagination={{ clickable: true }}
                    style={{
                        // @ts-expect-error - Swiper CSS variables
                        '--swiper-pagination-color': '#2c2ebf',
                        '--swiper-pagination-bullet-inactive-color': '#cccccc',
                    }}
                >
                    <SwiperSlide>
                        <div className="border-x-[12px] border-[#0e0e1a] bg-[#060614] px-4 w-[100%] h-[70%]  flex flex-col lg:flex-row items-center justify-evenly">
                            <div className="flex items-center justify-center w-[100%] lg:w-[20%]">
                                <img className="h-[120px] w-[120px] rounded-full object-cover" src="/assets/usmanPic.webp" alt="usmanPic" />
                            </div>
                            <div className="flex flex-col w-[80%] text-[#ffffff]">
                                <p>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                    <span className="text-[#ffffff] text-xs md:text-sm font-light text-wrap">
                                        I have worked with this buddy for a long time and have witnessed his growth in his career. We have collaborated on different projects, and he helped me rank a website on the first page.
                                    </span>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                </p>
                                <p className="font-semibold py-3">Usman Tariq</p>
                                <p className="text-xs font-light">UI/UX designer at Veroke</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="border-x-[12px] border-[#0e0e1a] bg-[#060614] px-4 w-[100%] h-[70%]  flex flex-col lg:flex-row items-center justify-evenly">
                            <div className="flex items-center justify-center w-[100%] lg:w-[20%]">
                                <img className="h-[120px] w-[120px]" src="/assets/osama uforia.webp" alt="Uforia Logo" />
                            </div>
                            <div className="flex flex-col w-[80%] text-[#ffffff]">
                                <p>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                    <span className="text-[#ffffff] text-xs md:text-sm font-light text-wrap">
                                        This man is a genius who keenly jumps over different languages and frameworks. I have witnessed him developing web apps in no time. Wishing him luck for a bright future!
                                    </span>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                </p>
                                <p className="font-semibold py-3">Usama Malik</p>
                                <p className="text-xs font-light">Software Engineer at Uforia</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="border-x-[12px] border-[#0e0e1a] bg-[#060614] px-4 w-[100%] h-[70%] flex flex-col lg:flex-row items-center justify-evenly">
                            <div className="flex items-center justify-center w-[100%] lg:w-[20%]">
                                <img className="h-[120px] w-[120px] rounded-full object-cover" src="/assets/Dr Hasana.webp" alt="Dr Hasna" />
                            </div>
                            <div className="flex flex-col w-[80%] text-[#ffffff]">
                                <p>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                    <span className="text-[#ffffff] text-xs md:text-sm font-light text-wrap">
                                        Talha assisted me as a teaching assistant in one of my courses that I taught in Fall 2023 at HITEC University. He is a great person to work with. I wish him the best of luck for his future.
                                    </span>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                </p>
                                <p className="font-semibold py-3">Dr. Hasna Arshad</p>
                                <p className="text-xs font-light">Assistant Professor at HITEC</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="border-x-[12px] border-[#0e0e1a] bg-[#060614] px-12 w-[100%] h-[70%] flex flex-col lg:flex-row items-center justify-evenly">
                            <div className="flex items-center justify-center w-[100%] lg:w-[20%]">
                                <img className="h-[120px] w-[120px]" src="/assets/Capture2.webp" alt="Razia Pic" />
                            </div>
                            <div className="flex flex-col w-[80%] text-[#ffffff]">
                                <p>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                    <span className="text-[#ffffff] text-xs md:text-sm font-light text-wrap">
                                        For the past three years, he has handled all the technical work at the school. He has consistently completed all tasks on time. Currently, he is developing and maintaining the school's websites.
                                    </span>
                                    <span className="text-[#2c2ebf] text-3xl">″</span>
                                </p>
                                <p className="font-semibold py-3">Razia Hasan</p>
                                <p className="text-xs font-light">Chairperson of Help Humanity UK</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="bg-[#2a2a33] h-[5px]"></div>
        </>
    );
};

export default Carousel;
