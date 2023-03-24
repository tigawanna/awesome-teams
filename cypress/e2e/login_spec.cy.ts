describe('Authentication spec', () => {

    it('login-and-logout', function() {
        cy.login('caretaker1@staff.com', 'caretaker')
        cy.location().should((loc) => {
            expect(loc.pathname).not.to.eq('/auth')
        })

        cy.get('[data-testid="open-user-menu"]').click();
        cy.get('button[aria-label="logout-user"]').click();

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/auth')
        })
    });


})
