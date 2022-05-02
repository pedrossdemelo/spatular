import { Image, Text, View } from "dripsy";
import React from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { STouchable } from "./atoms";

interface IngredientCardProps {
  data: {
    name: string;
    image: string;
  };
}
export default function IngredientCard({ data }: IngredientCardProps) {
  const { image, name } = data;
  useDeviceContext(tw);

  return (
    <STouchable
      onPress={() => {}}
      sx={tw`flex-row items-center overflow-visible p-3`}
      outerSx={tw`rounded-lg self-center w-full max-w-140 mb-4 bg-white dark:bg-neutral-900`}
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
        sx={tw`font-dmsans text-stone-800 dark:text-neutral-300 font-medium mx-4 text-lg grow`}
      >
        {name}
      </Text>
    </STouchable>
  );
}
