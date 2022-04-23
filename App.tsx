import { AppContextProvider } from "context";
import AppLoading from "expo-app-loading";
import { useAppSettings } from "hooks";
import { RootStackNavigator } from "navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  const [loading] = useAppSettings();

  if (loading) return <AppLoading />;

  return (
    <AppContextProvider>
      <SafeAreaProvider>
        <RootStackNavigator />
      </SafeAreaProvider>
    </AppContextProvider>
  );
}

export default App;
