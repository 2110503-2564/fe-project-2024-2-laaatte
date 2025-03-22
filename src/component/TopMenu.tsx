
import Image from 'next/image';
import { Link } from '@mui/material';

export default function TopMenu() {

    return (
        <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row">
            <Image src={'/img/logo.png'} 
            className="h-full w-auto"
            alt='logo'
            width={0}
            height={0}
            sizes='100vh'
            />
            <Link href="/api/auth/signin">
                <div className='flex items-center h-full px-5 text-cyan-600 text-sm'>
                    Sign-In
                </div>
            </Link>
        </div>
    );
}