import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  return (
    <Stack.Navigator>
      <Stack.Screen name="Foods" component={Foods} />

      <Stack.Screen name="FoodId" component={FoodId} />

      <Stack.Screen name="FoodIdProgress" component={FoodIdProgress} />
    </Stack.Navigator>
  );
}

export default FoodsStack;
