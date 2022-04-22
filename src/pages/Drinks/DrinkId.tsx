import { ConsumableId } from "components";
import { useDataDbApi } from "hooks";
import React from "react";
import { ActivityIndicator } from "react-native";
import { drinkApi } from "services";

export default function DrinkId({ route }: any) {
  const { id } = route.params;

  const [[drink], loading] = useDataDbApi(drinkApi.getById(id));

  if (loading) return <ActivityIndicator />;

  return <ConsumableId data={drink} />;
}
