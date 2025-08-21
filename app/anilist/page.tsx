import AnilistCard from "@/components/anilistcard";
import { Media } from "../lib/interfaces";
import DataError from "@/components/dataerror";
import { fetchAllMedia } from "../lib/data/media";

export default async function AnilistPage() {

 const mediaCards = await fetchAllMedia<Media[]>();

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
      {
      "error" in mediaCards ? 
        <DataError message="Failed to get the media." error={mediaCards.error} /> 
      : 
        mediaCards.map((item) => <AnilistCard key={item.id} className="p-4" media={item} />)
      }
    </div>
  );
}