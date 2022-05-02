/* eslint-disable jsx-a11y/media-has-caption */
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SButton } from "components/atoms";
import { styled, Text, TextInput, View } from "dripsy";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "hooks";
import { ComponentProps, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import tw from "styles";
import { useDeviceContext } from "twrnc";

const cookingLoop = require("../../../assets/cookingloop.mp4");

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

  useDeviceContext(tw);

  return (
    <View style={tw`grow`}>
      <View
        sx={tw`absolute top-0 right-0 left-0 bottom-0 justify-center items-center`}
      >
        <LinearGradient
          colors={["transparent", "transparent", tw.color("black")!]}
          style={tw`absolute top-0 left-0 right-0 bottom-0 grow z-2`}
        />

        {Platform.OS === "web" ? (
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              minWidth: "100%",
              minHeight: "100%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <source type="video/mp4" src={cookingLoop} />
          </video>
        ) : (
          <Video
            source={cookingLoop}
            style={tw`absolute top-0 bottom-0 right-0 left-0 min-h-screen flex-1 overflow-visible grow`}
            rate={1}
            shouldPlay
            isLooping
            volume={1}
            resizeMode="cover"
          />
        )}
      </View>

      <StyledSafeAreaView>
        <LoginContainer>
          <MaterialCommunityIcons
            name="silverware-clean"
            size={128}
            color="white"
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
            textSx={tw`uppercase text-white`}
            variant="outlined"
            onPress={handleLogin}
            disabled={disabled}
            pressColor={tw`text-white/10`.color as string}
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
    </View>
  );
}

const placeholderTextColor = tw`text-white`.color;

const lightTextColor = tw`text-white`.color;

const StyledSafeAreaView = styled(SafeAreaView)(
  tw`grow justify-center items-center z-10`,
);

const LoginContainer = styled(KeyboardAvoidingView)(
  tw`max-w-md w-full p-6 bottom-[64px] items-center`,
);

const Title = styled(Text)(
  tw`text-white font-bold mt-4 text-4xl font-dmsans text-center`,
);

const Subtitle = styled(Text)(
  tw`text-white -mt-0.5 mb-8 font-dmsans text-lg text-center`,
);

const Input = styled(TextInput)(
  tw`p-2 ml-3 border-b text-white border-white grow android:py-1`,
);

const ButtonContainer = styled(View)(
  (p: { insets: EdgeInsets }) =>
    tw`w-full max-w-md p-4 absolute bottom-[${p.insets.bottom}px]`,
);

function Divider({ children }: { children?: string }) {
  return (
    <View sx={tw`flex-row justify-center items-center my-2`}>
      <View sx={tw`h-0.5 rounded mr-4 bg-white/20 grow`} />

      <Text sx={tw`text-white font-dmsans text-xs`}>{children}</Text>

      <View sx={tw`h-0.5 rounded ml-4 bg-white/20 grow`} />
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
