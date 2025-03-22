import Link from "next/link";
import Card from "./Card";
import { VenueJson, VenueItem } from "../../interface"

export default async function VenueCatalog( {venuesJson} :{venuesJson : Promise<VenueJson>}) {
    const venuesData = await venuesJson

    return (
        <div style={{margin:"20px", display:"flex", flexDirection:"row",
            flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"
          }}>
            {
                venuesData.data.map((VenueItem : VenueItem) => (
                    <Link href={`/venue/${VenueItem.id}`} className="w-1/5">                           
                    <Card venueName={VenueItem.name} imgSrc={VenueItem.picture}/>
                    </Link>
                ))
            }
        </div>
    )
}