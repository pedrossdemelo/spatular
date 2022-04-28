import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import { getStackNavigatorTheme } from "navigation/navigationThemes";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import DoneRecipes from "./DoneRecipes";
import FavoriteRecipes from "./FavoriteRecipes";
import Profile from "./Profile";

type ProfileStackParamsList = {
  Profile: undefined;
  DoneRecipes: undefined;
  FavoriteRecipes: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

function ProfileStack() {
  useDeviceContext(tw);

  const sx = useSx();

  return (
    <Stack.Navigator
      screenOptions={getStackNavigatorTheme(sx, tw)}
      initialRouteName="Profile"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />

      <Stack.Screen
        options={{ title: "Done recipes" }}
        name="DoneRecipes"
        component={DoneRecipes}
      />

      <Stack.Screen
        options={{ title: "Favorite recipes" }}
        name="FavoriteRecipes"
        component={FavoriteRecipes}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
