import Link from "next/link";
import ProductCard from "./ProductCard";
import { ReservationJson, ReservationItem } from "../../interface";
import ReservationCard from "./ReservationCard";

export default async function ReservationCatalog({ReservationJson} : {ReservationJson:ReservationJson}) {

    return (
        <>
            You have {ReservationJson.count} Reservation
            <div style={{margin:"20px", display:"flex", flexDirection:"row",
                    flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"
                  }}>
                    {
                        ReservationJson.data.map((ReservationItem : ReservationItem) => (
                            <div className="w-[100%] p-2">
                                <ReservationCard ReservationData={ReservationItem}/>
                            </div>
                        ))
                    }
            </div>
        </>
    )
}