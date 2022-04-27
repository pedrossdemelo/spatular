import { useSx } from "dripsy";
import tw from "styles";
import { TailwindFn } from "twrnc";

export const LightTheme = {
  dark: false,
  colors: {
    primary: tw.color("orange-600") as string,
    background: tw.color("slate-100") as string,
    card: tw.color("slate-50") as string,
    text: tw.color("slate-800") as string,
    border: tw.color("slate-200") as string,
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
    border: tw.color("neutral-800") as string,
    notification: tw.color("orange-700") as string,
  },
};

export function getStackNavigatorTheme(
  sx: ReturnType<typeof useSx>,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  tw: TailwindFn,
) {
  return {
    animation: "slide_from_right",
    headerTitleAlign: "center",
    headerTitleStyle: sx(
      tw`font-dmsans font-medium text-slate-900 dark:text-neutral-200`,
    ),
    headerBackTitleStyle: sx(tw`font-dmsans`),
    headerTintColor: tw.color("orange-600") as string,
  } as const;
}
