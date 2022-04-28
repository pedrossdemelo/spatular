import { useNavigation } from "@react-navigation/native";
import { SButton } from "components/atoms";
import { ScrollView, Text } from "dripsy";
import { useAuth, useRecipeList } from "hooks";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "styles";

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

  const { top } = useSafeAreaInsets();

  return (
    <ScrollView contentContainerSx={tw`pt-[${top}px]`}>
      <Text>{email}</Text>

      <SButton textSx={tw`uppercase`} variant="text" onPress={goToDoneRecipes}>
        Done Recipes
      </SButton>

      <SButton
        textSx={tw`uppercase`}
        variant="text"
        onPress={goToFavoriteRecipes}
      >
        Favorite Recipes
      </SButton>

      <SButton textSx={tw`uppercase`} variant="text" onPress={goLogout}>
        Logout
      </SButton>
    </ScrollView>
  );
}

export default Profile;
