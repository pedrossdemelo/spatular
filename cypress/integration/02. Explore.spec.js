describe("Explore page", () => {
  before(() => {
    cy.visit("/explore");
  });

  it("should display buttons to explore foods and drinks", () => {
    cy.contains('[role="button"]', /food/i).should("exist");
    cy.contains('[role="button"]', /drink/i).should("exist");
  });

  it("should display a profile button", () => {
    cy.contains('[role="button"]', /profile/i).should("exist");
  });

  it("should be able to redirect to the drinks page", () => {
    cy.contains('[role="button"]', /drink/i).click({ force: true });
    cy.location("pathname").should("eq", "/explore/drinks");
    cy.go("back");
  });

  it("should be able to redirect to the foods page", () => {
    cy.contains('[role="button"]', /food/i).click({ force: true });
    cy.location("pathname").should("eq", "/explore/foods");
    cy.go("back");
  });

  it("should be able to redirect to the profile page", () => {
    cy.contains('[role="button"]', /profile/i).click({ force: true });
    cy.location("pathname").should("eq", "/profile");
    cy.go("back");
  });
});
