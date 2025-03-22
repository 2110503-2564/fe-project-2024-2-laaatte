'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Banner() {
    const cover = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg','/img/cover5.jpg'];
    const [index , setIndex] = useState(0);


    return (
        <div className="block p-1 relative w-screen h-[90vh] overflow-hidden" onClick={() => { setIndex(index+1)}}>
            <Image  src={cover[index % cover.length]}  
            alt='cover'
            fill={true}
            priority
            className="object-cover object-bottom"
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