const SEAMLESS_LOGIN_URL = "https://ca-qa.seamless.md/#/";
const TEST_EMAIL = "patient@example.com";
const TEST_PASSWORD = "password123";
const LOGIN_API_ENDPOINT = "/api/v4/auth";

const SELECTORS = {
  emailInput: () => cy.get('input[name="email"]'),
  passwordInput: () => cy.get('input[name="password"]'),
  loginButton: () => cy.contains("button", "Login"),
  signUpLink: () => cy.contains("a", "Create"),
  formEmailErrorMessage: () =>
    cy.contains('[data-slot="error-message"]', "username"),
  formPasswordErrorMessage: () =>
    cy.contains('[data-slot="error-message"]', "password"),
  loginFailureMessage: () => cy.contains('[role="alert"]', "incorrect"),
};

describe("SeamlessMD Login Page", () => {
  beforeEach(() => {
    cy.visit(SEAMLESS_LOGIN_URL);
  });

  it("should display login form with all required elements", () => {
    SELECTORS.emailInput().should("be.visible");
    SELECTORS.passwordInput().should("be.visible");

    SELECTORS.loginButton().should("be.visible");
    SELECTORS.signUpLink().should("be.visible");
    SELECTORS.loginButton().should("be.enabled");
  });

  it("should show validation error for empty email field", () => {
    SELECTORS.loginButton().click();
    SELECTORS.formEmailErrorMessage().should("be.visible");
    SELECTORS.formPasswordErrorMessage().should("be.visible");
  });

  it("should handle error when login fails", () => {
    cy.login(TEST_EMAIL, TEST_PASSWORD);
    SELECTORS.loginFailureMessage().should("be.visible");
  });

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

  it("should be able to login using keyboard", () => {
    cy.login(TEST_EMAIL, TEST_PASSWORD, true);
    SELECTORS.loginFailureMessage().should("be.visible");
  });
});

Cypress.Commands.add("login", (email, password, useKeyboard = false) => {
  if (useKeyboard) {
    SELECTORS.emailInput().focus().type(email);
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.intercept("POST", LOGIN_API_ENDPOINT).as("loginRequest");
    SELECTORS.passwordInput().type(password).type("{enter}");
    cy.wait("@loginRequest");
    return;
  }
  SELECTORS.emailInput().type(email);
  SELECTORS.passwordInput().type(password);
  cy.intercept("POST", LOGIN_API_ENDPOINT).as("loginRequest");
  SELECTORS.loginButton().click();
  cy.wait("@loginRequest");
});
