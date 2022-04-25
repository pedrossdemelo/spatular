import { AppContextProvider } from "context";
import { DripsyProvider } from "dripsy";
import AppLoading from "expo-app-loading";
import { useAppSettings } from "hooks";
import { RootStackNavigator } from "navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "styles";

function App() {
  const [loading] = useAppSettings();

  if (loading) return <AppLoading />;

  return (
    <DripsyProvider theme={theme}>
      <AppContextProvider>
        <SafeAreaProvider>
          <RootStackNavigator />
        </SafeAreaProvider>
      </AppContextProvider>
    </DripsyProvider>
  );
}

export default App;
