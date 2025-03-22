import CardPanel from "@/components/CardPanel";
import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Venue() {
    const Venue = getVenues();

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
            <Suspense fallback={<p><LinearProgress/></p>}>
                <VenueCatalog venuesJson={Venue} />
            </Suspense>
        </main>
    );
}