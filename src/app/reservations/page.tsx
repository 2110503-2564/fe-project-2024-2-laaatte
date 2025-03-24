'use client'
import { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { useEffect, useState } from "react";
import Image from "next/image";
import createReservation from "@/libs/createReservation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import { useRouter } from "next/navigation";
import SelectCampgroundCatalog from "@/components/SelectCampgroundCatalog";
import getCampgrounds from "@/libs/getCampgrounds";


export default function Reservations() {
    const router = useRouter()

    const urlParams = useSearchParams()
    const cid = urlParams.get('id')
    const campground = urlParams.get('name')
    const picture = urlParams.get('picture')

    const [c_id, setC_id] = useState<string|null>(cid)
    const [campgrounds, setCampgrounds] = useState<any>(null);
    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null)
    const [time, setTime ] = useState<Dayjs|null>(null)
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const {data : session} = useSession();

    if (!session?.user.token) 
        return

    useEffect(() => {
            const fetchCampgrounds = async () => {
                const data = await getCampgrounds();
                setCampgrounds(data);
            };
            fetchCampgrounds();
        }, []);

    const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();

        if (!reserveDate || !time) {
            alert("Please select Day or Time")
            return
        }

        if (!c_id) {
            alert("Please select Campground")
            return
        }

        setLoading(true);

        const fullDateTime = reserveDate.hour(time.hour()).minute(time.minute()).second(0).millisecond(0)

        const jsDate = fullDateTime.toDate()
        console.log('Submitting form:', jsDate);

        try {
            const response = await createReservation(c_id, session?.user.token, jsDate, session?.user._id);
            console.log('Reservation Response:', response);
    
            if (!response.success)
                alert(response?.message || 'Registration failed');
            else {
            // ✅ Clear inputs & show success message
            setReserveDate(null);
            setTime(null);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
        } catch (error: any) {
            console.error('Registration error:', error);
            alert(error.message || 'Something went wrong!');
        } finally {
            setLoading(false); // ✅ Done loading
        }
    };


    return (
        <main className="beautiful flex flex-col items-center">
            <div className="text-2xl font-medium py-4">New Reservation</div>
            <div className="flex flex-col items-center p-2">
                <div className="py-2">
                    <SelectCampgroundCatalog campgroundJson = {campgrounds} onSelectCampground={(id: string) => setC_id(id)} />
                </div>
                {c_id && campgrounds && (
                    <div className="text-md text-green-600">
                        Selected Campground: {
                            campgrounds.data.find((c: any) => c.id === c_id)?.name ?? 'Unknown'
                        }
                    </div>
                )}
                <div className="w-fit mt-6">
                    <div className="text-md text-left text-gray-600">Select a Day to Visit This Campground</div>
                </div>
                <DateReserve onDateChange={(value:Dayjs)=>{setReserveDate(value)}} onTimeChange={(value:Dayjs)=>{setTime(value)}}></DateReserve>
                {c_id && //if dont have c_id dont show button reserve
                    <button className={`block rounded-md px-3 py-2 mt-4 text-white shadow-small
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-indigo-600'}`}
                        onClick={handleSubmit}
                        disabled={loading} >
                    {loading ? 'Reserving...' : 'Reserve this Campground'}
                    </button>
                }
            </div>
            {showPopup &&
            ( <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm w-full">
                <h2 className="text-xl font-bold text-green-600 mb-2">Reservation Complete 🎉</h2>
                <p className="text-gray-700">Your campground has been successfully reserved.</p>
                </div>
            </div> )}
        </main>
    );
}