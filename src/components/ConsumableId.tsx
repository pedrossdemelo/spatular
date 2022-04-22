import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useDataDbApi, useRecipeList } from "hooks";
import React, { useState } from "react";
import { Button, Image, Pressable, ScrollView, Text, View } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { drinkApi, foodApi } from "services";
import tw from "twrnc";
import { ParsedRecipe } from "utils";

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

interface ConsumableIdProps {
  data: ParsedRecipe;
}

export default function ConsumableId(props: ConsumableIdProps) {
  const { data } = props;

  const {
    name,
    category,
    instructions,
    ingredients,
    image,
    youtube,
    alcoholic,
    type,
    id,
  } = data;

  const navigation = useNavigation<any>();

  const [playing, setPlaying] = useState(false);
  const togglePlay = () => setPlaying(!playing);

  const Api = type === "drink" ? foodApi : drinkApi;
  const [recommendations] = useDataDbApi(Api.getBySearch(""), { limit: 6 });

  const key = (t: typeof data.type) => (t === "drink" ? "cocktails" : "meals");

  const [inProgressRecipes, startRecipe] = useRecipeList("inProgressRecipes");
  const isInProgress = inProgressRecipes[key(type)]?.[id] !== undefined;

  const [favoriteRecipes, addFavorite, removeFavorite] =
    useRecipeList("favoriteRecipes");
  const isFavorite = favoriteRecipes.some((r) => r.id === id);

  const toggleFavorite = () =>
    isFavorite ? removeFavorite(data) : addFavorite(data);

  const [shareText, setShareText] = useState("Share");

  const copyUrl = () => {
    const routeName = Linking.createURL(`/${type}s/${id}`);
    Clipboard.setString(routeName);
    setShareText("Link copied!");
  };

  const handleClick = () => {
    if (!isInProgress) startRecipe(data);
    navigation.navigate(`${capitalize(type)}IdProgress`, { id });
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: image }}
        accessibilityLabel={name}
        style={tw`w-full aspect-square`}
      />

      <Text>{name}</Text>

      <Text>
        {category}

        {alcoholic}
      </Text>

      <Button testID="share-button" title={shareText} onPress={copyUrl} />

      <Button
        testID={
          isFavorite
            ? `${name}-remove-favorite-button`
            : `${name}-favorite-button`
        }
        onPress={toggleFavorite}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      />

      <Text>Ingredients</Text>

      {ingredients.map(({ name: ingredient, measure }) => (
        <Text key={`${ingredient} ${measure}`}>
          {ingredient}

          {measure}
        </Text>
      ))}

      <Text>{instructions}</Text>

      {!!youtube && (
        // @ts-expect-error
        <YoutubeIframe
          webViewStyle={tw`w-full max-w-full aspect-video opacity-99`}
          videoId={youtube.split("=")[1]}
          onReady={togglePlay}
        />
      )}

      <View testID="recommended">
        <Text>Recommended</Text>

        {recommendations.map(({ name: recomendationName }) => (
          <View style={tw`bg-red-900`} key={recomendationName}>
            <Text>{recomendationName}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={tw`absolute bottom-0 right-0`}
        accessibilityRole="button"
        onPress={handleClick}
      >
        <Text>{isInProgress ? "Continue" : "Start"} Recipe</Text>
      </Pressable>
    </ScrollView>
  );
}
