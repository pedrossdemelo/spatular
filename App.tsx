import { AppContextProvider } from "context";
import { useAppSettings } from "hooks";
import { RootStackNavigator } from "navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  useAppSettings();

  return (
    <AppContextProvider>
      <SafeAreaProvider>
        <RootStackNavigator />
      </SafeAreaProvider>
    </AppContextProvider>
  );
}

export default App;
