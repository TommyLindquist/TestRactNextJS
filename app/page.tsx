import SayHello from "@/components/say-hello";
import { Recipe } from "./lib/interfaces";
import { fetchAllRecipesResult } from "./lib/data/recipe";
import Card from "@/components/card";
import DataError from "@/components/dataerror";

export default async function Home() {

  const recipes = await fetchAllRecipesResult<React.ReactNode>(
    (recipes: Recipe[]) => recipes.map(recipe => <Card key={recipe.id} className="p-4" recipe={recipe} />),
    (error: string) => <DataError message="Failed to get the recipes." error={error} />
  );

  return (
    <>
      <SayHello className="text-red-500 text-3xl" />

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
        {recipes}
      </div>
    </>
  );
}
