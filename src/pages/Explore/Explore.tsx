import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import tailwind from "twrnc";

export default function Explore() {
  const navigation = useNavigation<any>();

  const goToExploreDrinks = () => navigation.navigate("ExploreDrinks");

  const goToExploreFoods = () => navigation.navigate("ExploreFoods");

  const goToProfile = () => navigation.navigate("profile");

  return (
    <View>
      <Pressable
        onPress={goToProfile}
        style={tailwind`flex justify-center items-center p-2 bg-slate-50 m-2 rounded-full`}
        accessibilityRole="button"
      >
        <Text>Profile</Text>
      </Pressable>

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
