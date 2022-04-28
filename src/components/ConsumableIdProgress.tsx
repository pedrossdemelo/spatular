import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useProgressIngredients, useRecipeList } from "hooks";
import React, { useState } from "react";
import { Button, Image, Pressable, ScrollView, Text } from "react-native";
import tw from "styles";
import { ParsedRecipe } from "utils";

type Extract<T> = T extends (infer U)[] ? U : never;

interface ConsumableIdProgressProps {
  data: ParsedRecipe;
}

export default function ConsumableIdProgress(props: ConsumableIdProgressProps) {
  const { data } = props;
  const {
    name,
    category,
    instructions,
    ingredients,
    image,
    alcoholic,
    id,
    type,
  } = data;

  const navigation = useNavigation<any>();

  const [doneRecipes, completeRecipe, restartRecipe] =
    useRecipeList("doneRecipes");
  const isCompleted = doneRecipes.some((recipe) => recipe.id === id);
  const goToDoneRecipes = () => {
    navigation.navigate("DoneRecipes");
    if (!isCompleted) completeRecipe(data);
  };

  const restart = () => {
    restartRecipe(data);
    removeAllIngredients();
  };

  const [shareText, setShareText] = useState("Share");
  const copyUrl = () => {
    const routeName = Linking.createURL(`/${type}s/${id}`);
    Clipboard.setString(routeName);
    setShareText("Link copied!");
  };

  const [favoriteRecipes, addFavorite, removeFavorite] =
    useRecipeList("favoriteRecipes");
  const isFavorite = favoriteRecipes.some((r) => r.id === data.id);
  const toggleFavorite = () =>
    isFavorite ? removeFavorite(data) : addFavorite(data);

  const [
    ingredientsDone,
    addIngredient,
    removeIngredient,
    removeAllIngredients,
  ] = useProgressIngredients(data);

  const isChecked = (ingredient: Extract<typeof ingredients>) =>
    ingredientsDone.includes(ingredient.name);
  const toggleChecked = (ingredient: Extract<typeof ingredients>) => () =>
    isChecked(ingredient)
      ? removeIngredient(ingredient)
      : addIngredient(ingredient);

  return (
    <ScrollView>
      <Image
        accessibilityLabel={name}
        style={tw`w-full aspect-square`}
        source={{ uri: image }}
      />

      <Text>{name}</Text>

      <Text>
        {category}

        {alcoholic}
      </Text>

      <Button testID="share-button" title={shareText} onPress={copyUrl} />

      <Button
        testID={isFavorite ? "remove-favorite-button" : "favorite-button"}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        onPress={toggleFavorite}
      />

      <Text>{instructions}</Text>

      {ingredients.map(
        (ingredient: Extract<typeof ingredients>, index: number) => {
          const { name: ingredientName, measure } = ingredient;

          return (
            <Pressable
              style={tw`p-2 rounded-full ${
                isChecked(ingredient) ? "bg-red-100" : "bg-stone-50"
              }`}
              testID={`ingredient-${index}`}
              onPress={toggleChecked(ingredient)}
              accessibilityState={{ checked: isChecked(ingredient) }}
              key={`${ingredientName} ${measure}`}
            >
              <Text>
                {ingredientName}

                {measure}
              </Text>
            </Pressable>
          );
        },
      )}

      <Button
        disabled={ingredients.length !== ingredientsDone.length}
        title={isCompleted ? "Restart" : "Finish"}
        onPress={isCompleted ? restart : goToDoneRecipes}
      />
    </ScrollView>
  );
}
