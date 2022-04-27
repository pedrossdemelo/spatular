import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import { getStackNavigatorTheme } from "navigation";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import FoodId from "./FoodId";
import FoodIdProgress from "./FoodIdProgress";
import Foods from "./Foods";

type FoodsStackParamsList = {
  Foods: undefined;
  FoodId: undefined;
  FoodIdProgress: undefined;
};

const Stack = createNativeStackNavigator<FoodsStackParamsList>();

function FoodsStack() {
  useDeviceContext(tw);

  const sx = useSx();

  return (
    <Stack.Navigator
      screenOptions={getStackNavigatorTheme(sx, tw)}
      initialRouteName="Foods"
    >
      <Stack.Screen name="Foods" component={Foods} />

      <Stack.Screen
        options={({ route }) => ({
          // @ts-expect-error
          title: route.params?.title ?? "Meal",
        })}
        name="FoodId"
        component={FoodId}
      />

      <Stack.Screen
        options={({ route }) => ({
          // @ts-expect-error
          title: `${route.params?.title ?? "Meal"} progress`,
        })}
        name="FoodIdProgress"
        component={FoodIdProgress}
      />
    </Stack.Navigator>
  );
}

export default FoodsStack;
