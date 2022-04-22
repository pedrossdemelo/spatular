import React from "react";
import AuthContextProvider from "./AuthContextProvider";
import DoneRecipesContextProvider from "./DoneRecipesContextProvider";
import FavoritesRecipesContextProvider from "./FavoritesRecipesContextProvider";
import InProgressRecipesContextProvider from "./InProgressRecipesContextProvider";

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
