/* eslint-disable jsx-a11y/media-has-caption */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SButton } from "components/atoms";
import { styled, Text, View } from "dripsy";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth, useBarStyles } from "hooks";
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
  useBarStyles("light");

  const { login } = useAuth();

  const handleLogin = () => {
    login("Guest user");
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
        </LoginContainer>

        <ButtonContainer insets={insets}>
          <SButton
            textSx={tw`uppercase text-white`}
            variant="outlined"
            onPress={handleLogin}
            pressColor={tw`text-white/10`.color as string}
            outerSx={tw`border-white`}
          >
            Continue
          </SButton>
        </ButtonContainer>
      </StyledSafeAreaView>
    </View>
  );
}

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

const ButtonContainer = styled(View)(
  (p: { insets: EdgeInsets }) =>
    tw`w-full max-w-md p-4 absolute bottom-[${p.insets.bottom}px]`,
);

export default Login;
