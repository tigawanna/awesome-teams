
describe('Leave spec', () => {

it('request a leave', () => {
    cy.login('caretaker1@staff.com', 'caretaker','portal')

    cy.get('[data-testid="request-leave--button"]').click();
    cy.get('[data-testid="leave-form"] > .h-full > .react-calendar > .react-calendar__navigation > .react-calendar__navigation__next-button').click();
    // cy.get('.react-calendar__tile react-calendar__month-view__days__day').click();
    cy.get('button.react-calendar__tile react-calendar__month-view__days__day').click();
    cy.get('[data-testid="leave_reason"]').type('Testing if i can take a leave ')
 cy.get('[data-testid="submit-buttonRequest Leave"]').click();
    /* ==== End Cypress Studio ==== */
})

})



