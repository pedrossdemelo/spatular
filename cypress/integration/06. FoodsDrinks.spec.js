import beefMealsMock from "../mocks/beefMeals";
import breakfastMealsMock from "../mocks/breakfastMeals";
import chickenMealsMock from "../mocks/chickenMeals";
import cocktailDrinksMock from "../mocks/cocktailDrinks";
import cocoaDrinksMock from "../mocks/cocoaDrinks";
import dessertMealsMock from "../mocks/dessertMeals";
import drinkCategoriesMock from "../mocks/drinkCategories";
import drinksMock from "../mocks/drinks";
import fetchMock from "../mocks/fetch";
import goatMealsMock from "../mocks/goatMeals";
import mealCategoriesMock from "../mocks/mealCategories";
import mealsMock from "../mocks/meals";
import milkDrinksMock from "../mocks/milkDrinks";
import ordinaryDrinksMock from "../mocks/ordinaryDrinks";
import otherDrinksMock from "../mocks/otherDrinks";
import { parseRecipe } from "../utils";

const mocksMap = {
  Beef: beefMealsMock,
  Breakfast: breakfastMealsMock,
  Chicken: chickenMealsMock,
  Dessert: dessertMealsMock,
  Goat: goatMealsMock,
  "Ordinary Drink": ordinaryDrinksMock,
  Cocktail: cocktailDrinksMock,
  "Milk / Float / Shake": milkDrinksMock,
  "Other/Unknown": otherDrinksMock,
  Cocoa: cocoaDrinksMock,
};

const mapRecipes = (rawData) => {
  const data = rawData.drinks ?? rawData.meals;
  const recipes = data.slice(0, 10).map(parseRecipe);

  return recipes;
};

const validateTenRecipeCards = (rawData) => {
  mapRecipes(rawData).forEach((recipe) => {
    const { name, image } = recipe;
    cy.get(`[data-testid="${name}-card"]`).as(`${name}-card`);

    cy.get(`@${name}-card`)
      .scrollIntoView()
      .within(() => {
        cy.get(`div[style*='background-image: url("${image}")']`).should(
          "exist",
        );
        cy.get(`[alt="${name}"]`).should("exist");
      });
  });
};

const mapCategories = (rawData) => {
  const data = rawData.drinks ?? rawData.meals;
  const categories = data.slice(0, 5).map((item) => item.strCategory);

  return categories;
};

const validateFiveFilterChips = (rawData) => {
  mapCategories(rawData).forEach((category) => {
    cy.get(`[data-testid="${category}-filter"]`).as(`${category}-filter`);

    cy.get(`@${category}-filter`)
      .parent()
      .within(() => {
        cy.contains(category).should("exist");
      });
  });
};

describe("Foods page", () => {
  beforeEach(() => {
    cy.visit("/foods", {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
  });

  it("should render at least five filter chips", () => {
    validateFiveFilterChips(mealCategoriesMock);
  });

  it("should render at least ten recipe cards at the start", () => {
    validateTenRecipeCards(mealsMock);
  });

  it("should have cards that are clickable and redirect to '/foods/:id'", () => {
    const { name, id } = mapRecipes(mealsMock)[0];

    cy.get(`[data-testid="${name}-card"]`).click({ force: true });

    cy.location("pathname").should("eq", `/foods/${id}`);
  });

  mapCategories(mealCategoriesMock).forEach((category) => {
    it(`should render at least ten filtered recipe cards from a ${category} api query`, () => {
      cy.get(`[data-testid="${category}-filter"]`).click({ force: true });

      validateTenRecipeCards(mocksMap[category]);
    });
  });

  it("should only be able to select one filter chip at a time", () => {
    cy.get('[data-testid="Beef-filter"]').click({ force: true });

    validateTenRecipeCards(beefMealsMock);

    cy.get('[data-testid="Chicken-filter"]').click({ force: true });

    validateTenRecipeCards(chickenMealsMock);
  });

  it("should have filters that act as toggles", () => {
    cy.get('[data-testid="Beef-filter"]').click({ force: true });

    validateTenRecipeCards(beefMealsMock);

    cy.get('[data-testid="Beef-filter"]').click({ force: true });

    validateTenRecipeCards(mealsMock);
  });
});

describe("Drinks page", () => {
  beforeEach(() => {
    cy.visit("/drinks", {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
  });

  it("should render at least five filter chips", () => {
    validateFiveFilterChips(drinkCategoriesMock);
  });

  it("should render at least ten recipe cards at the start", () => {
    validateTenRecipeCards(drinksMock);
  });

  it("should have cards that are clickable and redirect to '/drinks/:id'", () => {
    const { name, id } = mapRecipes(drinksMock)[0];

    cy.get(`[data-testid="${name}-card"]`).click({ force: true });

    cy.location("pathname").should("eq", `/drinks/${id}`);
  });

  mapCategories(drinkCategoriesMock).forEach((category) => {
    it(`should render at least ten filtered recipe cards from a ${category} api query`, () => {
      cy.get(`[data-testid="${category}-filter"]`).click({ force: true });

      validateTenRecipeCards(mocksMap[category]);
    });
  });

  it("should only be able to select one filter chip at a time", () => {
    cy.get('[data-testid="Cocktail-filter"]').click({ force: true });

    validateTenRecipeCards(cocktailDrinksMock);

    cy.get('[data-testid="Milk / Float / Shake-filter"]').click({
      force: true,
    });

    validateTenRecipeCards(milkDrinksMock);
  });

  it("should have filters that act as toggles", () => {
    cy.get('[data-testid="Cocktail-filter"]').click({ force: true });

    validateTenRecipeCards(cocktailDrinksMock);

    cy.get('[data-testid="Cocktail-filter"]').click({ force: true });

    validateTenRecipeCards(drinksMock);
  });
});
