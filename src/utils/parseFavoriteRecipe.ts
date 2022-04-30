export interface BaseRecipe {
  id: string;
  name: string;
  type: "food" | "drink";
  category?: string;
  nationality?: string;
  alcoholic?: string;
  image: string;
}

export default function parseFavoriteRecipe(recipe: BaseRecipe) {
  const {
    id,
    name,
    category = "",
    nationality = "",
    type,
    alcoholic = "",
    image,
  } = recipe;

  return {
    id,
    name,
    type,
    category,
    nationality,
    alcoholic,
    image,
  };
}

export type FavoriteRecipe = ReturnType<typeof parseFavoriteRecipe>;
