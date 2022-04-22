import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "pages/Login";
import linking from "./linking";
import MainTabStackNavigator from "./MainTabsStack";

export type RootStackParamsList = {
  MainTabsStack: undefined;
  Login: undefined;
};

const Root = createNativeStackNavigator<RootStackParamsList>();

function RootStack() {
  return (
    // @ts-expect-error
    <NavigationContainer linking={linking}>
      <Root.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Root.Screen name="Login" component={Login} />

        <Root.Screen name="MainTabsStack" component={MainTabStackNavigator} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
