import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, View } from "dripsy";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useDataDbApi, useRecipeList } from "hooks";
import React, { useMemo, useState } from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import { drinkApi, foodApi } from "services";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { ParsedRecipe } from "utils";
import { ImageDescriptionGradient, SButton } from "./atoms";

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

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
  let [recommendations] = useDataDbApi(Api.getBySearch(""), { limit: 10 });

  recommendations = useMemo(
    () => shuffle(recommendations),
    [recommendations.length],
  );

  const key = (t: typeof data.type) => (t === "drink" ? "cocktails" : "meals");

  const [inProgressRecipes, startRecipe] = useRecipeList("inProgressRecipes");
  const isInProgress = inProgressRecipes[key(type)]?.[id] !== undefined;

  const [favoriteRecipes, addFavorite, removeFavorite] =
    useRecipeList("favoriteRecipes");
  const isFavorite = favoriteRecipes.some((r) => r.id === id);
  const toggleFavorite = () =>
    isFavorite ? removeFavorite(data) : addFavorite(data);

  const copyUrl = () => {
    const routeName = Linking.createURL(`/${type}s/${id}`);
    Clipboard.setString(routeName);
  };

  const handleRecipeProgressButton = () => {
    if (!isInProgress) startRecipe(data);
    navigation.navigate(`${capitalize(type)}IdProgress`, { id, title: name });
  };

  useDeviceContext(tw);

  return (
    <>
      <ScrollView contentContainerSx={tw`pb-14`}>
        <Image
          source={{ uri: image }}
          accessibilityLabel={name}
          style={tw`w-full aspect-square`}
        />

        <View sx={tw`mx-4 my-2`}>
          <View sx={tw`flex-row items-start`}>
            <View sx={tw`grow`}>
              <Text
                sx={tw`text-stone-800 dark:text-neutral-200 text-2xl font-medium font-dmsans`}
              >
                {name}
              </Text>

              <Text
                sx={tw`text-stone-700 -mt-0.5 dark:text-neutral-300 font-medium`}
              >
                {category}

                {alcoholic ? ` (${alcoholic})` : ""}
              </Text>
            </View>

            <SButton
              startIcon="share-variant"
              testID="share-button"
              variant="text"
              color="secondary"
              outerSx={tw`rounded-full`}
              onPress={copyUrl}
            />

            <SButton
              testID={
                isFavorite
                  ? `${name}-remove-favorite-button`
                  : `${name}-favorite-button`
              }
              onPress={toggleFavorite}
              variant="text"
              color="secondary"
              outerSx={tw`rounded-full -mr-2`}
              endIcon={isFavorite ? "heart" : "heart-outline"}
            />
          </View>

          <View sx={tw`mt-4 p-3 pb-1 rounded-lg bg-white dark:bg-neutral-900`}>
            <Text
              sx={tw`text-stone-700 dark:text-neutral-300 text-lg font-dmsans font-medium -mt-1.5 mb-2`}
            >
              Ingredients
            </Text>

            {ingredients.map(({ name: ingredient, measure }) => (
              <View sx={tw`flex-row`}>
                <Text
                  sx={tw`text-stone-600 dark:text-neutral-400 mb-1.5`}
                  key={`${ingredient} ${measure}`}
                >
                  {ingredient}
                </Text>

                <Text
                  sx={tw`grow text-right text-stone-600 dark:text-neutral-400 mb-1.5`}
                >
                  {measure ? measure.trim() : ""}
                </Text>
              </View>
            ))}
          </View>

          <View sx={tw`mt-4 p-3 pb-1 rounded-lg bg-white dark:bg-neutral-900`}>
            <Text
              sx={tw`text-stone-700 dark:text-neutral-300 text-lg font-dmsans font-medium -mt-1.5 mb-2`}
            >
              Instructions
            </Text>

            <Text
              sx={tw`text-stone-600 leading-5 dark:text-neutral-400 mb-1.5`}
            >
              {instructions.replace(/\n+\s*\n*/g, "\n\n").trim()}
            </Text>
          </View>
        </View>

        {!!youtube && (
          // @ts-expect-error
          <YoutubeIframe
            webViewStyle={tw`w-full max-w-full mt-2 aspect-video opacity-99`}
            videoId={youtube.split("=")[1]}
            onReady={togglePlay}
          />
        )}

        <View sx={tw.style(youtube ? "mt-2" : "mt-1")} testID="recommended">
          <Text
            sx={tw`text-stone-800 mx-4 dark:text-neutral-200 text-2xl font-medium font-dmsans`}
          >
            Recommended
          </Text>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerSx={tw`pl-4 pb-4`}
            horizontal
            sx={tw`mt-2`}
            snapToInterval={tw`w-54`.width as number}
            snapToAlignment="start"
            decelerationRate="fast"
          >
            {recommendations.map((r) => (
              <ImageDescriptionGradient
                title={r.name}
                source={r.image}
                subtitle={r.category}
                sx={tw`w-50 mr-4 aspect-6/5 shadow-md`}
                onPress={() =>
                  navigation.navigate(`${capitalize(r.type)}Id`, {
                    id: r.id,
                    title: r.name,
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={tw.style("absolute bottom-4 right-4")}>
        <SButton
          endIcon="arrow-right"
          onPress={handleRecipeProgressButton}
          outerSx={tw`rounded-full shadow-lg shadow-orange-600 shadow-opacity-30`}
          sx={tw`h-10 pl-4 pr-3`}
          textSx={tw`uppercase`}
        >
          {isInProgress ? "Continue recipe" : "Start recipe"}
        </SButton>
      </View>
    </>
  );
}
