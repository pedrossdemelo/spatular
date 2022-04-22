import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Explore from "./Explore";

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
    <Stack.Navigator>
      <Stack.Screen name="Explore" component={Explore} />
    </Stack.Navigator>
  );
}

export default ExploreStack;
