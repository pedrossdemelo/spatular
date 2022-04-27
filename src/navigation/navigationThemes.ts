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
    primary: tw.color("orange-600") as string,
    background: tw.color("slate-100") as string,
    card: tw.color("slate-50") as string,
    text: tw.color("slate-800") as string,
    border: "transparent" as string,
    notification: tw.color("orange-700") as string,
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: tw.color("orange-600") as string,
    background: tw.color("black") as string,
    card: "#0c0c0c",
    text: tw.color("neutral-200") as string,
    border: "transparent" as string,
    notification: tw.color("orange-700") as string,
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
    headerTintColor: tw.color("orange-600") as string,
    headerShadowVisible: false,
  } as const;

  return theme;
}
