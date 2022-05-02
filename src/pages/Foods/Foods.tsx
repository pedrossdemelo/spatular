import { Consumables } from "components";
import React from "react";

export default function Foods({ route }: any) {
  const query = route?.params?.query;

  return <Consumables query={query} type="food" />;
}
