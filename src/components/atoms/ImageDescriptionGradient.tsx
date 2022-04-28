import { Text, View } from "dripsy";
import { StyleProp, ViewStyle } from "react-native";
import tw from "styles";
import ImageTouchableGradient from "./ImageTouchableGradient";

interface ImageDescriptionGradientProps {
  onPress: () => void;
  source: string;
  sx: StyleProp<ViewStyle>;
  title: string;
  subtitle?: string;
}

export default function ImageDescriptionGradient(
  props: ImageDescriptionGradientProps,
) {
  const { onPress, source, sx, title, subtitle } = props;

  return (
    <ImageTouchableGradient onPress={onPress} sx={sx} source={source}>
      <View sx={tw`absolute bottom-4 right-5`}>
        <Text sx={tw`text-2xl font-dmsans font-medium text-white text-right`}>
          {title}
        </Text>

        {!!subtitle && (
          <Text sx={tw`font-lato text-sm text-white text-right`}>
            {subtitle}
          </Text>
        )}
      </View>
    </ImageTouchableGradient>
  );
}
