import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import tailwind from "styles";

export default function Explore() {
  const navigation = useNavigation<any>();

  const goToExploreDrinks = () => navigation.navigate("ExploreDrinks");

  const goToExploreFoods = () => navigation.navigate("ExploreFoods");

  return (
    <View>
      <Pressable
        onPress={goToExploreDrinks}
        style={tailwind`flex justify-center items-center p-2 bg-slate-50 m-2 rounded-full`}
        accessibilityRole="button"
      >
        <Text>Drinks</Text>
      </Pressable>

      <Pressable
        onPress={goToExploreFoods}
        style={tailwind`flex justify-center items-center p-2 bg-slate-50 m-2 rounded-full`}
        accessibilityRole="button"
      >
        <Text>Foods</Text>
      </Pressable>
    </View>
  );
}
