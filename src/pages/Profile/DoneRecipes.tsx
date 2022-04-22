import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConsumableDoneCard } from "components";
import { useRecipeList } from "hooks";
import React, { useState } from "react";
import { Button, ScrollView } from "react-native";

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

  return (
    <ScrollView>
      <Button
        testID="filter-all-button"
        onPress={changeFilterTo("all")}
        title="All"
      />

      <Button
        testID="filter-food-button"
        onPress={changeFilterTo("food")}
        title="Food"
      />

      <Button
        testID="filter-drink-button"
        onPress={changeFilterTo("drink")}
        title="Drink"
      />

      {filteredDoneRecipes.map((recipe) => (
        <ConsumableDoneCard data={recipe} key={recipe.name} />
      ))}

      <Button
        title="Clear async storage"
        onPress={async () => {
          const asyncStorageKeys = await AsyncStorage.getAllKeys();
          if (asyncStorageKeys.length > 0) {
            await AsyncStorage.multiRemove(asyncStorageKeys);
          }
        }}
      />
    </ScrollView>
  );
}

export default DoneRecipes;
