import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";

export default async function CarDetailPage( {params} : {params : {cid:string}}) {
    const cardetail = await getCar(params.cid);

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">{cardetail.data.model}</h1>
            <div className="flex flex-row my-5">
                <Image src={cardetail.data.picture}
                    alt="Car Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg w-[30%]"
                />
                <div className="text-md mx-5 text-left">{cardetail.data.description}
                <div className="text-md mx-5">Doors : {cardetail.data.doors}</div>
                <div className="text-md mx-5">Seats : {cardetail.data.seats}</div>
                <div className="text-md mx-5">Large Bags : {cardetail.data.largebags}</div>
                <div className="text-md mx-5">Small Bags : {cardetail.data.smallbags}</div>
                <div className="text-md mx-5">Daily Rental Rate : {cardetail.data.dayRate}</div>
                <Link href={`/reservations?id=${params.cid}&model=${cardetail.data.model}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                    text-white shadow-small">
                        Make Reservation
                    </button>
                </Link>
                </div>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    return [{cid:'001'}, {cid:'002'}, {cid:'003'}, {cid:'004'}]
}