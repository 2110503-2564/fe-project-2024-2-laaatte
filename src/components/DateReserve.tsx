'use client'
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

export default function DateReserve({onDateChange, onTimeChange}:
    { onDateChange : Function, onTimeChange : Function }) {

    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null)
    const [time, setTime ] = useState<Dayjs|null>(null)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="bg-slate-100 rounded-lg px-10 py-5 flex flex-col items-center justify-center space-y-4 mx-auto">
                <DatePicker
                className="bg-white"
                value={reserveDate}
                // disablePast  //to show bad reservation
                onChange={(value) => {
                    setReserveDate(value)
                    onDateChange(value)
                }}
                />
                <TimePicker
                className="bg-white"
                value={time}
                onChange={(value) => {
                    setTime(value)
                    onTimeChange(value)
                }}
                />
            </div>
        </LocalizationProvider>
    );
}