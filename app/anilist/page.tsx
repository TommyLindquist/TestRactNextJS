import AnilistCard from "@/components/anilistcard";
import { Media } from "../lib/interfaces";
import DataError from "@/components/dataerror";
import { fetchAllMediaResult } from "../lib/data/media";

export default async function AnilistPage() {

    const mediaCards = await fetchAllMediaResult<React.ReactNode>(
    (media: Media[]) => media.map(item => <AnilistCard key={item.id} className="p-4" media={item} />),
    (error: string) => <DataError message="Failed to get the media." error={error} />
  );

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
      {mediaCards}
    </div>
  );
}