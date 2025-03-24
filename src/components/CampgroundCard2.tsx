'use client'; // เพิ่มบรรทัดนี้เพื่อบอกว่าเป็น Client Component
import Link from "next/link";
import ProductCard from "./ProductCard";
import { CampgroundItem, CampgroundJson } from "../../interface";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // ใช้การนำเข้าแบบนี้
import { useEffect, useState } from 'react';

export default function CampgroundCard({ campgroundJson }: { campgroundJson: CampgroundJson }) {
    const [campgroundCard, setCampgroundCard] = useState<CampgroundJson | null>(null);

    useEffect(() => {
        const fetchCampgroundData = async () => {
            const data = await campgroundJson;  // นำข้อมูลจาก props
            setCampgroundCard(data);
        };

        fetchCampgroundData();
    }, [campgroundJson]);

    if (!campgroundCard) return <div>Loading...</div>; // แสดงข้อความระหว่างที่ข้อมูลกำลังโหลด

    return (
        <>
            <Swiper
                className="tranding-slider"
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={3}  // ปรับให้แสดง 3 สไลด์
                spaceBetween={30}  // ระยะห่างระหว่างสไลด์
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
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1440: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    }
                }}
            >
                {
                    campgroundCard.data.map((campgroundItem: CampgroundItem) => (
                        <SwiperSlide  className="h-[400px] lg:h-[500px]" key={campgroundItem.id}>
                            <Link href={`/campground/${campgroundItem.id}`} 
                                className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 lg:p-8">
                                <ProductCard 
                                    campgroundName={campgroundItem.name} 
                                    imgSrc={campgroundItem.picture}
                                    campgroundProvince={campgroundItem.province}
                                />
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </>
    );
}
