import styles from './card.module.css'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card( {venueName,imgSrc,onChange} : 
    {venueName:string,imgSrc:string,onChange ?: Function}) {
    return (
    <InteractiveCard>
        <div className='w-full h-[70%] relative rounded-t-lg'>
            <Image 
            src={imgSrc}
            alt={venueName}
            fill={true}
            className='object-cover rounded-t-lg'
            />
        </div>
        <div className='w-full h-[15%] p-[10px] '>
            {venueName}
        </div>
        <div className='w-full h-[10%] p-[10px] '>
            {
                onChange ?
            <Rating
            id = {venueName + " Rating"}
            name = {venueName + " Rating"}
            data-testid = {venueName + " Rating"}
            onChange={(e,value) => { e.stopPropagation; onChange(venueName,value)}}
            /> : ''
            }
        </div>
    </InteractiveCard>
    );
}