import { fetchWithRetry } from "@/app/services/data-service";

// export async function fetchAllRecipes() {
//   const response = await fetch("https://dummyjson.com/recipes");
//   const { recipes }: RecipeResponse = await response.json();
//   return recipes;
// }

// export async function fetchAllRecipeById() {
//   const response = await fetch("https://dummyjson.com/recipe/2");
//   const recipe: Recipe = await response.json();

//   return recipe;
// }

const url = "https://dummyjson.com/recipes";
const urlRecipe = "https://dummyjson.com/recipe";
let defaultErrorHandler = (error: string) => console.log('Fetch failed:', error);

export async function fetchAllRecipes<T>(CustomErrorHandler: Function = defaultErrorHandler): Promise<T[]> {
    const recipes: T[] = await fetchWithRetry(url)
        .then(response => response.json())
        .then(data => data.recipes)
        .catch(error => CustomErrorHandler(error));

    return recipes || [] as T[];
}

export async function fetchRecipeById<T>(id: string, CustomErrorHandler: Function = defaultErrorHandler): Promise<T> {
    const recipe: T = await fetchWithRetry(`${urlRecipe}/${7000}`)
        .then(response => response.json())
        .catch(error => CustomErrorHandler(error));

    return recipe || {} as T;
}

// for also getting limit, skip, total etc.
export async function fetchRaw<T>(CustomErrorHandler: Function = defaultErrorHandler): Promise<T[]> {
    const raw: T[] = await fetchWithRetry(url)
        .then(response => response.json())
        .catch(error => CustomErrorHandler(error));

    return raw || [] as T[];
}

/**
 * Fetches all recipes and returns the result using success or fail callbacks.
 * @param success - Callback function to handle successful fetch, receives the recipes data.
 * @param fail - Callback function to handle errors, receives the error message.
 * @returns The result of the success or fail callback.
 */
export async function fetchAllRecipesResult<T>(success: Function, fail: Function): Promise<T[]> {
    let err = "";
    const data: T[] = await fetchAllRecipes<T>((error: string) => err = String(error));
    return !err ? success(data) : fail(err);
}

/**
 * 
 * Fetches a recipe by its ID and returns the result using success or fail callbacks.
 * @param id - The ID of the recipe to fetch.
 * @param success - Callback function to handle successful fetch, receives the recipe data.
 * @param fail - Callback function to handle errors, receives the error message.
 * @returns The result of the success or fail callback.
 */
export async function fetchRecipeByIdResult<T>(id: string, success: Function, fail: Function) : Promise<T> {
    let err = "";
    const data: T = await fetchRecipeById<T>(id, (error: string) => err = String(error));
    return !err ? success(data) : fail(err);
}

// for also getting limit, skip, total etc.
export async function fetchRawResult<T>(success: Function, fail: Function): Promise<T[]> {
    let err = "";
    const data: T[] = await fetchRaw<T>((error: string) => err = String(error));
    return !err ? success(data) : fail(err);
}