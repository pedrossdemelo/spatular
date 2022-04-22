import { useNavigation } from "@react-navigation/native";
import { useAuth } from "hooks";
import React from "react";
import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";

function Login() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const { login } = useAuth();

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const disabled = !emailRegex.test(email) || password.length < 6;

  const handleLogin = () => {
    login(email);
    navigation.navigate("MainTabsStack");
  };

  return (
    <SafeAreaView>
      <TextInput
        style={tailwind`m-2 p-2 bg-slate-50 rounded-lg`}
        value={email}
        placeholder="Email"
        testID="Email"
        onChangeText={setEmail}
      />

      <TextInput
        style={tailwind`m-2 p-2 bg-slate-50 rounded-lg`}
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
      />

      <Button disabled={disabled} onPress={handleLogin} title="Login" />

      <Button disabled={disabled} onPress={handleLogin} title="Sign Up" />
    </SafeAreaView>
  );
}

export default Login;
