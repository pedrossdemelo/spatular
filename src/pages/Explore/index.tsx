import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import { getStackNavigatorTheme } from "navigation";
import React from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";
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
  useDeviceContext(tw);

  const sx = useSx();

  return (
    <Stack.Navigator
      screenOptions={getStackNavigatorTheme(sx, tw)}
      initialRouteName="Explore"
    >
      <Stack.Screen name="Explore" component={Explore} />

      <Stack.Screen
        options={{ title: "Drinks" }}
        name="ExploreDrinks"
        component={ExploreDrinks}
      />

      <Stack.Screen
        options={{ title: "Foods" }}
        name="ExploreFoods"
        component={ExploreFoods}
      />

      <Stack.Screen
        options={{ title: "Drinks by ingredient" }}
        name="ExploreDrinksByIngredient"
        component={ExploreDrinksByIngredient}
      />

      <Stack.Screen
        options={{ title: "Foods by ingredient" }}
        name="ExploreFoodsByIngredient"
        component={ExploreFoodsByIngredient}
      />

      <Stack.Screen
        options={{ title: "Foods by nationality" }}
        name="ExploreFoodsByNationality"
        component={ExploreFoodsByNationality}
      />
    </Stack.Navigator>
  );
}

export default ExploreStack;
