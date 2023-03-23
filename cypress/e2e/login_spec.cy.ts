describe('Authentication spec', () => {
    /* ==== Test Created with Cypress Studio ==== */
    it('login', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('/auth');
        cy.get('#email').type('caretaker1@staff.com');
        cy.get('#password').type('caretaker');
        cy.get('button[type="submit"]').click();
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('logout', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('/auth');
        cy.get('#email').type('caretaker1@staff.com');
        cy.get('#password').type('caretaker');
        cy.get('.text-lg').click();
        cy.get('.rounded-md > .rounded-full').click();
        cy.get('button[aria-label="logout-user"]').click();
        /* ==== End Cypress Studio ==== */
    });
})
