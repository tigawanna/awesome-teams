
describe('Tasks spec', () => {


//     it('load tasks', () => {
    // cy.login('caretaker1@staff.com', 'caretaker')

//         cy.location().should((loc) => {
//             expect(loc.pathname).not.to.eq('/')
//         })
//         cy.get('[aria-label="add-new-task"]').should('exist')
//         cy.get('[data-testid="tasks-component"]').children()
//     })


//   it('add-todo-task', function() {
   // cy.login('caretaker1@staff.com', 'caretaker')
//         cy.location().should((loc) => {
//             expect(loc.pathname).not.to.eq('/')
//         })

//         cy.get('[data-testid="add-new-task"] > svg').click();
//         cy.get('.md\\:w-\\[45\\%\\] > .css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2').click();
//         cy.get('#react-select-3-option-0').click();
//         cy.get('.css-13cymwt-control > .css-art2ul-ValueContainer2 > .css-w9q2zk-Input2').click();
//         cy.get('#react-select-5-option-0').click();
//         cy.get('[data-testid="title"]').type('Test ToDo creation');
//         cy.get('[data-testid="description"]').type('Test ToDo creation , testing with cypress E2E');
//         cy.get('[data-testid="submit-button"').click();

//     });

  it('add-repair-task', function() {
    cy.login('caretaker1@staff.com', 'caretaker')
      cy.get('[data-testid="add-new-task"] > svg').click();
      cy.get('.md\\:w-\\[45\\%\\] > .css-13cymwt-control > .css-art2ul-ValueContainer2').click();
      cy.get('#react-select-3-option-1').click();
     cy.get('[data-testid="title"]').type('Test Repairs creation');
     cy.get('[data-testid="description"]').type('Test Repairs creation , testing with cypress E2E');
    cy.get('[data-testid="submit-button-Submit"').click();

  })

    it('approve-task', function () {
        cy.login('manager1@staff.com', 'caretaker')
        cy.contains('[data-testid="task-card-link-status"]', 'created')
            .parents('[data-testid="task-card-link"]')
            .contains('repair')
            .click()
        cy.get('[data-testid="task-status-button"]').contains('Approve').click()
        cy.get('[data-testid="consent-modal-accept"]').click()

    })


it('fund-task', function() {
    cy.login('cashier1@staff.com', 'caretaker')
    cy.get('[data-testid="task-card-link-status"]').contains('approved').click()
    cy.get('[data-testid="task-status-button"]').contains('Fund').click()
    cy.get('[data-testid="consent-modal-accept"]').click()

})

    it('mark_task_in_progress', function () {
        cy.login('caretaker1@staff.com', 'caretaker')
        cy.get('[data-testid="task-card-link-status"]').contains('funded').click()
        cy.get('[data-testid="task-status-button"]').contains('Mark in progress').click()
        cy.get('[data-testid="consent-modal-accept"]').click()

    })

    it('mark_task_completed', function () {
        cy.login('caretaker1@staff.com', 'caretaker')
        cy.get('[data-testid="task-card-link-status"]').contains('in_progress').click()
        cy.get('[data-testid="task-status-button"]').contains('Mark Complete').click()
        cy.get('[data-testid="consent-modal-accept"]').click()

    })

})
