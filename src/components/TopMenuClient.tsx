'use client';
import useUserStore from '@/libs/userStore';
import { Session } from 'next-auth';
import styles from './topmenu.module.css';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import Image from 'next/image';
import { Link as MuiLink } from '@mui/material';

type Props = {
  session: Session | null;
};

export default function TopMenuClient({ session }: Props) {
  const user = useUserStore((state) => state.user);

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
            {user?.data.role == 'admin' ?
            <TopMenuItem title='Logs' pageRef='/logs'/> : null
            }
            <div className='flex flex-row absolute right-0 h-full'>
            <TopMenuItem title='My Reservation' pageRef='/myreservation'/>
            {
                session ? 
                <MuiLink href="/api/auth/signout">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sign-Out of {user?.data.name}
                    </div>
                </MuiLink> 
                    :
                    <>
                <MuiLink href="/api/auth/signin">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sign-In
                    </div>
                </MuiLink> 
                <div className='flex items-center h-full text-cyan-600 text-sm'>/</div>
                <MuiLink href="/api/auth/register">
                <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                    Register
                </div>
                </MuiLink>
                </>
            }
            </div>
        </div>
  );
}
