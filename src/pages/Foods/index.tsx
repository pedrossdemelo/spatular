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
        headerTitleStyle: sx(tw`font-dmsans font-medium`),
        headerBackTitleStyle: sx(tw`font-dmsans`),
      }}
      initialRouteName="Foods"
    >
      <Stack.Screen name="Foods" component={Foods} />

      <Stack.Screen name="FoodId" component={FoodId} />

      <Stack.Screen name="FoodIdProgress" component={FoodIdProgress} />
    </Stack.Navigator>
  );
}

export default FoodsStack;
