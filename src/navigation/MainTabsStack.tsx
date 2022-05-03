import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useBarStyle from "hooks/useBarStyles";
import DrinksStack from "pages/Drinks";
import ExploreStack from "pages/Explore";
import FoodsStack from "pages/Foods";
import ProfileStack from "pages/Profile";
import { ComponentProps } from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";

export type MainTabsParamsList = {
  ExploreStack: undefined;
  DrinksStack: undefined;
  FoodsStack: undefined;
  ProfileStack: undefined;
};

const MainTabs = createBottomTabNavigator<MainTabsParamsList>();

function MainTabsStack() {
  useDeviceContext(tw);

  useBarStyle("auto");

  return (
    <MainTabs.Navigator
      initialRouteName="ExploreStack"
      backBehavior="history"
      // @ts-expect-error
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          let iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];

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
              iconName = "file-question";
              break;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarInactiveTintColor: tw`text-stone-400 dark:text-neutral-600`.color,
        tabBarLabelStyle: tw`font-dmsans`,
        tabBarAccessibilityLabel: "anchor",
        tabBarStyle: tw`elevation-0 shadow-none`,
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
