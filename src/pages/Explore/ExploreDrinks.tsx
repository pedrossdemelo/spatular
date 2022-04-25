import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View } from "react-native";
import { drinkApi } from "services";
import Api from "services/Api";
import { parseRecipe } from "utils";

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
    <View>
      <Button title="By Ingredient" onPress={goToExploreDrinksByIngredient} />

      <Button title="Surprise Me!" onPress={goToRandomDrink} />
    </View>
  );
}
