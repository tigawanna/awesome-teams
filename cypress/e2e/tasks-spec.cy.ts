
describe('Tasks spec', () => {


    it('load tasks', () => {
        // login
        cy.visit('/auth');
        cy.get('#email').type('caretaker1@staff.com');
        cy.get('#password').type('caretaker');
        cy.get('button[type="submit"]').click();

        // //  go to home route
        // cy.visit('/');

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.h-\\[50\\%\\] > :nth-child(2) > .w-fit').click();
        /* ==== End Cypress Studio ==== */
    })

})
