/// <reference types="cypress" />
import '../support/commands';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.setAuthTokens();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearAuthTokens();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавить булку в конструктор', () => {
      cy.contains('Краторная булка N-200i').parent().within(() => {
        cy.contains('Добавить').click();
      });
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
    });

    it('должен добавить начинку в конструктор', () => {
      cy.contains('Биокотлета из марсианской Магнолии').parent().within(() => {
        cy.contains('Добавить').click();
      });
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });

    it('должен добавить соус в конструктор', () => {
      cy.contains('Соусы').click();
      cy.contains('Соус Spicy-X').parent().within(() => {
        cy.contains('Добавить').click();
      });
      cy.contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открыть модальное окно при клике на ингредиент', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[class*="modal"]').should('be.visible');
      cy.contains('Краторная булка N-200i').should('be.visible');
    });

    it('должен закрыть модальное окно при клике на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[class*="modal"]').should('be.visible');
      cy.get('button').contains('×').click();
      cy.get('[class*="modal"]').should('not.exist');
    });

    it('должен закрыть модальное окно при клике на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[class*="modal"]').should('be.visible');
      cy.get('body').click(0, 0);
      cy.get('[class*="modal"]').should('not.exist');
    });

    it('должен отображать данные выбранного ингредиента в модальном окне', () => {
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.get('[class*="modal"]').should('contain', 'Биокотлета из марсианской Магнолии');
      cy.get('[class*="modal"]').should('contain', '420');
      cy.get('[class*="modal"]').should('contain', '142');
      cy.get('[class*="modal"]').should('contain', '242');
    });
  });

  describe('Создание заказа', () => {
    it('должен создать заказ и показать модальное окно с номером заказа', () => {
      cy.contains('Краторная булка N-200i').parent().within(() => {
        cy.contains('Добавить').click();
      });
      cy.contains('Биокотлета из марсианской Магнолии').parent().within(() => {
        cy.contains('Добавить').click();
      });
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder');
      cy.get('[class*="modal"]').should('be.visible');
      cy.contains('12345').should('be.visible');
    });

    it('должен закрыть модальное окно заказа и очистить конструктор', () => {
      cy.contains('Краторная булка N-200i').parent().within(() => {
        cy.contains('Добавить').click();
      });
      cy.contains('Биокотлета из марсианской Магнолии').parent().within(() => {
        cy.contains('Добавить').click();
      });
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder');
      cy.get('[class*="modal"]').should('be.visible');
      cy.get('button').contains('×').click();
      cy.get('[class*="modal"]').should('not.exist');
      cy.contains('Краторная булка N-200i (верх)').should('not.exist');
      cy.contains('Краторная булка N-200i (низ)').should('not.exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('not.exist');
    });
  });
});
