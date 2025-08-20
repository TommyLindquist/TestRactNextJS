import { Recipe } from "@/app/lib/interfaces";
import { fetchRecipeById, fetchRecipeByIdResult } from "@/app/lib/data/recipe";
import Card from "@/components/card";
import { Metadata } from "next";
import DataError from "@/components/dataerror";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Recept",
    description: "Receptbeskrivning",
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = fetchRecipeByIdResult<Recipe>(id, (recipe: Recipe) => <Card recipe={recipe} className="p-4" />,
    (error: string) => <DataError message="Failed to get the recipe." error={error} />);
  return (
    <Suspense fallback={<div>Loading recipe...</div>}>
      <>{recipe}</>
    </Suspense>
  )
}