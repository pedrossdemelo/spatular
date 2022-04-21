import React from "react";
import AuthContextProvider from "./AuthContext";
import DoneRecipesContextProvider from "./DoneRecipesContext";
import FavoritesRecipesContextProvider from "./FavoritesRecipesContext";
import InProgressRecipesContextProvider from "./InProgressRecipesContext";

interface Props {
  children: React.ReactNode;
}

function AppContextProvider({ children }: Props) {
  return (
    <AuthContextProvider>
      <DoneRecipesContextProvider>
        <FavoritesRecipesContextProvider>
          <InProgressRecipesContextProvider>
            {children}
          </InProgressRecipesContextProvider>
        </FavoritesRecipesContextProvider>
      </DoneRecipesContextProvider>
    </AuthContextProvider>
  );
}

export default AppContextProvider;

export { AuthContext } from "./AuthContext";
export { DoneRecipesContext } from "./DoneRecipesContext";
export { FavoritesRecipesContext } from "./FavoritesRecipesContext";
export { InProgressRecipesContext } from "./InProgressRecipesContext";
