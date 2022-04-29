import { ConsumableIdProgress } from "components";
import { useDataDbApi } from "hooks";
import React from "react";
import { ActivityIndicator } from "react-native";
import { drinkApi } from "services";
import tw from "styles";

export default function DrinkIdProgress({ route }: any) {
  const { id } = route.params;

  const [[drink], loading] = useDataDbApi(drinkApi.getById(id));

  if (loading) return <ActivityIndicator style={tw`mt-4`} />;

  return <ConsumableIdProgress data={drink} />;
}
