/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to set auth tokens
       * @example cy.setAuthTokens()
       */
      setAuthTokens(): Chainable<void>;
      /**
       * Custom command to clear auth tokens
       * @example cy.clearAuthTokens()
       */
      clearAuthTokens(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('setAuthTokens', () => {
  window.localStorage.setItem('refreshToken', 'test-refresh-token');
  document.cookie = 'accessToken=test-access-token';
});

Cypress.Commands.add('clearAuthTokens', () => {
  window.localStorage.removeItem('refreshToken');
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});

export {};
