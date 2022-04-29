import { ConsumableId } from "components";
import { useDataDbApi } from "hooks";
import React from "react";
import { ActivityIndicator } from "react-native";
import { foodApi } from "services";
import tw from "styles";

export default function FoodId({ route }: any) {
  const { id } = route.params;

  const [[food], loading] = useDataDbApi(foodApi.getById(id));

  if (loading) return <ActivityIndicator style={tw`mt-4`} />;

  return <ConsumableId data={food} />;
}
