import TheDataDbApi from "./TheDataDbApi";

export const FoodApi = Object.freeze(
  new TheDataDbApi("meals", "https://www.themealdb.com/api/json/v1/1/"),
);

export const DrinkApi = Object.freeze(
  new TheDataDbApi("drinks", "https://www.thecocktaildb.com/api/json/v1/1/"),
);
