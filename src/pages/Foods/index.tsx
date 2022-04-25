import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import tw from "styles";
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
