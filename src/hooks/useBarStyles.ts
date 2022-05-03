import { useFocusEffect } from "@react-navigation/native";
import * as Navigation from "expo-navigation-bar";
import { useCallback } from "react";
import { Platform, useColorScheme } from "react-native";

export default function useBarStyle(mode: "dark" | "light" | "auto") {
  const scheme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== "android") return;

      if (mode === "auto") {
        Navigation.setButtonStyleAsync(scheme === "dark" ? "light" : "dark");
      }

      if (mode !== "auto") {
        Navigation.setButtonStyleAsync(mode === "dark" ? "dark" : "light");
      }
    }, [scheme]),
  );
}
