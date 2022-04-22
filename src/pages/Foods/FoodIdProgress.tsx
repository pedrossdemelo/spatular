import { ConsumableIdProgress } from "components";
import { useDataDbApi } from "hooks";
import React from "react";
import { ActivityIndicator } from "react-native";
import { foodApi } from "services";

export default function FoodIdProgress({ route }: any) {
  const { id } = route.params;

  const [[food], loading] = useDataDbApi(foodApi.getById(id));

  if (loading) return <ActivityIndicator />;

  return <ConsumableIdProgress data={food} />;
}
