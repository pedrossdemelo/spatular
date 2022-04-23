import * as DMSans from "@expo-google-fonts/dm-sans";
import * as Overpass from "@expo-google-fonts/overpass";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function useAppSettings() {
  const [loadedFonts] = useFonts({
    "Overpass-Light": Overpass.Overpass_300Light,
    "Overpass-Regular": Overpass.Overpass_400Regular,
    "Overpass-Medium": Overpass.Overpass_500Medium,
    "Overpass-Semibold": Overpass.Overpass_600SemiBold,
    "Overpass-Bold": Overpass.Overpass_700Bold,
    "DMSans-Regular": DMSans.DMSans_400Regular,
    "DMSans-Medium": DMSans.DMSans_500Medium,
    "DMSans-Bold": DMSans.DMSans_700Bold,
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
