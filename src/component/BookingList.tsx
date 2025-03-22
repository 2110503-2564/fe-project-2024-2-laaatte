'use client'
import { removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"

export default function BookingList() {

    const bookItem = useAppSelector( (state)=>state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    console.log(bookItem.length)
    console.log(bookItem.map(item => [item.nameLastname,item.tel,item.venue,item.bookDate]))

    return (
        <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
            {
                bookItem.length == 0 ? "No Venue Booking" :
                <div>
                    {
                        bookItem.map((bookingitem) => (
                            <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                                <div className="text-xl">{bookingitem.nameLastname}</div>
                                <div className="text-sm">Tel. {bookingitem.tel}</div>
                                <div className="text-sm">Location {bookingitem.venue}</div>
                                <div className="text-md">Day : {bookingitem.bookDate}</div>
                                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                                text-white shadow-small" onClick={()=> dispatch(removeBooking(bookingitem))}>
                                    Remove Booking
                                </button>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )

}