import { Consumables } from "components";
import React from "react";

export default function Drinks({ route }: any) {
  const query = route?.params?.query;

  return <Consumables query={query} type="drink" />;
}
