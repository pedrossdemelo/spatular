import { DoneRecipesContextValue } from "context/DoneRecipesContext";
import { FavoriteRecipesContextValue } from "context/FavoritesRecipesContext";
import { InProgressRecipesContextValue } from "context/InProgressRecipesContext";
import { useContext } from "react";
import {
  DoneRecipesContext,
  FavoritesRecipesContext,
  InProgressRecipesContext,
} from "../context";

const recipeListContextMap = {
  favoriteRecipes: FavoritesRecipesContext,
  inProgressRecipes: InProgressRecipesContext,
  doneRecipes: DoneRecipesContext,
};

function useRecipeList(key: "favoriteRecipes"): FavoriteRecipesContextValue;
function useRecipeList(key: "inProgressRecipes"): InProgressRecipesContextValue;
function useRecipeList(key: "doneRecipes"): DoneRecipesContextValue;
function useRecipeList(key: keyof typeof recipeListContextMap): unknown {
  const context = useContext<any>(recipeListContextMap[key]);

  const [recipeList, addRecipe, removeRecipe, setRecipeList] = context;

  return [recipeList, addRecipe, removeRecipe, setRecipeList];
}

export default useRecipeList;
