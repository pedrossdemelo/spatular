import { Ingredient } from "./parseIngredients";

type IngredientSection = {
  title: string;
  data: Ingredient[];
};

export default function convertToAlphabeticalSections(
  ingredients: Ingredient[],
) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const sections: IngredientSection[] = [];
  alphabet.forEach((letter) => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.startsWith(letter),
    );

    if (filtered.length > 0) {
      sections.push({
        title: letter,
        data: filtered,
      });
    }
  });

  return sections;
}
