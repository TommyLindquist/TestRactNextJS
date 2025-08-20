import { Recipe } from "@/app/lib/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function Card({ recipe, className }: { recipe: Recipe, className?: string }) {
    return (
        <article key={recipe.id} className={`bg-amber-50 text-gray-600 space-y-4 ${className}`}>
            <h2 className="htext-2xl font-bold">{recipe.name}</h2>
            <Link href={`/recipe/${recipe.id}`}>
            <Image src={recipe.image} alt={recipe.name} width={300} height={200} />
            </Link>
            <h3 className="font-bold">Ingredients</h3>
            <ul className="list-disc pl-6">
                {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
            </ul>
            <h3 className="font-bold">Instructions</h3>
            <p>{recipe.instructions}</p>
        </article>
    )
}