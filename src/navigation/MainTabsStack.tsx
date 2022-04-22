import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrinksStack from "pages/Drinks";
import ExploreStack from "pages/Explore";
import FoodsStack from "pages/Foods";
import ProfileStack from "pages/Profile";

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

      <MainTabs.Screen name="DrinksStack" component={DrinksStack} />

      <MainTabs.Screen name="FoodsStack" component={FoodsStack} />

      <MainTabs.Screen name="ProfileStack" component={ProfileStack} />
    </MainTabs.Navigator>
  );
}

export default MainTabsStack;
