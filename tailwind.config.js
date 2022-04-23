// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        "font-overpass-light": {
          fontFamily: "Overpass-Light",
        },
        "font-overpass": {
          fontFamily: "Overpass-Regular",
        },
        "font-overpass-medium": {
          fontFamily: "Overpass-Medium",
        },
        "font-overpass-semibold": {
          fontFamily: "Overpass-Semibold",
        },
        "font-overpass-bold": {
          fontFamily: "Overpass-Bold",
        },
        "font-dmsans": {
          fontFamily: "DMSans-Regular",
        },
        "font-dmsans-medium": {
          fontFamily: "DMSans-Medium",
        },
        "font-dmsans-bold": {
          fontFamily: "DMSans-Bold",
        },
      });
    }),
  ],
};
