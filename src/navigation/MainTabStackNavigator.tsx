import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

export type MainTabStackParamsList = {
  ExploreStack: undefined;
  DrinksStack: undefined;
  FoodsStack: undefined;
  ProfileStack: undefined;
};

const MainTabStack = createBottomTabNavigator<MainTabStackParamsList>();

function MainTabStackNavigator() {
  return (
    <MainTabStack.Navigator
      initialRouteName="ExploreStack"
      backBehavior="history"
      screenOptions={{ headerShown: false, lazy: false }}
    >
      <MainTabStack.Screen name="ExploreStack" component={Placeholder} />

      <MainTabStack.Screen name="DrinksStack" component={Placeholder} />

      <MainTabStack.Screen name="FoodsStack" component={Placeholder} />

      <MainTabStack.Screen name="ProfileStack" component={Placeholder} />
    </MainTabStack.Navigator>
  );
}

function Placeholder() {
  return <Text>Placeholder</Text>;
}

export default MainTabStackNavigator;
