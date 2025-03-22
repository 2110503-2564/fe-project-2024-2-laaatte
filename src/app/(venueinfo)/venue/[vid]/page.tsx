import getVenue from "@/libs/getVenue";
import Image from "next/image";

export default async function VeunueInfo( {params} : {params: { vid:string }}) {

    const venueData = await getVenue(params.vid);

    return (
        <main className="text-center p-5">
            {/* <h1 className="text-xl font-medium">Car ID {params.vid}</h1> */}
            <div className="flex flex-row my-5">
                <Image src={venueData.data.picture}
                    alt="Venue Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg w-[30%]"
                />
                <div className="text-md mx-5 text-left">
                <div className="text-md mx-5">Name : {venueData.data.name}</div>
                <div className="text-md mx-5">Address : {venueData.data.address}</div>
                <div className="text-md mx-5">District : {venueData.data.district}</div>
                <div className="text-md mx-5">Postal code : {venueData.data.postalcode}</div>
                <div className="text-md mx-5">Tel : {venueData.data.tel}</div>
                <div className="text-md mx-5">Daily Rate : {venueData.data.dailyrate}</div>
                </div>
            </div>
        </main>
    );
}

// export async function generateStaticParams() {
//     return [{vid:'001'}, {vid:'002'}, {vid:'003'}]
// }