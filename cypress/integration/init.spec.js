/*
  This test visits the page, ensures that we first see the Select dropdown followed by
  another Select if we select the 'World Cups Played By Player' option. Then we will
  expect to see another Select allowing the user to choose a player. When they do, we
  expect to see a Table.
*/

it('visits the app', () => {
  cy.visit('/');
  cy.get('.main-container .select-container.first-select')
    .should('be.visible');
  cy.get('.first-select #react-select-2-input')
    .type('World Cups', {force: true})
    .type('{enter}', {force: true});

  cy.get('.data-container .select-container.second-select')
    .should('be.visible');
  cy.get('.select-container.second-select #react-select-3-input')
    .type('messi', {force: true})
    .type('{enter}', {force: true});

  cy.get('.table-component-container .rt-table .rt-thead.-header .rt-tr .rt-th')
    .should('have.length', 3);
  cy.get('.table-component-container .rt-table .rt-tbody .rt-tr-group')
    .should('have.length', 3);
});