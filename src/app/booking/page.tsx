'use client'
import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";

export default function Booking() {

    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if (nameLastname && contactNumber && venue && bookingDate) {
            const item:BookingItem = {
                nameLastname: nameLastname,
                tel: contactNumber,
                venue: venue,
                bookDate: dayjs(bookingDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item))

            console.log(item)
        }else 
        console.log("Incorrect Formal")
    }

    const [nameLastname, setNameLastname] = useState<string>("")
    const [contactNumber, setContactNumber] = useState<string>("")
    const [venue, setVenue] = useState<string>("")
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium py-2">
                Venue Booking
            </div>
            <form className="w-fit bg-slate-100 flex flex-col space-y-2 p-4 rounded-lg">
                <TextField
                    variant="standard"
                    name="Name-Lastname"
                    label="Name-Lastname"
                    InputProps={{ className: "MuiInput-input border border-gray-300 rounded-lg p-2 w-full" }}
                    InputLabelProps={{ className: "text-gray-700" }}
                    value={nameLastname}
                    onChange={(e)=> setNameLastname(e.target.value)}
                />

                <TextField
                    variant="standard"
                    name="Contact-Number"
                    label="Contact-Number"
                    InputProps={{ className: "MuiInput-input border border-gray-300 rounded-lg p-2 w-full" }}
                    InputLabelProps={{ className: "text-gray-700" }}
                    value={contactNumber}
                    onChange={(e)=> setContactNumber(e.target.value)}
                />

                <Select
                    variant="standard"
                    name="venue"
                    id="venue"
                    className="MuiSelect-select h-10 w-52 mx-auto"
                    value={venue}
                    onChange={(e)=> setVenue(e.target.value)}
                    >
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>
                <DateReserve onDateChange={(value:Dayjs)=>{setBookingDate(value)}}/>
                <button name="Book Venue"
                type="button"
                className="block rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 
                text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={makeBooking}>
                Book Venue
                </button>
            </form>
        </main>
    );
}
