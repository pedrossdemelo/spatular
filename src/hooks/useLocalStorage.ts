import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    (async () => {
      const storedValue = await AsyncStorage.getItem(key);

      if (!storedValue) return;

      const parsedValue = JSON.parse(storedValue);
      setValue(parsedValue);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    })();
  }, [key, value]);

  return [value, setValue] as const;
}
