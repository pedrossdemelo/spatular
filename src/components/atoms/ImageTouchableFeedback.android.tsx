import { View } from "dripsy";
import React, { ReactNode } from "react";
import {
  ColorValue,
  ImageBackground,
  StyleProp,
  ViewStyle,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import tw from "styles";
import { useDeviceContext } from "twrnc";

interface ImageTouchableFeedbackProps {
  source: string;
  children?: ReactNode;
  sx?: StyleProp<ViewStyle>;
  outerSx?: StyleProp<ViewStyle>;
  pressColor?: ColorValue;
  onPress: () => void;
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
  } = props;

  return (
    <ImageBackground
      source={{ uri: source }}
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
