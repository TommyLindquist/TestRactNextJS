import { Recipe } from "@/app/lib/interfaces";
import { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Bild exempel",
  description: "Visar en simpel bild via fetch",
};
export default async function AboutPage(){
async function fetchAllRecipeById(id: string) {
  const response = await fetch(`https://dummyjson.com/recipe/${id}`);
  const recipe: Recipe = await response.json();

  return recipe;
}

const recipe = await fetchAllRecipeById("2");
    return (
        <Image src={recipe.image} alt={recipe.name} width={300} height={200} />
    );
}