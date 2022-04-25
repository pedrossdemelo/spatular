import { makeTheme } from "dripsy";

const theme = makeTheme({
  customFonts: {
    dmsans: {
      default: "dmsans",
      400: "dmsans",
      500: "dmsans-medium",
      700: "dmsans-bold",
    },
    lato: {
      default: "lato",
      300: "lato-light",
      400: "lato",
      700: "lato-bold",
    },
  },
  fonts: {
    root: "lato",
  },
  fontWeights: {
    thin: "100",
    extralight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  space: {},
  types: {
    onlyAllowThemeValues: "always",
  },
});

type MyTheme = typeof theme;

declare module "dripsy" {
  interface DripsyCustomTheme extends MyTheme {}
}

export default theme;
