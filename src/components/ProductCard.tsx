import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function ProductCard({campgroundName, imgSrc, campgroundProvince } : 
    {campgroundName:string, imgSrc:string, campgroundProvince:string}) {
        
    return (
        <InteractiveCard contentName={campgroundName}>
            <div  className='w-full h-[70%] relative rounded-t-lg'> 
                <Image src={imgSrc}
                alt='Product Picture'
                fill
                className='object-cover rounded-t-lg'/>
            </div>      
            <div className="px-4 py-2 text-lg font-semibold text-center text-gray-800">{campgroundName}</div>
            <div className="px-4 pb-4 text-sm text-center text-gray-500">{campgroundProvince}</div>
        </InteractiveCard>
    );
}