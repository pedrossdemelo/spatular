import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SButton } from "components/atoms";
import { styled, Text, TextInput, View } from "dripsy";
import { useAuth } from "hooks";
import { ComponentProps, useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import tw from "styles";

function Login() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/;

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!emailRegex.test(email) || password.length < 6);
  }, [password, email]);

  const handleLogin = () => {
    login(email);
    navigation.navigate("MainTabsStack");
  };

  const insets = useSafeAreaInsets();

  return (
    <StyledSafeAreaView>
      <LoginContainer>
        <MaterialCommunityIcons
          name="silverware-clean"
          size={128}
          color={lightTextColor as string}
        />

        <Title>Spatular</Title>

        <Subtitle>The modern cookbook</Subtitle>

        <IconInput
          icon="alternate-email"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <IconInput
          icon="lock-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </LoginContainer>

      <ButtonContainer insets={insets}>
        <SButton
          textSx={tw`uppercase text-slate-200`}
          variant="outlined"
          onPress={handleLogin}
          disabled={disabled}
          pressColor={tw`text-slate-200/10`.color as string}
          outerSx={tw`border-white`}
        >
          Login
        </SButton>

        <Divider>OR</Divider>

        <SButton
          disabled={disabled}
          textSx={tw`uppercase`}
          onPress={handleLogin}
        >
          Sign up
        </SButton>
      </ButtonContainer>
    </StyledSafeAreaView>
  );
}

const placeholderTextColor = tw`text-slate-400`.color;

const lightTextColor = tw`text-slate-200`.color;

const StyledSafeAreaView = styled(SafeAreaView)(
  tw`bg-slate-900 grow justify-center items-center`,
);

const LoginContainer = styled(KeyboardAvoidingView)(
  tw`max-w-md w-full p-6 bottom-[64px] items-center`,
);

const Title = styled(Text)(
  tw`text-slate-200 font-bold mt-4 text-4xl font-dmsans text-center`,
);

const Subtitle = styled(Text)(
  tw`text-slate-200 -mt-0.5 mb-8 font-dmsans text-lg text-center`,
);

const Input = styled(TextInput)(
  tw`p-2 ml-3 border-b text-slate-200 border-slate-400 grow android:py-1`,
);

const ButtonContainer = styled(View)(
  (p: { insets: EdgeInsets }) =>
    tw`w-full max-w-md p-4 absolute bottom-[${p.insets.bottom}px]`,
);

function Divider({ children }: { children?: string }) {
  return (
    <View sx={tw`flex-row justify-center items-center my-2`}>
      <View sx={tw`h-0.5 rounded mr-4 bg-slate-700 grow`} />

      <Text sx={tw`text-slate-200 font-dmsans text-xs`}>{children}</Text>

      <View sx={tw`h-0.5 rounded ml-4 bg-slate-700 grow`} />
    </View>
  );
}

function IconInput({
  icon,
  value,
  onChangeText,
  placeholder,
  ...rest
}: {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
} & ComponentProps<typeof Input>) {
  return (
    <View sx={tw`flex-row w-full mb-4 items-center justify-center`}>
      <MaterialIcons name={icon} size={24} color={lightTextColor as string} />

      <Input
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor as string}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}

export default Login;
