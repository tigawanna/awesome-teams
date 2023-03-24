
describe('Tasks spec', () => {
    beforeEach(() => {
        cy.login('caretaker1@staff.com', 'caretaker')
    })

    it('load tasks', () => {
    
        cy.location().should((loc) => {
            expect(loc.pathname).not.to.eq('/')
        })
        cy.get('[aria-label="add-new-task"]').should('exist')
        cy.get('[data-testid="tasks-component"]').children()
    })
    
    it('adds a taks', () => {
        cy.location().should((loc) => {
            expect(loc.pathname).not.to.eq('/')
        })
        cy.get('[aria-label="add-new-task"]').should('exist').click()

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.md\\:w-\\[45\\%\\] > .css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2').click();
        cy.get('#react-select-3-option-1').click();
        cy.get('.css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2').click();
        cy.get('#react-select-5-option-1').click();
        cy.get('#title').type('Tesying how to add Reairs task');
        cy.get('#title').type('Tesying how to add Repairs taks');
        cy.get('#description').click();
        cy.get('.text-lg').click();
        /* ==== End Cypress Studio ==== */
    })

})
