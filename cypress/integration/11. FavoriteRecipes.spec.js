const favoriteRecipes = [
  {
    id: "52771",
    type: "food",
    nationality: "Italian",
    category: "Vegetarian",
    alcoholicOrNot: "",
    name: "Spicy Arrabiata Penne",
    image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
  },
  {
    id: "178319",
    type: "drink",
    nationality: "",
    category: "Cocktail",
    alcoholicOrNot: "Alcoholic",
    name: "Aquamarine",
    image:
      "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
  },
];

describe("Favorite recipes screen", () => {
  const [food, drink] = favoriteRecipes;

  before(() => {
    cy.visit("/favorite-recipes", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "favoriteRecipes",
          JSON.stringify(favoriteRecipes),
        );
      },
    });
  });

  it("should have three filters: all, drinks and foods", () => {
    cy.contains('[role="button"]', /all/i).should("exist");
    cy.contains('[role="button"]', /drink/i).should("exist");
    cy.contains('[role="button"]', /food/i).should("exist");
  });

  it("should be able to filter by drinks", () => {
    const { name, category, image } = drink;

    cy.contains('[role="button"]', /drink/i).click({ force: true });

    cy.get(`[data-testid="${name}-done-card"]`).as("drink-card");
    cy.get("@drink-card").should("contain", name);
    cy.get("@drink-card").should("contain", category);
    cy.get("@drink-card").find("img").should("have.attr", "src", image);
  });

  it("should be able to filter by foods", () => {
    const { name, category, image } = food;

    cy.contains('[role="button"]', /food/i).click({ force: true });

    cy.get(`[data-testid="${name}-done-card"]`).as("food-card");
    cy.get("@food-card").should("contain", name);
    cy.get("@food-card").should("contain", category);
    cy.get("@food-card").find("img").should("have.attr", "src", image);
  });

  it("should display all recipes if the filter is all", () => {
    cy.contains('[role="button"]', /all/i).click();

    favoriteRecipes.forEach(({ name, category, image }) => {
      cy.get(`[data-testid="${name}-done-card"]`).as(`${name}-card`);

      cy.get(`@${name}-card`).should("contain", name);
      cy.get(`@${name}-card`).should("contain", category);
      cy.get(`@${name}-card`).find("img").should("have.attr", "src", image);
    });
  });

  it("should have an unfavorite and share button on each card", () => {
    favoriteRecipes.forEach(({ name }) => {
      cy.get(`[data-testid="${name}-remove-favorite-button"]`).should("exist");

      cy.get(`[data-testid="${name}-share-button"]`).should("exist");
    });
  });

  it("should be able to unfavorite a recipe and remove it from local storage", () => {
    favoriteRecipes.forEach(({ name, id }) => {
      cy.get(`[data-testid="${name}-remove-favorite-button"]`).click({
        force: true,
      });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("not.include", id);
    });
  });

  it("should redirect to the recipe id page when clicking on a recipe image", () => {
    favoriteRecipes.forEach(({ id, name, type }) => {
      cy.get(`[data-testid="${name}-anchor"]`).click({ force: true });

      cy.location("pathname").should("eq", `/${type}s/${id}`);

      cy.go("back");
    });
  });
});
