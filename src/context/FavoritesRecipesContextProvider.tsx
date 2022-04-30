import useLocalStorage from "hooks/useLocalStorage";
import React, { createContext, useMemo } from "react";
import { parseFavoriteRecipe } from "utils";
import { BaseRecipe, FavoriteRecipe } from "utils/parseFavoriteRecipe";

export type FavoriteRecipesContextValue = readonly [
  FavoriteRecipe[],
  (recipe: BaseRecipe) => void,
  (recipe: BaseRecipe) => void,
  React.Dispatch<React.SetStateAction<FavoriteRecipe[]>>,
];

export const FavoritesRecipesContext =
  createContext<FavoriteRecipesContextValue>([] as any);

interface Props {
  children: React.ReactNode;
}

export function FavoritesRecipesContextProvider({ children }: Props) {
  const [favoritesRecipes, setFavoritesRecipes] = useLocalStorage<
    FavoriteRecipe[]
  >("favoriteRecipes", []);

  const addRecipe = (recipe: BaseRecipe) => {
    const newFavoritesRecipes = [
      ...favoritesRecipes,
      parseFavoriteRecipe(recipe),
    ];
    setFavoritesRecipes(newFavoritesRecipes);
  };

  const removeRecipe = (recipe: BaseRecipe) => {
    const newFavoritesRecipes = favoritesRecipes.filter(
      (r) => r.id !== recipe.id,
    );
    setFavoritesRecipes(newFavoritesRecipes);
  };

  const value = useMemo(
    () =>
      [favoritesRecipes, addRecipe, removeRecipe, setFavoritesRecipes] as const,
    [favoritesRecipes],
  );

  return (
    <FavoritesRecipesContext.Provider value={value}>
      {children}
    </FavoritesRecipesContext.Provider>
  );
}
