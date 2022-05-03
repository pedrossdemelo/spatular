import { useSx, View } from "dripsy";
import { MotiPressable } from "moti/interactions";
import React, { ReactNode, useMemo } from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import tw from "styles";
import { useDeviceContext } from "twrnc";

interface TouchableFeedbackProps {
  children?: ReactNode;
  sx?: StyleProp<ViewStyle>;
  outerSx?: StyleProp<ViewStyle>;
  pressColor?: ColorValue;
  onPress: () => void;
  testID?: string;
}

export default function ImageTouchableFeedback(props: TouchableFeedbackProps) {
  const {
    children,
    onPress,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pressColor,
    sx,
    outerSx = {},
    testID,
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
      <View testID={testID} sx={tw.style(sx as any)}>
        {children}
      </View>
    </MotiPressable>
  );
}
