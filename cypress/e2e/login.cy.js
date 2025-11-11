import {
  SEAMLESS_LOGIN_URL,
  TEST_EMAIL,
  TEST_PASSWORD,
  SELECTORS,
} from "../support/constants";
import "../support/commands";

describe("SeamlessMD Login Page", () => {
  beforeEach(() => {
    cy.visit(SEAMLESS_LOGIN_URL);
  });

  /* 1. Verify login form renders with all expected elements */
  it("should display login form with all required elements", () => {
    SELECTORS.emailInput().should("be.visible");
    SELECTORS.passwordInput().should("be.visible");

    SELECTORS.loginButton().should("be.visible");
    SELECTORS.loginButton().should("be.enabled");

    SELECTORS.signUpLink().should("be.visible");
  });

  /* 2.	Test form validation */
  it("should show validation error for empty email field", () => {
    SELECTORS.loginButton().click();

    SELECTORS.formEmailErrorMessage().should("be.visible");
    SELECTORS.formPasswordErrorMessage().should("be.visible");
  });

  /* 3.	Test error handling (what happens when login fails) */
  it("should handle error when login fails", () => {
    cy.login(TEST_EMAIL, TEST_PASSWORD);
    SELECTORS.loginFailureMessage().should("be.visible");
  });

  /* 4.	Verify accessibility features */
  /* Check aria-label attributes for accessibility */
  it("should have proper accessibility attributes", () => {
    SELECTORS.emailInput()
      .invoke("attr", "aria-label")
      .should("match", /email/i)
      .then((ariaLabel) => {
        cy.log("Email input aria-label: " + `${ariaLabel}`);
      });
    SELECTORS.passwordInput()
      .invoke("attr", "aria-label")
      .should("match", /password/i)
      .then((ariaLabel) => {
        cy.log("Password input aria-label: " + `${ariaLabel}`);
      });
  });

  /* 5.	Test keyboard navigation */
  /* Ensure users can navigate and submit the form using keyboard only */
  it("should be able to login using keyboard", () => {
    cy.login(TEST_EMAIL, TEST_PASSWORD, true);
    SELECTORS.loginFailureMessage().should("be.visible");
  });
});
