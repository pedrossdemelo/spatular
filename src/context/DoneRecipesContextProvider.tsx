import useLocalStorage from "hooks/useLocalStorage";
import React, { createContext, useMemo } from "react";
import { ParsedRecipe } from "utils";

export type DoneRecipe = ParsedRecipe & { doneDate: string };

export type DoneRecipesContextValue = readonly [
  DoneRecipe[],
  (recipe: ParsedRecipe) => void,
  (recipe: ParsedRecipe) => void,
  React.Dispatch<React.SetStateAction<DoneRecipe[]>>,
];

export const DoneRecipesContext = createContext<DoneRecipesContextValue>(
  [] as any,
);

interface Props {
  children: React.ReactNode;
}

export function DoneRecipesContextProvider({ children }: Props) {
  const [doneRecipes, setDoneRecipes] = useLocalStorage<DoneRecipe[]>(
    "doneRecipes",
    [],
  );

  const addRecipe = (recipe: ParsedRecipe) => {
    if (doneRecipes.some((r) => recipe.id === r.id)) return;
    const newRecipe = { ...recipe, doneDate: new Date().toISOString() };
    const newDoneRecipes = [...doneRecipes, newRecipe];
    setDoneRecipes(newDoneRecipes);
  };

  const removeRecipe = (recipe: ParsedRecipe) => {
    const newDoneRecipes = doneRecipes.filter((r) => r.id !== recipe.id);
    setDoneRecipes(newDoneRecipes);
  };

  const value = useMemo(
    () => [doneRecipes, addRecipe, removeRecipe, setDoneRecipes] as const,
    [doneRecipes],
  );

  return (
    <DoneRecipesContext.Provider value={value}>
      {children}
    </DoneRecipesContext.Provider>
  );
}
