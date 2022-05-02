import { useNavigation } from "@react-navigation/native";
import { DoneRecipe } from "context";
import { Text, View } from "dripsy";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useRecipeList } from "hooks";
import React from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { BaseRecipe } from "utils/parseFavoriteRecipe";
import { ImageTouchableGradient, SButton } from "./atoms";

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

type BaseOrDoneRecipe = Partial<DoneRecipe> & BaseRecipe;

interface ConsumableDoneCardProps {
  data: BaseOrDoneRecipe;
  sx: { [key: string]: any };
}

function ConsumableDoneCard(props: ConsumableDoneCardProps) {
  const { data, sx = {} } = props;
  const { id, image, name, type, nationality, alcoholic, category, doneDate } =
    data;

  const navigation = useNavigation<any>();

  const goToRecipePage = () => {
    navigation.navigate(`${capitalize(type)}sStack`, {
      screen: `${capitalize(type)}Id`,
      params: { id, title: name },
    });
  };

  const copyUrl = () => {
    const routeName = Linking.createURL(`/${type}s/${id}`);
    Clipboard.setString(routeName);
  };

  const [favoriteRecipes, addFavorite, removeFavorite] =
    useRecipeList("favoriteRecipes");
  const isFavorite = favoriteRecipes.some((r) => r.id === data.id);

  const toggleFavorite = () =>
    isFavorite ? removeFavorite(data) : addFavorite(data);

  useDeviceContext(tw);

  return (
    <ImageTouchableGradient
      testID={`${name}-done-card`}
      onPress={goToRecipePage}
      colors={[tw.color("black/50")!, "transparent", tw.color("black/50")!]}
      source={image}
      sx={sx}
    >
      <View sx={tw`absolute top-2 right-4 z-99 flex-row items-center`}>
        <SButton
          startIcon="share-variant"
          testID={`${name}-share-button`}
          variant="text"
          textSx={tw`text-white dark:text-white`}
          pressColor={tw.color("white/30")!}
          outerSx={tw`rounded-full ml-2`}
          onPress={copyUrl}
        />

        <SButton
          testID={
            isFavorite
              ? `${name}-remove-favorite-button`
              : `${name}-favorite-button`
          }
          onPress={toggleFavorite}
          textSx={tw`text-white dark:text-white`}
          pressColor={tw.color("white/30")!}
          variant="text"
          color="secondary"
          outerSx={tw`rounded-full -mr-2`}
          endIcon={isFavorite ? "heart" : "heart-outline"}
        />
      </View>

      <View sx={tw`absolute bottom-4 right-5`}>
        <Text
          numberOfLines={1}
          sx={tw`text-2xl font-dmsans font-medium text-white text-right ml-7`}
        >
          {name}
        </Text>

        {!!category && (
          <Text
            numberOfLines={1}
            sx={tw`font-lato text-sm text-white text-right ml-7`}
          >
            {[nationality || alcoholic, category].filter((a) => a).join(" - ")}

            {doneDate ? ` (${new Date(doneDate).toLocaleDateString()})` : ""}
          </Text>
        )}
      </View>
    </ImageTouchableGradient>
  );
}

export default ConsumableDoneCard;
