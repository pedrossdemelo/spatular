import { createURL } from "expo-linking";

const linking = {
  prefixes: [createURL("/")],
  config: {
    screens: {
      Login: "",
      MainTabsStack: {
        screens: {
          DrinksStack: {
            screens: {
              Drinks: "/drinks",
              DrinkId: "/drinks/:id",
              DrinkIdProgress: "/drinks/:id/in-progress",
            },
          },
          FoodsStack: {
            screens: {
              Foods: "/foods",
              FoodId: "/foods/:id",
              FoodIdProgress: "/foods/:id/in-progress",
            },
          },
          ExploreStack: {
            screens: {
              Explore: "/explore",
              ExploreDrinks: "/explore/drinks",
              ExploreFoods: "/explore/foods",
              ExploreFoodsByIngredient: "/explore/foods/ingredient",
              ExploreDrinksByIngredient: "/explore/drinks/ingredient",
              ExploreFoodsByNationality: "/explore/foods/nationality",
            },
          },
          ProfileStack: {
            screens: {
              Profile: "/profile",
              DoneRecipes: "/done-recipes",
              FavoriteRecipes: "/favorite-recipes",
            },
          },
        },
      },
    },
  },
};

export default linking;
