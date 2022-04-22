import { useLocalStorage } from "hooks";
import React, { createContext, useMemo } from "react";
import { ParsedRecipe, parseFavoriteRecipe } from "utils";
import { FavoriteRecipe } from "utils/parseFavoriteRecipe";

export type FavoriteRecipesContextValue = readonly [
  FavoriteRecipe[],
  (recipe: ParsedRecipe) => void,
  (recipe: ParsedRecipe) => void,
  React.Dispatch<React.SetStateAction<FavoriteRecipe[]>>,
];

export const FavoritesRecipesContext =
  createContext<FavoriteRecipesContextValue>([] as any);

interface Props {
  children: React.ReactNode;
}

function FavoritesRecipesContextProvider({ children }: Props) {
  const [favoritesRecipes, setFavoritesRecipes] = useLocalStorage<
    FavoriteRecipe[]
  >("favoriteRecipes", []);

  const addRecipe = (recipe: ParsedRecipe) => {
    const newFavoritesRecipes = [
      ...favoritesRecipes,
      parseFavoriteRecipe(recipe),
    ];
    setFavoritesRecipes(newFavoritesRecipes);
  };

  const removeRecipe = (recipe: ParsedRecipe) => {
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

export default FavoritesRecipesContextProvider;
