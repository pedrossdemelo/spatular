import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "dripsy";
import { useDataDbApi } from "hooks";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { drinkApi, foodApi } from "services";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { Drink, Meal, ParsedRecipe } from "utils";
import { Heading, ImageDescriptionGradient, SButton } from "./atoms";

interface ConsumableCardProps {
  data: ParsedRecipe;
}

function ConsumableCard({ data }: ConsumableCardProps) {
  useDeviceContext(tw);

  const { navigate } = useNavigation<any>();
  const { name, image, type, id } = data;

  const page = type === "food" ? "FoodId" : "DrinkId";

  const goToId = () => navigate(page, { id, title: name });

  return (
    <ImageDescriptionGradient
      testID={`${name}-card`}
      onPress={goToId}
      source={image}
      sx={tw`w-full max-w-140 self-center aspect-video my-2`}
      title={name}
      subtitle={data.category}
    />
  );
}

interface CategoryChipProps {
  children: string;
  setter: React.Dispatch<React.SetStateAction<string | null>>;
  selected: boolean;
}

function CategoryChip(props: CategoryChipProps) {
  useDeviceContext(tw);

  const { setter, children: category, selected } = props;

  const toggleSelected = () => (selected ? setter(null) : setter(category));

  return (
    <SButton
      testID={`${category}-filter`}
      onPress={toggleSelected}
      outerSx={tw`rounded-full mr-2`}
      sx={tw.style(
        "bg-slate-200 dark:bg-neutral-800 h-8",
        selected && "bg-orange-600 dark:bg-orange-600",
      )}
      textSx={tw.style(
        "text-slate-700 dark:text-neutral-200 text-sm",
        selected && "text-white",
      )}
    >
      {category}
    </SButton>
  );
}

interface ConsumablesProps {
  type: "food" | "drink";
}

export default function Consumables(props: ConsumablesProps) {
  const { type } = props;

  const Api = type === "food" ? foodApi : drinkApi;

  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  const URL = selectedCategory
    ? Api.getByCategory(selectedCategory)
    : Api.getBySearch("");

  const [consumables] = useDataDbApi(URL, { limit: 24 });

  const [categories] = useDataDbApi(Api.getCategories(), {
    parser: ({ strCategory }: Meal | Drink) => strCategory,
  });

  const { top } = useSafeAreaInsets();

  return (
    <ScrollView contentContainerSx={tw`grow pt-[${top}px]`}>
      <Heading
        title={type === "food" ? "Meals" : "Drinks"}
        subtitle={`Discover ${type}s from all around the world`}
        maxWidth={140}
      />

      <ScrollView
        sx={tw`mt-4`}
        horizontal
        showsHorizontalScrollIndicator={tw.prefixMatch("web") && false}
        contentContainerSx={tw`pl-4 pr-2`}
      >
        {categories.map((category) => (
          <CategoryChip
            selected={category === selectedCategory}
            key={category}
            setter={setSelectedCategory}
          >
            {category}
          </CategoryChip>
        ))}
      </ScrollView>

      <View sx={tw`mx-4 mt-2`}>
        {consumables.map((consumable) => (
          <ConsumableCard key={consumable.id} data={consumable} />
        ))}
      </View>
    </ScrollView>
  );
}
