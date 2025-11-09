const SEAMLESS_LOGIN_URL = "https://ca-qa.seamless.md/#/";
const TEST_EMAIL = "patient@example.com";
const TEST_PASSWORD = "password123";
const LOGIN_API_ENDPOINT = "/api/v4/auth";

const SELECTORS = {
  emailInput: 'input[name="email"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'button:contains("Login")',
  signUpLink: 'a:contains("Create")',
  formEmailErrorMessage: '[data-slot="error-message"]:contains("username")',
  formPasswordErrorMessage: '[data-slot="error-message"]:contains("password")',
  loginFailureMessage: '[role="alert"]:contains("incorrect")',
};

describe("SeamlessMD Login Page", () => {
  beforeEach(() => {
    cy.visit(SEAMLESS_LOGIN_URL);
  });

  it("should display login form with all required elements", () => {
    cy.get(SELECTORS.emailInput).should("be.visible");
    cy.get(SELECTORS.passwordInput).should("be.visible");

    cy.get(SELECTORS.loginButton).should("be.visible");
    cy.get(SELECTORS.signUpLink).should("be.visible");

    cy.get(SELECTORS.loginButton).should("be.enabled");
  });

  it("should show validation error for empty email field", () => {
    cy.get(SELECTORS.loginButton).click();
    cy.get(SELECTORS.formEmailErrorMessage).should("be.visible");
    cy.get(SELECTORS.formPasswordErrorMessage).should("be.visible");
  });

  it("should handle error when login fails", () => {
    cy.login(TEST_EMAIL, TEST_PASSWORD);
    cy.get(SELECTORS.loginFailureMessage).should("be.visible");
  });
});

Cypress.Commands.add("login", (email, password) => {
  cy.get(SELECTORS.emailInput).type(email);
  cy.get(SELECTORS.passwordInput).type(password);
  cy.intercept("POST", LOGIN_API_ENDPOINT).as("loginRequest");
  cy.get(SELECTORS.loginButton).click();
  cy.wait("@loginRequest");
});
