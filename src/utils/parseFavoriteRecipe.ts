import { ParsedRecipe } from "./parseRecipe";

export default function parseFavoriteRecipe(recipe: ParsedRecipe) {
  const {
    id,
    name,
    category = "",
    area: nationality = "",
    type,
    alcoholic: alcoholicOrNot = "",
    image,
  } = recipe;

  return {
    id,
    name,
    type,
    category,
    nationality,
    alcoholicOrNot,
    image,
  };
}
