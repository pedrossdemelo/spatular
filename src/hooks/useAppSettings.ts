import { useEffect } from "react";
import { Platform } from "react-native";

export default function useAppSettings() {
  useEffect(() => {
    if (Platform.OS === "web" && document) {
      const root = document.getElementById("root");
      root && (root.style.overflow = "hidden");
    }
  }, []);
}
