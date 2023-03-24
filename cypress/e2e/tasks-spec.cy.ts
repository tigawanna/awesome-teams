
describe('Tasks spec', () => {
    beforeEach(() => {
        cy.login('caretaker1@staff.com', 'caretaker')
    })

    it('load tasks', () => {
        // login
        cy.get('[aria-label="add-new-task"]').should('exist')


    })

})
