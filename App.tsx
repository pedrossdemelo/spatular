import { AppContextProvider } from "context";
import { DripsyProvider } from "dripsy";
import AppLoading from "expo-app-loading";
import { useAppSettings } from "hooks";
import { RootStackNavigator } from "navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// eslint-disable-next-line import/no-extraneous-dependencies
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "styles";

function App() {
  const [loading] = useAppSettings();

  if (loading) return <AppLoading />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DripsyProvider theme={theme}>
        <RootSiblingParent>
          <AppContextProvider>
            <SafeAreaProvider>
              <RootStackNavigator />
            </SafeAreaProvider>
          </AppContextProvider>
        </RootSiblingParent>
      </DripsyProvider>
    </GestureHandlerRootView>
  );
}

export default App;
