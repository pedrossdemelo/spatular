import { Ingredient } from "./parseIngredients";

export type IngredientAndSection = string | Ingredient;

export default function convertToAlphabeticalSections(
  ingredients: Ingredient[],
) {
  ingredients.sort((a, b) => a.name.localeCompare(b.name));
  const sections: IngredientAndSection[] = [];
  let currentLetter: string | null = null;
  ingredients.forEach((ingredient) => {
    if (currentLetter?.toLowerCase() !== ingredient.name[0].toLowerCase()) {
      currentLetter = ingredient.name[0].toUpperCase();
      sections.push(currentLetter.toUpperCase());
    }
    sections.push(ingredient);
  });

  return sections;
}
