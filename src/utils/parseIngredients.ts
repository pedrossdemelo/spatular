export interface MealIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string;
}

export interface DrinkIngredient {
  strIngredient1: string;
}

export default function parseIngredients(
  ingredient: MealIngredient & DrinkIngredient,
) {
  const { strIngredient, strIngredient1 } = ingredient;

  return {
    name: strIngredient || strIngredient1,
    image: strIngredient1
      ? `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}.png`
      : `https://www.themealdb.com/images/ingredients/${strIngredient}.png`,
  };
}
