import { parseRecipe } from "../../src/utils";
import drinksMock from "../mocks/drinks";
import fetchMock from "../mocks/fetch";
import foodsMock from "../mocks/meals";
import oneDrink from "../mocks/oneDrink";
import oneMeal from "../mocks/oneMeal";

function runSpecsOn(page) {
  const isFoods = page === "foods";
  const PAGE_NAME = isFoods ? "FoodId" : "DrinkId";
  const ID = isFoods ? "52771" : "178319";
  const MOCK = isFoods ? oneMeal.meals[0] : oneDrink.drinks[0];
  const MOCK_NAME = isFoods ? MOCK.strMeal : MOCK.strDrink;
  const OPPOSITE_MOCK = isFoods ? drinksMock.drinks : foodsMock.meals;
  const URL = isFoods
    ? "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771"
    : "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319";

  describe(`${PAGE_NAME} page`, () => {
    before(() => {
      cy.visit(`/${page}/${ID}`, {
        onBeforeLoad(win) {
          win.fetch = fetchMock;
        },
      });
    });

    it("should make an appropriate api request to the ID included in the path", () => {
      cy.visit(`/${page}/${ID}`, {
        onBeforeLoad(win) {
          win.fetch = fetchMock;

          cy.spy(win, "fetch");
        },
      });

      cy.window().its("fetch").should("be.calledWith", `${URL}`);
    });

    it("should display the name, category and image with an alt equal to the name", () => {
      const { name, category, image } = parseRecipe(MOCK);

      cy.contains(name, { matchCase: false })
        .scrollIntoView()
        .should("be.visible");

      cy.contains(category, { matchCase: false })
        .scrollIntoView()
        .should("be.visible");

      cy.get(`img[alt='${name}']`)
        .should("have.attr", "src", image)
        .and("exist");
    });

    it("should display the ingredients along with the measures", () => {
      const { ingredients } = parseRecipe(MOCK);

      ingredients.forEach(({ name, measure }) => {
        cy.contains(name, { matchCase: false })
          .scrollIntoView()
          .should("be.visible");

        measure &&
          cy
            .contains(measure, { matchCase: false })
            .scrollIntoView()
            .should("be.visible");
      });
    });

    it("should display the instructions", () => {
      const { instructions } = parseRecipe(MOCK);

      cy.contains(instructions).should("be.visible");
    });

    isFoods &&
      it("should display a youtube video if one is provided", () => {
        const { youtube } = parseRecipe(MOCK);

        youtube &&
          cy.get(`iframe[src*='${youtube.split("=")[1]}']`).should("exist");
      });

    it(`should display 6 ${isFoods ? "drink" : "food"} recommendations`, () => {
      const recommendations = OPPOSITE_MOCK.slice(0, 6).map(parseRecipe);

      recommendations.forEach(({ name }) => {
        cy.contains(name, { matchCase: false }).should("exist");
      });
    });

    it("should have a fixed or absolute positioned 'start recipe' button", () => {
      cy.contains('[role="button"]', /start recipe/i).as("startRecipeButton");

      cy.get("@startRecipeButton")
        .should("have.css", "position")
        .and("be.oneOf", ["fixed", "absolute"]);
    });

    it("should redirect the user to the recipe progress page when clicking the 'start recipe' button", () => {
      cy.contains('[role="button"]', /start recipe/i).click();

      cy.location("pathname").should("eq", `/${page}/${ID}/in-progress`);
    });

    it("should have a 'continue recipe' button if the recipe is in progress", () => {
      cy.visit(`/${page}/${ID}`, {
        onBeforeLoad(win) {
          const inProgressRecipes = {
            [isFoods ? "meals" : "cocktails"]: {
              [ID]: [],
            },
          };

          localStorage.setItem(
            "inProgressRecipes",
            JSON.stringify(inProgressRecipes),
          );

          win.fetch = fetchMock;
        },
      });

      cy.contains('[role="button"]', /start recipe/i).should("not.exist");
      cy.contains('[role="button"]', /continue recipe/i).should("exist");
    });

    it("should redirect the user to the recipe progress page when clicking the 'continue recipe' button", () => {
      cy.visit(`/${page}/${ID}`, {
        onBeforeLoad(win) {
          const inProgressRecipes = {
            [isFoods ? "meals" : "cocktails"]: {
              [ID]: [],
            },
          };

          localStorage.setItem(
            "inProgressRecipes",
            JSON.stringify(inProgressRecipes),
          );

          win.fetch = fetchMock;
        },
      });

      cy.contains('[role="button"]', /continue recipe/i).click();

      cy.location("pathname").should("eq", `/${page}/${ID}/in-progress`);
    });

    it("should have a favorite and share button", () => {
      cy.get(`[data-testid="${MOCK_NAME}-favorite-button"]`).should("exist");

      cy.get('[data-testid="share-button"]').should("exist");
    });

    it("should be able to favorite a recipe and save it to local storage", () => {
      cy.get(`[data-testid="${MOCK_NAME}-favorite-button"]`).click({
        force: true,
      });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("include", ID);
    });

    it("should be already be favorited if the recipe is in local storage", () => {
      cy.visit(`/${page}/${ID}`, {
        onBeforeLoad(win) {
          const favoriteRecipes = [
            {
              id: ID,
            },
          ];

          localStorage.setItem(
            "favoriteRecipes",
            JSON.stringify(favoriteRecipes),
          );

          win.fetch = fetchMock;
        },
      });

      cy.get(`[data-testid="${MOCK_NAME}-favorite-button"]`).should(
        "not.exist",
      );

      cy.get(`[data-testid="${MOCK_NAME}-remove-favorite-button"]`).should(
        "exist",
      );
    });

    it("should be able to unfavorite a recipe and remove it from local storage", () => {
      cy.get(`[data-testid="${MOCK_NAME}-remove-favorite-button"]`).click({
        force: true,
      });
      cy.get(`[data-testid="${MOCK_NAME}-favorite-button"]`).click({
        force: true,
      });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("include", ID);

      cy.get(`[data-testid="${MOCK_NAME}-remove-favorite-button"]`).click({
        force: true,
      });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("not.include", ID);
    });
  });
}

runSpecsOn("foods");
runSpecsOn("drinks");
