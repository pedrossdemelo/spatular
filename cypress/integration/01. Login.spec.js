describe("Login screen", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.visit("/");

    cy.get("input")
      .filter((_, e) => e.placeholder.match(/email/i))
      .as("emailInput");

    cy.get("input")
      .filter((_, e) => e.placeholder.match(/password/i))
      .as("passwordInput");

    cy.contains('[role="button"]', /sign up|signup/i).as("signUpButton");

    cy.contains('[role="button"]', /log in|login/i).as("loginButton");
  });

  it("should have email and password inputs, with the respective placeholders", () => {
    cy.get("@passwordInput").should("be.visible");

    cy.get("@emailInput").should("be.visible");
  });

  it("should have a button to login and another to sign up", () => {
    cy.get("@loginButton").should("be.visible");

    cy.get("@signUpButton").should("be.visible");
  });

  it("should have both buttons disabled unless provided a valid email and password", () => {
    const bothShouldBe = (type) => {
      switch (type) {
        case "disabled":
          cy.get("@loginButton").should("have.attr", "aria-disabled");
          cy.get("@signUpButton").should("have.attr", "aria-disabled");
          break;
        case "enabled":
          cy.get("@loginButton").should("not.have.attr", "aria-disabled");
          cy.get("@signUpButton").should("not.have.attr", "aria-disabled");
          break;
        default:
          throw new Error(`Invalid type: ${type}`);
      }
    };

    bothShouldBe("disabled");

    cy.get("@emailInput").type("invalidemail.com");

    bothShouldBe("disabled");

    cy.get("@emailInput").clear().type("validemail@email.com");
    cy.get("@passwordInput").type("short");

    bothShouldBe("disabled");

    cy.get("@passwordInput").clear().type("longpassword");

    bothShouldBe("enabled");
  });

  it("should store the user object in local storage when logging in", () => {
    cy.window().then((win) => {
      expect(win.localStorage.getItem("user")).to.be.oneOf([null, "null"]);
    });

    cy.get("@emailInput").type("validemail@email.com");
    cy.get("@passwordInput").type("longpassword");

    cy.get("@loginButton").click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem("user")).to.not.be.null;
      expect(win.localStorage.getItem("user")).to.not.be.undefined;

      const user = JSON.parse(win.localStorage.getItem("user"));
      expect(user.email).to.equal("validemail@email.com");

      expect(win.localStorage.getItem("doneRecipes")).to.equal("[]");

      expect(win.localStorage.getItem("favoriteRecipes")).to.equal("[]");

      const inProgressRecipes = JSON.parse(
        win.localStorage.getItem("inProgressRecipes"),
      );
      expect(inProgressRecipes).to.deep.equal({ meals: {}, cocktails: {} });
    });
  });

  it("should have inProgressRecipes, doneRecipes and favoriteRecipes in local storage", () => {
    cy.window().then((win) => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100).then(() => {
        const inProgressRecipes = JSON.parse(
          win.localStorage.getItem("inProgressRecipes"),
        );
        expect(inProgressRecipes).to.deep.equal({ meals: {}, cocktails: {} });

        expect(win.localStorage.getItem("doneRecipes")).to.eq("[]");

        expect(win.localStorage.getItem("favoriteRecipes")).to.eq("[]");
      });
    });
  });

  it("should redirect to /explore after the login", () => {
    cy.get("@emailInput").type("validemail@email.com");
    cy.get("@passwordInput").type("longpassword");

    cy.get("@loginButton").click();

    cy.location("pathname").should("eq", "/explore");
  });
});
