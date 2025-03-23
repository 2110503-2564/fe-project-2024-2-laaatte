'use client'
import { useEffect, useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image';

export default function Banner() {
    const cover = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg','/img/cover5.jpg'];
    const [index , setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % cover.length);
        }, 5000);
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, []);

    return (
        <div className={styles.banner} onClick={() => { setIndex(index+1)}}>
            <Image  src={cover[index % 5]} 
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
        </div>
    );
}