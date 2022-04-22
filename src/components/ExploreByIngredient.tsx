import { useDataDbApi } from "hooks";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { drinkApi, foodApi } from "services";
import tailwind from "twrnc";
import { parseIngredients } from "utils";

interface ExploreByIngredientProps {
  type: "drink" | "food";
}

export default function ExploreByIngredient(props: ExploreByIngredientProps) {
  const { type } = props;

  const Api = type === "drink" ? drinkApi : foodApi;

  const [ingredients] = useDataDbApi(Api.getIngredients(), {
    parser: parseIngredients,
  });

  return (
    <ScrollView>
      {ingredients.map(({ name, image }) => (
        <View key={name}>
          <Image
            accessibilityLabel={name}
            source={{ uri: image }}
            style={tailwind`h-10 aspect-square`}
          />

          <Text>{name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
