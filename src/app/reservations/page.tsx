'use client'
import LocationDateReserve from "@/components/LocationDateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { ReservationItem } from "../../../intefaces";
import { addReservation } from "../redux/features/cartSlice";

export default function Reservations() {

    const urlParams = useSearchParams()
    const cid = urlParams.get('id')
    const model = urlParams.get('model')

    const dispatch = useDispatch<AppDispatch>()

    const makeReservation = () => {
        if (cid && model && pickupDate && returnDate) {
            const item:ReservationItem = {
                    carId : cid,
                    carModel : model,
                    numOfDays : returnDate.diff(pickupDate, "day"),
                    pickupDate : dayjs(pickupDate).format("YYYY/MM/DD"),
                    pickupLocation : pickupLocation,
                    returnDate : dayjs(returnDate).format('YYYY/MM/DD'),
                    returnLocation : returnLocation
            }
            dispatch(addReservation(item))
        }
    }

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null);
    const [pickupLocation, setPickupLocation] = useState<string>('BKK');
    const [returnDate, setReturnpDate] = useState<Dayjs|null>(null);
    const [returnLocation, setReturnLocation] = useState<string>('BKK');


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Car : {model}</div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Pick-Up Date and Location</div>
                <LocationDateReserve 
                onDateChange={(value:Dayjs)=>{setPickupDate(value)}} 
                onLocationChange={(value:string)=>{setPickupLocation(value)}}
                />
                <div className="text-md text-left text-gray-600">Return Date and Location</div>
                <LocationDateReserve
                onDateChange={(value:Dayjs)=>{setReturnpDate(value)}} 
                onLocationChange={(value:string)=>{setReturnLocation(value)}}
                />
            </div>

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
            text-white shadow-small" onClick={makeReservation}>
                Reserve this Car
            </button>

        </main>
    );
}