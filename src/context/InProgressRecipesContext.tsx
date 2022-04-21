import { useLocalStorage } from "hooks";
import React, { createContext, useMemo } from "react";
import { ParsedRecipe } from "utils";

type InProgressRecipes = {
  meals: { [id: string]: string[] };
  cocktails: { [id: string]: string[] };
};

export const InProgressRecipesContext = createContext([] as any);

interface Props {
  children: React.ReactNode;
}

function InProgressRecipesContextProvider({ children }: Props) {
  const [inProgressRecipes, setInProgressRecipes] =
    useLocalStorage<InProgressRecipes>("inProgressRecipes", {
      meals: {},
      cocktails: {},
    });

  const key = (type: ParsedRecipe["type"]) =>
    type === "drink" ? "cocktails" : "meals";

  const addRecipe = (recipe: ParsedRecipe) => {
    const { type, id } = recipe;
    const newInProgressRecipes = {
      ...inProgressRecipes,
      [key(type)]: { ...inProgressRecipes[key(type)], [id]: [] },
    };
    setInProgressRecipes(newInProgressRecipes);
  };

  const removeRecipe = (recipe: ParsedRecipe) => {
    const { type, id } = recipe;
    const newInProgressRecipes = {
      ...inProgressRecipes,
      [key(type)]: {
        ...inProgressRecipes[key(type)],
        [id]: undefined,
      },
    };
    setInProgressRecipes(newInProgressRecipes);
  };

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
