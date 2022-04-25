import * as DMSans from "@expo-google-fonts/dm-sans";
import * as Lato from "@expo-google-fonts/lato";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function useAppSettings() {
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
    if (Platform.OS === "web" && document) {
      const root = document.getElementById("root");
      root && (root.style.overflow = "hidden");
    }
  }, []);

  const loading = !loadedFonts;

  return [loading];
}
