import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <Link href={'/'}>
            <Image src={'/img/logo.png'} 
            className={styles.logoimg}
            alt='logo'
            width={0}
            height={0}
            sizes='100vh'/>
            </Link>
            <TopMenuItem title='Campground' pageRef='/campground'/>
            <TopMenuItem title='Reservation' pageRef='/reservations'/>
            <div className='flex flex-row absolute right-0 h-full'>
            <TopMenuItem title='Cart' pageRef='/cart'/>
            {
                session ? 
                <MuiLink href="/api/auth/signout">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sigh-Out of {session.user?.name}
                    </div>
                </MuiLink> 
                    :
                <MuiLink href="/api/auth/signin">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sign-In
                    </div>
                </MuiLink>
            }
            </div>
        </div>
    );
}