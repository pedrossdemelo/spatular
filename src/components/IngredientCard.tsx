import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "dripsy";
import React from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { STouchable } from "./atoms";

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

interface IngredientCardProps {
  data: {
    name: string;
    image: string;
  };
  type: "drink" | "food";
}
export default function IngredientCard(props: IngredientCardProps) {
  const { data, type } = props;
  const { image, name } = data;
  useDeviceContext(tw);

  const { navigate } = useNavigation<any>();

  const searchForRecipe = () => {
    navigate(`${capitalize(type)}sStack`, {
      screen: `${capitalize(type)}s`,
      params: {
        query: `With: ${name}`,
      },
    });
  };

  return (
    <STouchable
      onPress={searchForRecipe}
      sx={tw`flex-row items-center overflow-visible p-3`}
      outerSx={tw`rounded-lg mx-4 max-w-140 mb-4 bg-white dark:bg-neutral-900`}
      pressColor={
        tw`text-stone-800/20 dark:text-neutral-100/20`.color as string
      }
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
        numberOfLines={1}
        sx={tw`font-dmsans text-stone-800 dark:text-neutral-300 font-medium mx-4 text-lg grow`}
      >
        {name}
      </Text>
    </STouchable>
  );
}
