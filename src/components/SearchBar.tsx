import { Feather } from "@expo/vector-icons";
import { TextInput, View } from "dripsy";
import React from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}
export default function SearchBar({
  search,
  setSearch,
  placeholder,
}: SearchBarProps) {
  useDeviceContext(tw);

  return (
    <View
      sx={tw`shadow-md justify-between w-full max-w-140 self-center
      border-stone-100 dark:border-neutral-800 dark:border-neutral border
      bg-stone-200 flex-row items-center dark:bg-neutral-900 pl-5 pr-4 py-2.5
      android:py-2 rounded-full`}
    >
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={
          tw`text-stone-400 dark:text-neutral-700`.color as string
        }
        placeholder={placeholder}
        textAlignVertical="center"
        sx={tw`text-[17px] grow font-dmsans text-stone-800 rounded-full
        dark:text-neutral-300 pl-4 -ml-4 py-2.5 android:py-2 -my-2.5
        android:-my-2 z-99`}
      />

      <Feather
        name="search"
        size={24}
        color={tw`text-stone-400 dark:text-neutral-700`.color as string}
      />
    </View>
  );
}
