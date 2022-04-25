import { useNavigation } from "@react-navigation/native";
import { useDataDbApi } from "hooks";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text } from "react-native";
import { drinkApi, foodApi } from "services";
import tw from "styles";
import { Drink, Meal } from "utils";

interface ConsumableCardProps {
  data: {
    name: string;
    id: string;
    image: string;
    type: "drink" | "food";
  };
}

function ConsumableCard({ data }: ConsumableCardProps) {
  const { navigate } = useNavigation<any>();
  const { name, image, type, id } = data;

  const page = type === "food" ? "FoodId" : "DrinkId";

  const goToId = () => navigate(page, { id, title: name });

  return (
    <Pressable
      testID={`${name}-card`}
      android_ripple={{ color: "black" }}
      onPress={goToId}
    >
      <Text>{name}</Text>

      <Image
        style={tw`h-20 aspect-square`}
        source={{ uri: image }}
        accessibilityLabel={name}
      />
    </Pressable>
  );
}

interface CategoryChipProps {
  children: string;
  setter: React.Dispatch<React.SetStateAction<string | null>>;
  selected: boolean;
}

function CategoryChip(props: CategoryChipProps) {
  const { setter, children: category, selected } = props;

  const toggleSelected = () => (selected ? setter(null) : setter(category));

  return (
    <Pressable
      accessibilityRole="button"
      testID={`${category}-filter`}
      android_ripple={{ color: "black" }}
      onPress={toggleSelected}
      style={tw` p-2 rounded-full bg-slate-200 m-1 ${
        selected ? "bg-slate-400" : ""
      }`}
    >
      <Text>{category}</Text>
    </Pressable>
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
    limit: 5,
  });

  return (
    <ScrollView>
      {categories.map((category) => (
        <CategoryChip
          selected={category === selectedCategory}
          key={category}
          setter={setSelectedCategory}
        >
          {category}
        </CategoryChip>
      ))}

      {consumables.map((consumable) => (
        <ConsumableCard key={consumable.id} data={consumable} />
      ))}
    </ScrollView>
  );
}
