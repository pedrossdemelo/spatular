import { useNavigation } from "@react-navigation/native";
import { ImageDescriptionGradient, SButton } from "components/atoms";
import { ScrollView, View } from "dripsy";
import { foodApi } from "services";
import Api from "services/Api";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { parseRecipe } from "utils";

export default function ExploreFoods() {
  useDeviceContext(tw);

  const { navigate } = useNavigation<any>();

  const goToExploreFoodsByIngredient = () => {
    navigate("ExploreFoodsByIngredient");
  };

  const goToExploreFoodsByNationality = () => {
    navigate("ExploreFoodsByNationality");
  };

  const goToRandomFood = async () => {
    const { key, url } = foodApi.getRandom();

    const {
      data: {
        [key]: [food],
      },
    } = await Api.fetchJson(url);

    const { id, name } = parseRecipe(food);

    navigate("FoodsStack", { screen: "FoodId", params: { id, title: name } });
  };

  return (
    <>
      <ScrollView contentContainerSx={tw`grow`}>
        <View sx={tw`m-4`}>
          <ImageDescriptionGradient
            source="https://conagen.com/wp-content/uploads/2019/08/Food-Ingredients.jpg"
            onPress={goToExploreFoodsByIngredient}
            title="Explore by ingredient"
            subtitle="Find recipes with the ingredients you want"
            sx={tw`w-full aspect-video max-w-140 self-center mb-4`}
          />

          <ImageDescriptionGradient
            source="https://wordpress.soscuisine.com/2015/10/wordl-cuisine.jpg"
            onPress={goToExploreFoodsByNationality}
            title="Explore by nationality"
            subtitle="See what the world has to offer"
            sx={tw`w-full aspect-video max-w-140 self-center mb-4`}
          />
        </View>
      </ScrollView>

      <View style={tw.style("absolute bottom-4 right-4")}>
        <SButton
          endIcon="shuffle-variant"
          onPress={goToRandomFood}
          outerSx={tw`rounded-full shadow-lg shadow-orange-600 shadow-opacity-30`}
          sx={tw`h-10 px-3`}
          textSx={tw`uppercase`}
        >
          Surprise me
        </SButton>
      </View>
    </>
  );
}
