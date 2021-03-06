import { View } from "dripsy";
import React, { ReactNode } from "react";
import {
  ColorValue,
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import tw from "styles";
import { useDeviceContext } from "twrnc";

interface ImageTouchableFeedbackProps {
  source: ImageSourcePropType | string;
  children?: ReactNode;
  sx?: StyleProp<ViewStyle>;
  outerSx?: StyleProp<ViewStyle>;
  pressColor?: ColorValue;
  onPress: () => void;
  alt: string;
}

export default function ImageTouchableFeedback(
  props: ImageTouchableFeedbackProps,
) {
  useDeviceContext(tw);

  const {
    source,
    children,
    onPress,
    pressColor = tw`text-white/40 dark:text-black/40`.color,
    sx,
    outerSx,
    alt,
  } = props;

  return (
    <ImageBackground
      source={typeof source === "string" ? { uri: source } : source}
      accessibilityLabel={alt}
      style={tw.style(
        "overflow-hidden rounded-xl dark:bg-neutral-900 bg-stone-50",
        outerSx as any,
      )}
      resizeMode="cover"
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          pressColor as ColorValue,
          false,
        )}
        accessibilityRole="button"
        onPress={onPress}
      >
        <View sx={tw.style("min-w-full min-h-full", sx as any)}>
          {children}
        </View>
      </TouchableNativeFeedback>
    </ImageBackground>
  );
}
