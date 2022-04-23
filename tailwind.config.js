// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({});
    }),
  ],
};
