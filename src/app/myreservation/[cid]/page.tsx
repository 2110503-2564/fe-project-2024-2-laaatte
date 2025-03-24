import Image from "next/image";
import getCampground from "@/libs/getCampground";
import Link from "next/link";
import { ReservationItem } from "../../../../interface";

export default async function CarDetailPage( {params} : {params : {cid:string}}) {
    const campgroundDetail = await getCampground(params.cid);
    const campgroundData:ReservationItem = campgroundDetail.data;

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl font-medium">{campgroundData.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={campgroundData.picture}
                    alt="Campground Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg w-[30%]"
                />
                <div className="text-md mx-5 text-left py-2">
                <div className="text-lg mx-5 py-2">Province : {campgroundData.province}</div>
                <div className="text-lg mx-5 py-2">Address : {campgroundData.address}</div>
                <div className="text-lg mx-5 py-2">Tel : {campgroundData.telephone}</div>
                <Link href={`/reservations?id=${params.cid}&name=${campgroundData.name}&picture=${campgroundData.picture.substring(campgroundData.picture.indexOf("id=") + 3)}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 my-2 
                    text-white shadow-small">
                        Make Reservation
                    </button>
                </Link> 
                </div>
            </div>
        </main>
    );
}