import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, ScrollView, Text, View } from "dripsy";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useProgressIngredients, useRecipeList } from "hooks";
import { AnimatePresence, MotiView } from "moti";
import React, { ComponentProps, useLayoutEffect } from "react";
import tw from "styles";
import { useDeviceContext } from "twrnc";
import { ParsedRecipe, showToast } from "utils";
import { SButton } from "./atoms";

type Extract<T> = T extends (infer U)[] ? U : never;

interface ConsumableIdProgressProps {
  data: ParsedRecipe;
}

export default function ConsumableIdProgress(props: ConsumableIdProgressProps) {
  const { data } = props;
  const {
    name,
    category,
    instructions,
    ingredients,
    image,
    alcoholic,
    id,
    type,
  } = data;

  useDeviceContext(tw);

  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${name} progress`,
    });
  }, [name]);

  const [doneRecipes, completeRecipe, restartRecipe] =
    useRecipeList("doneRecipes");
  const isCompleted = doneRecipes.some((recipe) => recipe.id === id);
  const goToDoneRecipes = () => {
    navigation.navigate("DoneRecipes");
    if (!isCompleted) completeRecipe(data);
  };

  const restart = () => {
    restartRecipe(data);
    removeAllIngredients();
  };

  const copyUrl = () => {
    const routeName = Linking.createURL(`/${type}s/${id}`);
    Clipboard.setString(routeName);
    showToast("Copied to clipboard!", tw);
  };

  const [favoriteRecipes, addFavorite, removeFavorite] =
    useRecipeList("favoriteRecipes");
  const isFavorite = favoriteRecipes.some((r) => r.id === data.id);
  const toggleFavorite = () =>
    isFavorite ? removeFavorite(data) : addFavorite(data);

  const [
    ingredientsDone,
    addIngredient,
    removeIngredient,
    removeAllIngredients,
  ] = useProgressIngredients(data);

  const isChecked = (ingredient: Extract<typeof ingredients>) =>
    ingredientsDone.includes(`${ingredient.name} - ${ingredient.measure}`);
  const toggleChecked = (ingredient: Extract<typeof ingredients>) => () =>
    isChecked(ingredient)
      ? removeIngredient(ingredient)
      : addIngredient(ingredient);

  return (
    <>
      <ScrollView contentContainerSx={tw`pb-14`}>
        <Image
          accessibilityLabel={name}
          style={tw`w-full aspect-square`}
          source={{ uri: image }}
        />

        <View sx={tw`my-2 mx-4`}>
          <View sx={tw`flex-row justify-between items-start`}>
            <View sx={tw`flex-1`}>
              <Text
                numberOfLines={1}
                sx={tw`text-stone-800 dark:text-neutral-200 text-2xl font-medium font-dmsans`}
              >
                {name}
              </Text>

              <Text
                sx={tw`text-stone-700 -mt-0.5 dark:text-neutral-300 font-medium`}
              >
                {category}

                {alcoholic ? ` (${alcoholic})` : ""}
              </Text>
            </View>

            <SButton
              startIcon="share-variant"
              testID="share-button"
              variant="text"
              color="secondary"
              outerSx={tw`rounded-full ml-2`}
              onPress={copyUrl}
            />

            <SButton
              testID={isFavorite ? "remove-favorite-button" : "favorite-button"}
              onPress={toggleFavorite}
              variant="text"
              color="secondary"
              outerSx={tw`rounded-full -mr-2`}
              endIcon={isFavorite ? "heart" : "heart-outline"}
            />
          </View>

          <View
            sx={tw`mt-4 pt-3 overflow-hidden rounded-lg bg-white dark:bg-neutral-900`}
          >
            <Text
              sx={tw`text-stone-700 px-3 dark:text-neutral-300 text-lg font-dmsans font-medium -mt-1.5 mb-2`}
            >
              Ingredients
            </Text>

            {ingredients.map(
              (ingredient: Extract<typeof ingredients>, index: number) => {
                const { name: ingredientName, measure } = ingredient;

                const checked = isChecked(ingredient);

                const isLast = index === ingredients.length - 1;
                const isFirst = index === 0;

                return (
                  <React.Fragment key={`${ingredientName} - ${measure}`}>
                    {isFirst && (
                      <View sx={tw`h-1 bg-stone-100 dark:bg-[#101010]`} />
                    )}

                    <Pressable
                      style={tw.style(
                        "px-3 py-2",
                        checked
                          ? "bg-[#fff7ed] dark:bg-[#282221]"
                          : "bg-white dark:bg-neutral-900",
                      )}
                      testID={`ingredient-${index}`}
                      onPress={toggleChecked(ingredient)}
                      accessibilityState={{ checked }}
                      key={`${ingredientName} ${measure}`}
                    >
                      <View sx={tw`flex-row`}>
                        <Text
                          sx={tw.style(
                            "text-base",
                            checked
                              ? "font-bold text-orange-900 dark:text-orange-200"
                              : "text-stone-600 dark:text-neutral-400",
                          )}
                        >
                          {ingredientName}
                        </Text>

                        <Text
                          sx={tw.style(
                            "grow text-right text-base",
                            checked
                              ? "font-bold text-orange-900 dark:text-orange-200"
                              : "text-stone-600 dark:text-neutral-400",
                          )}
                        >
                          {measure ? measure.trim() : ""}
                        </Text>
                      </View>
                    </Pressable>

                    {!isLast && (
                      <View
                        sx={tw`h-0.5 rounded mx-3 bg-stone-100 dark:bg-[#101010]`}
                      />
                    )}
                  </React.Fragment>
                );
              },
            )}
          </View>
        </View>

        <View
          sx={tw`mt-2 mx-4 mb-4 p-3 pb-1 rounded-lg bg-white dark:bg-neutral-900`}
        >
          <Text
            sx={tw`text-stone-700 dark:text-neutral-300 text-lg font-dmsans font-medium -mt-1.5 mb-2`}
          >
            Instructions
          </Text>

          <Text sx={tw`text-stone-600 leading-5 dark:text-neutral-400 mb-1.5`}>
            {instructions.replace(/\n+\s*\n*/g, "\n\n").trim()}
          </Text>
        </View>
      </ScrollView>

      <View style={tw.style("absolute bottom-4 right-4")}>
        <AnimatePresence>
          {ingredients.length === ingredientsDone.length && (
            <FloatingActionButton
              onPress={isCompleted ? restart : goToDoneRecipes}
              endIcon={isCompleted ? "restart" : "arrow-right"}
            >
              {isCompleted ? "Restart" : "Finish"}
            </FloatingActionButton>
          )}
        </AnimatePresence>
      </View>
    </>
  );
}

interface FloatingActionButtonProps {
  children: string;
  onPress: () => void;
  endIcon: ComponentProps<typeof SButton>["endIcon"];
}

function FloatingActionButton(props: FloatingActionButtonProps) {
  const { children, onPress, endIcon } = props;

  return (
    <MotiView
      from={{
        opacity: 1,
        scale: 0.3,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      transition={{
        type: "spring",
        damping: 200,
        mass: 0.5,
        stiffness: 200,
      }}
    >
      <SButton
        endIcon={endIcon}
        onPress={onPress}
        outerSx={tw`rounded-full shadow-lg shadow-orange-600 shadow-opacity-30`}
        sx={tw`h-10 pl-4 pr-3`}
        textSx={tw`uppercase`}
      >
        {children}
      </SButton>
    </MotiView>
  );
}
