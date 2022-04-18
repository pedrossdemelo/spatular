import { parseRecipe } from "../../src/utils";
import fetchMock from "../mocks/fetch";
import oneDrink from "../mocks/oneDrink";
import oneMeal from "../mocks/oneMeal";

function runSpecsOn(page) {
  const isFoods = page === "foods";
  const ID = isFoods ? "52771" : "178319";
  const PAGE_NAME = isFoods ? "FoodId progress page" : "DrinkId progress page";
  const MOCK = isFoods ? oneMeal.meals[0] : oneDrink.drinks[0];

  describe(PAGE_NAME, () => {
    before(() => {
      cy.visit(`/${page}/${ID}/in-progress`, {
        onBeforeLoad(win) {
          win.fetch = fetchMock;

          cy.spy(win, "fetch");
        },
      });
    });

    it("should make an appropriate api request to the ID included in the path", () => {
      cy.window()
        .its("fetch")
        .should(
          "be.calledWith",
          `https://www.the${
            isFoods ? "meal" : "cocktail"
          }db.com/api/json/v1/1/lookup.php?i=${ID}`,
        );
    });

    it("should display the name, category and image with an alt equal to the name", () => {
      const { name, category, image } = parseRecipe(MOCK);

      cy.contains(name, { matchCase: false }).should("exist");

      cy.contains(category, { matchCase: false }).should("exist");

      cy.get(`img[alt='${name}']`)
        .should("have.attr", "src", image)
        .and("exist");
    });

    it("should have a favorite and share button", () => {
      cy.get('[data-testid="favorite-button"]').should("exist");

      cy.get('[data-testid="share-button"]').should("exist");
    });

    it("should be able to favorite a recipe and save it to local storage", () => {
      cy.get('[data-testid="favorite-button"]').click({ force: true });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("include", ID);
    });

    it("should be already be favorited if the recipe is in local storage", () => {
      cy.visit(`/${page}/${ID}/in-progress`, {
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

      cy.get('[data-testid="favorite-button"]').should("not.exist");

      cy.get('[data-testid="remove-favorite-button"]').should("exist");
    });

    it("should be able to unfavorite a recipe and remove it from local storage", () => {
      cy.get('[data-testid="remove-favorite-button"]').click({ force: true });
      cy.get('[data-testid="favorite-button"]').click({ force: true });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("include", ID);

      cy.get('[data-testid="remove-favorite-button"]').click({ force: true });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("not.include", ID);
    });

    it("should display every ingredient with a measure", () => {
      const { ingredients } = parseRecipe(MOCK);

      ingredients.forEach(({ name, measure }) => {
        cy.contains(name, { matchCase: false }).should("exist");

        measure && cy.contains(measure, { matchCase: false }).should("exist");
      });
    });

    it("should display a disabled 'finish' button when there's ingredients left", () => {
      cy.contains('[role="button"]', /finish/i).should(
        "have.attr",
        "aria-disabled",
      );
    });

    it("should be able to check the ingredients and save the state in local storage", () => {
      const { ingredients } = parseRecipe(MOCK);

      ingredients.forEach((_, i) => {
        cy.get(`[data-testid="ingredient-${i}"]`).click();

        cy.get(`[data-testid="ingredient-${i}"]`).should(
          "have.attr",
          "aria-checked",
        );

        cy.reload();

        cy.get(`[data-testid="ingredient-${i}"]`).should(
          "have.attr",
          "aria-checked",
        );
      });
    });

    it("should display an enabled 'finish' button when there's no ingredients left to add", () => {
      cy.contains('[role="button"]', /finish/i).should(
        "not.have.attr",
        "aria-disabled",
      );
    });

    it("should redirect to the done recipes page when the finish button is clicked", () => {
      cy.contains('[role="button"]', /finish/i).click();

      cy.location("pathname").should("eq", "/done-recipes");
    });
  });
}

runSpecsOn("foods");
runSpecsOn("drinks");
