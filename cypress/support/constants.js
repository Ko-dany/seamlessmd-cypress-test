/* Constants */
export const SEAMLESS_LOGIN_URL = "https://ca-qa.seamless.md/#/";
export const TEST_EMAIL = "patient@example.com";
export const TEST_PASSWORD = "password123";
export const LOGIN_API_ENDPOINT = "/api/v4/auth";

/* Selectors for login page elements */
export const SELECTORS = {
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
