import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, ScrollView, Text, View } from "dripsy";
import { useDataDbApi } from "hooks";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { drinkApi, foodApi } from "services";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { Drink, Meal, ParsedRecipe } from "utils";
import debounce from "utils/debounce";
import { Heading, ImageDescriptionGradient, SButton } from "./atoms";
import SearchBar from "./SearchBar";

function ingredientQuery(query: string) {
  if (!query.toLocaleLowerCase().startsWith("with:")) return null;

  const [, ingredient] = query.split(":");

  return ingredient.trim().toLocaleLowerCase();
}

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
        "bg-stone-200 dark:bg-neutral-800 h-8",
        selected && "bg-orange-600 dark:bg-orange-600",
      )}
      textSx={tw.style(
        "text-stone-700 dark:text-neutral-200 text-sm",
        selected && "text-white",
      )}
    >
      {category}
    </SButton>
  );
}

interface ConsumablesProps {
  type: "food" | "drink";
  query?: string;
}

export default function Consumables(props: ConsumablesProps) {
  const { type, query: paramsQuery } = props;

  const navigation = useNavigation<any>();

  const Api = type === "food" ? foodApi : drinkApi;

  const [inputSearch, setInputSearch] = useState(paramsQuery ?? "");

  const [requestQuery, setRequestQuery] = useState(inputSearch);

  const debounceRequest = useCallback(
    debounce((value) => setRequestQuery(value), 500),
    [],
  );

  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  useEffect(() => {
    setSelectedCategory(null);
    debounceRequest(inputSearch);
  }, [inputSearch]);

  useEffect(() => {
    requestQuery &&
      navigation.setParams({
        query: requestQuery,
      });
  }, [requestQuery]);

  useEffect(() => {
    if (!paramsQuery) return;
    setInputSearch(paramsQuery);
    setRequestQuery(paramsQuery);
  }, [paramsQuery]);

  const URL = (() => {
    if (selectedCategory) return Api.getByCategory(selectedCategory);
    if (ingredientQuery(requestQuery))
      return Api.getByIngredient(ingredientQuery(requestQuery)!);

    return Api.getBySearch(requestQuery);
  })();

  const [consumables, loading] = useDataDbApi(URL);

  const [categories] = useDataDbApi(Api.getCategories(), {
    parser: ({ strCategory }: Meal | Drink) => strCategory,
  });

  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      stickyHeaderIndices={[2]}
      contentContainerStyle={tw`grow pt-[${top}px]`}
    >
      <Heading
        title={type === "food" ? "Meals" : "Drinks"}
        subtitle={`Discover ${type}s from all around the world`}
        maxWidth={140}
      />

      <ScrollView
        sx={tw`mt-4 -mb-[${top}px] z-99 grow-0`}
        horizontal
        showsHorizontalScrollIndicator={tw.prefixMatch("web") && false}
        contentContainerSx={tw`pl-4 grow justify-center pr-2`}
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

      <View sx={tw`overflow-visible pt-[${top}px] mt-4 mx-4`}>
        <SearchBar
          sx={tw`shadow-lg`}
          placeholder={`Search for a ${type === "food" ? "meal" : "drink"}...`}
          setSearch={setInputSearch}
          search={inputSearch}
        />
      </View>

      <View sx={tw`mx-4 my-2 grow`}>
        {loading && (
          <ActivityIndicator
            size={tw.prefixMatch("ios") ? "small" : "large"}
            sx={tw`my-4`}
            color={tw.color("orange-600")}
          />
        )}

        {!loading &&
          consumables.length > 0 &&
          consumables.map((consumable) => (
            <ConsumableCard key={consumable.id} data={consumable} />
          ))}

        {!loading && consumables.length === 0 && (
          <View sx={tw`mx-4 mt-2`}>
            <Text
              sx={tw`text-lg text-stone-400 dark:text-neutral-600 text-center`}
            >
              No results found for &ldquo;{requestQuery}&rdquo;
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
