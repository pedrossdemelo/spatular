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
        headerTitleStyle: sx(tw`font-dmsans font-medium`),
        headerBackTitleStyle: sx(tw`font-dmsans`),
      }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen name="DoneRecipes" component={DoneRecipes} />

      <Stack.Screen name="FavoriteRecipes" component={FavoriteRecipes} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
