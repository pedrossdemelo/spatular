import areas from "./areas";
import beefMeals from "./beefMeals";
import breakfastMeals from "./breakfastMeals";
import chickenMeals from "./chickenMeals";
import cocktailDrinks from "./cocktailDrinks";
import cocoaDrinks from "./cocoaDrinks";
import dessertMeals from "./dessertMeals";
import drinkCategories from "./drinkCategories";
import drinkIngredients from "./drinkIngredients";
import drinks from "./drinks";
import drinksByIngredient from "./drinksByIngredient";
import emptyDrinks from "./emptyDrinks";
import emptyMeals from "./emptyMeals";
import ginDrinks from "./ginDrinks";
import goatMeals from "./goatMeals";
import italianMeals from "./italianMeals";
import japaneseMeals from "./japaneseMeals";
import mealCategories from "./mealCategories";
import mealIngredients from "./mealIngredients";
import meals from "./meals";
import mealsByIngredient from "./mealsByIngredient";
import milkDrinks from "./milkDrinks";
import oneDrink from "./oneDrink";
import oneDrinkId15997 from "./oneDrinkId15997";
import oneMeal from "./oneMeal";
import ordinaryDrinks from "./ordinaryDrinks";
import otherDrinks from "./otherDrinks";
import soupMeals from "./soupMeals";

const fetch = (url) =>
  Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      if (url === "https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        return Promise.resolve(mealCategories);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
        return Promise.resolve(drinkCategories);

      if (url === "https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        return Promise.resolve(mealIngredients);

      if (
        url === "https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken"
      )
        return Promise.resolve(mealsByIngredient);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        return Promise.resolve(drinkIngredients);

      if (
        url ===
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum"
      )
        return Promise.resolve(drinksByIngredient);

      if (url === "https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        return Promise.resolve(areas);

      if (
        url === "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese"
      )
        return Promise.resolve(japaneseMeals);

      if (
        url === "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian"
      )
        return Promise.resolve(italianMeals);

      if (
        [
          "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata",
          "https://www.themealdb.com/api/json/v1/1/random.php",
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771",
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977",
        ].includes(url)
      )
        return Promise.resolve(oneMeal);

      if (
        [
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine",
          "https://www.thecocktaildb.com/api/json/v1/1/random.php",
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319",
        ].includes(url)
      )
        return Promise.resolve(oneDrink);

      if (
        url === "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997"
      )
        return Promise.resolve(oneDrinkId15997);

      if (url === "https://www.themealdb.com/api/json/v1/1/search.php?s=soup")
        return Promise.resolve(soupMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
        return Promise.resolve(beefMeals);

      if (
        url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast"
      )
        return Promise.resolve(breakfastMeals);

      if (
        url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
      )
        return Promise.resolve(chickenMeals);

      if (
        url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
      )
        return Promise.resolve(dessertMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat")
        return Promise.resolve(goatMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/search.php?s=xablau")
        return Promise.resolve(emptyMeals);

      if (
        url === "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin"
      )
        return Promise.resolve(ginDrinks);

      if (
        url ===
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink"
      )
        return Promise.resolve(ordinaryDrinks);

      if (
        url ===
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
      )
        return Promise.resolve(cocktailDrinks);

      if (
        url ===
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake"
      )
        return Promise.resolve(milkDrinks);

      if (
        url ===
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown"
      )
        return Promise.resolve(otherDrinks);

      if (
        url === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa"
      )
        return Promise.resolve(cocoaDrinks);

      if (
        url ===
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau"
      )
        return Promise.resolve(emptyDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
        return Promise.resolve(drinks);

      if (url === "https://www.themealdb.com/api/json/v1/1/search.php?s=")
        return Promise.resolve(meals);

      return Promise.reject(new Error("Invalid url"));
    },
  });

export default fetch;
