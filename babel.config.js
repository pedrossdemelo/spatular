module.exports = (api) => {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-reanimated/plugin"],
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.jsx",
            ".android.ts",
            ".android.tsx",
            ".ios.js",
            ".ios.jsx",
            ".ios.ts",
            ".ios.tsx",
            ".web.js",
            ".web.jsx",
            ".web.ts",
            ".web.tsx",
          ],
        },
      ],
    ],
  };
};
