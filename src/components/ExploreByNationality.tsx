import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useDataDbApi } from "hooks";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "react-native";
import { foodApi } from "services";
import tw from "styles";
import { Meal } from "utils";

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

const parseNationalities = (nationalities: Meal) => {
  const { strArea } = nationalities;

  return strArea;
};

interface ExploreByNationalityProps {
  type: "food";
}

export default function ExploreByNationality(props: ExploreByNationalityProps) {
  const { type } = props;

  const [nationalities] = useDataDbApi(foodApi.getNationalities(), {
    parser: parseNationalities,
  });

  const [selected, setSelected] = useState("American");

  const select = (value: string) => setSelected(value);

  const [results, loading] = useDataDbApi(foodApi.getByNationality(selected), {
    limit: 10,
  });

  const { navigate } = useNavigation();
  const goToId = (id: string, name: string) => () =>
    // @ts-expect-error
    navigate(`${capitalize(type)}sStack`, {
      screen: `${capitalize(type)}Id`,
      params: { id, title: name },
    });

  return (
    <ScrollView>
      <Picker
        testID="nationality-picker"
        selectedValue={selected}
        onValueChange={select}
      >
        {nationalities.map((n: any) => (
          <Picker.Item key={n} label={n} value={n} />
        ))}
      </Picker>

      <Text>{selected}</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {results.map(({ name, image, id }) => (
            <Pressable key={name} onPress={goToId(id, name)}>
              <Image
                source={{ uri: image }}
                accessibilityLabel={name}
                style={tw`h-10 aspect-square`}
              />

              <Text>{name}</Text>
            </Pressable>
          ))}
        </>
      )}
    </ScrollView>
  );
}
