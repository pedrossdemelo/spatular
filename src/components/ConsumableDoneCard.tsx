import { useNavigation } from "@react-navigation/native";
import { DoneRecipe } from "context";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useRecipeList } from "hooks";
import React, { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import tw from "styles";

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

interface ConsumableDoneCardProps {
  data: DoneRecipe;
}

function ConsumableDoneCard(props: ConsumableDoneCardProps) {
  const { data } = props;
  const {
    id,
    image,
    name,
    type,
    tags,
    nationality,
    alcoholic,
    category,
    doneDate,
  } = data;

  const navigation = useNavigation<any>();

  const goToRecipePage = () => {
    // BUG: React Navigation does not redirect to a different stack when the user enters a page through an URL
    navigation.navigate(`${capitalize(type)}sStack`, {
      screen: `${capitalize(type)}Id`,
      params: { id, title: name },
    });
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

  return (
    <View testID={`${name}-done-card`}>
      <Pressable
        testID={`${name}-anchor`}
        android_ripple={{ color: "black" }}
        onPress={goToRecipePage}
      >
        <Image source={{ uri: image }} style={tw`w-[80%] aspect-square`} />

        <Text>{name}</Text>
      </Pressable>

      <Text>
        {[nationality || alcoholic, category].filter((a) => a).join(" - ")}
      </Text>

      {!!doneDate && <Text>{new Date(doneDate).toLocaleDateString()}</Text>}

      {tags && tags.map((tag) => <Text key={tag}>{tag}</Text>)}

      <Button
        testID={`${name}-share-button`}
        onPress={copyUrl}
        title={shareText}
      />

      <Button
        testID={
          isFavorite
            ? `${name}-remove-favorite-button`
            : `${name}-favorite-button`
        }
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        onPress={toggleFavorite}
      />
    </View>
  );
}

export default ConsumableDoneCard;
