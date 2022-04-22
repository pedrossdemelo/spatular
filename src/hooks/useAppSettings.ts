import { useEffect } from "react";
import { Platform } from "react-native";

export default function useAppSettings() {
  useEffect(() => {
    if (
      Platform.OS === "web" &&
      document &&
      "getElementsByTagName" in document
    ) {
      document.getElementsByName("body")[0].style.overflow = "hidden";
    }
  }, []);
}
