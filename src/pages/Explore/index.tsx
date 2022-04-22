import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Explore from "./Explore";
import ExploreDrinks from "./ExploreDrinks";
import ExploreDrinksByIngredient from "./ExploreDrinksByIngredient";
import ExploreFoods from "./ExploreFoods";
import ExploreFoodsByIngredient from "./ExploreFoodsByIngredient";
import ExploreFoodsByNationality from "./ExploreFoodsByNationality";

type ExploreStackParamsList = {
  Explore: undefined;
  ExploreDrinks: undefined;
  ExploreFoods: undefined;
  ExploreDrinksByIngredient: undefined;
  ExploreFoodsByIngredient: undefined;
  ExploreFoodsByNationality: undefined;
};

const Stack = createNativeStackNavigator<ExploreStackParamsList>();

function ExploreStack() {
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen name="Explore" component={Explore} />

      <Stack.Screen name="ExploreDrinks" component={ExploreDrinks} />

      <Stack.Screen name="ExploreFoods" component={ExploreFoods} />

      <Stack.Screen
        name="ExploreDrinksByIngredient"
        component={ExploreDrinksByIngredient}
      />

      <Stack.Screen
        name="ExploreFoodsByIngredient"
        component={ExploreFoodsByIngredient}
      />

      <Stack.Screen
        name="ExploreFoodsByNationality"
        component={ExploreFoodsByNationality}
      />
    </Stack.Navigator>
  );
}

export default ExploreStack;
