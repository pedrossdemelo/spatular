import useRecipeList from "hooks/useRecipeList";
import { ParsedRecipe } from "utils/parseRecipe";

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
  const addIngredient = ({ name, measure }: Ingredient) => {
    const newState = {
      ...inProgressRecipes,
      [key(type)]: {
        ...inProgressRecipes[key(type)],
        [id]: [
          ...(inProgressRecipes[key(type)][id] || []),
          `${name} - ${measure}`,
        ],
      },
    };

    setInProgressRecipes(newState);
  };

  /**
   * Removes an ingredient from the recipe's progress list
   */
  const removeIngredient = ({ name, measure }: Ingredient) => {
    const newState = {
      ...inProgressRecipes,
      [key(type)]: {
        ...inProgressRecipes[key(type)],
        [id]: inProgressRecipes[key(type)][id].filter(
          (ingredientMeasure: string) =>
            ingredientMeasure !== `${name} - ${measure}`,
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
