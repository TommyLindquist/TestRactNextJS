import { imgsizes } from "@/app/lib/data/media";
import { Media, Recipe } from "@/app/lib/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function AnilistCard({ media, className }: { media: Media, className?: string }) {
    return (
        <article className={`bg-amber-50 text-gray-600 space-y-4 ${className}`}>
            <h2 className="htext-2xl font-bold">{media.title.english}</h2>
            <Link href={`/recipe/${media.id}`}>
            <Image src={media.coverImage.medium} alt={media.title.english || "Picture not available"} width={imgsizes.large.width} height={imgsizes.large.height} />
            </Link>
            <h3 className="font-bold">Genres</h3>
            <ul className="list-disc pl-6">
                {media.genres.map((genre, index) => <li key={index} style={{ backgroundColor: media.coverImage.color }}>{genre}</li>)}
            </ul>
            <h3 className="font-bold">Description</h3>
            <p>{media.description}</p>
        </article>
    )
}