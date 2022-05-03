import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Login from "pages/Login";
import { useColorScheme } from "react-native";
import linking from "./linking";
import MainTabsStack from "./MainTabsStack";
import { DarkTheme, LightTheme } from "./navigationThemes";

export type RootStackParamsList = {
  MainTabsStack: undefined;
  Login: undefined;
};

const Root = createNativeStackNavigator<RootStackParamsList>();

function RootStack() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer
        theme={isDark ? DarkTheme : LightTheme}
        // @ts-expect-error
        linking={linking}
      >
        <Root.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Root.Screen name="Login" component={Login} />

          <Root.Screen name="MainTabsStack" component={MainTabsStack} />
        </Root.Navigator>
      </NavigationContainer>
    </>
  );
}

export default RootStack;
