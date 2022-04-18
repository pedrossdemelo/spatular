import { parseIngredients } from "utils";
import drinkIngredientsMock from "../mocks/drinkIngredients";
import fetchMock from "../mocks/fetch";
import mealIngredientsMock from "../mocks/mealIngredients";

function runSpecsOn(type) {
  const isFoods = type === "foods";
  const PATH = `/explore/${type}/ingredient`;
  const MOCK = isFoods
    ? mealIngredientsMock.meals
    : drinkIngredientsMock.drinks;
  const INGREDIENTS = MOCK.slice(0, 12).map(parseIngredients);

  describe(`Explore ${type} by ingredient page`, () => {
    before(() => {
      cy.visit(PATH, {
        onBeforeLoad(win) {
          win.fetch = fetchMock;
        },
      });
    });

    it("should display a list of at least twelve ingredients", () => {
      INGREDIENTS.forEach(({ name, image }) => {
        cy.get(`img[alt="${name}"]`).should("have.attr", "src", image);

        cy.contains(name, { matchCase: false }).should("exist");
      });
    });
  });
}

runSpecsOn("foods");
runSpecsOn("drinks");
