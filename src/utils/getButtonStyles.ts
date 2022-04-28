/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { TailwindFn } from "twrnc";

type Colors = "primary" | "secondary" | "tertiary";

type Variants = "outlined" | "contained" | "text";

export default function getButtonStyles(
  color: Colors,
  variant: Variants,
  tw: TailwindFn,
) {
  switch (variant) {
    case "outlined":
      switch (color) {
        case "primary":
          return {
            text: tw`text-orange-600`,
            outer: tw`border border-orange-600`,
            press: tw`text-orange-600/10`.color as string,
          };
        case "secondary":
          return {
            text: tw`text-stone-800 dark:text-stone-100`,
            outer: tw`border border-stone-800 dark:border-stone-100`,
            press: tw`text-stone-800/20 dark:text-stone-100/20`.color as string,
          };
      }
    case "contained":
      switch (color) {
        case "primary":
          return {
            text: tw`text-stone-100`,
            inner: tw`bg-orange-600`,
            press: tw`text-stone-100/20`.color as string,
          };
        case "secondary":
          return {
            text: tw`text-stone-100 dark:text-stone-800`,
            inner: tw`bg-stone-800 dark:bg-stone-100`,
            press: tw`text-stone-100/20 dark:text-stone-800/20`.color as string,
          };
      }
    case "text":
      switch (color) {
        case "primary":
          return {
            text: tw`text-orange-600`,
            press: tw`text-orange-600/10`.color as string,
          };
        case "secondary":
          return {
            text: tw`text-stone-800 dark:text-stone-100`,
            press: tw`text-stone-800/20 dark:text-stone-100/20`.color as string,
          };
      }
    default:
      return {} as never;
  }
}
