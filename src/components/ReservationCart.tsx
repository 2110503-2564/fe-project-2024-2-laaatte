'use client'
import { removeReservation } from "@/app/redux/features/cartSlice"
import { AppDispatch, useAppSelector } from "@/app/redux/store"
import { useDispatch } from "react-redux"


export default function ReservationCart() {

    const carItem = useAppSelector( (state)=>state.cartSlice.carItems )
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>{
            carItem.map((reservationItem)=> (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                key={reservationItem.carId}>
                    <div className="text-xl">{reservationItem.carModel}</div>
                    <div className="text-sm">Pick-up {reservationItem.pickupDate} from {reservationItem.pickupLocation}</div>
                    <div className="text-sm">Return {reservationItem.returnDate} to {reservationItem.returnLocation}</div>
                    <div className="text-md">Duration : {reservationItem.numOfDays}</div>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                    text-white shadow-small" onClick={()=> dispatch(removeReservation(reservationItem))}>
                        Remove from card
                    </button>
                </div>
            ))
        }
        </>
    )
}