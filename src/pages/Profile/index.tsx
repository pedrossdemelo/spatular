import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoneRecipes from "./DoneRecipes";
import Profile from "./Profile";

type ProfileStackParamsList = {
  Profile: undefined;
  DoneRecipes: undefined;
  FavoriteRecipes: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen name="DoneRecipes" component={DoneRecipes} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
