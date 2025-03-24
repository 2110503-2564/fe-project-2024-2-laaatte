'use client'
import { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import updateReservation from "@/libs/updateReservation";
import getCampgrounds from "@/libs/getCampgrounds";
import SelectCampgroundCatalog from "@/components/SelectCampgroundCatalog";


export default function Reservations({params} : {params : {rid:string}}) {
    const router = useRouter()
    const {data : session} = useSession();

    const [cid, setCid] = useState<string|null>(null)
    const [campgrounds, setCampgrounds] = useState<any>(null);
    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null)
    const [time, setTime ] = useState<Dayjs|null>(null)
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCampgrounds = async () => {
            const data = await getCampgrounds();
            setCampgrounds(data);
        };
        fetchCampgrounds();
    }, []);

    if (!session?.user.token) 
        return

    //update function
    const handleSubmit = async (e: React.FormEvent) => {
             e.preventDefault();
    
            if (!reserveDate || !time) {
                alert("Please select Day or Time")
                return
            }

            if (!cid) {
                alert("Please select Campground")
                return
            }
    
            setLoading(true);
    
            const fullDateTime = reserveDate.hour(time.hour()).minute(time.minute()).second(0).millisecond(0)
    
            const jsDate = fullDateTime.toDate()
            console.log('Submitting form:', jsDate);
    
            try {
                const response = await updateReservation(params.rid, session?.user.token, jsDate, cid);
                console.log('Reservation Response:', response);
        
                if (!response.success)
                    alert(response?.message || 'Registration failed');
                else {
                // ✅ Clear inputs & show success message
                setReserveDate(null);
                setTime(null);
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    router.replace('/myreservation');
                }, 2000);
            }
            } catch (error: any) {
                console.error('Registration error:', error);
                alert(error.message || 'Something went wrong!');
            } finally {
                setLoading(false); // ✅ Done loading
            }
        };
    //

    return (
        <main className="beautiful flex flex-col items-center">
            <div className="text-2xl font-medium py-4">Update Reservation</div>
            <div className="flex flex-col items-center p-2">
                <div className="py-2">
                    <SelectCampgroundCatalog campgroundJson = {campgrounds} onSelectCampground={(id: string) => setCid(id)} />
                </div>
                {cid && campgrounds && (
                    <div className="text-md text-green-600">
                        Selected Campground: {
                            campgrounds.data.find((c: any) => c.id === cid)?.name ?? 'Unknown'
                        }
                    </div>
                )}
                    <div className="text-md text-left text-gray-600">Select a Day to Visit This Campground</div>
                <DateReserve onDateChange={(value:Dayjs)=>{setReserveDate(value)}} onTimeChange={(value:Dayjs)=>{setTime(value)}}></DateReserve>
                {
                    <button className={`block rounded-md px-3 py-2 mt-4 text-white shadow-small
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-indigo-600'}`}
                        onClick={handleSubmit}  
                        disabled={loading} >
                    {loading ? 'Update...' : 'Update this Reservation'}
                    </button>
                }
            </div>
            {showPopup &&
            ( <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm w-full">
                <h2 className="text-xl font-bold text-green-600 mb-2">Update Reservation Complete 🎉</h2>
                <p className="text-gray-700">Your reservation has been successfully update.</p>
                </div>
            </div> )}
        </main>
    );
}