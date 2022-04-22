import { ConsumableIdProgress } from "components";
import { useDataDbApi } from "hooks";
import React from "react";
import { ActivityIndicator } from "react-native";
import { drinkApi } from "services";

export default function DrinkIdProgress({ route }: any) {
  const { id } = route.params;

  const [[drink], loading] = useDataDbApi(drinkApi.getById(id));

  if (loading) return <ActivityIndicator />;

  return <ConsumableIdProgress data={drink} />;
}
