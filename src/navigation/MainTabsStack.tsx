import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreStack from "pages/Explore";
import { Text } from "react-native";

export type MainTabsParamsList = {
  ExploreStack: undefined;
  DrinksStack: undefined;
  FoodsStack: undefined;
  ProfileStack: undefined;
};

const MainTabs = createBottomTabNavigator<MainTabsParamsList>();

function MainTabsStack() {
  return (
    <MainTabs.Navigator
      initialRouteName="ExploreStack"
      backBehavior="history"
      screenOptions={{ headerShown: false, lazy: false }}
    >
      <MainTabs.Screen name="ExploreStack" component={ExploreStack} />

      <MainTabs.Screen name="DrinksStack" component={Placeholder} />

      <MainTabs.Screen name="FoodsStack" component={Placeholder} />

      <MainTabs.Screen name="ProfileStack" component={Placeholder} />
    </MainTabs.Navigator>
  );
}

function Placeholder() {
  return <Text>Placeholder xdd</Text>;
}

export default MainTabsStack;
