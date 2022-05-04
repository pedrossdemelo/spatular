const doneRecipes = [
  {
    id: "52771",
    type: "food",
    nationality: "Italian",
    category: "Vegetarian",
    alcoholicOrNot: "",
    name: "Spicy Arrabiata Penne",
    image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    doneDate: "23/06/2020",
    tags: ["Pasta", "Curry"],
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
    doneDate: "23/06/2020",
    tags: [],
  },
];

describe("Done recipes screen", () => {
  const [food, drink] = doneRecipes;

  before(() => {
    cy.visit("/done-recipes", {
      onBeforeLoad(win) {
        win.localStorage.setItem("doneRecipes", JSON.stringify(doneRecipes));
      },
    });
  });

  it("should have three filters: all, drinks and foods", () => {
    cy.getByTestId("filter-all-button").should("exist");
    cy.getByTestId("filter-drink-button").should("exist");
    cy.getByTestId("filter-food-button").should("exist");
  });

  it("should be able to filter by drinks", () => {
    const { name, image } = drink;
    const { name: nameFood } = food;

    cy.getByTestId("filter-drink-button").click({ force: true });

    cy.getByTestId(`${name}-done-card`).as("drink-card");
    cy.get("@drink-card").find("img").should("have.attr", "src", image);

    cy.getByTestId(`${nameFood}-done-card`).should("not.exist");
  });

  it("should be able to filter by foods", () => {
    const { name, image } = food;
    const { name: nameDrink } = drink;

    cy.getByTestId("filter-food-button").click({ force: true });

    cy.getByTestId(`${name}-done-card`).as("food-card");
    cy.get("@food-card").find("img").should("have.attr", "src", image);

    cy.getByTestId(`${nameDrink}-done-card`).should("not.exist");
  });

  it("should display all recipes if the filter is all", () => {
    cy.getByTestId("filter-all-button").click({ force: true });

    doneRecipes.forEach(({ name, image }) => {
      cy.getByTestId(`${name}-done-card`).as(`${name}-card`);

      cy.get(`@${name}-card`).find("img").should("have.attr", "src", image);
    });
  });

  it("should have a favorite and share button on each card", () => {
    doneRecipes.forEach(({ name }) => {
      cy.getByTestId(`${name}-favorite-button`).should("exist");

      cy.getByTestId(`${name}-share-button`).should("exist");
    });
  });

  it("should be able to favorite a recipe and save it to local storage", () => {
    doneRecipes.forEach(({ name, id }) => {
      cy.getByTestId(`${name}-favorite-button`).click({ force: true });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("include", id);
    });
  });

  it("should be already be favorited if the recipe is in local storage", () => {
    cy.visit("/done-recipes", {
      onBeforeLoad(win) {
        win.localStorage.setItem("doneRecipes", JSON.stringify(doneRecipes));
        win.localStorage.setItem(
          "favoriteRecipes",
          JSON.stringify(doneRecipes.map(({ id }) => ({ id }))),
        );
      },
    });

    doneRecipes.forEach(({ name }) => {
      cy.getByTestId(`${name}-remove-favorite-button`).should("exist");
    });
  });

  it("should be able to unfavorite a recipe and remove it from local storage", () => {
    doneRecipes.forEach(({ name, id }) => {
      cy.getByTestId(`${name}-remove-favorite-button`).click({
        force: true,
      });

      cy.window()
        .its("localStorage")
        .should("have.property", "favoriteRecipes")
        .and("not.include", id);
    });
  });

  it("should redirect to the recipe id page when clicking on a recipe image", () => {
    doneRecipes.forEach(({ id, name, type }) => {
      cy.getByTestId(`${name}-done-card`).click({ force: true });

      cy.location("pathname").should("eq", `/${type}s/${id}`);

      cy.go("back");
    });
  });
});
