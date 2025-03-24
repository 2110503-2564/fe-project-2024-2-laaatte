'use client';
import Link from "next/link";
import ProductCard from "./ProductCard";
import { CampgroundItem, CampgroundJson } from "../../interface";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';

export default function SelectCampgroundCatalog({
    campgroundJson,
    onSelectCampground
}: {
    campgroundJson: CampgroundJson,
    onSelectCampground: (id: string) => void
}) {
    if (!campgroundJson) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 overflow-visible">
            <Swiper
                className="tranding-slider"
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={3}
                spaceBetween={30}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    1440: { slidesPerView: 4, spaceBetween: 40 },
                }}
            >
                {
                    campgroundJson.data.map((campgroundItem: CampgroundItem) => (
                        <SwiperSlide className="h-[400px] lg:h-[500px]" key={campgroundItem.id}>
                            <div 
                                onClick={() => onSelectCampground(campgroundItem.id)}
                                className="cursor-pointer p-4 transition duration-300 hover:scale-105"
                            >
                                <ProductCard 
                                    campgroundName={campgroundItem.name} 
                                    imgSrc={campgroundItem.picture}
                                    campgroundProvince={campgroundItem.province}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </div>
    );
}
