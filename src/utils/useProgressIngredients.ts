import { ParsedRecipe } from "./parseRecipe";
import useRecipeList from "./useRecipeList";

interface Ingredient {
  name: string;
  measure?: string;
}

export default function useProgressIngredients(recipe: ParsedRecipe) {
  const { type, id } = recipe;
  const [inProgressRecipes, , , setInProgressRecipes] =
    useRecipeList("inProgressRecipes");

  const key = (t: "drink" | "food") => (t === "drink" ? "cocktails" : "meals");

  /**
   * Adds an ingredient to the recipe's progress list
   */
  const addIngredient = (ingredient: Ingredient) => {
    const newState = {
      ...inProgressRecipes,
      [key(type)]: {
        ...inProgressRecipes[key(type)],
        [id]: [...(inProgressRecipes[key(type)][id] || []), ingredient.name],
      },
    };

    setInProgressRecipes(newState);
  };

  /**
   * Removes an ingredient from the recipe's progress list
   */
  const removeIngredient = (ingredient: Ingredient) => {
    const newState = {
      ...inProgressRecipes,
      [key(type)]: {
        ...inProgressRecipes[key(type)],
        [id]: inProgressRecipes[key(type)][id].filter(
          (ingredientName: string) => ingredientName !== ingredient.name,
        ),
      },
    };

    setInProgressRecipes(newState);
  };

  /**
   * Removes all ingredients from the recipe's progress list
   */
  const removeAllIngredients = () => {
    const newState = {
      ...inProgressRecipes,
      [key(type)]: {
        ...inProgressRecipes[key(type)],
        [id]: [],
      },
    };

    setInProgressRecipes(newState);
  };

  return [
    inProgressRecipes[key(type)][id] ?? [],
    addIngredient,
    removeIngredient,
    removeAllIngredients,
  ] as const;
}
