import AnilistCard from "@/components/anilistcard";
import DataError from "@/components/dataerror";
import { fetchAllMedia } from "../lib/data/media";

export default async function AnilistPage({
  searchParams
}: { 
  searchParams: Promise<{ [key: string]: string | string[] }> 
}) {
 
 const { error } = await searchParams;

 error && error === "true" && (() => {
   throw new Error("This  is a test error for the Anilist page., should be taken care of error.ts");
 })();

 const mediaCards = await fetchAllMedia();

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