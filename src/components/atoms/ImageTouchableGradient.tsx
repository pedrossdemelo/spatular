import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import ImageTouchableFeedback from "./ImageTouchableFeedback";

interface ImageTouchableGradientProps {
  children?: React.ReactNode;
  source: string;
  sx: StyleProp<ViewStyle>;
  colors?: string[];
  onPress: () => void;
  testID?: string;
}

function ImageTouchableGradient(props: ImageTouchableGradientProps) {
  const {
    children,
    sx,
    source,
    colors = [tw.color("transparent")!, tw.color("black/50")!],
    onPress,
    testID,
  } = props;

  useDeviceContext(tw);

  return (
    <ImageTouchableFeedback
      testID={testID}
      onPress={onPress}
      source={source}
      outerSx={sx}
    >
      <LinearGradient colors={colors} style={tw`h-full w-full`}>
        {children}
      </LinearGradient>
    </ImageTouchableFeedback>
  );
}

export default ImageTouchableGradient;
