describe("Profile screen", () => {
  beforeEach(() => {
    cy.visit("/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "user",
          JSON.stringify({ email: "validemail@email.com" }),
        );
        win.localStorage.setItem("doneRecipes", "[]");
        win.localStorage.setItem("favoriteRecipes", "[]");
        win.localStorage.setItem(
          "inProgressRecipes",
          JSON.stringify({ meals: {}, cocktails: {} }),
        );
      },
    });
  });

  afterEach(() => {
    cy.window().its("localStorage").invoke("clear");
  });

  it("should display the user's email", () => {
    cy.contains("validemail@email.com");
  });

  it("should have a button linking to the user's favorite recipes", () => {
    cy.contains('[role="button"]', /favorite recipes/i).as("favoritesButton");

    cy.get("@favoritesButton").click();

    cy.location("pathname").should("eq", "/favorite-recipes");
  });

  it("should have a button linking to the user's done recipes", () => {
    cy.contains('[role="button"]', /done recipes/i).as("donesButton");

    cy.get("@donesButton").click();

    cy.location("pathname").should("eq", "/done-recipes");
  });

  it("should have a button to logout, clearing the user's local storage and redirecting to the login page", () => {
    cy.contains('[role="button"]', /logout/i).as("logoutButton");

    cy.get("@logoutButton").click();

    cy.location("pathname").should("eq", "/");

    cy.window()
      .its("localStorage")
      .should("have.property", "user")
      .and("be.oneOf", [null, "null"]);

    cy.window()
      .its("localStorage")
      .should("have.property", "doneRecipes")
      .and("eq", "[]");

    cy.window()
      .its("localStorage")
      .should("have.property", "favoriteRecipes")
      .and("eq", "[]");

    cy.window()
      .its("localStorage")
      .should("have.property", "inProgressRecipes")
      .then((inProgressRecipes) => {
        expect(JSON.parse(inProgressRecipes)).to.deep.equal({
          meals: {},
          cocktails: {},
        });
      });
  });
});
