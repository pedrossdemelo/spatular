import { useNavigation } from "@react-navigation/native";
import { ImageDescriptionGradient, SButton } from "components/atoms";
import { ScrollView, View } from "dripsy";
import React from "react";
import { drinkApi } from "services";
import Api from "services/Api";
import tw from "styles";
import { parseRecipe } from "utils";

const drinkIngredients = require("../../../assets/drinkIngredients.jpeg");

export default function ExploreDrinks() {
  const { navigate } = useNavigation<any>();

  const goToExploreDrinksByIngredient = () => {
    navigate("ExploreDrinksByIngredient");
  };

  const goToRandomDrink = async () => {
    const { key, url } = drinkApi.getRandom();

    const {
      data: {
        [key]: [drink],
      },
    } = await Api.fetchJson(url);

    const { id, name } = parseRecipe(drink);

    navigate("DrinksStack", { screen: "DrinkId", params: { id, title: name } });
  };

  return (
    <>
      <ScrollView contentContainerSx={tw`grow`}>
        <View sx={tw`m-4`}>
          <ImageDescriptionGradient
            source={drinkIngredients}
            onPress={goToExploreDrinksByIngredient}
            title="Explore by ingredient"
            subtitle="Find recipes with the ingredients you want"
            sx={tw`w-full aspect-video max-w-140 self-center mb-4`}
          />
        </View>
      </ScrollView>

      <View style={tw.style("absolute bottom-4 right-4")}>
        <SButton
          endIcon="shuffle-variant"
          onPress={goToRandomDrink}
          outerSx={tw`rounded-full shadow-lg shadow-orange-600 shadow-opacity-30`}
          sx={tw`h-10 px-3`}
          textSx={tw`uppercase`}
        >
          Surprise me
        </SButton>
      </View>
    </>
  );
}
