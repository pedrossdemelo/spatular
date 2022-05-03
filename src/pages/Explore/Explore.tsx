import { useNavigation } from "@react-navigation/native";
import { Heading, ImageDescriptionGradient } from "components/atoms";
import { ScrollView, View } from "dripsy";
import { useDataDbApi } from "hooks";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { drinkApi, foodApi } from "services";
import tw from "styles";
import { useDeviceContext } from "twrnc";

export default function Explore() {
  useDeviceContext(tw);

  const navigation = useNavigation<any>();

  const goToExploreDrinks = () => navigation.navigate("ExploreDrinks");

  const goToExploreFoods = () => navigation.navigate("ExploreFoods");

  const [[food]] = useDataDbApi(foodApi.getRandom());

  const [[drink]] = useDataDbApi(drinkApi.getRandom());

  const { top } = useSafeAreaInsets();

  return (
    <ScrollView contentContainerSx={tw`grow pt-[${top}px]`}>
      <Heading
        title="Explore"
        subtitle="Learn thousands of recipes from all around the world"
      />

      <View
        sx={tw`my-4 mx-4 grow md:mb-12 md:flex-row md:mx-4 md:justify-center md:items-center`}
      >
        <ImageDescriptionGradient
          onPress={goToExploreFoods}
          sx={tw`md:w-100 w-full max-w-100 self-center aspect-6/5 md:mx-2`}
          source={food?.image}
          title="Meals"
          subtitle="The finest culinary"
        />

        <View sx={tw`h-4`} />

        <ImageDescriptionGradient
          onPress={goToExploreDrinks}
          sx={tw`md:w-100 w-full max-w-100 self-center aspect-6/5 md:mx-2`}
          source={drink?.image}
          title="Drinks"
          subtitle="Discover delicious flavours"
        />
      </View>
    </ScrollView>
  );
}
