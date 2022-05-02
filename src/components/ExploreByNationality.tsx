import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { View } from "dripsy";
import { useDataDbApi } from "hooks";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { foodApi } from "services";
import tw from "styles";
import { Meal } from "utils";
import { ImageDescriptionGradient } from "./atoms";

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

  const [results, loading] = useDataDbApi(foodApi.getByNationality(selected));

  const { navigate } = useNavigation();
  const goToId = (id: string, name: string) => () =>
    // @ts-expect-error
    navigate(`${capitalize(type)}sStack`, {
      screen: `${capitalize(type)}Id`,
      params: { id, title: name },
    });

  return (
    <ScrollView>
      <View sx={tw`m-4 mb-2`}>
        <Picker
          testID="nationality-picker"
          selectedValue={selected}
          onValueChange={select}
          itemStyle={tw`text-stone-700 dark:text-neutral-100 font-dmsans`}
          style={tw`text-stone-700 w-full text-center p-2 rounded-full text-xl max-w-140 bg-stone-100 dark:bg-[#101010] self-center dark:text-neutral-400 font-dmsans`}
          dropdownIconColor={
            tw`text-stone-700 dark:text-neutral-400`.color as string
          }
        >
          {nationalities.map((n: any) => (
            <Picker.Item
              style={tw`text-stone-700 text-center p-2 text-xl bg-stone-100 dark:bg-[#101010] dark:text-neutral-400`}
              key={n}
              fontFamily="dmsans"
              label={n}
              value={n}
            />
          ))}
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={tw.color("orange-600")!}
          style={tw`mt-4`}
        />
      ) : (
        <View sx={tw`mx-4`}>
          {results.map(({ name, image, id }) => (
            <ImageDescriptionGradient
              key={name}
              onPress={goToId(id, name)}
              source={image}
              title={name}
              sx={tw`w-full max-w-140 self-center aspect-video my-2`}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
