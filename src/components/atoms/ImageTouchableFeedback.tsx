import { useSx, View } from "dripsy";
import { MotiPressable } from "moti/interactions";
import React, { ReactNode, useMemo } from "react";
import {
  ColorValue,
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";
import tw from "styles";
import { useDeviceContext } from "twrnc";

interface ImageTouchableFeedbackProps {
  source: ImageSourcePropType | string;
  children?: ReactNode;
  sx?: StyleProp<ViewStyle>;
  outerSx?: StyleProp<ViewStyle>;
  pressColor?: ColorValue;
  onPress: () => void;
  testID?: string;
  alt: string;
}

export default function ImageTouchableFeedback(
  props: ImageTouchableFeedbackProps,
) {
  const {
    source,
    children,
    onPress,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pressColor,
    sx,
    outerSx = {},
    testID,
    alt,
  } = props;
  useDeviceContext(tw);

  const parse = useSx();

  return (
    <MotiPressable
      onPress={onPress}
      accessibilityRole="button"
      style={parse(
        tw.style("rounded-xl bg-stone-50 dark:bg-neutral-900", outerSx as any),
      )}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              opacity: hovered || pressed ? 0.66 : 1,
              scale: pressed ? 0.98 : 1,
            };
          },
        [],
      )}
      transition={{ type: "timing", duration: 100 }}
    >
      <ImageBackground
        testID={testID}
        source={typeof source === "string" ? { uri: source } : source}
        accessibilityLabel={alt}
        style={parse(tw.style("w-full h-full overflow-hidden rounded-xl"))}
        resizeMode="cover"
      >
        <View sx={tw.style("h-full w-full", sx as any)}>{children}</View>
      </ImageBackground>
    </MotiPressable>
  );
}
