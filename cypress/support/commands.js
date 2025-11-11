import { SELECTORS, LOGIN_API_ENDPOINT } from "./constants";

/* Custom command to perform login */
/* Keyboard navigation support */
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
