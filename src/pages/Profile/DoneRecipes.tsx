import { ConsumableDoneCard } from "components";
import { FilterButton } from "components/atoms";
import { ScrollView, View } from "dripsy";
import { useRecipeList } from "hooks";
import React, { useState } from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";

type Filters = "all" | "drink" | "food";

function DoneRecipes() {
  const [doneRecipes] = useRecipeList("doneRecipes");

  const [filter, setFilter] = useState<Filters>("all");
  const changeFilterTo = (newFilter: Filters) => () => setFilter(newFilter);

  const filteredDoneRecipes = doneRecipes.filter((r) => {
    switch (filter) {
      case "all":
        return true;

      case "drink":
        return r.type === "drink";

      case "food":
        return r.type === "food";

      default:
        throw new Error("Illegal filter");
    }
  });

  useDeviceContext(tw);

  return (
    <ScrollView contentContainerSx={tw`p-4 pb-0`}>
      <View sx={tw`flex-row justify-around mb-4`}>
        <FilterButton
          selected={filter === "food"}
          onPress={changeFilterTo}
          value="food"
        >
          Meals
        </FilterButton>

        <FilterButton
          selected={filter === "all"}
          onPress={changeFilterTo}
          value="all"
        >
          All
        </FilterButton>

        <FilterButton
          selected={filter === "drink"}
          onPress={changeFilterTo}
          value="drink"
        >
          Drinks
        </FilterButton>
      </View>

      {filteredDoneRecipes.map((recipe) => (
        <ConsumableDoneCard
          sx={tw`w-full mb-4 aspect-video`}
          data={recipe}
          key={recipe.name}
        />
      ))}
    </ScrollView>
  );
}

export default DoneRecipes;
