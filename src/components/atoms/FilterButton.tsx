import tw from "styles";
import SButton from "./SButton";

type Filters = "all" | "drink" | "food";

export default function FilterButton({
  onPress,
  selected,
  value,
  children,
}: {
  onPress: (arg: Filters) => () => void;
  selected: boolean;
  value: Filters;
  children: string;
}) {
  return (
    <SButton
      testID={`filter-${value}-button`}
      onPress={onPress(value)}
      sx={tw.style(
        "bg-stone-200 dark:bg-neutral-800 w-20",
        selected && "bg-orange-600 dark:bg-orange-600",
      )}
      textSx={tw.style(
        "text-stone-700 dark:text-neutral-200 uppercase",
        selected && "text-white",
      )}
    >
      {children}
    </SButton>
  );
}
