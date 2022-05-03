import { useNavigation } from "@react-navigation/native";
import { Heading, SButton } from "components/atoms";
import { ScrollView, View } from "dripsy";
import { useAuth, useRecipeList } from "hooks";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "styles";
import { useDeviceContext } from "twrnc";

function Profile() {
  useDeviceContext(tw);

  const { user, logout } = useAuth();
  const { email } = user ?? {};

  const navigation = useNavigation<any>();

  const [, , , setDoneRecipes] = useRecipeList("doneRecipes");
  const [, , , setFavorites] = useRecipeList("favoriteRecipes");
  const [, , , setInProgressRecipes] = useRecipeList("inProgressRecipes");

  const goLogout = () => {
    setDoneRecipes([]);
    setFavorites([]);
    setInProgressRecipes({ meals: {}, cocktails: {} });
    logout();
  };

  const goToDoneRecipes = () => navigation.navigate("DoneRecipes");

  const goToFavoriteRecipes = () => navigation.navigate("FavoriteRecipes");

  const { top } = useSafeAreaInsets();

  return (
    <ScrollView contentContainerSx={tw`grow pt-[${top}px]`}>
      <Heading
        title="Profile"
        subtitle={email && email?.length > 7 ? email : "Guest"}
      />

      <View sx={tw`m-4 grow`}>
        <SButton
          textSx={tw`uppercase text-stone-600 dark:text-neutral-400`}
          onPress={goToDoneRecipes}
          endIcon="arrow-right"
          sx={tw`justify-between bg-white dark:bg-neutral-900`}
          outerSx={tw`mb-4`}
          pressColor={
            tw`text-stone-800/20 dark:text-neutral-100/20`.color as string
          }
        >
          Done Recipes
        </SButton>

        <SButton
          textSx={tw`uppercase text-stone-600 dark:text-neutral-400`}
          onPress={goToFavoriteRecipes}
          endIcon="arrow-right"
          sx={tw`justify-between bg-white dark:bg-neutral-900`}
          pressColor={
            tw`text-stone-800/20 dark:text-neutral-100/20`.color as string
          }
        >
          Favorite Recipes
        </SButton>

        <View sx={tw`grow`} />

        <SButton
          textSx={tw`uppercase text-red-700 dark:text-red-400`}
          sx={tw`bg-white justify-between dark:bg-neutral-900`}
          onPress={goLogout}
          pressColor={tw.color("red-600/30")}
          endIcon="arrow-right"
        >
          Logout
        </SButton>
      </View>
    </ScrollView>
  );
}

export default Profile;
