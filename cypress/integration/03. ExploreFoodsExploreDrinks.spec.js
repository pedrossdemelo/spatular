import fetchMock from "../mocks/fetch";

function runSpecsOn(type) {
  const isFoods = type === "foods";
  const PATH = isFoods ? "/explore/foods" : "/explore/drinks";
  const RANDOM_ID = isFoods ? "52771" : "178319";

  describe(`Explore ${type} page`, () => {
    before(() => {
      cy.visit(PATH, {
        onBeforeLoad(win) {
          win.fetch = fetchMock;
        },
      });
    });

    isFoods &&
      it("should display button to explore by nationality", () => {
        cy.contains('[role="button"]', /national/i).should("exist");
      });

    it("should display a button to explore by ingredient", () => {
      cy.contains('[role="button"]', /ingredient/i).should("exist");
    });

    it("should dislay a button to explore a surprise recipe", () => {
      cy.contains('[role="button"]', /surprise|random/i).should("exist");
    });

    isFoods &&
      it("should be able to redirect to the explore by nationality page", () => {
        cy.contains('[role="button"]', /national/i).click({ force: true });
        cy.location("pathname").should("eq", `${PATH}/nationality`);
        cy.go("back");
      });

    it("should be able to redirect to the explore by ingredient page", () => {
      cy.contains('[role="button"]', /ingredient/i).click({ force: true });
      cy.location("pathname").should("eq", `${PATH}/ingredient`);
      cy.go("back");
    });

    it(`should be able to redirect to a random ${type.slice(
      0,
      -1,
    )} page`, () => {
      cy.contains('[role="button"]', /surprise|random/i).click({ force: true });
      cy.location("pathname").should("eq", `/${type}/${RANDOM_ID}`);
      cy.go("back");
    });
  });
}

runSpecsOn("foods");
runSpecsOn("drinks");
