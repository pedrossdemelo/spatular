import { ConsumableIdProgress } from "components";
import { useDataDbApi } from "hooks";
import React from "react";
import { ActivityIndicator } from "react-native";
import { foodApi } from "services";
import tw from "styles";

export default function FoodIdProgress({ route }: any) {
  const { id } = route.params;

  const [[food], loading] = useDataDbApi(foodApi.getById(id));

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={tw.color("orange-600")}
        style={tw`mt-4`}
      />
    );

  return <ConsumableIdProgress data={food} />;
}
