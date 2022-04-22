import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";

type ProfileStackParamsList = {
  Profile: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
