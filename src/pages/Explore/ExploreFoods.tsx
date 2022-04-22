import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { foodApi } from "services";
import Api from "services/Api";
import { parseRecipe } from "utils";

export default function ExploreFoods() {
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

    const { id } = parseRecipe(food);

    navigate("foodsStack", { screen: "FoodId", params: { id } });
  };

  return (
    <View>
      <Button title="By Ingredient" onPress={goToExploreFoodsByIngredient} />

      <Button title="By Nationality" onPress={goToExploreFoodsByNationality} />

      <Button title="Surprise Me!" onPress={goToRandomFood} />
    </View>
  );
}
