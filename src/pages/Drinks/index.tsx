import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import { getStackNavigatorTheme } from "navigation/navigationThemes";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import DrinkId from "./DrinkId";
import DrinkIdProgress from "./DrinkIdProgress";
import Drinks from "./Drinks";

type DrinksStackParamsList = {
  Drinks: undefined;
  DrinkId: undefined;
  DrinkIdProgress: undefined;
};

const Stack = createNativeStackNavigator<DrinksStackParamsList>();

function DrinksStack() {
  useDeviceContext(tw);

  const sx = useSx();

  return (
    <Stack.Navigator
      screenOptions={getStackNavigatorTheme(sx, tw)}
      initialRouteName="Drinks"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Drinks"
        component={Drinks}
      />

      <Stack.Screen
        options={({ route }) => ({
          // @ts-expect-error
          title: route.params?.title ?? "Drink",
        })}
        name="DrinkId"
        component={DrinkId}
      />

      <Stack.Screen
        options={({ route }) => ({
          // @ts-expect-error
          title: `${route.params?.title ?? "Drink"} progress`,
        })}
        name="DrinkIdProgress"
        component={DrinkIdProgress}
      />
    </Stack.Navigator>
  );
}

export default DrinksStack;
