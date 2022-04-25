import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import React from "react";
import tw from "styles";
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
  const sx = useSx();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerTitleAlign: "center",
        headerTitleStyle: sx(tw`font-dmsans font-medium text-slate-900`),
        headerBackTitleStyle: sx(tw`font-dmsans`),
        headerTintColor: sx(tw`text-orange-600`).color,
      }}
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
