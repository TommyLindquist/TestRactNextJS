export interface FetchWithRetryOptions {
  init?: RequestInit;
  retries?: number;
  delay?: number;
}

export interface RecipeResponse {
  limit: number;
  recipes: Recipe[];
  skip: number;
  total: number;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[]
}

export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: Boolean;
}

export interface Media {
  id: number;
  title: { english: string };
  averageScore: number;
  type: string;
  format: string;
  status: string;
  description: string;
  genres: string[];
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  }
}

export interface AnilistResponse {
  data: {
    Page: {
      pageInfo: PageInfo;
      media: Media[];
    }
  }
};