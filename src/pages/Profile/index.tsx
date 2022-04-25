import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import tw from "styles";
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
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />

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
