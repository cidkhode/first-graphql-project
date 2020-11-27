/*
  These tests visit the page, ensure that we first see the Select dropdown which allows the user
  to choose what type of table they want to pull up. Then, it'll test both flows by selecting one
  option at a time.

  Test #1
  The first test selects the World Cups Played By Player option and makes sure that the user sees a
  second Select dropdown which has unique names of the players who have played in the FIFA World Cups
  over the years. It will then type in a name for which to check against and find out how many cups
  they've played in their life. Lastly, it will make sure the table is populated with the appropriate
  data. We have access to this data locally so we can definitively say how many rows of data we are
  expecting back.

  Test #2
  The second test selects the Matches Played By Player option and makes sure that the user sees a
  second Select dropdown which contains the various fields they can choose to see on their table.
  Then it will select 2 options and make sure that the table has both of those fields visible.
*/

it('shows table data for when user clicks the \'World Cups Played By Player\' option', () => {
  cy.visit('/');
  cy.get('.main-container .select-container.first-select')
    .should('be.visible');
  cy.get('.first-select #react-select-2-input')
    .type('World Cups', { force: true })
    .type('{enter}', { force: true });

  cy.get('.data-container .select-container.second-select')
    .should('be.visible');
  cy.get('.select-container.second-select #react-select-3-input')
    .type('messi', { force: true })
    .type('{enter}', { force: true });

  cy.get('.table-component-container .rt-table .rt-thead.-header .rt-tr .rt-th')
    .should('have.length', 3);
  cy.get('.table-component-container .rt-table .rt-tbody .rt-tr-group')
    .should('have.length', 3);
});

it('shows table data for when user clicks the \'Matches Played By Player\' option', () => {
  cy.visit('/');
  cy.get('.main-container .select-container.first-select')
    .should('be.visible');
  cy.get('.first-select input[type="text" i]')
    .type('Matches', { force: true })
    .type('{enter}', { force: true });

  cy.get('.second-select input[type="text" i]')
    .type('Coach', { force: true })
    .type('{enter}', { force: true });

  cy.get('.second-select input[type="text" i]')
    .type('Event', { force: true })
    .type('{enter}', { force: true });

  cy.get('.table-component-container .rt-table .rt-thead.-header .rt-tr .rt-th')
    .should('have.length', 5);
  cy.get('.table-component-container .rt-table .rt-thead.-header .rt-tr .rt-th .rt-resizable-header-content')
    .eq(2)
    .should('have.text', 'Coach Name');
  cy.get('.table-component-container .rt-table .rt-thead.-header .rt-tr .rt-th .rt-resizable-header-content')
    .eq(4)
    .should('have.text', 'Event');
});