import React from 'react';

export default function FooterBar() {
    return (
        <>
            <footer className="bg-[#060614] text-[#d9d7d7] py-8 w-[100%] flex flex-col justify-center items-center">

                <div className="flex flex-row md:py-0 py-2  items-center justify-center">
                    <p className="text-xs md:text-sm lg:text-base font-semibold">Developed with</p>
                    <img className="px-2" src="/assets/Heart Logo.webp" alt="" />
                </div>

                <div className="">
                    <p className="text-xs md:text-sm lg:text-base font-semibold">© 2025-2026 Talha Iftikhar. All Rights Reserved.</p>
                </div>

            </footer>
        </>
    )
}
