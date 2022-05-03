import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "hooks";
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

  const { user } = useAuth();

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
          {!user && <Root.Screen name="Login" component={Login} />}

          {user && (
            <Root.Screen name="MainTabsStack" component={MainTabsStack} />
          )}
        </Root.Navigator>
      </NavigationContainer>
    </>
  );
}

export default RootStack;
