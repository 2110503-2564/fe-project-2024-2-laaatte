'use client'
import LocationDateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { useState } from "react";
import Image from "next/image";
import createReservation from "@/libs/createReservation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";


export default function Reservations() {

    const urlParams = useSearchParams()
    const cid = urlParams.get('id')
    const campground = urlParams.get('name')
    const picture = urlParams.get('picture')

    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null)
    const [time, setTime ] = useState<Dayjs|null>(null)

    const {data : session} = useSession();
    if (!session?.user.token) 
        return

    const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();

        if (!reserveDate || !time) {
            alert("Please select Day or Time")
            return
        }

        const fullDateTime = reserveDate.hour(time.hour()).minute(time.minute()).second(0).millisecond(0)

        const jsDate = fullDateTime.toDate()
        console.log('Submitting form:', jsDate);

        const userData = getUserProfile(session?.user.token)

        console.log(userData)

        // try {
        //     const response = await createReservation(cid,session?.user.token,jsDate,session?.user._id);
        //     console.log('Reservation Response:', response);
    
        //     if (!response.success)
        //         alert(response?.message || 'Registration failed');
        // } catch (error: any) {
        //     console.error('Registration error:', error);
        //     alert(error.message || 'Something went wrong!');
        // }

    };


    return (
        <main className="beautiful flex flex-col items-center">
            <div className="text-2xl font-medium py-4">New Reservation</div>
            <div className="flex flex-col items-center p-2">
                <div className="text-lg font-medium">Campground : {campground}</div>
                <Image 
                src={`https://drive.google.com/uc?export=view&id=${picture}`}
                alt="Campground Image"
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg beautiful w-[50%] mt-4"
                />
                <div className="w-fit mt-6">
                    <div className="text-md text-left text-gray-600">Select a Day to Visit This Campground</div>
                </div>
                <DateReserve onDateChange={(value:Dayjs)=>{setReserveDate(value)}} onTimeChange={(value:Dayjs)=>{setTime(value)}}></DateReserve>
                {cid && //if dont have cid dont show button reserve
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                text-white shadow-small mt-4"
                onClick={handleSubmit}>
                    Reserve this Campground
                </button>}
            </div>
        </main>
    );
}