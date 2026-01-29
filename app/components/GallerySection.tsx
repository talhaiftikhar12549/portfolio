"use client";
import React from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const GallerySection = () => {
    return (
        <>
            <div className="h-[100%] bg-[#0e0e1a] text-[#d9d7d7] flex flex-col items-center py-10">
                <div className="w-[90%] xl:w-[85%] 2xl:w-[70%] h-[100%] ">
                    <div className="py-10 ">
                        <h2 className=" text-3xl py-2 relative">GALLERY. <span className='absolute bg-[#2c2ebf] bottom-0 left-0 h-[2px] w-[100px]'></span></h2>
                    </div>

                    <div className="w-[100%] h-[100%] flex items-center justify-center">
                        <div className="flex flex-col gap-12 py-8 h-[100%] w-[100%] justify-center items-center">
                            <Swiper
                                modules={[Pagination, Autoplay, Navigation]}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                loop={true}
                                spaceBetween={30}
                                className="h-[80%] w-full"
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    0: {
                                        slidesPerView: 1,
                                    },
                                }}
                                pagination={{ clickable: true }}
                                navigation={true}
                                style={{
                                    // @ts-expect-error - Swiper CSS variables
                                    '--swiper-pagination-color': '#2c2ebf',
                                    '--swiper-pagination-bullet-inactive-color': '#cccccc',
                                    '--swiper-navigation-color': '#2c2ebf',
                                }}
                            >
                                <SwiperSlide>
                                    <div className="relative h-[300px] md:h-[500px] w-full">
                                        <Image
                                            className="object-cover"
                                            src="/assets/desk2024.webp"
                                            alt="Desk setup 2023"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                        />
                                        <p className="absolute bottom-0 w-full bg-opacity-60 bg-black text-xl text-white py-4 text-center z-10">
                                            Desk Setup 2024
                                        </p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="relative h-[300px] md:h-[500px] w-full">
                                        <Image
                                            className="object-cover"
                                            src="/assets/povatUforia.webp"
                                            alt="POV at Uforia"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                        />
                                        <p className="absolute bottom-0 w-full bg-opacity-60 bg-black text-xl text-white py-4 text-center z-10">
                                            POV at Uforia
                                        </p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="relative h-[300px] md:h-[500px] w-full">
                                        <Image
                                            className="object-cover"
                                            src="/assets/rankingpicture.webp"
                                            alt="Ranking"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                        />
                                        <p className="absolute bottom-0 w-full bg-opacity-60 bg-black text-xl text-white py-4 text-center z-10">
                                            Using SEO techniques to Rank website on 1st page
                                        </p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="relative h-[300px] md:h-[500px] w-full">
                                        <Image
                                            className="object-cover"
                                            src="/assets/trickleup.webp"
                                            alt="POV at TrickleUp"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                        />
                                        <p className="absolute bottom-0 w-full bg-opacity-60 bg-black text-xl text-white py-4 text-center z-10">
                                            Pov at Trickle Up
                                        </p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="relative h-[300px] md:h-[500px] w-full">
                                        <Image
                                            className="object-cover"
                                            src="/assets/seo stats.webp"
                                            alt="SEO Stats"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                        />
                                        <p className="absolute bottom-0 w-full bg-opacity-60 bg-black text-xl text-white py-4 text-center z-10">
                                            Stats do not lie.
                                        </p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="relative h-[300px] md:h-[500px] w-full">
                                        <Image
                                            className="object-cover"
                                            src="/assets/desk 2025.webp"
                                            alt="Desk setup 2025"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                        />
                                        <p className="absolute bottom-0 w-full bg-opacity-60 bg-black text-xl text-white py-4 text-center z-10">
                                            Working Rig 2025
                                        </p>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#2a2a33] h-[5px]"></div>
        </>
    );
};

export default GallerySection;
