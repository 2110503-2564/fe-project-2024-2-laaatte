import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CarPanel from "@/components/CarPanel";

export default async function Car() {
    const campgrounds = await getCampgrounds()

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium"> Choose Your Next Campsite Adventure </h1>
            <Suspense fallback = { <p>Loading... <LinearProgress /> </p> } >
                <CampgroundCatalog campgroundJson = {campgrounds}/>
            </Suspense>
        </main>
    );
}