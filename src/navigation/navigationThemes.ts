import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSx } from "dripsy";
import { ComponentProps } from "react";
import tw from "styles";
import { TailwindFn } from "twrnc";

type NavigatorScreenOptions = ComponentProps<
  ReturnType<typeof createNativeStackNavigator>["Navigator"]
>["screenOptions"];

export const LightTheme = {
  dark: false,
  colors: {
    primary: tw.color("orange-600")!,
    background: tw.color("slate-100")!,
    card: tw.color("slate-50")!,
    text: tw.color("slate-800")!,
    border: "transparent"!,
    notification: tw.color("orange-700")!,
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: tw.color("orange-600")!,
    background: "#101010",
    card: tw.color("neutral-900"),
    text: tw.color("neutral-200")!,
    border: "transparent"!,
    notification: tw.color("orange-700")!,
  },
};

export function getStackNavigatorTheme(
  sx: ReturnType<typeof useSx>,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  tw: TailwindFn,
) {
  const theme: NavigatorScreenOptions = {
    animation: "slide_from_right",
    headerTitleAlign: "center",
    headerTitleStyle: sx(
      tw`font-dmsans font-medium text-slate-900 dark:text-neutral-200`,
    ),
    headerBackTitleStyle: sx(tw`font-dmsans`),
    headerTintColor: tw.color("orange-600")!,
    headerShadowVisible: false,
  } as const;

  return theme;
}
