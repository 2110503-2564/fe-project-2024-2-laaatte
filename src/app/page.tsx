import Banner from "@/components/Banner";
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CampgroundCard from "@/components/CampgroundCard2";

    

export default async function Home() {
  const campgrounds = await getCampgrounds()
  return (
    <main >
      <Banner/>
      <div className="mt-20 ">
                <CampgroundCard campgroundJson = {campgrounds}/>
      </div>
    </main>
  );
}
