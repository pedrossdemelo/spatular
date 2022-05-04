import areasMock from "../mocks/areas";
import fetchMock from "../mocks/fetch";
import italianMealsMock from "../mocks/italianMeals";
import japaneseMealsMock from "../mocks/japaneseMeals";
import { parseRecipe } from "../utils";

function checkRecipes(mock) {
  mock.slice(0, 10).forEach(({ name, image }) => {
    cy.get(`img[alt="${name}"]`).should("have.attr", "src", image);

    cy.contains(name, { matchCase: false }).should("exist");
  });
}

describe("Explore meals by nationality page", () => {
  const NATIONALITIES = areasMock.meals.map(({ strArea }) => strArea);
  const JAPANESE_MEALS = japaneseMealsMock.meals.map(parseRecipe);
  const ITALIAN_MEALS = italianMealsMock.meals.map(parseRecipe);

  before(() => {
    cy.visit("/explore/foods/nationality", {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
  });

  it("should display a picker for all available nationalities", () => {
    cy.get('[data-testid="nationality-picker"]').within(() => {
      NATIONALITIES.forEach((nation) => {
        cy.get(`option[value="${nation}"]`);
      });
    });
  });

  it("should display at least 10 recipe cards based on the selected nationality", () => {
    cy.get('[data-testid="nationality-picker"]').as("picker");

    cy.get("@picker").select("Japanese");

    checkRecipes(JAPANESE_MEALS);

    cy.get("@picker").select("Italian");

    checkRecipes(ITALIAN_MEALS);
  });

  it("should redirect the user to the recipe details page when clicking the card", () => {
    const { name, id } = ITALIAN_MEALS[0];

    cy.get(`img[alt="${name}"]`).click();

    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("Cannot read properties of undefined");

      return false;
    });

    cy.location("pathname").should("eq", `/foods/${id}`);
  });
});
