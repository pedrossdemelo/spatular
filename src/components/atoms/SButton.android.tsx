import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useSx, View } from "dripsy";
import { ComponentProps } from "react";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
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
  pressColor?: string;
  variant?: Variants;
  color?: Colors;
  disabled?: boolean;
}

function SButton(props: SButtonProps) {
  const {
    children,
    testID,
    onPress,
    startIcon,
    endIcon,
    pressColor,
    variant = "contained",
    color = "primary",
    disabled = false,
  } = props;

  let { sx = {}, textSx = {}, outerSx = {} } = props;

  useDeviceContext(tw);

  const parse = useSx();

  const { text, press, outer, inner } = getButtonStyles(color, variant, tw);

  if (disabled) {
    textSx = { ...textSx, ...tw`text-zinc-500/60` };
    if (variant === "contained") {
      sx = { ...sx, ...tw`bg-zinc-400/40` };
    }
    if (variant === "outlined") {
      outerSx = { ...outerSx, ...tw`border-zinc-500/60` };
    }
  }

  const textStyle = tw.style(
    text,
    "font-dmsans font-medium text-[17px]",
    textSx,
    startIcon && "ml-2",
    endIcon && "mr-2",
  );

  const innerStyle = parse(
    tw.style("px-2 h-9 flex-row items-center justify-center", inner, sx),
  );

  const outerStyle = tw.style("rounded-lg", outer, outerSx, "overflow-hidden");

  const ripple = disabled
    ? TouchableNativeFeedback.Ripple("transparent", false)
    : TouchableNativeFeedback.Ripple(pressColor || (press as string), false);

  return (
    <View sx={outerStyle} testID={testID}>
      <TouchableNativeFeedback
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        background={ripple}
        disabled={disabled}
        onPress={onPress}
        style={innerStyle}
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
      </TouchableNativeFeedback>
    </View>
  );
}

export default SButton;
