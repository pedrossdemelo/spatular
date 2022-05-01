import { Image, Text, TextInput, View } from "dripsy";
import { useDataDbApi } from "hooks";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, SectionList } from "react-native";
import { drinkApi, foodApi } from "services";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { convertToAlphabeticalSections, parseIngredients } from "utils";

interface ExploreByIngredientProps {
  type: "drink" | "food";
}

export default function ExploreByIngredient(props: ExploreByIngredientProps) {
  const { type } = props;

  const Api = type === "drink" ? drinkApi : foodApi;

  const [search, setSearch] = useState("");

  const [allIngredients, loading] = useDataDbApi(Api.getIngredients(), {
    parser: parseIngredients,
  });

  const ingredients = useMemo(
    () =>
      allIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, allIngredients],
  );

  const ingredientSections = useMemo(
    () => convertToAlphabeticalSections(ingredients),
    [ingredients],
  );

  useDeviceContext(tw);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={tw.color("orange-600")}
        style={tw`mt-4`}
      />
    );

  return (
    <>
      <View sx={tw`m-4 absolute top-0 right-0 left-0 z-99`}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search for an ingredient..."
          textAlignVertical="center"
          sx={tw`text-[17px] font-dmsans text-stone-800 dark:text-neutral-300 bg-stone-200 dark:bg-neutral-900 px-4 py-2.5 android:py-2 rounded-full`}
        />
      </View>

      <SectionList
        sections={ingredientSections}
        renderItem={({ item }) => <IngredientCard data={item} />}
        contentContainerStyle={tw`pt-16 px-4`}
        keyExtractor={(item) => item.name}
        renderSectionHeader={({ section }) => {
          const { title } = section;

          return (
            <View sx={tw`flex-row items-center mx-3 mt-3 mb-2`}>
              <Text
                sx={tw`text-4xl font-dmsans mr-4 text-stone-600 dark:text-neutral-400 font-bold`}
              >
                {title}
              </Text>

              <View
                sx={tw`flex-1 h-[3px] -mt-1.5 rounded bg-stone-200 dark:bg-neutral-900`}
              />
            </View>
          );
        }}
        stickySectionHeadersEnabled={false}
      />
    </>
  );
}

interface IngredientCardProps {
  data: {
    name: string;
    image: string;
  };
}

function IngredientCard({ data }: IngredientCardProps) {
  const { image, name } = data;

  return (
    <View
      sx={tw`flex-row rounded-lg items-center overflow-visible p-3 mb-4 bg-white dark:bg-neutral-900`}
      key={name}
    >
      <View
        sx={tw`overflow-visible rounded-full bg-stone-100 dark:bg-neutral-800`}
      >
        <Image
          accessibilityLabel={name}
          source={{
            uri: image,
          }}
          sx={tw`h-14 aspect-square -mt-3 -mb-0`}
        />
      </View>

      <Text
        sx={tw`font-dmsans text-stone-800 dark:text-neutral-300 font-medium mx-4 text-lg grow`}
      >
        {name}
      </Text>
    </View>
  );
}
