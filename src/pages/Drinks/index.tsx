import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import tw from "styles";
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
  const sx = useSx();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerTitleAlign: "center",
        headerTitleStyle: sx(tw`font-dmsans font-medium`),
        headerBackTitleStyle: sx(tw`font-dmsans`),
      }}
      initialRouteName="Drinks"
    >
      <Stack.Screen name="Drinks" component={Drinks} />

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
