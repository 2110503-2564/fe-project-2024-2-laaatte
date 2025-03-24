'use client'
import Image from 'next/image';
import { ReservationItem } from '../../interface';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import deleteReservation from '@/libs/deleteReservation';
import { useRouter } from 'next/navigation'
import useUserStore from '@/libs/userStore';

export default function ReservationCard({ReservationData} : 
    {ReservationData:ReservationItem}) {

        const { data: session } = useSession();
        const user = useUserStore((state) => state.user)
        const router = useRouter();

        const handleDelete = async (e: React.FormEvent) => {
            e.preventDefault();
        
            if (!session?.user?.token) {
              alert('No token found. Please sign in again.');
              return;
            }

            const confirmDelete = window.confirm('Are you sure you want to delete this reservation?');
            if (!confirmDelete) return;
        
            try {
              const res = await deleteReservation(ReservationData._id, session.user.token);
              console.log('Deleted:', res);
        
              // Optional: Refresh page or re-fetch reservations
              alert('Reservation deleted successfully!');
              router.refresh()
            } catch (err: any) {
              console.error('Delete failed:', err);
              alert(err.message || 'Failed to delete reservation');
            }
          };

    return (
        <div className="border rounded-xl p-4 flex flex-row gap-6 items-center justify-between">
        {/* Left: Image */}
        <div className="relative w-[40%] h-[200px] rounded-xl overflow-hidden border">
          <Image
            src={ReservationData.campground.picture}
            alt="Campground"
            fill
            className="object-cover"
          />
        </div>
  
        {/* Right: Details */}
        <div className="flex-1 space-y-2">
          {
            user?.data.role == 'admin' ?
            <div className="text-lg text-red-600 font-semibold">
              Owner : {ReservationData.user.name} ({ReservationData.user.email})
            </div> : null
          }
          <div className="text-xl font-bold">
            {ReservationData.campground.name}  
                <div className="text-sm text-gray-500">
                    ({ReservationData.campground.telephone})
                </div>
          </div>
          <div className="text-md font-semibold text-gray-700">Address   : {ReservationData.campground.province}</div>
          <div className="text-md font-semibold text-gray-700">Date  :  {dayjs(ReservationData.rDate.toString()).format('DD/MM/YYYY HH:mm')}</div>
          {/* Buttons */}
          <div className="flex flex-row justify-center items-center gap-x-8 mt-10">
            <button className="border border-black rounded-lg px-6 py-2 text-red-500 font-bold hover:bg-red-100">
              Update
            </button>
            <button className="border border-gray-400 rounded-lg px-6 py-2 text-red-600 font-bold hover:bg-red-200"
            onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
}