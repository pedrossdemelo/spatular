import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useSx, View } from "dripsy";
import { MotiPressable } from "moti/interactions";
import { ComponentProps, useMemo } from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { getButtonStyles } from "utils";

type Colors = "primary" | "secondary";

type Variants = "outlined" | "contained" | "text";

interface SButtonProps {
  children: string;
  testID?: string;
  onPress: () => void;
  textSx?: { [key: string]: any };
  sx?: { [key: string]: any };
  outerSx?: { [key: string]: any };
  startIcon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  endIcon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  variant?: Variants;
  color?: Colors;
  // eslint-disable-next-line react/no-unused-prop-types
  pressColor?: string;
  disabled?: boolean;
}

function SButton(props: SButtonProps) {
  const {
    children,
    testID,
    onPress,
    startIcon,
    endIcon,
    variant = "contained",
    color = "primary",
    disabled = false,
  } = props;

  let { sx = {}, textSx = {}, outerSx = {} } = props;

  useDeviceContext(tw);

  const parse = useSx();

  const { text, outer, inner } = getButtonStyles(color, variant, tw);

  if (disabled) {
    textSx = { ...textSx, ...tw`text-zinc-500/60` };
    if (variant === "contained") {
      sx = { ...sx, ...tw`bg-zinc-400/40` };
    }
    if (variant === "outlined") {
      outerSx = { ...outerSx, ...tw`border-zinc-500/60` };
    }
  }

  const innerStyle = parse(
    tw.style(
      "rounded-lg",
      outer,
      outerSx,
      "px-2 h-9 flex-row items-center justify-between",
      inner,
      sx,
    ),
  );

  const textStyle = tw.style(
    text,
    "font-dmsans font-medium text-[17px]",
    textSx,
    startIcon && "pl-2",
    endIcon && "pr-2",
  );

  return (
    <View testID={testID}>
      <MotiPressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        onPress={onPress}
        disabled={disabled}
        style={innerStyle}
        animate={useMemo(
          () =>
            ({ hovered, pressed }) => {
              "worklet";

              return {
                opacity: (hovered || pressed) && disabled !== true ? 0.5 : 1,
                scale: pressed ? 0.98 : 1,
              };
            },
          [],
        )}
        transition={{ type: "timing", duration: 150 }}
      >
        {!!startIcon && (
          <MaterialCommunityIcons
            color={textStyle.color as string}
            name={startIcon}
            size={24}
          />
        )}

        <Text sx={textStyle}>{children}</Text>

        {!!endIcon && (
          <MaterialCommunityIcons
            color={textStyle.color as string}
            name={endIcon}
            size={24}
          />
        )}
      </MotiPressable>
    </View>
  );
}

export default SButton;
