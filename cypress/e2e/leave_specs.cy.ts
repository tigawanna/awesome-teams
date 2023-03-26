
describe('Leave spec', () => {


function dateNumber(gap:number){
    const date = new Date();
    date.getMonth() + 1;
    const day = date.getDate()+gap

    return day
}

    
it('request a leave', () => {
    cy.login('caretaker1@staff.com', 'caretaker','portal')

    cy.get('[data-testid="request-leave--button"]').click();
    cy.get(`.react-calendar__month-view__days > :nth-child(${dateNumber(3)})`).click();
    cy.get(`.react-calendar__month-view__days > :nth-child(${dateNumber(6)})`).click();
    cy.get('[data-testid="leave_reason"]').type('Testing if i can take a leave ')
    cy.get('[data-testid="submit-button-Request Leave"]').click();

})

})



