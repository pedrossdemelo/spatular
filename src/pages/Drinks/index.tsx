import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drinks from "./Drinks";

type DrinksStackParamsList = {
  Drinks: undefined;
  DrinkId: undefined;
  DrinkIdProgress: undefined;
};

const Stack = createNativeStackNavigator<DrinksStackParamsList>();

function DrinksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drinks" component={Drinks} />
    </Stack.Navigator>
  );
}

export default DrinksStack;
