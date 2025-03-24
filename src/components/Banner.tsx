'use client'
import { useEffect, useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image';

export default function Banner() {
    const cover = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg','/img/cover5.jpg'];
    const [index , setIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const duration = 5000; // 5 วินาที

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % cover.length);
            setProgress(0); // รีเซ็ต progress เมื่อเปลี่ยนรูป
        }, duration);

        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / (duration / 100)));
        }, 100);

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className={styles.banner} onClick={() => { setIndex((index + 1) % cover.length); setProgress(0); }}>
            <Image  
                src={cover[index]} 
                alt='cover'
                fill={true}
                priority
                className='object-cover object-center'
            />
            <div className="relative top-[100px] z-20 text-center text-white">
                <h1 className="text-5xl font-bold tracking-wide drop-shadow-md mb-4">
                    Life's Better Around The Campfire
                </h1>
                <h3 className="text-2xl font-serif italic drop-shadow">
                    Breathe in nature, exhale stress
                </h3>
            </div>
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-700">
                <div 
                    className="h-full bg-white transition-all duration-100" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
