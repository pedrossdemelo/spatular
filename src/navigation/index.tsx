import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import linking from "./linking";

type RootStackNavigatorParamsList = {
  MainTabsStack: undefined;
  Login: undefined;
};

const RootStack = createNativeStackNavigator<RootStackNavigatorParamsList>();

function RootStackNavigator() {
  return (
    // @ts-expect-error
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <RootStack.Screen name="Login" component={Placeholder} />

        <RootStack.Screen name="MainTabsStack" component={Placeholder} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function Placeholder() {
  return <Text>Placeholder</Text>;
}

export default RootStackNavigator;
