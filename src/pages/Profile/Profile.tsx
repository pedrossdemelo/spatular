import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { useAuth, useRecipeList } from "../../hooks";

function Profile() {
  const { user, logout } = useAuth();
  const { email = "Guest" } = user ?? {};

  const navigation = useNavigation<any>();

  const [, , , setDoneRecipes] = useRecipeList("doneRecipes");
  const [, , , setFavorites] = useRecipeList("favoriteRecipes");
  const [, , , setInProgressRecipes] = useRecipeList("inProgressRecipes");

  const goLogout = () => {
    setDoneRecipes([]);
    setFavorites([]);
    setInProgressRecipes({ meals: {}, cocktails: {} });
    logout();
    navigation.popToTop();
    navigation.replace("Login");
  };

  const goToDoneRecipes = () => navigation.navigate("DoneRecipes");

  const goToFavoriteRecipes = () => navigation.navigate("FavoriteRecipes");

  return (
    <ScrollView>
      <Text>{email}</Text>

      <Button title="Done Recipes" onPress={goToDoneRecipes} />

      <Button title="Favorite Recipes" onPress={goToFavoriteRecipes} />

      <Button title="Logout" onPress={goLogout} />
    </ScrollView>
  );
}

export default Profile;
