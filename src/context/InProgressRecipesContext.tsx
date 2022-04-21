import { useLocalStorage } from "hooks";
import React, { createContext, useMemo } from "react";
import { ParsedRecipe } from "utils";

type InProgressRecipes = {
  meals: { [id: string]: string[] };
  cocktails: { [id: string]: string[] };
};

export type InProgressRecipesContextValue = readonly [
  InProgressRecipes,
  (recipe: ParsedRecipe) => void,
  (recipe: ParsedRecipe) => void,
  React.Dispatch<React.SetStateAction<InProgressRecipes>>,
];

export const InProgressRecipesContext =
  createContext<InProgressRecipesContextValue>([] as any);

interface Props {
  children: React.ReactNode;
}

function InProgressRecipesContextProvider({ children }: Props) {
  const [inProgressRecipes, setInProgressRecipes] =
    useLocalStorage<InProgressRecipes>("inProgressRecipes", {
      meals: {},
      cocktails: {},
    });

  function key(type: ParsedRecipe["type"]) {
    return type === "drink" ? "cocktails" : "meals";
  }

  /**
   * Adds a recipe to the in-progress list.
   */
  function addRecipe(recipe: ParsedRecipe) {
    const { type, id } = recipe;
    const newInProgressRecipes = {
      ...inProgressRecipes,
      [key(type)]: { ...inProgressRecipes[key(type)], [id]: [] },
    };
    setInProgressRecipes(newInProgressRecipes);
  }

  /**
   * Removes a recipe from the in-progress list.
   */
  function removeRecipe(recipe: ParsedRecipe) {
    const { type, id } = recipe;
    const newInProgressRecipes = {
      ...inProgressRecipes,
      [key(type)]: {
        ...inProgressRecipes[key(type)],
        [id]: undefined,
      },
    };
    setInProgressRecipes(newInProgressRecipes);
  }

  const value = useMemo(
    () =>
      [
        inProgressRecipes,
        addRecipe,
        removeRecipe,
        setInProgressRecipes,
      ] as const,
    [inProgressRecipes],
  );

  return (
    <InProgressRecipesContext.Provider value={value}>
      {children}
    </InProgressRecipesContext.Provider>
  );
}

export default InProgressRecipesContextProvider;
