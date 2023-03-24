
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

//   it('add-repair-task', function() {
    // cy.login('caretaker1@staff.com', 'caretaker')
//       cy.get('[data-testid="add-new-task"] > svg').click();
//       cy.get('.md\\:w-\\[45\\%\\] > .css-13cymwt-control > .css-art2ul-ValueContainer2').click();
//       cy.get('#react-select-3-option-1').click();
//      cy.get('[data-testid="title"]').type('Test Repairs creation');
//      cy.get('[data-testid="description"]').type('Test Repairs creation , testing with cypress E2E');
//     cy.get('[data-testid="submit-button"').click();

//   })

it('approve-task', function() {
    cy.login('manager1@staff.com', 'caretaker')

    // cy.get('[href="/0symxp6k4cht63n?page_idx=0"] > .h-full.flex-col > .w-\\[96\\%\\]').click();
    // cy.get(':nth-child(1) > .px-5 > .text-lg').click();
    // cy.get('.shadow-lg').click();
    cy.get('[  data-testid="task-card-link-type"]').contains('repair').click()
})



})
