import Link from "next/link";
import ProductCard from "./ProductCard";
import { CampgroundItem, CampgroundJson } from "../../interface";

export default async function CampgroundCatalog({campgroundJson} : {campgroundJson:CampgroundJson}) {
    const campgroundJsonReady = await campgroundJson

    return (
        <>
            Discover {campgroundJsonReady.count} Scenic Campsites Across Thailand
            <div style={{margin:"20px", display:"flex", flexDirection:"row",
                    flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"
                  }}>
                    {
                        campgroundJsonReady.data.map((campgroundItem:CampgroundItem) => (
                            <Link href={`/campground/${campgroundItem.id}`} 
                                className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] 
                                p-2 sm:p-4 lg:p-8">
                                <ProductCard campgroundName ={campgroundItem.name} imgSrc={campgroundItem.picture}
                                campgroundProvince={campgroundItem.province}
                            />
                            </Link>
                        ))
                    }
            </div>
        </>
    )
}