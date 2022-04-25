/* eslint-disable */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrinksStack from "pages/Drinks";
import ExploreStack from "pages/Explore";
import FoodsStack from "pages/Foods";
import ProfileStack from "pages/Profile";
import tw from "styles";

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
      // @ts-ignore
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "ExploreStack":
              iconName = "compass-outline";
              break;
            case "DrinksStack":
              iconName = "glass-cocktail";
              break;
            case "FoodsStack":
              iconName = "food-steak";
              break;
            case "ProfileStack":
              iconName = "account";
              break;
            default:
              iconName = "unknown";
              break;
          }

          return (
            <MaterialCommunityIcons
              name={iconName as any}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: tw`text-orange-600`.color,
        tabBarInactiveTintColor: tw`text-slate-400`.color,
        tabBarLabelStyle: tw`font-dmsans`,
        tabBarAccessibilityLabel: "anchor",
      })}
    >
      <MainTabs.Screen
        options={{ tabBarLabel: "Explore" }}
        name="ExploreStack"
        component={ExploreStack}
      />

      <MainTabs.Screen
        options={{ tabBarLabel: "Drinks" }}
        name="DrinksStack"
        component={DrinksStack}
      />

      <MainTabs.Screen
        options={{ tabBarLabel: "Meals" }}
        name="FoodsStack"
        component={FoodsStack}
      />

      <MainTabs.Screen
        options={{ tabBarLabel: "Profile" }}
        name="ProfileStack"
        component={ProfileStack}
      />
    </MainTabs.Navigator>
  );
}

export default MainTabsStack;
