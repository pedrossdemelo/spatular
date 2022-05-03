import * as DMSans from "@expo-google-fonts/dm-sans";
import * as Lato from "@expo-google-fonts/lato";
import { useFonts } from "expo-font";
import * as Navigation from "expo-navigation-bar";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function useAppSettings() {
  const [isLoading, setLoading] = useState(true);

  const [loadedFonts] = useFonts({
    "lato-light": Lato.Lato_300Light,
    lato: Lato.Lato_400Regular,
    "lato-bold": Lato.Lato_700Bold,
    "lato-black": Lato.Lato_900Black,
    dmsans: DMSans.DMSans_400Regular,
    "dmsans-medium": DMSans.DMSans_500Medium,
    "dmsans-bold": DMSans.DMSans_700Bold,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (Platform.OS === "web") {
        const root = document.getElementById("root");
        root && (root.style.overflow = "hidden");
      }
      if (Platform.OS === "android") {
        await Navigation.setPositionAsync("absolute");
        await Navigation.setBackgroundColorAsync("#ffffff01");
      }
      setLoading(false);
    })();
  }, []);

  const loading = !loadedFonts || isLoading;

  return [loading];
}
